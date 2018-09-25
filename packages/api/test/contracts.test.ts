import Web3 = require('web3')
import 'jest'
import { Vault } from '../src/contracts/models/vault'
import {
  VaultFactory,
  VaultFactoryEvents
} from '../src/contracts/models/vault_factory'

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
    it('createVault', async () => {
      const vaultName = Math.random()
        .toString(36)
        .substring(2, 7)
      const vaultOptions = [vaultName, 'ASD']
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
      const eventLog = await vaultFactory.getPastEvents(
        VaultFactoryEvents.VaultCreated,
        { fromBlock: 0, toBlock: 'latest' }
      )
      expect(eventLog[eventLog.length - 1].returnValues.name).toEqual(vaultName)
    })
    describe('payable methods', async () => {
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
