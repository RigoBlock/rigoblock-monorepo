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
      const res = await vaultFactory.getRegistry()
      const asd = await res.call()
      console.log(asd)
    })
  })
})
