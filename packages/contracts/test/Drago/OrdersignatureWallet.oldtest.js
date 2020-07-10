import {
  BigNumber,
  generatePseudoRandomSalt,
  orderHashUtils,
  signatureUtils
} from '0x.js'
import { GANACHE_NETWORK_ID } from '../../constants'
import { SignatureType } from '@0x/types'
import dragoArtifact from '../../artifacts/Drago.json'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoAddress
  //let transactionDefault
  let exchangeAddress
  //let hotWalletAddress
  let ethfinexAdapterAddress

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
    exchangeAddress = await baseContracts['Exchange'].address
    //hotWalletAddress = accounts[0] // hot wallet
    ethfinexAdapterAddress = await baseContracts['AEthfinex'].address
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
  })

  describe.skip('isValidSignature', () => {
    it('rejects order signature for wallet input data if caller not whitelisted', async () => {
      const makerAddress = dragoAddress // '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData =
        '0xf47261b0000000000000000000000000cc64620c47a9cd6aa4a5265b48c85911dfb0005d'
      const takerAssetData =
        '0xf47261b000000000000000000000000002fcb8a7d3eae24dbd0bc67fdb5de13e3ec7cf93'
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
        takerFee
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

      const vrsSignature = await signature.slice(0, -2)
      const typedSignature = await signatureUtils.convertToSignatureWithType(
        vrsSignature,
        SignatureType.Wallet
      )

      // check against 0x api
      await expect(
        signatureUtils.isValidWalletSignatureAsync(
          providerEngine,
          orderHashHex,
          typedSignature,
          dragoAddress
        )
      ).rejects.toThrowErrorMatchingSnapshot() // revert ORIGIN_NOT_WHITELISTED (caller must be hot wallet)
    })
    // hash signature rejected against wallet validation
    it.skip('checks a wallet signature against the exchange', async () => {
      const makerAddress = dragoAddress // '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData =
        '0xf47261b0000000000000000000000000cc64620c47a9cd6aa4a5265b48c85911dfb0005d'
      const takerAssetData =
        '0xf47261b000000000000000000000000002fcb8a7d3eae24dbd0bc67fdb5de13e3ec7cf93'
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
        takerFee
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

      const vrsSignature = await signature.slice(0, -2)
      const typedSignature = await signatureUtils.convertToSignatureWithType(
        vrsSignature,
        SignatureType.Wallet
      )

      //const signedOrder = { ...order, typedSignature }

      await baseContracts['ExchangesAuthority'].setExchangeAdapter(
        accounts[0],
        ethfinexAdapterAddress
      )

      const isValidWalletSignature = await baseContracts[
        'Exchange'
      ].isValidSignature(orderHashHex, dragoAddress, typedSignature)
      expect(isValidWalletSignature).toEqual(true)
    })
    // hash signature rejected against wallet validation
    it.skip('checks an order signature against 0x api', async () => {
      const makerAddress = dragoAddress // '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData =
        '0xf47261b0000000000000000000000000cc64620c47a9cd6aa4a5265b48c85911dfb0005d'
      const takerAssetData =
        '0xf47261b000000000000000000000000002fcb8a7d3eae24dbd0bc67fdb5de13e3ec7cf93'
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
        takerFee
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

      const vrsSignature = await signature.slice(0, -2)
      const walletSignature = await signatureUtils.convertToSignatureWithType(
        vrsSignature,
        SignatureType.Wallet
      )

      //const signedOrder = { ...order, walletSignature }
      await baseContracts['ExchangesAuthority'].setExchangeAdapter(
        accounts[0],
        ethfinexAdapterAddress
      )

      const isValidSignature = await signatureUtils.isValidWalletSignatureAsync(
        providerEngine,
        orderHashHex,
        walletSignature,
        dragoAddress
      )
      expect(isValidSignature).toBe(true)
    }, 9999) // runs slow
    it('confirms valid a signed order signature', async () => {
      const makerAddress = dragoAddress // '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData =
        '0xf47261b0000000000000000000000000cc64620c47a9cd6aa4a5265b48c85911dfb0005d'
      const takerAssetData =
        '0xf47261b000000000000000000000000002fcb8a7d3eae24dbd0bc67fdb5de13e3ec7cf93'
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
        takerFee
      }
      const providerEngine = web3.currentProvider

      // Signing orderHash -> ecSignature
      const signerAddress = accounts[0]

      const signedOrder = await signatureUtils.ecSignOrderAsync(
        providerEngine,
        order,
        signerAddress
      )
      const vrsSignature = await signedOrder.signature.slice(0, -2)
      const signedOrderSignature = await signatureUtils.convertToSignatureWithType(
        vrsSignature,
        SignatureType.Wallet
      )

      const signedOrderHashHex = await orderHashUtils.getOrderHashHex(
        signedOrder
      )

      await baseContracts['ExchangesAuthority'].setExchangeAdapter(
        accounts[0],
        ethfinexAdapterAddress
      )

      const isValidSignature = await signatureUtils.isValidWalletSignatureAsync(
        providerEngine,
        signedOrderHashHex,
        signedOrderSignature,
        dragoAddress
      )
      expect(isValidSignature).toBe(true)
    }, 9999) // runs slow
  })
})
