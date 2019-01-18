const Api = require('../dist/api').default
const Web3 = require('web3')
const BigNumber = require('bignumber.js').BigNumber
const clk = require('chalk')
const utils = require('./utils')

const buyAndSellDrago = async () => {
  const api = new Api()
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
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
  const randomDragoName = Math.random()
    .toString(36)
    .substring(7)

  txObject = await dragoFactory.createDrago(randomDragoName, 'DRG')
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

  const buyAmount = '3'

  txObject = await drago.buyDrago()
  txOptions = { ...txOptions, value: api.web3.utils.toWei(buyAmount) }
  gasEstimate = await txObject.estimateGas(txOptions)

  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  // drago price defaults to 1 ETH if not set
  console.log(clk.green(`Bought ${buyAmount} shares.`))
  let ethBalance = await api.web3.eth.getBalance(dragoAddress)
  console.log(clk.green('Eth Balance: ', api.web3.utils.fromWei(ethBalance)))

  const sellAmount = '1'

  txObject = await drago.sellDrago(utils.toMicro(sellAmount))
  txOptions = { from: accounts[0] }
  gasEstimate = await txObject.estimateGas(txOptions)

  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  console.log(clk.green(`Sold ${sellAmount} share(s).`))

  ethBalance = await api.web3.eth.getBalance(dragoAddress)
  console.log(
    clk.green('New Eth Balance: ', api.web3.utils.fromWei(ethBalance))
  )

  await api.stopEngine()
}

buyAndSellDrago()
