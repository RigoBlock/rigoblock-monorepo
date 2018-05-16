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


## Calling methods
### Example
Creating a Vault from the VaultFactory contract

```javascript
import Api from '@rigoblock/api'

async () => {
  const api = new Api()
  await api.init()
  api.contract.VaultFactory.createVaultTx('Rocksolid Vault', 'VLT')
  .send({
    value: 0,
    from: '0x...196',
    gas: 4700000,
    gasPrice: 100000000000
  })
}
```
## Adding custom methods

We can add custom methods to the contracts using the `ContractExtension` class

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

Typechain contracts currently do not support events, but they ship with a `rawWeb3Contract` method that gives us access to them.

### Example

Listening for the `VaultCreated` event

```javascript
async () => {
  const api = new Api()
  await api.init()
  const myEvent = api.contract.VaultEventful.rawWeb3Contract.VaultCreated()

  // listen for new events
  myEvent.watch((error, result) => {
    console.log(error || result.args)
  })

  // fetch all VaultCreated events from block 0
  api.contract.VaultEventful.rawWeb3Contract
    .VaultCreated({}, { fromBlock: 0 })
    .get((err, data) => data.map(e => console.log(e.args)))
}
```

