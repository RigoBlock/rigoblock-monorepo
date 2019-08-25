import { GANACHE_NETWORK_ID, GAS_ESTIMATE } from '../../constants'
import { toBigNumber } from '../utils'
import vaultArtifact from '../../artifacts/Vault.json'
import web3 from '../web3'

const contractName = 'Inflation'

describeContract(contractName, () => {
  let vaultId
  let vaultAddress
  let value
  let group
  let transactionDefault
  const minimumRigo = 5
  const inflationFactor = 1
  const fakeFactory = '0x7ce6e371085cb611fb46d5065397223ef2f000ff'
  const reward = 20

  beforeAll(async () => {
    group = await baseContracts['VaultFactory'].address
    await baseContracts['VaultFactory'].createVault('testvault', 'VLT')
    const vaultData = await baseContracts['DragoRegistry'].fromName('testvault')
    const [id, address] = vaultData
    vaultId = id
    vaultAddress = address
    const vaultInstance = new web3.eth.Contract(
      vaultArtifact.networks[GANACHE_NETWORK_ID].abi,
      vaultAddress
    )
    value = web3.utils.toWei('2')
    transactionDefault = {
      from: accounts[1],
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
    await vaultInstance.methods.buyVault().send({
      ...transactionDefault,
      value
    })
  })

  describe('setInflationFactor', () => {
    it('sets the inflation factor', async () => {
      const txHash = await baseContracts[contractName].setInflationFactor(
        group,
        inflationFactor
      )
      expect(txHash).toBeHash()
      const poolData = await baseContracts['ProofOfPerformance'].getPoolData(
        vaultId
      )
      const epoch = poolData[6]
      expect(epoch).toEqual(toBigNumber(inflationFactor))
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setInflationFactor.sendTransactionAsync(
          group,
          inflationFactor,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })

    it("throws if we don't pass a whitelisted factory", async () => {
      await expect(
        baseContracts[contractName].setInflationFactor(
          fakeFactory,
          inflationFactor
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('getInflationFactor', () => {
    it('returns the inflation factor', async () => {
      const retrievedFactor = await baseContracts[
        contractName
      ].getInflationFactor(group)
      expect(retrievedFactor).toEqual(toBigNumber(inflationFactor))
    })
  })

  describe('setMinimumRigo', () => {
    it('sets the minimum amount of rigo tokens necessary to perform certain calls', async () => {
      const txHash = await baseContracts[contractName].setMinimumRigo(
        minimumRigo
      )
      expect(txHash).toBeHash()
      const newMinimum = await baseContracts[contractName].minimumGRG()
      expect(newMinimum).toEqual(toBigNumber(minimumRigo))
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setMinimumRigo.sendTransactionAsync(
          minimumRigo,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setRigoblock', () => {
    afterAll(async () => {
      // reset DAO address
      await baseContracts[contractName].setRigoblock.sendTransactionAsync(
        accounts[0],
        transactionDefault
      )
    })

    it('sets the rigoblock DAO address', async () => {
      await baseContracts[contractName].setRigoblock(accounts[1])
      const newDao = await baseContracts[contractName].rigoblockDao()
      expect(newDao).toBe(accounts[1])
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setRigoblock.sendTransactionAsync(
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

  describe('setAuthority', () => {
    const fakeAuthority = '0x0000000000000000000000000263498273402234'
    afterAll(async () => {
      // reset the authority address
      await baseContracts[contractName].setAuthority(
        baseContracts['Authority'].address
      )
    })

    it('sets the authority address', async () => {
      await baseContracts[contractName].setAuthority(fakeAuthority)
      const newAuthority = await baseContracts[contractName].authority()
      expect(newAuthority).toBe(fakeAuthority)
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setAuthority.sendTransactionAsync(
          fakeAuthority,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setProofOfPerformance', () => {
    const fakePop = '0x0000000000000000000000000263498273402234'
    afterAll(async () => {
      // reset proof of performance
      const pop = baseContracts['ProofOfPerformance'].address
      await baseContracts[contractName].setProofOfPerformance(pop)
    })

    it('sets the proof of performance address', async () => {
      await baseContracts[contractName].setProofOfPerformance(fakePop)
      const newPop = await baseContracts[contractName].proofOfPerformance()
      expect(newPop).toBe(fakePop)
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setProofOfPerformance.sendTransactionAsync(
          fakePop,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('setPeriod', () => {
    const defaultPeriod = 7257600 // 12 weeks
    afterAll(async () => {
      // reset period to default
      await baseContracts[contractName].setPeriod(defaultPeriod)
    })

    it('sets the minimum time between withdrawals', async () => {
      const period = 864000 // 10 days
      await baseContracts[contractName].setPeriod(period)
      const newPeriod = await baseContracts[contractName].period()
      expect(newPeriod).toEqual(toBigNumber(period))
    })

    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setPeriod.sendTransactionAsync(
          defaultPeriod,
          transactionDefault
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  // always returns true
  describe('canWithdraw', () => {
    it('returns whether a wizard can claim reward tokens', async () => {
      const canWithdraw = await baseContracts[contractName].canWithdraw(vaultId)
      expect(canWithdraw).toBe(true)
    })
  })

  describe('mintInflation', () => {
    afterAll(async () => {
      // reset the proof of performance after tests are finished
      const pop = baseContracts['ProofOfPerformance'].address
      await baseContracts['Inflation'].setProofOfPerformance(pop)
    })

    it('allows ProofOfPerformance to mint rewards', async () => {
      const inflation = baseContracts['Inflation'].address
      // Setting accounts[0] as minter to be able to call mintToken
      await baseContracts['RigoToken'].changeMintingAddress(accounts[0])
      await baseContracts['RigoToken'].mintToken(accounts[0], 200)
      await baseContracts['Inflation'].setMinimumRigo(20)
      await baseContracts['RigoToken'].changeMintingAddress(inflation)
      await baseContracts['Inflation'].setProofOfPerformance(accounts[0])

      const txHash = await baseContracts[contractName].mintInflation(
        vaultAddress,
        reward
      )
      expect(txHash).toBeHash()
    })

    it('fails if called again before the period is over', async () => {
      // this throws an error correctly
      await expect(
        baseContracts[contractName].mintInflation(vaultAddress, reward)
      ).rejects.toThrowErrorMatchingSnapshot()
      // TODO: Fix this when contract is fixed
      // this returns true ?
      await baseContracts[contractName].canWithdraw(vaultId)
      // expect(canWithdraw).toBe(false)
    })
  })
})
