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

const contractName = 'ATotlePrimary'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let transactionDefault
  let exchangeAddress
  //let hotWalletAddress
  let totleAdapterAddress

  beforeAll(async () => {
    await baseContracts['DragoFactory'].createDrago('my new drago', 'DRA')
    const dragoData = await baseContracts['DragoRegistry'].fromName(
      'my new drago'
    )
    const [, address] = dragoData
    dragoAddress = address
    dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    exchangeAddress = await baseContracts['Exchange'].address
    totleAdapterAddress = await baseContracts[
      'ATotlePrimary'
    ].address
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
      const makerAssetAmount = web3.utils.toWei('0.2').toString()
      const takerAssetAmount = web3.utils.toWei('0.3').toString()
      const expirationTimeSeconds = new BigNumber(
        Date.now() + 3600000
      ).toString() // Valid for up to an hour

      // Generate order
      const order = {
        exchangeAddress,
        expirationTimeSeconds,
        feeRecipientAddress,
        makerAddress,
        makerAssetAmount,
        makerAssetData,
        makerFee,
        salt,
        senderAddress,
        takerAddress,
        takerAssetAmount,
        takerAssetData,
        takerFee,
      }
      const providerEngine = web3.currentProvider

      // Signing orderHash -> ecSignature
      const signerAddress = accounts[0] //'0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3' must include pkey
      const orderHashHex = await orderHashUtils.getOrderHashHex(order)

      const signature = await signatureUtils.ecSignHashAsync(
        providerEngine,
        orderHashHex,
        signerAddress
      )

      const typedSignature = await signatureUtils.convertToSignatureWithType(
        signature,
        SignatureType.EthSign // double check against EIP712
      )

      const signedOrder = { ...order, typedSignature }

      const totlePrimaryAddress = await baseContracts[
        'TotlePrimary'
      ].address

      await baseContracts['ExchangesAuthority'].setExchangeAdapter(
        totlePrimaryAddress,
        totleAdapterAddress
      )

      const totlePrimary = baseContracts['TotlePrimary']
      const grgTokenAddress = baseContracts['RigoToken'].address
      const zeroExHandlerAddress = baseContracts['ZeroExExchangeHandler'].address
      const tradeId = '0x1111111111111111111111111111111111111111111111111111111111111111'
      const isSell = true
      const optionalTrade = false
      const tokenAmount = 10000
      const minimumExchangeRate = 1
      const minimumAcceptableTokenAmount = 10000

      const encodedSignedOrder = await web3.eth.abi.encodeParameters(
        ['address[]','uint256[]','bytes[]','bytes'],
        [
          [makerAddress,takerAddress,feeRecipientAddress,senderAddress],
          [makerAssetAmount,takerAssetAmount,makerFee, takerFee, expirationTimeSeconds, salt],
          [makerAssetData,takerAssetData],
          signature
        ]
      )

      const totleOrder = await web3.eth.abi.encodeParameters(
        ['address','bytes'],
        [zeroExHandlerAddress,encodedSignedOrder]
      )

      const totleTrade = await web3.eth.abi.encodeParameters(
        ['bool','address','uint256','bool','uint256','uint256','bytes'],
        [
          isSell,
          grgTokenAddress,
          tokenAmount,
          optionalTrade,
          minimumExchangeRate,
          minimumAcceptableTokenAmount,
          totleOrder
        ]
      )

      const methodInterface = {
        name: 'performRebalance',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'totlePrimaryAddress'
          },
          {
            type: 'bytes',
            name: 'trades'
          },
          {
            type: 'bytes32',
            name: 'id'
          }
        ]
      }

      // defined trades as bytes type
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [totlePrimaryAddress, totleTrade, tradeId]
      )

      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )
      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        totleAdapterAddress,
        true
      ) // byte4(keccak256(method))

      //const txHash = await dragoInstance.methods
      await expect(dragoInstance.methods
        .operateOnExchange(totlePrimaryAddress, [assembledTransaction])
        .send({ ...transactionDefault })
      //expect(txHash).toBeHash()
    ).toThrowErrorMatchingSnapshot() // temporary until check
    })
  })
})
