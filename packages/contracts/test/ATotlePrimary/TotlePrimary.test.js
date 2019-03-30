import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'
import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    Order,
    orderHashUtils,
    signatureUtils,
    SignerType,
} from '0x.js'
import { ECSignature, SignatureType, SignedOrder, ValidatorSignature } from '@0x/types';
import web3 from '../web3'

const contractName = 'TotlePrimary'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let transactionDefault
  let exchangeAddress
  //let hotWalletAddress
  let totlePrimaryAddress

  beforeAll(async () => {
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    exchangeAddress = await baseContracts['Exchange'].address
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
    totlePrimaryAddress = await baseContracts[
      'TotlePrimary'
    ].address
  })

  describe('performRebalance', () => {
    it('performs a totle rebalance', async () => {
      const makerAddress = accounts[0]
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData = assetDataUtils.encodeERC20AssetData(baseContracts['RigoToken'].address)
      const takerAssetData = assetDataUtils.encodeERC20AssetData(baseContracts['WETH9'].address)
      //const exchangeAddress = exchangeAddress //'0x1d8643aae25841322ecde826862a9fa922770981'
      const salt = generatePseudoRandomSalt().toString()
      const makerFee = new BigNumber(0).toString()
      const takerFee = new BigNumber(0).toString()
      const makerAssetAmount = web3.utils.toWei('0.2').toString()
      const takerAssetAmount = web3.utils.toWei('0.3').toString()
      const expirationTimeSeconds = new BigNumber(
        Date.now() + 3600000
      ).toString() // Valid for up to an hour

      // wrap ether from a secondary account
      await baseContracts['WETH9'].deposit.sendTransactionAsync(
        {
          value: takerAssetAmount,
          from: accounts[1]
        }
      )

      // set allowances
      await baseContracts['WETH9'].approve.sendTransactionAsync(
        totlePrimaryAddress, takerAssetAmount, { from: accounts[1] }
      )
      await baseContracts['RigoToken'].approve.sendTransactionAsync(
        totlePrimaryAddress, takerAssetAmount, { from: accounts[0] }
      )

      // Generate order
      const order = {
        makerAddress,
        takerAddress,
        feeRecipientAddress,
        senderAddress,
        makerAssetAmount,
        takerAssetAmount,
        makerFee,
        takerFee,
        expirationTimeSeconds,
        salt,
        makerAssetData,
        takerAssetData,
        exchangeAddress
      }
      const providerEngine = web3.currentProvider

      const signerAddress = accounts[0]

      const signedOrder = await signatureUtils.ecSignOrderAsync(
        providerEngine,
        order,
        signerAddress
      )

      const totlePrimary = baseContracts['TotlePrimary']
      const grgTokenAddress = baseContracts['RigoToken'].address
      const zeroExHandlerAddress = baseContracts['ZeroExExchangeHandler'].address
      const tradeId = '0x1111111111111111111111111111111111111111111111111111111111111111'
      const isSell = false // buying a token from the secondary account -> isSell = false
      const optionalTrade = false
      const tokenAmount = 10000
      const minimumExchangeRate = 1
      const minimumAcceptableTokenAmount = 10000

/*
      // error log: invalid solidity type!: tuple[]
      // this is most likely due to not up-to-date deployer
      const generateRebalance = await totlePrimary.performRebalance(
        [
          [
            isSell,
            grgTokenAddress,
            tokenAmount,
            optionalTrade,
            minimumExchangeRate, // check on value
            minimumAcceptableTokenAmount,
            [
                [zeroExHandlerAddress, signedOrder] // check typedSignedOrder
            ]
          ]
        ],
        tradeId
      )
*/

      const encodedSignedOrder = await web3.eth.abi.encodeParameters(
        ['address[]','uint256[]','bytes[]','bytes'],
        [
          [makerAddress,takerAddress,feeRecipientAddress,senderAddress],
          [makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt],
          [makerAssetData,takerAssetData],
          signedOrder.signature
        ]
      )

      const totleOrder = await web3.eth.abi.encodeParameters(
        ['address','bytes'],
        [zeroExHandlerAddress, encodedSignedOrder] // possibly the order does not have the be encoded, just sent as order format
      )

      const totleTrade = await web3.eth.abi.encodeParameters(
        ['bool','address','uint256','bool','uint256','uint256','tuple[]'],
        [
          isSell,
          grgTokenAddress,
          tokenAmount,
          optionalTrade,
          minimumExchangeRate,
          minimumAcceptableTokenAmount,
          [totleOrder, ]
        ]
      )

      const methodInterface = {
        name: 'performRebalance',
        type: 'function',
        inputs: [
          {
            type: 'tuple[]',
            name: 'trades'
          },
          {
            type: 'bytes32',
            name: 'id'
          }
        ]
      }
      const txHash = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [[totleTrade, ], tradeId]
      )
      /*
            // error log: invalid solidity type!: tuple[]
            or abicoder? check on versions of dependancies
            // possibly because of use of old deployer // TODO: deprecate deployer
            const txHash = await totlePrimary.performRebalance.sendTransactionAsync(
              totleTrade, tradeId,
              {
                from: accounts[1]
              }
            )
            expect(txHash).toBeHash()
            // TODO: try with web3.eth.accounts.signTransaction(tx, privateKey [, callback])
      */
    })
  })
})
