# Using the API

It is recommended to have a single file exporting the API class instance, to be able to reuse the same instance throughout your application.

```javascript
// api.js
import Api from '@rigoblock/api'

export default new Api()
```

## Working with pools

### Creating a pool

```javascript
import api from './api.js'
import { BigNumber } from 'bignumber.js'

const createDrago = async () => {
  await api.init()

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
  return dragoAddress
}
```

- instantiate `DragoFactory` contract to create a new pool. The pool must have a 3 digit symbol and a name (if the name already exists the contract will throw an error)

- the gasPrice and gas amount can be calculated using web3's methods. It is always best to add something to the gas amount, as it can be imprecise.

- always use libraries such as [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) when working with numbers, to avoid imprecisions.

### Buying pool units

```javascript
const buyDragoUnits = async (api, dragoAddress) => {
  const { Drago } = api.contract
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)
  const txObject = await drago.buyDrago()
  const accounts = await api.web3.eth.getAccounts()
  const gasPrice = await api.web3.eth.getGasPrice()
  const txOptions = { from: '0x1234..', value: api.web3.utils.toWei('3')}
  const gasEstimate = await txObject.estimateGas(txOptions)

  return txObject().send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
}
```