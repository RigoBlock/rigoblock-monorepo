# DragoApi

### A js wrapper around RigoBlock Smart Contracts to simplify their consumption.

## Usage

### Example

Import DragoAPI class and create an instance passing by a Parity API/Web3 instance:

    import DragoApi from '../../DragoApi/src'

    const dragoApi = new DragoApi(api)
    dragoApi.contract.dragoregistry
      .instance()
      .then((address) =>{
        dragoApi.contract.dragoregistry
        .drago(dragoID)
        .then((dragoDetails) => {
          console.log(dragoDetails)
        })
      })

## Supported contracts

### DragoRegistry

Methods:

`drago(dragoID)` returns `address drago, string name, string symbol, uint dragoID, address owner, address group`

### DragoEVO

Methods:

`getData` returns `string name, string symbol, uint sellPrice, uint buyPrice`
