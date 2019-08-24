import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { fromMicro, fromWei, toBigNumber } from '../utils'
import dragoArtifact from '../../artifacts/Drago.json'
import web3 from '../web3'

const contractName = 'ProofOfPerformance'

describeContract(contractName, () => {
  // note on factors, with > 20 inflation factor, < 9530 gourpRatio, otherwise fail
  // TODO: check whether require minimum inflation Factor > k or use bigger multiplers in pop
  const groupRatio = 5000 // between 1 and 10000 (stay below 9530)
  const minimumRigo = 50
  const dragoPrice = 1e18
  const inflationFactor = 20
  let dragoId
  let dragoAddress
  let dragoSupply
  let dragoInstance
  let group
  let transactionDefault

  beforeAll(async () => {
    group = await baseContracts['DragoFactory'].address
    // setting inflation factor to later gather the data with getPoolData
    await baseContracts['Inflation'].setInflationFactor(group, inflationFactor)
    // creating drago to test functions
    await baseContracts['DragoFactory'].createDrago('dragotester', 'DTS')
    const dragoData = await baseContracts['DragoRegistry'].fromName('dragotester')
    const [id, address] = dragoData
    dragoId = id
    dragoAddress = address
    dragoInstance = new web3.eth.Contract(
      dragoArtifact.networks[GANACHE_NETWORK_ID].abi,
      dragoAddress
    )
    dragoSupply = web3.utils.toWei('2')
    transactionDefault = {
      from: accounts[1],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    await dragoInstance.methods.buyDrago().send({
      ...transactionDefault,
      value: dragoSupply
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
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setRigoblockDao', () => {
    afterAll(async () => {
      await baseContracts[contractName].setRigoblockDao.sendTransactionAsync(
        accounts[0],
        transactionDefault
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
            ...transactionDefault,
            from: accounts[0]
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
      const poolData = await baseContracts[contractName].getPoolData(dragoId)
      const ratio = poolData[7]
      expect(ratio).toEqual(toBigNumber(groupRatio))
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setRatio.sendTransactionAsync(
          group,
          groupRatio,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('claimPop', () => {
    it("claims the token reward for the fund's wizard", async () => {
      const txHash = await baseContracts[contractName].claimPop(dragoId)
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

  describe('proofOfPerformance', () => {
    it("returns the value of pop and performance reward with null performance", async () => {
      const popData = await baseContracts[contractName].proofOfPerformance(dragoId)
      const [pop, perfRew] = popData
      expect(perfRew).toEqual(toBigNumber(0))
    })
    it("returns an error with negative performance", async () => {
      const sellPrice = web3.utils.toWei('0.8')
      const buyPrice = web3.utils.toWei('0.9')
      const block = 1
      const hash = web3.utils.fromAscii('random')
      const data = web3.utils.fromAscii('random')
      const transactionDetails = {
        from: accounts[0],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      // only owner can set prices
      await dragoInstance.methods.setPrices(sellPrice, buyPrice, block, hash, data).send({
        ...transactionDetails
      })
      await expect(
        baseContracts[contractName].proofOfPerformance(dragoId)
      ).rejects.toThrowErrorMatchingSnapshot()

      // set prices to original state, as otherwise get pool data test will fail
      const initialSellPrice = web3.utils.toWei('1')
      const initialBuyPrice = web3.utils.toWei('1')
      await dragoInstance.methods.setPrices(initialSellPrice, initialBuyPrice, block, hash, data).send({
        ...transactionDetails
      })
    })
    it("returns the value of pop and performance rewards price over HWM", async () => {
      const sellPrice = web3.utils.toWei('1.15')
      const buyPrice = web3.utils.toWei('1.16')
      const block = 1
      const hash = web3.utils.fromAscii('random')
      const data = web3.utils.fromAscii('random')
      const transactionDetails = {
        from: accounts[0],
        gas: GAS_ESTIMATE,
        gasPrice: 1
      }
      await dragoInstance.methods.setPrices(sellPrice, buyPrice, block, hash, data).send({
        ...transactionDetails
      })
      const popData = await baseContracts[contractName].proofOfPerformance(dragoId)
      const [pop, perfRew] = popData
      const grgTotalSupply = await baseContracts['RigoToken'].totalSupply()
      const maxPop = grgTotalSupply / 10000 // max 0.01% of total supply
      expect(Number(pop)).toBeGreaterThan(Number(perfRew) || Number(pop).toEqual(Number(maxPop)))
      const initialSellPrice = web3.utils.toWei('1')
      const initialBuyPrice = web3.utils.toWei('1')
      await dragoInstance.methods.setPrices(initialSellPrice, initialBuyPrice, block, hash, data).send({
        ...transactionDetails
      })
    })
  })

  describe('getPoolData', () => {
    it('gets the pool data being given a pool Id', async () => {
      await baseContracts[contractName].setRatio(group, 2)
      const poolData = await baseContracts[contractName].getPoolData(dragoId)
      const [
        active,
        address,
        dragoGroup,
        price,
        supply,
        value,
        epochReward,
        ratio,
        pop
      ] = poolData
      expect(active).toBe(true)
      expect(address).toBe(dragoAddress)
      expect(dragoGroup).toBe(group)
      expect(fromMicro(supply)).toEqual(fromWei(dragoSupply))
      expect(ratio).toEqual(toBigNumber(2))
      expect(value).toEqual(toBigNumber(dragoSupply))
      expect(price.toNumber()).toEqual(dragoPrice)
      expect(epochReward).toEqual(toBigNumber(inflationFactor))
      expect(pop)
    })
  })

  describe('getHwm', () => {
    it('returns the high water mark of the fund', async () => {
      const highWatermark = await baseContracts[contractName].getHwm(dragoId)
      expect(highWatermark).toEqual(toBigNumber(dragoPrice))
    })
  })
})
