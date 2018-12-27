[@rigoblock/api](../README.md) > ["contracts/models/vault_eventful"](../modules/_contracts_models_vault_eventful_.md) > [VaultEventful](../classes/_contracts_models_vault_eventful_.vaulteventful.md)

# Class: VaultEventful

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[VaultEventfulEvents](../enums/_contracts_models_vault_eventful_.vaulteventfulevents.md)>

**↳ VaultEventful**

## Index

### Constructors

* [constructor](_contracts_models_vault_eventful_.vaulteventful.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_vault_eventful_.vaulteventful.md#rawweb3contract)
* [address](_contracts_models_vault_eventful_.vaulteventful.md#address)

### Methods

* [AUTHORITY](_contracts_models_vault_eventful_.vaulteventful.md#authority)
* [BuyVaultEvent](_contracts_models_vault_eventful_.vaulteventful.md#buyvaultevent)
* [NewCollectorEvent](_contracts_models_vault_eventful_.vaulteventful.md#newcollectorevent)
* [NewFeeEvent](_contracts_models_vault_eventful_.vaulteventful.md#newfeeevent)
* [NewRatioEvent](_contracts_models_vault_eventful_.vaulteventful.md#newratioevent)
* [SellVaultEvent](_contracts_models_vault_eventful_.vaulteventful.md#sellvaultevent)
* [VERSION](_contracts_models_vault_eventful_.vaulteventful.md#version)
* [VaultCreatedEvent](_contracts_models_vault_eventful_.vaulteventful.md#vaultcreatedevent)
* [VaultDaoEvent](_contracts_models_vault_eventful_.vaulteventful.md#vaultdaoevent)
* [allEvents](_contracts_models_vault_eventful_.vaulteventful.md#allevents)
* [buyVault](_contracts_models_vault_eventful_.vaulteventful.md#buyvault)
* [changeFeeCollector](_contracts_models_vault_eventful_.vaulteventful.md#changefeecollector)
* [changeRatio](_contracts_models_vault_eventful_.vaulteventful.md#changeratio)
* [changeVaultDao](_contracts_models_vault_eventful_.vaulteventful.md#changevaultdao)
* [createVault](_contracts_models_vault_eventful_.vaulteventful.md#createvault)
* [getPastEvents](_contracts_models_vault_eventful_.vaulteventful.md#getpastevents)
* [once](_contracts_models_vault_eventful_.vaulteventful.md#once)
* [sellVault](_contracts_models_vault_eventful_.vaulteventful.md#sellvault)
* [setTransactionFee](_contracts_models_vault_eventful_.vaulteventful.md#settransactionfee)
* [createAndValidate](_contracts_models_vault_eventful_.vaulteventful.md#createandvalidate)
* [isDeployed](_contracts_models_vault_eventful_.vaulteventful.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new VaultEventful**(web3: *`any`*, address: *`string`*): [VaultEventful](_contracts_models_vault_eventful_.vaulteventful.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [VaultEventful](_contracts_models_vault_eventful_.vaulteventful.md) Bool the transaction executed successfully Bool the transaction executed successfully Bool the transaction executed successfully Bool the transaction executed successfully Bool the transaction executed successfully Bool the transaction executed successfully Bool the transaction executed successfully

___

## Properties

<a id="rawweb3contract"></a>

###  rawWeb3Contract

**● rawWeb3Contract**: *`any`*

___
<a id="address"></a>

### `<Static>` address

**● address**: *`string`*

___

## Methods

<a id="authority"></a>

###  AUTHORITY

▸ **AUTHORITY**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="buyvaultevent"></a>

###  BuyVaultEvent

▸ **BuyVaultEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newcollectorevent"></a>

###  NewCollectorEvent

▸ **NewCollectorEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newfeeevent"></a>

###  NewFeeEvent

▸ **NewFeeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newratioevent"></a>

###  NewRatioEvent

▸ **NewRatioEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="sellvaultevent"></a>

###  SellVaultEvent

▸ **SellVaultEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="version"></a>

###  VERSION

▸ **VERSION**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="vaultcreatedevent"></a>

###  VaultCreatedEvent

▸ **VaultCreatedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="vaultdaoevent"></a>

###  VaultDaoEvent

▸ **VaultDaoEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="allevents"></a>

###  allEvents

▸ **allEvents**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="buyvault"></a>

###  buyVault

Logs a Buy Vault event.

▸ **buyVault**(_who: *`string`*, _targetVault: *`string`*, _value: *`BigNumber`*, _amount: *`BigNumber`*, _name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` | Address of who is buying | Address of the caller | Address of the caller | Address of the caller | Address of the caller | Address of who is selling | Address of the caller |
| _targetVault | `string` | Address of the target vault | Address of the target Vault | Address of the target vault | Address of the vault | Address of the target vault | Address of the target Vault |
| _value | `BigNumber` | Value of the transaction in Ether |
| _amount | `BigNumber` | Number of shares purchased | Number of shares purchased |
| _name | `string` | String of the name of the new vault |
| _symbol | `string` | String of the symbol of the new vault |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

Logs when wizard changes fee collector address

▸ **changeFeeCollector**(_who: *`string`*, _targetVault: *`string`*, _feeCollector: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _targetVault | `string` |
| _feeCollector | `string` | Address of the new fee collector |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changeratio"></a>

###  changeRatio

Logswhen rigoblock dao changes fee split.

▸ **changeRatio**(_who: *`string`*, _targetVault: *`string`*, _ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _targetVault | `string` |
| _ratio | `BigNumber` | Ratio number from 0 to 100 |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changevaultdao"></a>

###  changeVaultDao

Logs a change in the vault dao of an approved vault

▸ **changeVaultDao**(_who: *`string`*, _targetVault: *`string`*, _vaultDao: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _targetVault | `string` |
| _vaultDao | `string` | Address of the new vault dao |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createvault"></a>

###  createVault

Logs a new Vault creation by factory

▸ **createVault**(_who: *`string`*, _newVault: *`string`*, _name: *`string`*, _symbol: *`string`*, _vaultId: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _newVault | `string` | Address of the new vault |
| _name | `string` |
| _symbol | `string` |
| _vaultId | `BigNumber` | Number of the new vault Id |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[VaultEventfulEvents](../enums/_contracts_models_vault_eventful_.vaulteventfulevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultEventfulEvents](../enums/_contracts_models_vault_eventful_.vaulteventfulevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[VaultEventfulEvents](../enums/_contracts_models_vault_eventful_.vaulteventfulevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultEventfulEvents](../enums/_contracts_models_vault_eventful_.vaulteventfulevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="sellvault"></a>

###  sellVault

Logs a Sell Vault event.

▸ **sellVault**(_who: *`string`*, _targetVault: *`string`*, _amount: *`BigNumber`*, _revenue: *`BigNumber`*, _name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _targetVault | `string` |
| _amount | `BigNumber` |
| _revenue | `BigNumber` | Value of the transaction in Ether |
| _name | `string` |
| _symbol | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="settransactionfee"></a>

###  setTransactionFee

Logs a modification of the transaction fee event

▸ **setTransactionFee**(_who: *`string`*, _targetVault: *`string`*, _transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` |
| _targetVault | `string` |
| _transactionFee | `BigNumber` | Value of the transaction fee in basis points |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[VaultEventful](_contracts_models_vault_eventful_.vaulteventful.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[VaultEventful](_contracts_models_vault_eventful_.vaulteventful.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

