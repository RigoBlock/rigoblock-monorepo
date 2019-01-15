const Api = require('./dist/api')

const api = new Api()

const createDrago = async () => {
  const accounts = await api.web3.eth.getAccounts()
  const { DragoFactory, Drago } = api.contract
  const dragoFactory = await DragoFactory.createAndValidate(
    api.web3,
    DragoFactory.address
  )
  const txOptions = { from: accounts[0] }
  const txObject = await dragoFactory.createDrago('New Drago', 'DRA')
  const gasEstimate = await txObject.estimateGas(txOptions)
  const gasPrice = await api.web3.eth.getGasPrice()
  const receipt = await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
  const dragoData = receipt.events.DragoCreated.returnValues
  const drago = await Drago.createAndValidate(api.web3, dragoData.drago)
  console.log(drago)
}

createDrago()
