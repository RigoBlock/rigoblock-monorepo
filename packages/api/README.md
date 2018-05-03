# Rigoblock smart contract API

## Usage

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
  poolsApi.contract.VaultEventful.rawWeb3Contract
    .VaultCreated({}, { fromBlock: 0 })
    .get((err, data) => data.map(e => console.log(e.args)))
}
```

