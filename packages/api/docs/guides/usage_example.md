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

-   instantiate `DragoFactory` contract to create a new pool. The pool must have a 3 digit symbol and a name (if the name already exists the contract will throw an error).

-   the gasPrice and gas amount can be calculated using web3's methods. It is always best to add something to the gas amount, as it can be imprecise.

-   always use libraries such as [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) when working with numbers, to avoid imprecisions.

### Buying pool units

```javascript
const buyDragoUnits = async (api, dragoAddress, accountAddress) => {
  const { Drago } = api.contract
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)
  const txObject = await drago.buyDrago()
  const gasPrice = await api.web3.eth.getGasPrice()
  const txOptions = { from: accountAddress, value: api.web3.utils.toWei('3') }
  const gasEstimate = await txObject.estimateGas(txOptions)

  return txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
}
```

### Selling pool units

```javascript
const sellDragoUnits = async (api, dragoAddress, accountAddress) => {
  const { Drago } = api.contract
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)
  const txObject = await drago.sellDrago()
  const gasPrice = await api.web3.eth.getGasPrice()
  const txOptions = { from: accountAddress, value: api.web3.utils.toWei('3') }
  const gasEstimate = await txObject.estimateGas(txOptions)

  return txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
}
```

### Setting the Drago prices

```javascript
const setDragoPrices = async (api, dragoAddress, accountAddress) => {
  const { Drago } = api.contract
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)
  const txOptions = { from: accountAddress }
  const buyPrice = api.web3.utils.toWei('0.50')
  const sellPrice = api.web3.utils.toWei('0.49')

  const txObject = await drago.setPrices(
    sellPrice,
    buyPrice,
    1,
    api.web3.utils.fromAscii('random'),
    api.web3.utils.fromAscii('random')
  )

  const gasEstimate = await txObject.estimateGas(txOptions)
  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
}
```

-   The new **buyPrice** must always be higher than the new **sellPrice**
-   Currently the last 3 parameters of the `setPrices` method are unused, they have been predisposed to easily upgrade the contract in the future and have an approved fronted platform check that the value is correct.

### Setting the transaction fee

```javascript
const setDragoFee = async (api, dragoAddress, accountAddress) => {
  const { Drago } = api.contract
  const drago = await Drago.createAndValidate(api.web3, dragoAddress)
  const txOptions = { from: accountAddress }
  // transaction fee in basis points
  const transactionFee = '50'
  const txObject = await drago.setTransactionFee(transactionFee)
  const gasPrice = await api.web3.eth.getGasPrice()
  const gasEstimate = await txObject.estimateGas(txOptions)

  await txObject.send({
    ...txOptions,
    gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
    gasPrice
  })
}
```

-   The transactionFee is in **basis points**, where each basis point represents 0.01%. The maximum value is **100** as the transaction fee cannot be higher than 1%.
-   By default, the transaction fee is 0 when a new Drago is created
-   20% of the transaction fee goes to the DAO, while the rest is for the pool's wizard
