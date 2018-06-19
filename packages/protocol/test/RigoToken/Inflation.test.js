import { BigNumber } from 'bignumber.js'
import { GAS_ESTIMATE } from '../../constants'

const contractName = 'Inflation'
const vaultArtifact = require('../../artifacts/Vault.json')

describe('getInflationFactor', async () => {
  let vaultId
  let vaultAddress
  let value
  let group
  const inflationFactor = 1
  const fakeFactory = '0x7ce6e371085cb611fb46d5065397223ef2f000ff'
  const reward = 20
  beforeAll(async () => {
    group = baseContracts['VaultFactory'].address
    await baseContracts['VaultFactory'].createVault('test vault', 'VLT')
    const vaultData = await baseContracts['DragoRegistry'].fromSymbol('VLT')
    const [id, address] = vaultData
    vaultId = id
    vaultAddress = address
    const vaultInstance = new web3.eth.Contract(
      vaultArtifact.networks[networkId].abi,
      vaultAddress
    )
    value = web3.utils.toWei('2')
    await vaultInstance.methods.buyVault().send({
      from: accounts[1],
      value,
      gas: GAS_ESTIMATE,
      gasPrice: 1
    })
  })
  describe('setInflationFactor', () => {
    it('sets the inflation factor', async () => {
      const txHash = await baseContracts[contractName].setInflationFactor(
        group,
        inflationFactor
      )
      expect(txHash).toBeHash()
    })
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts[contractName].setInflationFactor.sendTransactionAsync(
          group,
          inflationFactor,
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
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
      expect(retrievedFactor).toEqual(new BigNumber(inflationFactor))
    })
  })
  describe.skip('mintInflation', () => {
    it('allows ProofOfPerformance to mint rewards', async () => {
      const proofOfPerformance = baseContracts['ProofOfPerformance']
      const mintInflation = await baseContracts[
        contractName
      ].mintInflation.sendTransactionAsync(vaultAddress, reward, {
        from: proofOfPerformance,
        gas: GAS_ESTIMATE,
        gasPrice: 1
      })
      console.log(mintInflation)
    })
  })
  describe.skip('canWithdraw', () => {
    it('returns whether a wizard can claim reward tokens', async () => {
      const canWithdraw = await baseContracts[contractName].canWithdraw(vaultId)
      expect(canWithdraw).toBe(true)
    })
  })
  describe.skip('canWithdraw', () => {
    it('returns whether a wizard can claim reward tokens', async () => {
      const canWithdraw = await baseContracts[contractName].canWithdraw(vaultId)
      expect(canWithdraw).toBe(true)
    })
  })
})
