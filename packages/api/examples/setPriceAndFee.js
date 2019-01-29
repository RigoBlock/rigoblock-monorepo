const Api = require('../dist/api').default
const Web3 = require('web3')
const BigNumber = require('bignumber.js').BigNumber
const clk = require('chalk')

const setPriceAndFee = async () => {
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
  const buyPrice = api.web3.utils.toWei('0.50')
  const sellPrice = api.web3.utils.toWei('0.49')

  txObject = await drago.setPrices(
    sellPrice,
    buyPrice,
    1,
    api.web3.utils.fromAscii('random'),
    api.web3.utils.fromAscii('random')
  )

  gasEstimate = await txObject.estimateGas(txOptions)

  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
  console.log(clk.green('Set new buy and sell prices.'))

  const transactionFee = '50'
  txObject = await drago.setTransactionFee(transactionFee)
  gasEstimate = await txObject.estimateGas(txOptions)

  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  console.log(clk.green('Set new transaction fee.'))

  await api.stopEngine()
}

setPriceAndFee()
