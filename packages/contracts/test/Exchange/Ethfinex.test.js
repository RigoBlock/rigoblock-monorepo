import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
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
import exchangeArtifact from '../../artifacts/Exchange.json'
import wrapperLockEthArtifact from '../../artifacts/WrapperLockEth.json'
import moment from 'moment'
import web3 from '../web3'

const contractName = 'Exchange'

describeContract(contractName, () => {
  let exchangeAddress
  let exchangeInstance
  let transactionDefault
  let ethfinexHotWalletAddress
  let ethfinexAdapterAddress

  beforeAll(async () => {
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
    ethfinexHotWalletAddress = accounts[0] // can try with different accounts
  })

  describe('fillOrder', () => {
    it('swaps ETHW to GRGW from account 1 to account 0', async () => {
      const grgWrapperAddress = await baseContracts['WrapperLock'].address
      const ethWrapperAddress = await baseContracts['WrapperLockEth'].address
      const toBeWrapped = web3.utils.toWei('1.51')
      const lockupTime = 24 // 24 hours lockup (minimum 1 = 1 hour)
      const isOld = 0 // standard ERC20

      const transactionDetails = {
        from: accounts[1],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      const wrapperLockEthInstance = new web3.eth.Contract(
        wrapperLockEthArtifact.networks[GANACHE_NETWORK_ID].abi,
        ethWrapperAddress
      )
      await wrapperLockEthInstance.methods.deposit(
        toBeWrapped,
        lockupTime
      ).send({
        ...transactionDetails,
        value: toBeWrapped
      })

      // wrap some GRG from the user account, so that the user can sell GRG buy ETH
      const grgAmount = web3.utils.toWei('2')
      await baseContracts['RigoToken'].approve(grgWrapperAddress, grgAmount)
      await baseContracts['WrapperLock'].deposit(grgAmount, lockupTime)

      const makerAddress = accounts[1]
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000' // in real environment, sender is ethfinexHotWalletAddress
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000' // in real environment, fee receipient is ethfinexHotWalletAddress
      const makerAssetData = assetDataUtils.encodeERC20AssetData(ethWrapperAddress.toString())
      const takerAssetData = assetDataUtils.encodeERC20AssetData(grgWrapperAddress.toString())
      // exchangeAddress
      const salt = generatePseudoRandomSalt().toString()
      const makerFee = new BigNumber(0).toString()
      const takerFee = new BigNumber(0).toString()
      const makerAssetAmount = web3.utils.toWei('0.3').toString()
      const takerAssetAmount = web3.utils.toWei('0.2').toString()
      const expirationTimeSeconds = new BigNumber(
        Date.now() + 3600000 * 24
      ).toString() // Valid for up to an 24 hours

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
      const signerAddress = accounts[1]

      const signedOrder = await signatureUtils.ecSignOrderAsync(
        providerEngine,
        order,
        signerAddress
      )
      const signedOrderHashHex = await orderHashUtils.getOrderHashHex(signedOrder)

      // signature validation
      await signatureUtils.isValidSignatureAsync(
          providerEngine,
          signedOrderHashHex,
          signedOrder.signature,
          signerAddress
      )

      const aggregatedOrder = [
        makerAddress,takerAddress,feeRecipientAddress,senderAddress,
        makerAssetAmount,takerAssetAmount,makerFee,takerFee,expirationTimeSeconds,salt,
        makerAssetData,takerAssetData
      ]

      // in order to move wrapped tokens, either the from or to address must be signer
      const isETHWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      const isGRGWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      expect(isETHWSigner || isGRGWSigner).toEqual(true)

      const takerAssetFillAmount = takerAssetAmount
      const fillOrder = await exchangeInstance.methods.fillOrder(
        aggregatedOrder,
        takerAssetFillAmount,
        signedOrder.signature
      ).send({ ...transactionDefault })
      const secondaryGRGbalance = await baseContracts['WrapperLock'].balanceOf(accounts[1])
      expect(secondaryGRGbalance.toString()).toEqual(takerAssetFillAmount)
    })
  })
})
