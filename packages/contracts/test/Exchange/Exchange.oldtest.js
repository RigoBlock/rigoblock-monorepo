//import { BigNumber, assetDataUtils, generatePseudoRandomSalt } from '0x.js'
import { GANACHE_NETWORK_ID } from '../../constants'
import exchangeArtifact from '../../artifacts/Exchange.json'
import web3 from '../web3'

const contractName = 'Exchange'

describeContract(contractName, () => {
  let exchangeAddress

  beforeAll(async () => {
    exchangeAddress = await baseContracts['Exchange'].address
    exchangeInstance = new web3.eth.Contract(
      exchangeArtifact.networks[GANACHE_NETWORK_ID].abi,
      exchangeAddress
    )
  })

  describe.skip('fillOrder', () => {
    it('swaps GRG from account[0] to accounts[1]', async () => {
      /*
      const rigoTokenAddress = await baseContracts['RigoToken'].address
      const wethContracAddress = await baseContracts['WETH9'].address


      const makerAddress = accounts[0]
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000'
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000'
      const makerAssetData = assetDataUtils.encodeERC20AssetData(
        rigoTokenAddress
      )
      const takerAssetData = assetDataUtils.encodeERC20AssetData(
        wethContracAddress
      )
      //const exchangeAddress = exchangeAddress //'0x1d8643aae25841322ecde826862a9fa922770981'
      const salt = generatePseudoRandomSalt().toString()
      const makerFee = new BigNumber(0).toString()
      const takerFee = new BigNumber(0).toString()
      */
      const makerAssetAmount = web3.utils.toWei('0.3').toString() // test with equal amounts (prev 0.2)
      const takerAssetAmount = web3.utils.toWei('0.3').toString()
      /*
      const expirationTimeSeconds = new BigNumber(
        Date.now() + 3600000
      ).toString() // Valid for up to an hour
      */

      // wrap eth and set allowances
      const erc20Proxy = await baseContracts['Erc20Proxy'].address // can also be queried from exchange with proxy id (from tokenData)

      // default account transaction
      await baseContracts['RigoToken'].approve(erc20Proxy, makerAssetAmount)

      // secondary account transaction
      await baseContracts['WETH9'].deposit({
        value: takerAssetAmount,
        from: accounts[1]
      })

      await baseContracts['WETH9'].approve(erc20Proxy, takerAssetAmount, {
        from: accounts[1]
      })

      /*
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
      */

      /*
      const signedOrder = await signatureUtils.ecSignOrderAsync(
        providerEngine,
        order,
        signerAddress
      )

      const aggregatedOrder = [
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
        takerAssetData
      ]

      // accounts[1] takes the order, purchases GRG
      const transactionDetails = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      */
      const takerAssetFillAmount = (takerAssetAmount / 2).toString() // partial fill
      const secondaryGRGbalance = await baseContracts['RigoToken'].balanceOf(
        accounts[1]
      )
      expect(secondaryGRGbalance.toString()).toEqual(takerAssetFillAmount)
    })
  })
})
