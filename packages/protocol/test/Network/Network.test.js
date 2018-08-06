import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { fromMicro, fromWei, toBigNumber } from '../utils'
i//mport vaultArtifact from '../../artifacts/Vault.json'
import web3 from '../web3'

const contractName = 'Network'

describeContract(contractName, () => {
  /*const groupRatio = 5
  const minimumRigo = 50
  const vaultPrice = 1e18
  const inflationFactor = 2
  let vaultId
  let vaultAddress
  let vaultSupply
  let group
  let transactionDefault*/

  describe.skip('getPoolPrices', () => {
    // atm only works if there are no pools created, needs fix
    it('returns the total vaultSupply and price for each fund', async () => {
      const prices = await baseContracts[contractName].getPoolPrices()
      console.log(prices)
    })
  })

  describe.skip('calcNetworkValue', () => {
    // moved from pop, need to refactor test
    it('calculates the total network vaultSupply and the number of funds', async () => {
      const networkValues = await baseContracts[contractName]
        .calcNetworkValue()
        .then(res => res.map(val => val.toNumber()))
      const networkValue = networkValues.shift()
      const numberOfFunds = networkValues.pop()
      expect(networkValue).toEqual(parseInt(vaultSupply, 10))
      expect(numberOfFunds).toEqual(1)
    })
  })
})
