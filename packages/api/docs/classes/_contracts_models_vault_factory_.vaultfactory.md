[@rigoblock/api](../README.md) > ["contracts/models/vault_factory"](../modules/_contracts_models_vault_factory_.md) > [VaultFactory](../classes/_contracts_models_vault_factory_.vaultfactory.md)

# Class: VaultFactory

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[VaultFactoryEvents](../enums/_contracts_models_vault_factory_.vaultfactoryevents.md)>

**↳ VaultFactory**

## Index

### Constructors

* [constructor](_contracts_models_vault_factory_.vaultfactory.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_vault_factory_.vaultfactory.md#rawweb3contract)
* [address](_contracts_models_vault_factory_.vaultfactory.md#address)

### Methods

* [NewOwnerEvent](_contracts_models_vault_factory_.vaultfactory.md#newownerevent)
* [VERSION](_contracts_models_vault_factory_.vaultfactory.md#version)
* [VaultCreatedEvent](_contracts_models_vault_factory_.vaultfactory.md#vaultcreatedevent)
* [allEvents](_contracts_models_vault_factory_.vaultfactory.md#allevents)
* [changeVaultDao](_contracts_models_vault_factory_.vaultfactory.md#changevaultdao)
* [createVault](_contracts_models_vault_factory_.vaultfactory.md#createvault)
* [drain](_contracts_models_vault_factory_.vaultfactory.md#drain)
* [getEventful](_contracts_models_vault_factory_.vaultfactory.md#geteventful)
* [getPastEvents](_contracts_models_vault_factory_.vaultfactory.md#getpastevents)
* [getRegistry](_contracts_models_vault_factory_.vaultfactory.md#getregistry)
* [getStorage](_contracts_models_vault_factory_.vaultfactory.md#getstorage)
* [getVaultsByAddress](_contracts_models_vault_factory_.vaultfactory.md#getvaultsbyaddress)
* [once](_contracts_models_vault_factory_.vaultfactory.md#once)
* [owner](_contracts_models_vault_factory_.vaultfactory.md#owner)
* [setBeneficiary](_contracts_models_vault_factory_.vaultfactory.md#setbeneficiary)
* [setFee](_contracts_models_vault_factory_.vaultfactory.md#setfee)
* [setOwner](_contracts_models_vault_factory_.vaultfactory.md#setowner)
* [setRegistry](_contracts_models_vault_factory_.vaultfactory.md#setregistry)
* [setTargetVaultDao](_contracts_models_vault_factory_.vaultfactory.md#settargetvaultdao)
* [createAndValidate](_contracts_models_vault_factory_.vaultfactory.md#createandvalidate)
* [isDeployed](_contracts_models_vault_factory_.vaultfactory.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new VaultFactory**(web3: *`any`*, address: *`string`*): [VaultFactory](_contracts_models_vault_factory_.vaultfactory.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [VaultFactory](_contracts_models_vault_factory_.vaultfactory.md)

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

<a id="newownerevent"></a>

###  NewOwnerEvent

▸ **NewOwnerEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="changevaultdao"></a>

###  changeVaultDao

▸ **changeVaultDao**(_newVaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newVaultDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createvault"></a>

###  createVault

▸ **createVault**(_name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _name | `string` |
| _symbol | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="drain"></a>

###  drain

▸ **drain**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="geteventful"></a>

###  getEventful

▸ **getEventful**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[VaultFactoryEvents](../enums/_contracts_models_vault_factory_.vaultfactoryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultFactoryEvents](../enums/_contracts_models_vault_factory_.vaultfactoryevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="getregistry"></a>

###  getRegistry

▸ **getRegistry**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getstorage"></a>

###  getStorage

▸ **getStorage**(): `Promise`<[`string`, `string`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`]>

___
<a id="getvaultsbyaddress"></a>

###  getVaultsByAddress

▸ **getVaultsByAddress**(_owner: *`string`*): `Promise`<`string`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |

**Returns:** `Promise`<`string`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[VaultFactoryEvents](../enums/_contracts_models_vault_factory_.vaultfactoryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultFactoryEvents](../enums/_contracts_models_vault_factory_.vaultfactoryevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="setbeneficiary"></a>

###  setBeneficiary

▸ **setBeneficiary**(_vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _vaultDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setfee"></a>

###  setFee

▸ **setFee**(_fee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _fee | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setowner"></a>

###  setOwner

▸ **setOwner**(_new: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _new | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setregistry"></a>

###  setRegistry

▸ **setRegistry**(_newRegistry: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newRegistry | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="settargetvaultdao"></a>

###  setTargetVaultDao

▸ **setTargetVaultDao**(_targetVault: *`string`*, _vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _targetVault | `string` |
| _vaultDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[VaultFactory](_contracts_models_vault_factory_.vaultfactory.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[VaultFactory](_contracts_models_vault_factory_.vaultfactory.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

