import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import web3 from '../web3'

const contractName = 'WETH9'

describeContract(contractName, () => {
  let transactionDefault

  beforeAll(async () => {
    transactionDefault = {
      from: accounts[0],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
  })

  describe('deposit', () => {
    it('wraps some ETH', async () => {
      // wrap eth and send to mock handler
      const ethToWrap = 48333317481
      await baseContracts['WETH9'].deposit({
        value: ethToWrap,
        from: accounts[0]
      })
      await baseContracts['WETH9'].transfer(
        accounts[1],
        48333317481
      )
      const secondaryBalance = await baseContracts['WETH9'].balanceOf(accounts[1])
      expect(secondaryBalance.toString()).toEqual(ethToWrap.toString())
    })
  })
})
