import Web3 = require('web3')
import {
  VaultFactory,
  VaultFactoryEvents
} from './src/contracts/models/vault_factory'

// const getData = async () => {
//   const web3 = new Web3(
//     new Web3.providers.WebsocketProvider('ws://localhost:8545')
//   )
//   console.log('here')
//   const accounts = await web3.eth.getAccounts()
//   const vaultFactory = await VaultFactory.createAndValidate(
//     web3,
//     '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
//   )
//   const filterOptions: any = {
//     fromBlock: 0,
//     toBlock: 'latest'
//   }
//   const filterCallback = (err, event) =>
//     err ? console.error(err) : console.log(event)
//   const events = await vaultFactory.allEvents(filterOptions, filterCallback)
//   // ---------------------
//   const vaultName = Math.random()
//     .toString(36)
//     .substring(2, 7)
//   const txOptions = {
//     from: accounts[0]
//   }
//   const gasPrice = await web3.eth.getGasPrice()
//   const gasEstimate = await vaultFactory
//     .createVault(vaultName, 'ASD')
//     .then(obj => obj.estimateGas(txOptions))
//   const receipt = await vaultFactory
//     .createVault(vaultName, 'ASD')
//     .then(obj => obj.send({ ...txOptions, gasPrice, gas: gasEstimate + 5000 }))
// }
const getData = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('ws://localhost:8545')
  )
  console.log('here')
  const accounts = await web3.eth.getAccounts()
  const vaultFactory = await VaultFactory.createAndValidate(
    web3,
    '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
  )
  const filterOptions: any = {
    fromBlock: 0,
    toBlock: 'latest'
  }
  const filterCallback = (err, event) =>
    err ? console.error(err) : console.log(event)
  const events = await vaultFactory.VaultCreatedEvent(
    filterOptions,
    filterCallback
  )
  // ---------------------
  const vaultName = Math.random()
    .toString(36)
    .substring(2, 7)
  const txOptions = {
    from: accounts[0]
  }
  const gasPrice = await web3.eth.getGasPrice()
  const gasEstimate = await vaultFactory
    .createVault('staminchia', 'ASD')
    .then(obj => obj.estimateGas(txOptions))
  const receipt = await vaultFactory
    .createVault('staminchia', 'ASD')
    .then(obj => obj.send({ ...txOptions, gasPrice, gas: gasEstimate + 5000 }))
}

getData()
