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
import { ECSignature, SignatureType, SignedOrder, ValidatorSignature } from '@0x/types'
import web3 from '../web3'

jest.setTimeout(30000);

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

  describe('performSwapCollection', () => {
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

      const tradeId = '0xfa39c1a29cab1aa241b62c2fd067a6602a9893c2afe09aaea371609e11cbd92d' // mock id bytes32
      //const isSell = false // buying a token from the secondary account -> isSell = false
      //const optionalTrade = false
      const tokenAmount = 10000 // takerAssetAmount
      const minimumExchangeRate = 1 // Allowable Price Change (%)
      const minimumAcceptableTokenAmount = 10000 // Minimum Token Fill Quantity(%)

      // accounts[1] takes the order, purchases GRG
      const transactionDetails = {
        value: tokenAmount, //takerAssetFillAmount,
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }

      const swaps = [
        [[
          weth9TokenAddress, // address sourceToken
          rigoTokenAddress, // address destinationToken
          tokenAmount, // uint256 amount
          false, //bool isSourceAmount, //true if amount is sourceToken, false if it's destinationToken
          [[
            zeroExHandlerAddress, // address payable exchangeHandler
            encodedOrder // bytes encodedPayload
          ]]
        ]],
        minimumExchangeRate, // uint256 minimumExchangeRate
        minimumAcceptableTokenAmount, // uint256 minimumDestinationAmount
        tokenAmount, // uint256 sourceAmount
        makerFee, // uint256 tradeToTakeFeeFrom (maker fee is 0)
        false, // bool takeFeeFromSource //Takes the fee before the trade if true, takes it after if false
        accounts[1], // address payable redirectAddress
        true // bool required
      ]

      // TODO: fix signature
      const swapsHash = web3.utils.keccak256(swaps, accounts[0], expirationTimeSeconds, tradeId)

      const swapsSignature = await web3.eth.sign(swapsHash, accounts[0])
      const r = signature.slice( 0, 66 )
      const s = `0x${signature.slice( 66, 130 )}`
      const v = '0x27'

      //let v = `0x${signature.slice( 130, 132 )}`
      //v = web3.utils.toDecimal( v )
      //if ( ![ 27, 28 ].includes( v ) ) v += 27

      // if weth, must hold weth and approve tokentransferproxy
      // if eth, must send value together with function
      await expect(totlePrimaryInstance.methods.performSwapCollection(
        [
          [
            swaps
          ],
          accounts[0], // address payable partnerContract
          expirationTimeSeconds, // uint256 expirationBlock
          tradeId, // bytes32 id
          v, //uint8 v
          r, // bytes32 r
          s // bytes32 s
        ]
      ).send({ ...transactionDetails })
      ).rejects.toThrowErrorMatchingSnapshot()
    })
    it.skip('performs a 0x GRG sell order on totle', async () => {
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
      const tokenAmount = (takerAssetAmount / 2).toString() // partial fill, takerAssetFillAmount
      const minimumExchangeRate = 1 // Allowable Price Change (%)
      const minimumAcceptableTokenAmount = 10000 // Minimum Token Fill Quantity(%)

      // if weth, must hold weth and approve tokentransferproxy
      // if eth, must send value together with function
/*
      await expect(totlePrimaryInstance.methods.performSwapCollection(
      [
        [[
          [[
            weth9TokenAddress, // address sourceToken
            rigoTokenAddress, // address destinationToken
            tokenAmount, // uint256 amount
            false, //bool isSourceAmount, //true if amount is sourceToken, false if it's destinationToken
            [[
              zeroExHandlerAddress, // address payable exchangeHandler
              encodedOrder // bytes encodedPayload
            ]]
          ]],
          minimumExchangeRate, // uint256 minimumExchangeRate
          minimumAcceptableTokenAmount, // uint256 minimumDestinationAmount
          tokenAmount, // uint256 sourceAmount
          makerFee, // uint256 tradeToTakeFeeFrom (maker fee is 0)
          false, // bool takeFeeFromSource //Takes the fee before the trade if true, takes it after if false
          accounts[1], // address payable redirectAddress
          true // bool required
        ]],
        accounts[0], // address payable partnerContract
        expirationTimeSeconds, // uint256 expirationBlock
        tradeId, // bytes32 id
        v, //uint8 v
        r, // bytes32 r
        s // bytes32 s
      ]
      ).send({ ...transactionDetails })
      ).rejects.toThrowErrorMatchingSnapshot()
*/
    })
  })
})
