import {
  BigNumber,
  generatePseudoRandomSalt,
  orderHashUtils,
  signatureUtils
} from '0x.js'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  describe.skip('operateOnExchange', () => {
    it('logs an order signature for input data', async () => {
      const makerAddress = '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3' // base account with GRG and ETH balance
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000' // ZeroEx.NULL_ADDRESS
      const makerAssetData = '0xacfb4c79259e3c2c1bf054f136e6d75f7cc2b07e' // GRGW // TODO: double check format
      const takerAssetData = '0x06da2eb72279c1cec53c251bbff4a06fbfb93a5b' // ETHW // TODO: double check format
      const exchangeAddress = '0x1d8643aae25841322ecde826862a9fa922770981'
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

      const orderHash = await orderHashUtils.getOrderHashHex(order)
      const provider = web3.currentProvider

      // Instantiate 0x.js instance
      /*
      const configs = {
        networkId: 50 // (1-mainnet, 3-ropsten, 4-rinkeby, 42-kovan, 50-testrpc)
      }
      const zeroEx = new ZeroEx(provider, configs)
      */

      // Signing orderHash -> ecSignature
      const signerAddress = accounts[0] //'0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3' must include pkey

      const ecSignature = await signatureUtils.ecSignHashAsync(
        provider,
        orderHash,
        signerAddress
      )

      //const v = new BigNumber(ecSignature.v).toString()
      //const r = ecSignature.r
      //const s = ecSignature.s

      const signature = ecSignature

      await signatureUtils.convertToSignatureWithType(signature, 'EthSign')
      const data = orderHash

      // check against 0x api
      const isValidSignature = await signatureUtils.isValidSignatureAsync(
        provider,
        data,
        signature, // by default checks against EthSign
        signerAddress
      )
      expect(isValidSignature).toEqual(true) // checks the signature on provider
    })
  })
})
