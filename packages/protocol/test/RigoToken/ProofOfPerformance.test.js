const contractName = 'ProofOfPerformance'
const vaultArtifact = require('../../artifacts/Vault.json')

import { GAS_ESTIMATE } from '../../constants'

describeContract(contractName, () => {
  const groupRatio = 5
  const minimumRigo = 50
  const vaultPrice = 1e18
  const inflationFactor = 2
  let vaultId
  let vaultAddress
  let vaultSupply
  let group

  beforeAll(async () => {
    group = baseContracts['VaultFactory'].address
    // claimPop function requires the minting address to be the Inflation contract
    await baseContracts['RigoToken'].changeMintingAddress(
      baseContracts['Inflation'].address
    )
    // setting inflation factor to later gather the data with getPoolData
    await baseContracts['Inflation'].setInflationFactor(group, inflationFactor)
    // creating vault to test functions
    await baseContracts['VaultFactory'].createVault('test vault', 'VLT')
    const vaultData = await baseContracts['DragoRegistry'].fromSymbol('VLT')
    const [id, address] = vaultData
    vaultId = id
    vaultAddress = address
    const vaultInstance = new web3.eth.Contract(
      vaultArtifact.networks[networkId].abi,
      vaultAddress
    )
    vaultSupply = web3.utils.toWei('2')
    await vaultInstance.methods.buyVault().send({
      from: accounts[1],
      value: vaultSupply,
      gas: GAS_ESTIMATE,
      gasPrice: 1
    })
  })

  describe('setRegistry', () => {
    afterAll(async () => {
      // reset the registry
      await baseContracts[contractName].setRegistry(
        baseContracts['DragoRegistry'].address
      )
    })
    it('changes the registry address', async () => {
      const fakeRegistry = '0x7ce6e371085cb611fb46d5065397223ef2f000ff'
      await baseContracts[contractName].setRegistry(fakeRegistry)
      const newRegistry = await baseContracts[contractName].dragoRegistry()
      expect(newRegistry).toEqual(fakeRegistry)
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setRegistry.sendTransactionAsync(
          baseContracts['DragoRegistry'].address,
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setRigoblockDao', () => {
    afterAll(async () => {
      await baseContracts[contractName].setRigoblockDao.sendTransactionAsync(
        accounts[0],
        {
          from: accounts[1],
          gas: GAS_ESTIMATE,
          gasPrice: 1
        }
      )
    })
    it('changes the dao address', async () => {
      await baseContracts[contractName].setRigoblockDao(accounts[1])
      const newDao = await baseContracts[contractName].rigoblockDao()
      expect(newDao).toEqual(accounts[1])
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setRigoblockDao.sendTransactionAsync(
          accounts[0],
          {
            // non DAO account
            from: accounts[0],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setRatio', () => {
    // perhaps we need a clearer description
    it('sets the groupRatio between asset and performance reward for given group', async () => {
      const txHash = await baseContracts[contractName].setRatio(
        group,
        groupRatio
      )
      expect(txHash).toBeHash()
      const poolData = await baseContracts[contractName].getPoolData(vaultId)
      const ratio = poolData[7]
      expect(ratio).toEqual(toBigNumber(groupRatio))
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setRatio.sendTransactionAsync(
          group,
          groupRatio,
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setMinimumRigo', () => {
    it('sets the minimum rigo token amount needed to perform certain actions', async () => {
      await baseContracts[contractName].setMinimumRigo(minimumRigo)
      const newMinimum = await baseContracts[contractName].minimumRigo()
      expect(newMinimum).toEqual(toBigNumber(minimumRigo))
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setMinimumRigo.sendTransactionAsync(
          minimumRigo,
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('claimPop', () => {
    it("claims the token reward for the fund's wizard", async () => {
      const txHash = await baseContracts[contractName].claimPop(vaultId)
      expect(txHash).toBeHash()
      // claimPop calls the mintInflation method from Inflation.sol,
      // which emits two RigoToken 'TokenMinted' event, one for the DAO
      // and one for the fund wizard
      const mintEvent = baseContracts['RigoToken'].TokenMinted()
      const eventsPromise = new Promise((resolve, reject) => {
        mintEvent.get(
          (err, data) => (err ? reject(new Error(err)) : resolve(data))
        )
      })
      const events = await eventsPromise
      expect(events.length).toEqual(2)
      // events emitted correctly. TODO: understand what value the reward
      // should be equal to
    })
  })

  describe('getPoolData', () => {
    it('gets the pool data being given a pool Id', async () => {
      await baseContracts[contractName].setRatio(group, 2)
      const poolData = await baseContracts[contractName].getPoolData(vaultId)
      const [
        active,
        address,
        vaultGroup,
        price,
        supply,
        value,
        epochReward,
        ratio,
        pop
      ] = poolData
      expect(active).toBe(true)
      expect(address).toBe(vaultAddress)
      expect(vaultGroup).toBe(group)
      expect(fromMicro(supply)).toEqual(fromWei(vaultSupply))
      expect(ratio).toEqual(toBigNumber(2))
      expect(value).toEqual(toBigNumber(vaultSupply))
      expect(price.toNumber()).toEqual(vaultPrice)
      expect(epochReward).toEqual(toBigNumber(inflationFactor))
      // what should this be equal to?
      expect(pop)
    })
  })

  describe('getHwm', () => {
    it('returns the high water mark of the fund', async () => {
      const highWatermark = await baseContracts[contractName].getHwm(vaultId)
      expect(highWatermark).toEqual(toBigNumber(vaultPrice))
    })
  })

  describe.skip('getPoolPrices', () => {
    // atm only works if there are no pools created, needs fix
    it('returns the total vaultSupply and price for each fund', async () => {
      const prices = await baseContracts[contractName].getPoolPrices()
      console.log(prices)
    })
  })

  describe('calcNetworkValue', () => {
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
