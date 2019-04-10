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
  let rigoTokenAddress
  let weth9TokenAddress
  let erc20ProxyAddress
  let tokenTransferProxyAddress
  let zeroExHandlerAddress

  beforeAll(async () => {
    rigoTokenAddress = await baseContracts['RigoToken'].address
    weth9TokenAddress = await baseContracts['WETH9'].address
    erc20ProxyAddress = await baseContracts['Erc20Proxy'].address
    tokenTransferProxyAddress = await baseContracts['TokenTransferProxy'].address
    zeroExHandlerAddress = await baseContracts['ZeroExExchangeHandler'].address
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
  })

  describe('performRebalance', () => {
    it('performs a 0x GRG buy order on totle', async () => {
      // account 1 buys from account 0
      const makerAddress = accounts[0]
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData = assetDataUtils.encodeERC20AssetData(rigoTokenAddress)
      const takerAssetData = assetDataUtils.encodeERC20AssetData(weth9TokenAddress)
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
      await baseContracts['RigoToken'].approve(erc20ProxyAddress, makerAssetAmount)

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
      const signature = signedOrder.signature

/*
struct OrderData {
    address makerAddress;           // Address that created the order.
    address takerAddress;           // Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.
    address feeRecipientAddress;    // Address that will recieve fees when order is filled.
    address senderAddress;          // Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.
    uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker. Must be greater than 0.
    uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker. Must be greater than 0.
    uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.
    uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.
    uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.
    uint256 salt;                   // Arbitrary number to facilitate uniqueness of the order's hash.
    bytes makerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring makerAsset. The last byte references the id of this proxy.
    bytes takerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring takerAsset. The last byte references the id of this proxy.
    bytes signature;
}
*/

      const encodedOrder = await web3.eth.abi.encodeParameters(
        [
          'address','address','address','address',
          'uint256','uint256','uint256','uint256','uint256','uint256',
          'bytes','bytes','bytes'
        ],
        [
          makerAddress,takerAddress,feeRecipientAddress,senderAddress,
          makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt,
          makerAssetData,takerAssetData,signature
        ]
      )

      // TODO: check if need to slice(0, -60) the right part of the output string

      const tradeId = '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock id bytes32
      const isSell = false // buying a token from the secondary account -> isSell = false
      const optionalTrade = false
      const tokenAmount = takerAssetAmount
      const minimumExchangeRate = 1 // Allowable Price Change (%)
      const minimumAcceptableTokenAmount = 10000 // Minimum Token Fill Quantity(%)

      const feeAccount = accounts[0]
      // TODO: check why base account is not valid affiliate, since it is set up in bootstrap
      // affiliate is a contract, created for each affiliate account
      // const isAffiliated = await baseContracts['AffiliateRegistry'].isValidAffiliate(accounts[0])

      // accounts[1] takes the order, purchases GRG
      const transactionDetails = {
        value: tokenAmount, //takerAssetFillAmount,
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      await expect(totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            rigoTokenAddress,
            tokenAmount,
            optionalTrade,
            minimumExchangeRate, // check on value
            minimumAcceptableTokenAmount,
            [
                [
                  zeroExHandlerAddress,
                  encodedOrder
                ]
            ]
          ]
        ],
        feeAccount,
        tradeId
      ).send({ ...transactionDetails })
    ).rejects.toThrowErrorMatchingSnapshot()
    }, 9999)
    it('performs a 0x GRG sell order on totle', async () => {
      //account 1 signs GRG buy order
      //must wrap eth
      const makerAddress = accounts[1]
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData = assetDataUtils.encodeERC20AssetData(weth9TokenAddress)
      const takerAssetData = assetDataUtils.encodeERC20AssetData(rigoTokenAddress)
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
      await baseContracts['WETH9'].deposit({
        value: makerAssetAmount,
        from: accounts[1]
      })
      await baseContracts['WETH9'].approve(erc20ProxyAddress, makerAssetAmount, { from: accounts[1] }
      )//.send({ from: accounts[1] })
      // account 0 must set allowance to totle token transfer proxy
      await baseContracts['RigoToken'].approve(tokenTransferProxyAddress, makerAssetAmount)

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

      const signature = signedOrder.signature
      const encodedOrder = await web3.eth.abi.encodeParameters(
        [
          'address','address','address','address',
          'uint256','uint256','uint256','uint256','uint256','uint256',
          'bytes','bytes','bytes'
        ],
        [
          makerAddress,takerAddress,feeRecipientAddress,senderAddress,
          makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt,
          makerAssetData,takerAssetData,signature
        ]
      )

      const tradeId = '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock id bytes32
      const isSell = true
      const optionalTrade = false
      const tokenAmount = (takerAssetAmount / 2).toString() // partial fill, takerAssetFillAmount
      const minimumExchangeRate = 1 // Allowable Price Change (%)
      const minimumAcceptableTokenAmount = 10000 // Minimum Token Fill Quantity(%)

      const feeAccount = accounts[0]
      // TODO: check why base account is not valid affiliate, since it is set up in bootstrap
      const isAffiliated = await baseContracts['AffiliateRegistry'].isValidAffiliate(accounts[0])

      await expect(totlePrimaryInstance.methods.performRebalance(
        [
          [
            isSell,
            rigoTokenAddress,
            tokenAmount,
            optionalTrade,
            minimumExchangeRate, // check on value
            minimumAcceptableTokenAmount,
            [
                [
                  zeroExHandlerAddress,
                  encodedOrder
                ]
            ]
          ]
        ],
        feeAccount,
        tradeId
      ).send({ ...transactionDefault })
      ).rejects.toThrowErrorMatchingSnapshot()
    }, 9999)
  })
})
