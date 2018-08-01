# API
## Usage

Start Ganache
```
lerna run --scope @rigoblock/dapp ganache --stream
```
Then run the following command:
```
yarn typechain
```

## Available Scripts

### From the project root you can run:
```
yarn lint
```
Lints all files.
```
yarn typechain
```
Extracts all abis of the deployed contracts, then copies them over to the .tmp folder in json format. Typechain will then proceed to generate Typescript classes of the contracts from said abis.
```
yarn tsc
```
Compiles all .ts files to Javascript, including map and declaration files.
```
yarn tsc:watch
```
Compiles on watch mode
```
yarn build
```
Executes in sequence the typechain and the tsc scripts

## Instantiating contracts

To instantiate a contract we have to use Typechain's `createAndValidate()` function, which will check if the contract is deployed on the blockChain, else it will throw an error. The function accepts two parameters: a web3 instance and the contract's address.

Some contracts are already deployed when the API is initialised, their address is saved under a `address` method. To check if a contract is deployed we can use the custom `isDeployed()` function

```javascript
api.contract.Authority.isDeployed() // true

const authority = api.contract.Authority.createAndValidate(api.web3._web3, api.contract.Authority.address)
```

## Calling methods

### Example
Creating a Vault from the VaultFactory contract

```javascript
import Api from '@rigoblock/api'

;async () => {
  const api = new Api()
  await api.init()
  const vaultFactory = api.contract.VaultFactory.createAndValidate(
    api.web3._web3,
    api.contract.VaultFactory.address
  )
  vaultFactory.createVaultTx('rocksolidvault', 'VLT').send({
    value: 0,
    from: '0x...196',
    gas: 5700000,
    gasPrice: 100000000000
  })
}

```
## Adding custom methods

We can add custom methods to the contracts using the `ContractExtension` class.

```typescript
// contract-extension.ts
export abstract class ContractExtension {
  customMethod() {
    // custom code here
  }
}

// contracts/index.ts
import { Authority } from './models/Authority'
import { ContractExtension } from './contract-extension'

export abstract class ContractModels {
  Authority: Authority & ContractExtension
}

```

## Events

To create a new filter for a specific event we simply call the method from the typechain contract, passing in an object to define the arguments we filter the events for.

### Example

Listening for the `VaultCreated` event

```javascript
import Api from '@rigoblock/api'

;async () => {
  const api = new Api()
  await api.init()

  const vaultEventful = api.contract.VaultEventful.createAndValidate(
    api.web3._web3,
    api.contract.VaultEventful.address
  )
  // filter for vaults created by this account
  const myEvent = vaultEventful.VaultCreatedEvent({
    owner: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d',
    fromBlock: 0,
    toBlock: 'latest'
  })

  // get all past events
  myEvent.get((error, data) => (error ? error : data))

  // listen for new events
  myEvent.watch((error, data) => (error ? error : data))
}


```

If we wish to listen for all events of a particular contract, we have to use typechain's rawWeb3Contract method.

### Example
```javascript
import Api from '@rigoblock/api'

;async () => {
  const api = new Api()
  await api.init()

  const vaultEventful = api.contract.VaultEventful.createAndValidate(
    api.web3._web3,
    api.contract.VaultEventful.address
  )
  const events = vaultEventful.VaultCreatedEvent.rawWeb3Contract.allEvents({
    fromBlock: 0,
    toBlock: 'latest'
  })

  // get all events
  events.get((error, data) => (error ? error : data))

  // listen for new events
  events.watch((error, data) => (error ? error : data))
}

```
