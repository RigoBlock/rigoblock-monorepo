# API Quick Start

RigoBlock TypeScript API to interact with the [RigoBlock Protocol](https://github.com/RigoBlock/rigoblock-monorepo/tree/master/packages/contracts) smart contracts.

## Installation

    npm install --save @rigoblock/api

Or with Yarn:

    yarn add @rigoblock/api

## Usage

### Initialising the API

```javascript
import Api from '@rigoblock/api'

const api = new Api()
await api.init(web3)
```

_web3_ parameter is optional and defaults to `window.web3`. The API class will then make a call to get the _Network Id_ and set the correct RPC url.

### Instantiating contracts

To instantiate a contract we use the `createAndValidate()` function, which first checks if the contract is deployed on the blockChain, throwing an error if it isn't. The function accepts two parameters: a web3 instance and the contract's address.

Some contracts are already deployed when the API is initialised, their address is saved under a `address` property. To check if a contract is deployed we can use the `isDeployed()` method.

```javascript
api.contract.Authority.isDeployed() // true

const authority = await api.contract.Authority.createAndValidate(
  api.web3,
  api.contract.Authority.address
)
```

### Calling methods

Creating a Vault from the VaultFactory contract

```javascript
import Api from '@rigoblock/api'

const api = new Api()
await api.init()
const vaultFactory = api.contract.VaultFactory.createAndValidate(
  api.web3,
  api.contract.VaultFactory.address
)
const txOptions = { from: '0x1234...' }
const txObject = await vaultFactory.createVault('rocksolidvault', 'VLT')
const gasEstimate = await txObject.estimateGas(txOptions)
const gasPrice = await api.web3.eth.getGasPrice()
const receipt = await txObject.send({
  ...txOptions,
  gas: new BigNumber(gasEstimate).times(1.2).toFixed(0),
  gasPrice
})

const vaultAddress = receipt.events.VaultCreated.returnValues.vault
```

We add some more gas to the estimate as it can be incorrect in case new blocks are added between the estimate and the actual transaction taking place.

### Contract Events

To get past events of a contract, use the `getPastEvents` function:

```javascript
const pastEvents = await api.contract.vaultEventful.getPastEvents('allEvents', {
  fromBlock,
  toBlock
})
```

To create a subscription to a single event, use the relative method and pass it a callback to retrieve the data:

Listening for the `VaultCreated` event

```javascript
await vaultFactory.VaultCreatedEvent(
  {
    fromBlock: 0,
    toBlock: 'latest'
  },
  (err, event) => (err ? console.error(err) : console.log(event))
)
```

If we wish to listen for all events, use the `allEvents` method.

```javascript
await vaultFactory.allEvents(
  {
    fromBlock,
    toBlock
  },
  (err, events) => (err ? console.error(err) : console.log(events))
)
```

## Additional Resources

For a complete reference of the API, check our [documentation website](https://docs.rigoblock.com).

Additional examples of API usage can be found [here](https://github.com/RigoBlock/rigoblock-monorepo/tree/master/packages/api/examples).

## Adding custom methods

Custom methods can be added to our contracts using the [Handlebars template](template.handlebars).

## Setup

### Available Scripts

    yarn lint

Lints all files.

    yarn abi-extract

Extracts all abis of the deployed contracts, then copies them over to the .tmp folder in json format.

    yarn abi-gen

Generates contract wrappers from the abi JSON files.

    yarn tsc

Compiles all .ts files to Javascript, including map and declaration files into the `dist` folder.

    yarn tsc:watch

Compiles on watch mode

    yarn build

Extracts abis saving them as JSON files, generates wrappers and compiles .ts files into `dist` folder.

    yarn doc-gen

Generates the documentation using [Typedoc](http://typedoc.org/) and further scripts to clean it up.

## Contributing

Read our [contribution guidelines](https://github.com/RigoBlock/rigoblock-monorepo/blob/master/CONTRIBUTING.md).
