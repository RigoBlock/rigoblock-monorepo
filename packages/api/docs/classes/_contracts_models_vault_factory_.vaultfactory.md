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

**Returns:** [VaultFactory](_contracts_models_vault_factory_.vaultfactory.md) Bool the transaction executed correctly Array of vault addresses

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

Allows vault dao/factory to update its addressCreates internal record

▸ **changeVaultDao**(_newVaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newVaultDao | `string` | Address of the vault dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createvault"></a>

###  createVault

Allows creation of a new vault

▸ **createVault**(_name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _name | `string` | String of the name |
| _symbol | `string` | String of the symbol |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="drain"></a>

###  drain

Allows owner to collect fees

▸ **drain**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="geteventful"></a>

###  getEventful

Returns the address of the logger contractQueries from authority contract

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

Returns the address of the pool registry

▸ **getRegistry**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getstorage"></a>

###  getStorage

Returns administrative data for this factory

▸ **getStorage**(): `Promise`<[`string`, `string`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`]>

___
<a id="getvaultsbyaddress"></a>

###  getVaultsByAddress

Returns an array of vaults the owner has created

▸ **getVaultsByAddress**(_owner: *`string`*): `Promise`<`string`[]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _owner | `string` | Address of the queried owner |

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

Allows owner to set the address which can collect creation fees

▸ **setBeneficiary**(_vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _vaultDao | `string` | Address of the new vault dao/factory | Address of the new vault dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setfee"></a>

###  setFee

Allows owner to set the vault creation fee

▸ **setFee**(_fee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _fee | `BigNumber` | Value of the fee in wei |

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

Allows owner to update the registry

▸ **setRegistry**(_newRegistry: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newRegistry | `string` | Address of the new registry |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="settargetvaultdao"></a>

###  setTargetVaultDao

Allows factory owner to update the address of the dao/factoryEnables manual update of dao for single vaults

▸ **setTargetVaultDao**(_targetVault: *`string`*, _vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _targetVault | `string` | Address of the target vault |
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

