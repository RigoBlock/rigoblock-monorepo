import Web3 = require('web3')
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
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
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
    describe('constant methods', () => {
      it('reads a constant property of the contract from the blockChain ', async () => {
        const registry = '0xf7cBB0849d4a8ec5aB4650030FA776c00Eb52dA7'
        const res = await vaultFactory.getRegistry()
        expect(res).toEqual(registry)
      })
    })

    describe('non constant methods', () => {
      describe('non payable methods', () => {
        it("writes to the blockChain, but doesn't accept ether", async () => {
          const vaultName = Math.random()
            .toString(36)
            .substring(2, 7)
          const vaultOptions = [vaultName, 'ASD']
          const gasPrice = await web3.eth.getGasPrice()
          const gasEstimate = await vaultFactory // 2538415
            .createVault(...vaultOptions)
            .then(obj => {
              return obj.estimateGas(txOptions)
            })
          const receipt = await vaultFactory
            .createVault(...vaultOptions)
            .then(obj =>
              // adding value to gas estimate as it is not always correct
              obj.send({ ...txOptions, gasPrice, gas: gasEstimate + 5000 })
            )

          extendedExpect(receipt.transactionHash).toBeHash()
        })
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
        it('accepts an ether value', async () => {
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
  describe('contract events', () => {
    describe('getPastEvents', () => {
      it('returns past logs for the specified event', async () => {
        const vaultFactory = await VaultFactory.createAndValidate(
          web3,
          '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
        )
        const eventLog = await vaultFactory.getPastEvents(
          VaultFactoryEvents.VaultCreated,
          { fromBlock: 0, toBlock: 'latest' }
        )
        expect(Array.isArray(eventLog)).toBe(true)
      })
    })
    describe('websocket events', () => {
      const allEventsSpy = jest.fn()
      const onceSpy = jest.fn()
      const VaultCreatedSpy = jest.fn()
      const filterOptions = {
        fromBlock: 0,
        toBlock: 'latest'
      }
      const filterCallback = (err, event) =>
        err ? console.error(err) : console.log(event)

      class ContractMock {
        public once(...args) {
          return onceSpy(...args)
        }
        public events = {
          allEvents: allEventsSpy,
          VaultCreated: VaultCreatedSpy
        }
      }
      const Web3Mock = {
        eth: {
          getCode: () => Promise.resolve('0x12345'),
          Contract: ContractMock
        }
      }
      let mockedVaultFactory
      beforeEach(async () => {
        const VaultFactory = require('../src/contracts/models/vault_factory')
          .VaultFactory

        mockedVaultFactory = await VaultFactory.createAndValidate(
          Web3Mock,
          '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
        )
      })
      describe('allEvents', () => {
        it('calls the web3 allEvents method with the specified options', async () => {
          await mockedVaultFactory.allEvents(filterOptions, filterCallback)
          expect(allEventsSpy).toHaveBeenCalledWith(
            filterOptions,
            filterCallback
          )
        })
      })
      describe('once', () => {
        it('calls the web3 once function with specified options', async () => {
          const options = ['VaultCreated', filterOptions, filterCallback]
          await mockedVaultFactory.once(...options)
          expect(onceSpy).toHaveBeenCalledWith(...options)
        })
      })
      describe('contract event', () => {
        it('calls the web3 event function to subscribe to a specific event', async () => {
          await mockedVaultFactory.VaultCreatedEvent(filterOptions)
          expect(VaultCreatedSpy).toHaveBeenCalledWith(
            filterOptions,
            undefined // callback is optional
          )
        })
      })
    })
  })
})
