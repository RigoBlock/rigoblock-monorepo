import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { fromMicro, fromWei, toBigNumber } from '../utils'
import aEthfinexArtifact from '../../artifacts/AEthfinex.json'
import { BigNumber } from 'bignumber.js'

import web3 from '../web3'

const contractName = 'AEthfinex'

describeContract(contractName, () => {
  let aEthfinexAddress
  let aEthfinexInstance
  let transactionDefault
  let GRGtokenAddress
  let whitelister

  beforeAll(async () => {
    aEthfinexAddress = baseContracts['AEthfinex'].address
    aEthfinexInstance = new web3.eth.Contract(
      aEthfinexArtifact.networks[GANACHE_NETWORK_ID].abi,
      aEthfinexAddress
    )
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    GRGtokenAddress = await baseContracts['RigoToken'].address
    whitelister = await baseContracts['Authority'].setWhitelister(accounts[0], true)
  })

  describe('wrapToEfx', () => {
    // this works only with wrapToEfx payable and public
    it('wraps eth to the efx wrapper', async () => {
      const balance = await web3.eth.getBalance(accounts[0])
      const tokenAddress = null //Ether has address 0x0
      const tokenWrapper = await baseContracts['WrapperLockEth'].address
      const toBeWrapped = 1e16 // 10 finney
      const time = 1 // 1 hour lockup (the minimum)
      // only whitelisters can whitelist exchanges
      await baseContracts['ExchangesAuthority'].setWhitelister(accounts[0], true)
      await baseContracts['ExchangesAuthority'].whitelistWrapper(tokenWrapper, true)
      await baseContracts['ExchangesAuthority'].whitelistAssetOnExchange(
        tokenAddress,
        tokenWrapper,
        true
      )
      await aEthfinexInstance.methods
        .wrapToEfx(
          tokenAddress,
          tokenWrapper,
          toBeWrapped,
          time
        ).send({
          ...transactionDefault,
          value: toBeWrapped
        })
      const wethBalance = await baseContracts['WrapperLockEth'].balanceOf(aEthfinexAddress)
      // if a deposit is repeated, weth balance will be equal to the sum of depositAmouns
      expect(wethBalance.toString()).toEqual(toBeWrapped.toString())
    })
  })
})
