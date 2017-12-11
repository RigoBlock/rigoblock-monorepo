# DragoApi

### A js wrapper around RigoBlock Smart Contracts to simplify their consumption.

## Usage

### Example


Import DragoAPI class and create an instance passing a Parity API/Web3 instance.

Getting drago details from DragoRegistry contract:
```javascript
import DragoApi from '../../DragoApi/src'

const dragoApi = new DragoApi(api)
dragoApi.contract.dragoregistry
  .init()
  .then(() =>{
    dragoApi.contract.dragoregistry
    .drago(dragoID)
    .then((dragoDetails) => {
      console.log(dragoDetails)
    })
  })
  ```

Getting drago prices from DragoEVO contract:
```javascript
//
// Initializing Drago API
// Passing Parity API
//
const dragoApi = new DragoApi(api)
//
// Initializing registry contract
//
dragoApi.contract.dragoregistry
  .init()
  .then((address) =>{
    //
    // Looking for drago from dragoID
    //
    dragoApi.contract.dragoregistry
    .drago(dragoID)
    .then((dragoDetails) => {
      const dragoAddress = dragoDetails[0][0]
      //
      // Initializing drago contract
      //
      dragoApi.contract.drago.instance(dragoAddress)
      //
      // Calling getData method
      //
      dragoApi.contract.drago.getData()
      .then((data) =>{
        this.setState({
          dragoDetails: {
            address: dragoDetails[0][0],
            name: dragoDetails[0][1],
            symbol: dragoDetails[0][2],
            dragoID: dragoDetails[0][3].c[0],
            addresssOwner: dragoDetails[0][4],
            addressGroup: dragoDetails[0][5],
            sellPrice: api.util.fromWei(data[2].toNumber(4)).toFormat(4),
            buyPrice: api.util.fromWei(data[3].toNumber(4)).toFormat(4),
          },
          loading: false
        })
      })
```
## Supported contracts

### DragoRegistry

Methods:

`drago(dragoID)` returns `address drago, string name, string symbol, uint dragoID, address owner, address group`
`fromAddress(dragoAddress)` returns `uint id, string name, string symbol, uint dragoID, address owner, address group`

### DragoEVO

Methods:

`getData()` returns `string name, string symbol, uint sellPrice, uint buyPrice`

### Eventful

`getAllLogs(topics)` returns events array

