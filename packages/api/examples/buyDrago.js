const Api = require('../dist/api').default
const Web3 = require('web3')
const BigNumber = require('bignumber.js').BigNumber
const clk = require('chalk')

const buyDrago = async () => {
  const api = new Api()
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('ws://localhost:8545')
  )
  await api.init(web3)
  let txOptions
  let txObject
  let gasEstimate
  let receipt

  const accounts = await api.web3.eth.getAccounts()
  const { DragoFactory, Drago } = api.contract
  const dragoFactory = await DragoFactory.createAndValidate(
    api.web3,
    DragoFactory.address
  )
  txOptions = { from: accounts[0] }
  const gasPrice = await api.web3.eth.getGasPrice()

  txObject = await dragoFactory.createDrago('New Drago 2', 'DRG')
  gasEstimate = await txObject.estimateGas(txOptions)

  receipt = await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  const dragoAddress = receipt.events.DragoCreated.returnValues.drago
  console.log(clk.green('Drago created!'))
  console.log(clk.green('Address: ' + dragoAddress))

  const drago = await Drago.createAndValidate(api.web3, dragoAddress)

  txObject = await drago.buyDrago()
  txOptions = { ...txOptions, value: api.web3.utils.toWei('3') }
  gasEstimate = await txObject.estimateGas(txOptions)

  txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  const ethBalance = await api.web3.eth.getBalance(dragoAddress)
  console.log(clk.green('New Balance: ', ethBalance))
  await web3.currentProvider.connection.close()
  await api.stopEngine()
}

buyDrago()
