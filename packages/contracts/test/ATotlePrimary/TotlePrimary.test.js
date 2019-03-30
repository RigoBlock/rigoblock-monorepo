import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import totlePrimaryArtifact from '../../artifacts/TotlePrimary.json'
import exchangeArtifact from '../../artifacts/Exchange.json'
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
  let totlePrimaryAddress
  let totlePrimaryInstance
  let transactionDefault
  let exchangeAddress
  let exchangeInstance

  beforeAll(async () => {
    totlePrimaryAddress = await baseContracts[
      'TotlePrimary'
    ].address
    totlePrimaryInstance = new web3.eth.Contract(
      totlePrimaryArtifact.networks[GANACHE_NETWORK_ID].abi,
      totlePrimaryAddress
    )
    exchangeAddress = await baseContracts[
      'Exchange'
    ].address
    exchangeInstance = new web3.eth.Contract(
      exchangeArtifact.networks[GANACHE_NETWORK_ID].abi,
      exchangeAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
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
      const makerAssetAmount = web3.utils.toWei('0.3').toString() // test with equal amounts (prev 0.2)
      const takerAssetAmount = web3.utils.toWei('0.3').toString()
      const expirationTimeSeconds = new BigNumber(
        Date.now() + 3600000
      ).toString() // Valid for up to an hour

      // set allowance to tokenTransferProxy
      const tokenTransferProxy = baseContracts['TokenTransferProxy'].address
      await baseContracts['RigoToken'].approve.sendTransactionAsync(
        tokenTransferProxy, takerAssetAmount, { from: accounts[0] }
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

      const grgTokenAddress = baseContracts['RigoToken'].address
      const zeroExHandlerAddress = baseContracts['ZeroExExchangeHandler'].address
      const tradeId = '0x1111111111111111111111111111111111111111111111111111111111111111'
      const isSell = false // buying a token from the secondary account -> isSell = false
      const optionalTrade = false
      const tokenAmount = 10000 //alt: web3.utils.toWei('0.2').toString()
      const minimumExchangeRate = 1
      const minimumAcceptableTokenAmount = 2000 // alt: web3.utils.toWei('0.3').toString()

/*
      // must understand how to pass the parameters to the following struct
      const encodedSignedOrder = await web3.eth.abi.encodeParameters(
        ['address[]','uint256[]','bytes[]','uint256','bytes'],
        [
          [makerAddress,takerAddress,feeRecipientAddress,senderAddress],
          [makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt],
          [makerAssetData,takerAssetData],
          tokenAmount,
          signedOrder.signature
        ]
      )
*/

      const aggregatedOrder = [
        makerAddress,takerAddress,feeRecipientAddress,senderAddress,
        makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt,
        makerAssetData,takerAssetData
      ]

      const takerAssetFillAmount = takerAssetAmount // in case of totle, should be tokenAmount
      const fillOrder = await exchangeInstance.methods.fillOrder(
        aggregatedOrder,
        takerAssetFillAmount, // fill order
        signedOrder.signature // SignatureType.EthSign
      ).encodeABI()

      // accounts[1] takes the order, purchases GRG
      const transactionDetails = {
        from: accounts[1],
        value: tokenAmount,
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      const generateRebalance = await totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            grgTokenAddress,
            tokenAmount,
            optionalTrade,
            minimumExchangeRate, // check on value
            minimumAcceptableTokenAmount,
            [
                [
                  zeroExHandlerAddress,
                  fillOrder
                ]
            ]
          ]
        ],
        tradeId
      ).send({ ...transactionDetails })
    })
  })
})
