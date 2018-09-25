import Web3 = require('web3')
import 'jest'
import { VaultFactory } from '../src/generated/vault_factory'

describe('generated contract', () => {
  let web3
  beforeAll(() => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  })
  describe('createAndValidate', () => {
    it('istantiates a smart contract', async () => {
      const vaultFactory = await VaultFactory.createAndValidate(
        web3,
        '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
      )
      expect(vaultFactory).toBeInstanceOf(VaultFactory)
    })
  })
  describe('contract methods', () => {
    let vaultFactory
    beforeAll(async () => {
      vaultFactory = await VaultFactory.createAndValidate(
        web3,
        '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
      )
    })
    it('constant method', async () => {
      const registry = '0xf7cBB0849d4a8ec5aB4650030FA776c00Eb52dA7'
      const res = await vaultFactory.getRegistry()
      expect(res).toEqual(registry)
    })
    it('constant function', async () => {
      const result = {
        '0': '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        '1': 'VF 0.4.2',
        '2': '0',
        vaultDao: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        version: 'VF 0.4.2',
        nextVaultId: '0'
      }
      const res = await vaultFactory.getStorage()
      expect(res).toEqual(result)
    })
  })
})
