const Api = require('../dist/api').default
const Web3 = require('web3')
const BigNumber = require('bignumber.js').BigNumber
const clk = require('chalk')

const createDrago = async () => {
  const api = new Api()
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )
  await api.init(web3)

  const accounts = await api.web3.eth.getAccounts()
  const { DragoFactory } = api.contract
  const dragoFactory = await DragoFactory.createAndValidate(
    api.web3,
    DragoFactory.address
  )
  const txOptions = { from: accounts[0] }
  const gasPrice = await api.web3.eth.getGasPrice()

  const randomDragoName = Math.random()
    .toString(36)
    .substring(7)

  const txObject = await dragoFactory.createDrago(randomDragoName, 'DRG')
  const gasEstimate = await txObject.estimateGas(txOptions)

  // this will open the transaction window on metamask
  const receipt = await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  const dragoAddress = receipt.events.DragoCreated.returnValues.drago
  console.log(clk.green('Drago created!'))
  console.log(clk.green('Address: ' + dragoAddress))
  await api.stopEngine()
}

createDrago()
