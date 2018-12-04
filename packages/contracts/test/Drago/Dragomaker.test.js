import { BigNumber } from 'bignumber.js'
import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { ZeroEx } from '0x.js'
import dragoArtifact from '../../artifacts/Drago.json'
import moment from 'moment'
import web3 from '../web3'

const contractName = 'Drago'

describeContract(contractName, () => {
  let dragoAddress
  let dragoInstance
  let transactionDefault
  let ethfinexAddress
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
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    ethfinexAddress = baseContracts['ExchangeEfx'].address
    ethfinexAdapterAddress = await baseContracts[
      'ExchangesAuthority'
    ].getExchangeAdapter(ethfinexAddress)
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
  })

  describe('operateOnExchange', () => {
    it('swaps ETH from a drago to an account and GRG from account to drago', async () => {
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
        .operateOnExchange(ethfinexAddress, [assembledTransaction])
        .send({ ...transactionDefault })

      // Check ETH wrapped balance is correct
      const wrappedTokensAmount = await baseContracts[
        'WrapperLockEth'
      ].balanceOf(dragoAddress)
      expect(wrappedTokensAmount.toString()).toEqual(toBeWrapped.toString())

      // Check ETH wrapped time is correct
      const wrappedTokensTime = await baseContracts[
        'WrapperLockEth'
      ].depositLock(dragoAddress)
      const now = moment()
      now.add(23, 'hours')
      expect(Number(wrappedTokensTime.toFixed())).toBeGreaterThan(now.unix())
      now.add(2, 'hours')
      expect(Number(wrappedTokensTime.toFixed())).toBeLessThan(now.unix())

      // wrap some GRG from the user account, so that the user can sell GRG buy ETH
      const GRGtokenWrapper = await baseContracts['WrapperLock'].address
      const GRGtoBeWrapped = web3.utils.toWei('2')
      await baseContracts['RigoToken'].approve(GRGtokenWrapper, GRGtoBeWrapped)
      await baseContracts['WrapperLock'].deposit(GRGtoBeWrapped, lockupTime)

      const EXCHANGE_ADDRESS = baseContracts['ExchangeEfx'].address
      const maker = dragoAddress
      const taker = accounts[0] // ZeroEx.NULL_ADDRESS
      const feeRecipient = ZeroEx.NULL_ADDRESS
      const makerTokenAddress = ETHtokenWrapper.toString()
      const takerTokenAddress = GRGtokenWrapper.toString()
      const exchangeContractAddress = EXCHANGE_ADDRESS
      const salt = ZeroEx.generatePseudoRandomSalt().toString()
      const makerFee = new BigNumber(0).toString()
      const takerFee = new BigNumber(0).toString()
      const makerTokenAmount = web3.utils.toWei('0.2')
      const takerTokenAmount = web3.utils.toWei('0.3')
      const expirationUnixTimestampSec = new BigNumber(
        Date.now() + 3600000 * 24
      ).toString() // Valid for up to 24 hours

      // Generate order
      const order = {
        maker: maker,
        taker: taker,
        feeRecipient: feeRecipient,
        makerTokenAddress: makerTokenAddress,
        takerTokenAddress: takerTokenAddress,
        exchangeContractAddress: exchangeContractAddress,
        salt: salt,
        makerFee: makerFee,
        takerFee: takerFee,
        makerTokenAmount: makerTokenAmount,
        takerTokenAmount: takerTokenAmount,
        expirationUnixTimestampSec: expirationUnixTimestampSec
      }

      const orderHash = await ZeroEx.getOrderHashHex(order)
      const provider = web3.currentProvider

      // Instantiate 0x.js instance
      const configs = {
        networkId: 50 // (1-mainnet, 3-ropsten, 4-rinkeby, 42-kovan, 50-testrpc)
      }
      const zeroEx = new ZeroEx(provider, configs)

      // Signing orderHash -> ecSignature
      const signerAddress = await dragoInstance.methods.owner().call()

      const shouldAddPersonalMessagePrefix = false
      const ecSignature = await zeroEx.signOrderHashAsync(
        orderHash,
        signerAddress,
        shouldAddPersonalMessagePrefix
      )

      const orderAddresses = [
        maker,
        taker,
        makerTokenAddress,
        takerTokenAddress,
        feeRecipient
      ]
      const orderValues = [
        makerTokenAmount,
        takerTokenAmount,
        makerFee,
        takerFee,
        expirationUnixTimestampSec,
        salt
      ]

      const fillTakerTokenAmount = web3.utils.toWei('0.15')
      const shouldThrowOnInsufficientBalanceOrAllowance = false // if set to 0 the transaction stops and does not throw and error

      const v = new BigNumber(ecSignature.v).toString()
      const r = ecSignature.r
      const s = ecSignature.s

      await baseContracts['ExchangeEfx'].isValidSignature(
        signerAddress,
        orderHash,
        v,
        r,
        s
      )

      // in order to move wrapped tokens, either the from or to address must be signer
      const isETHWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      const isGRGWSigner = await baseContracts['WrapperLockEth'].isSigner(
        accounts[0]
      )
      expect(isETHWSigner || isGRGWSigner).toEqual(true)

      const txHash = await baseContracts[
        'ExchangeEfx'
      ].fillOrder.sendTransactionAsync(
        orderAddresses,
        orderValues,
        fillTakerTokenAmount,
        shouldThrowOnInsufficientBalanceOrAllowance,
        v,
        r,
        s,
        transactionDefault
      )
      expect(txHash).toBeHash()
    })
  })
})
