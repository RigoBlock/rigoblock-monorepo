const Api = require('../dist/api').default
const Web3 = require('web3')
const BigNumber = require('bignumber.js').BigNumber
const c = require('chalk')

const buyDrago = async () => {
  const api = new Api()
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('ws://localhost:8545')
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

  const txObject = await dragoFactory.createDrago('New Drago', 'DRG')
  const gasEstimate = await txObject.estimateGas(txOptions)

  // this will open the transaction window on metamask
  const receipt = await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  const dragoAddress = receipt.events.DragoCreated.returnValues.drago
  console.log(c.green('Drago created!'))
  console.log(c.green('Address: ' + dragoAddress))
  await web3.currentProvider.connection.close()
  await api.stopEngine()
}

createDrago()
