# API usage

It is recommended to have a single file exporting the API class instance, to be able to reuse the same instance throughout your application.

```javascript
// api.js
import Api from '@rigoblock/api'

export default new Api()
```

## Working with pools

```javascript
import api from './api.js'

const createDrago = async () => {
  const accounts = await api.web3.eth.getAccounts()
  const { DragoFactory, Drago } = api.contract
  const dragoFactory = await DragoFactory.createAndValidate(
    api.web3,
    DragoFactory.address
  )
  const txOptions = { from: accounts[0] }
  const gasPrice = await api.web3.eth.getGasPrice()

  let txObject = await dragoFactory.createDrago('New Drago', 'DRG')
  let gasEstimate = await txObject.estimateGas(txOptions)

  // this will open the transaction window on metamask
  let receipt = await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })

  const dragoAddress = receipt.events.DragoCreated.returnValues.drago
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)

  // buying pool units
  txObject = await drago.buyDrago()

  await txObject().send({
    from: accounts[0],
    value: api.web3.utils.toWei('4')
  })
}
```

- instantiate `DragoFactory` contract to create a new pool. The pool must have a 3 digit symbol and a name (if the name already exists the contract will throw an error)

- the gasPrice and gas amount can be calculated using web3's methods. It is always best to add something to the gas amount, as it can be imprecise.

