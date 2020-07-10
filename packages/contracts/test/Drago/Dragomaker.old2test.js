import {
  BigNumber,
  assetDataUtils,
  generatePseudoRandomSalt,
  orderHashUtils,
  signatureUtils
} from '0x.js'
import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { SignatureType } from '@0x/types'
import dragoArtifact from '../../artifacts/Drago.json'
import exchangeArtifact from '../../artifacts/Exchange.json'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let exchangeAddress
  //let exchangeInstance
  let transactionDefault
  let ethfinexHotWalletAddress
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
    ethfinexAdapterAddress = await baseContracts['AEthfinex'].address
    await baseContracts['ExchangesAuthority'].setExchangeAdapter(
      ethfinexHotWalletAddress,
      ethfinexAdapterAddress
    ) // required to validate signatures
    await baseContracts['ExchangesAuthority'].whitelistExchange(
      ethfinexHotWalletAddress,
      true
    ) // required to wrap/unwrap
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
  })

  describe.skip('operateOnExchange', () => {
    it('runs slow - swaps ETH from a drago to an account and GRG from account to drago', async () => {
      // adds additional ether to the pool to be able to deposit
      const purchaseAmount = web3.utils.toWei('5.1')
      await dragoInstance.methods.buyDrago().send({
        ...transactionDefault,
        value: purchaseAmount
      })

      const ETHtokenAddress = '0x0000000000000000000000000000000000000000' //Ether has address 0x0
      const ETHtokenWrapper = await baseContracts['WrapperLockEth'].address
      const toBeWrapped = web3.utils.toWei('1.51') //web3.utils.toWei('1.1') //1e16 is 10 finney
      const lockupTime = 24 // 24 hours lockup (the minimum)
      const isOld = 0 // is a standard ERC20

      await baseContracts['ExchangesAuthority'].whitelistWrapper(
        ETHtokenWrapper,
        true
      )
      await baseContracts['ExchangesAuthority'].whitelistTokenOnWrapper(
        ETHtokenAddress,
        ETHtokenWrapper,
        true
      )
      const methodInterface = {
        name: 'wrapToEfx',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'token'
          },
          {
            type: 'address',
            name: 'wrapper'
          },
          {
            type: 'uint256',
            name: 'value'
          },
          {
            type: 'uint256',
            name: 'forTime'
          },
          {
            type: 'bool',
            name: 'erc20Old'
          }
        ]
      }
      const assembledTransaction = await web3.eth.abi.encodeFunctionCall(
        methodInterface,
        [ETHtokenAddress, ETHtokenWrapper, toBeWrapped, lockupTime, isOld]
      )
      const methodSignature = await web3.eth.abi.encodeFunctionSignature(
        methodInterface
      )
      await baseContracts['ExchangesAuthority'].whitelistMethod(
        methodSignature,
        ethfinexAdapterAddress,
        true
      ) // byte4(keccak256(method))

      await dragoInstance.methods
        .operateOnExchange(ethfinexHotWalletAddress, [assembledTransaction])
        .send({ ...transactionDefault })

      // Check ETH wrapped balance is correct
      await baseContracts['WrapperLockEth'].balanceOf(dragoAddress)

      // wrap some GRG from the user account, so that the user can sell GRG buy ETH
      const GRGtokenWrapper = await baseContracts['WrapperLock'].address
      const GRGtoBeWrapped = web3.utils.toWei('2')
      await baseContracts['RigoToken'].approve(GRGtokenWrapper, GRGtoBeWrapped)
      await baseContracts['WrapperLock'].deposit(GRGtoBeWrapped, lockupTime)

      const makerAddress = dragoAddress
      const takerAddress = '0x0000000000000000000000000000000000000000'
      const senderAddress = '0x0000000000000000000000000000000000000000' // in real environment, sender is ethfinexHotWalletAddress
      const feeRecipientAddress = '0x0000000000000000000000000000000000000000' // in real environment, fee receipient is ethfinexHotWalletAddress
      const makerAssetData = assetDataUtils.encodeERC20AssetData(
        ETHtokenWrapper.toString()
      )
      const takerAssetData = assetDataUtils.encodeERC20AssetData(
        GRGtokenWrapper.toString()
      )
      // exchangeAddress
      const salt = generatePseudoRandomSalt().toString()
      const makerFee = new BigNumber(0).toString()
      const takerFee = new BigNumber(0).toString()
      const makerAssetAmount = web3.utils.toWei('0.2').toString()
      const takerAssetAmount = web3.utils.toWei('0.3').toString()
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

      const signerAddress = await dragoInstance.methods.owner().call()

      // be careful! signature can only be verified against signatureUtils.isValidSignature
      // when signing a hash through ecSignHashAsync
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

      // signature validation
      const isValidSignature = await signatureUtils.isValidWalletSignatureAsync(
        providerEngine,
        signedOrderHashHex,
        signedOrderSignature,
        dragoAddress
      )
      expect(isValidSignature).toBe(true)

      /*
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
      */

      // in order to move wrapped tokens, either the from or to address must be signer
      const isETHWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      const isGRGWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      expect(isETHWSigner || isGRGWSigner).toEqual(true)

      // accounts[0] takes the order, sells GRG
      /*
      const transactionDetails = {
        from: accounts[0],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      */
      const takerAssetFillAmount = (takerAssetAmount / 2).toString() // partial fill
      /*
      const fillOrder = await exchangeInstance.methods
        .fillOrder(aggregatedOrder, takerAssetFillAmount, signedOrderSignature)
        .send({ ...transactionDefault })
        */
      const secondaryGRGbalance = await baseContracts['WrapperLock'].balanceOf(
        dragoAddress
      )
      expect(secondaryGRGbalance.toString()).toEqual(takerAssetFillAmount) // expect drago to hold amount GRGW
    })
  })
})
