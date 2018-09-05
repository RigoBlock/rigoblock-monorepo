import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import dragoArtifact from '../../artifacts/Drago.json'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'

import web3 from '../web3'
import { ZeroEx } from '0x.js'

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
    ethfinexAddress = await baseContracts['ExchangeEfx'].address
    ethfinexAdapterAddress = await baseContracts[
      'ExchangesAuthority'
    ].getExchangeAdapter(ethfinexAddress)
    await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
  })

  describe('operateOnExchange', () => {
    it('logs an order signature for input data', async () => {

      const EXCHANGE_ADDRESS = baseContracts['ExchangeEfx'].address

      const maker = '0x2f3ae8c5e7321688999883fd4f569e928d81d68f' // a drago
      const taker = '0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3' // base account with GRG and ETH balance
      const feeRecipient = ZeroEx.NULL_ADDRESS
      const makerTokenAddress = '0xacfb4c79259e3c2c1bf054f136e6d75f7cc2b07e' // GRGW
      const takerTokenAddress = '0x06da2eb72279c1cec53c251bbff4a06fbfb93a5b' // ETHW
      const exchangeContractAddress = '0x1d8643aae25841322ecde826862a9fa922770981'
      const salt = ZeroEx.generatePseudoRandomSalt().toString()
      const makerFee = (new BigNumber(0)).toString()
      const takerFee = (new BigNumber(0)).toString()
      const makerTokenAmount = web3.utils.toWei('0.2')
      const takerTokenAmount = web3.utils.toWei('0.3')
      const expirationUnixTimestampSec = (new BigNumber(Date.now() + 3600000)).toString() // Valid for up to an hour

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

      // sign an order
      const orderHash = await ZeroEx.getOrderHashHex(order)

      // Provider pointing to local TestRPC on default port 8545
      const provider = new Web3.providers.HttpProvider('http://localhost:8545')

      // Instantiate 0x.js instance
      const configs = {
        networkId: 3, // (1-mainnet, 3-ropsten, 4-rinkeby, 42-kovan, 50-testrpc)
      }
      const zeroEx = new ZeroEx(provider, configs)

      // Signing orderHash -> ecSignature
      const signerAddress = accounts[0] //'0xc2b5122381bcddb87e75fab2e46a70e7c19b69d3' must include pkey

      const shouldAddPersonalMessagePrefix = false;
      const ecSignature = await zeroEx.signOrderHashAsync(orderHash, signerAddress, shouldAddPersonalMessagePrefix)

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
      const shouldThrowOnInsufficientBalanceOrAllowance = true // if set to 0 the transaction stops and does not throw and error

      const v = (new BigNumber(ecSignature.v)).toString()
      const r = ecSignature.r
      const s = ecSignature.s

      const isValidSignature = await baseContracts['ExchangeEfx'].isValidSignature(
        maker,
        orderHash,
        v,
        r,
        s
      )
      expect(isValidSignature).toEqual(false) // it is signed on a different network then ganace local instance
    })
  })
})
