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
  //let tokenTransferProxy // for sell order

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
    //tokenTransferProxy = baseContracts['TokenTransferProxy'].address
  })

  describe('performRebalance', () => {
    it('performs a GRG take order on 0x', async () => {
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

      // default account sets allowance to 0x erc20proxy
      const erc20Proxy = baseContracts['Erc20Proxy'].address
      await baseContracts['RigoToken'].approve(erc20Proxy, makerAssetAmount)

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
      const aggregatedOrder = [
        makerAddress,takerAddress,feeRecipientAddress,senderAddress,
        makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt,
        makerAssetData,takerAssetData
      ]

      const takerAssetFillAmount = (takerAssetAmount / 2).toString() // partial fill

      const fillOrder = await exchangeInstance.methods.fillOrder(
        aggregatedOrder,
        takerAssetFillAmount,
        signedOrder.signature // SignatureType.EthSign
      ).encodeABI() // good 0x order to be taken

      const grgTokenAddress = baseContracts['RigoToken'].address
      const zeroExHandlerAddress = baseContracts['ZeroExExchangeHandler'].address
      const tradeId = '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock id bytes32
      const isSell = false // buying a token from the secondary account -> isSell = false
      const optionalTrade = false
      const tokenAmount = takerAssetFillAmount
      const minimumExchangeRate = 10000000 // Allowable Price Change (%)
      const minimumAcceptableTokenAmount = 10000 // Minimum Token Fill Quantity(%)

      const feeAccount = accounts[0]
      /*
      if(!affiliateRegistry.isValidAffiliate(feeAccount)){
          feeAccount = defaultFeeAccount;
      }
      */

      // accounts[1] takes the order, purchases GRG
      const transactionDetails = {
        value: takerAssetFillAmount,
        from: accounts[1],
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
        feeAccount,
        tradeId
      //).encodeABI() // try send raw transaction to fix
      ).send({ ...transactionDetails })
      //expect(generateRebalance).toBeHash()
    })
  })
})
