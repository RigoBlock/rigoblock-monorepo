'use strict'
const Web3 = require('web3')
const fetchContracts = require('@rgbk/contracts').default
// in this file you can append custom step methods to 'I' object

const GANACHE_URL = 'http://localhost:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
const getContractsAndAccounts = async () => {
  const networkId = await web3.eth.net.getId()
  const accounts = await web3.eth.getAccounts()
  const contracts = await fetchContracts(networkId)
  return [accounts, contracts]
}
const defaultOptions = {
  gas: 5700000
}

module.exports = function() {
  return actor({
    cssClick: function(element) {
      this.waitForVisible(element, 5)
      return this.executeScript(
        el => document.querySelector(el).click(),
        element
      )
    },
    displayFullSelectField: function(element) {
      this.executeScript(
        el => (document.querySelector(el).style.overflow = 'visible'),
        element
      )
    },
    buyVault: async (id, amount) => {
      const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
      const [accounts, contracts] = await getContractsAndAccounts(web3)
      const registry = new web3.eth.Contract(
        contracts['DragoRegistry'].abi,
        contracts['DragoRegistry'].address,
        defaultOptions
      )
      const vaultData = await registry.methods.fromId(id).call()
      const vaultAddress = vaultData.drago
      const vault = new web3.eth.Contract(
        contracts['Vault'].abi,
        vaultAddress,
        defaultOptions
      )
      const tx = await vault.methods.buyVault().send({
        from: accounts[0],
        value: Web3.utils.toWei(amount)
      })
      return tx.transactionHash
    }
  })
}
