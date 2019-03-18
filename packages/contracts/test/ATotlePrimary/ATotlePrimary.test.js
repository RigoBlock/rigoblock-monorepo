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

const contractName = 'Drago'

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

      totlePrimaryAddress = await baseContracts[
        'TotlePrimary'
      ].address

      await baseContracts['ExchangesAuthority'].setExchangeAdapter(
        totlePrimaryAddress,
        totleAdapterAddress
      )

      const takeOrder = await baseContracts['ATotlePrimary']
        .performRebalance(
          [
              1.toString(), // bool isSell
              baseContracts['RigoToken'].address,
              10000.toString(),
              0.toString(), // false
              1.toString(),
              10000.toString(),
              [
                  [
                    baseContracts['exchangeHandler'].address,
                    signedOrder
                  ]
              ]
          ]
          signedOrder,
          accounts[0], // fee account
          '0x1111111111111111111111111111111111111111111111111111111111111111'// mock id
        )
      expect(takeOrder).toBeHash()
    })
  })
})
