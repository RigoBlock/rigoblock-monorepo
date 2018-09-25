import Web3 = require('web3')
import { Vault } from '../src/generated/vault'
import { VaultFactory } from '../src/generated/vault_factory'

describe('generated contract', () => {
  let web3
  let extendedExpect
  let accounts
  let txOptions
  beforeAll(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    accounts = await web3.eth.getAccounts()
    extendedExpect = expect as any
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
      txOptions = {
        from: accounts[0]
      }
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
    it('createVault', async () => {
      const vaultOptions = ['testVaultam', 'ASD']
      const gasPrice = await web3.eth.getGasPrice()
      const gasEstimate = await vaultFactory // 2538415
        .createVault(...vaultOptions)
        .then(obj => obj.estimateGas(txOptions))
      const receipt = await vaultFactory
        .createVault(...vaultOptions)
        .then(obj =>
          // adding value to gas estimate as it is not always correct
          obj.send({ ...txOptions, gasPrice, gas: gasEstimate + 5000 })
        )

      extendedExpect(receipt.transactionHash).toBeHash()
    })
    fdescribe('payable methods', async () => {
      let vaultInstance
      beforeAll(async () => {
        const vaultName = Math.random()
          .toString(36)
          .substring(2, 7)
        const vaultOptions = [vaultName, 'VLT']
        const gasPrice = await web3.eth.getGasPrice()
        const gasEstimate = await vaultFactory
          .createVault(...vaultOptions)
          .then(obj => obj.estimateGas(txOptions))
        const receipt = await vaultFactory
          .createVault(...vaultOptions)
          .then(obj =>
            // adding value to gas estimate as it is not always correct
            obj.send({ ...txOptions, gasPrice, gas: gasEstimate + 5000 })
          )
        const vaultAddress = receipt.events.VaultCreated.returnValues.vault
        vaultInstance = await Vault.createAndValidate(web3, vaultAddress)
      })
      it('buyVault', async () => {
        const options = { ...txOptions, value: web3.utils.toWei('1') }
        const gasPrice = await web3.eth.getGasPrice()
        const gasEstimate = await vaultInstance
          .buyVault()
          .then(obj => obj.estimateGas(options))
        await vaultInstance
          .buyVault()
          .then(obj =>
            obj.send({ ...options, gasPrice, gas: gasEstimate + 5000 })
          )
      })
    })
  })
})
