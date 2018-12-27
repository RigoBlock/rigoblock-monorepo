[@rigoblock/api](../README.md) > ["contracts/models/drago_registry"](../modules/_contracts_models_drago_registry_.md) > [DragoRegistry](../classes/_contracts_models_drago_registry_.dragoregistry.md)

# Class: DragoRegistry

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[DragoRegistryEvents](../enums/_contracts_models_drago_registry_.dragoregistryevents.md)>

**↳ DragoRegistry**

## Index

### Constructors

* [constructor](_contracts_models_drago_registry_.dragoregistry.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_drago_registry_.dragoregistry.md#rawweb3contract)
* [address](_contracts_models_drago_registry_.dragoregistry.md#address)

### Methods

* [AUTHORITY](_contracts_models_drago_registry_.dragoregistry.md#authority)
* [MetaChangedEvent](_contracts_models_drago_registry_.dragoregistry.md#metachangedevent)
* [NewOwnerEvent](_contracts_models_drago_registry_.dragoregistry.md#newownerevent)
* [RegisteredEvent](_contracts_models_drago_registry_.dragoregistry.md#registeredevent)
* [UnregisteredEvent](_contracts_models_drago_registry_.dragoregistry.md#unregisteredevent)
* [VERSION](_contracts_models_drago_registry_.dragoregistry.md#version)
* [addGroup](_contracts_models_drago_registry_.dragoregistry.md#addgroup)
* [allEvents](_contracts_models_drago_registry_.dragoregistry.md#allevents)
* [dragoCount](_contracts_models_drago_registry_.dragoregistry.md#dragocount)
* [drain](_contracts_models_drago_registry_.dragoregistry.md#drain)
* [fee](_contracts_models_drago_registry_.dragoregistry.md#fee)
* [fromAddress](_contracts_models_drago_registry_.dragoregistry.md#fromaddress)
* [fromId](_contracts_models_drago_registry_.dragoregistry.md#fromid)
* [fromName](_contracts_models_drago_registry_.dragoregistry.md#fromname)
* [getFee](_contracts_models_drago_registry_.dragoregistry.md#getfee)
* [getGroups](_contracts_models_drago_registry_.dragoregistry.md#getgroups)
* [getNameFromAddress](_contracts_models_drago_registry_.dragoregistry.md#getnamefromaddress)
* [getPastEvents](_contracts_models_drago_registry_.dragoregistry.md#getpastevents)
* [getSymbolFromAddress](_contracts_models_drago_registry_.dragoregistry.md#getsymbolfromaddress)
* [meta](_contracts_models_drago_registry_.dragoregistry.md#meta)
* [once](_contracts_models_drago_registry_.dragoregistry.md#once)
* [owner](_contracts_models_drago_registry_.dragoregistry.md#owner)
* [register](_contracts_models_drago_registry_.dragoregistry.md#register)
* [setFee](_contracts_models_drago_registry_.dragoregistry.md#setfee)
* [setMeta](_contracts_models_drago_registry_.dragoregistry.md#setmeta)
* [setOwner](_contracts_models_drago_registry_.dragoregistry.md#setowner)
* [setUpgraded](_contracts_models_drago_registry_.dragoregistry.md#setupgraded)
* [unregister](_contracts_models_drago_registry_.dragoregistry.md#unregister)
* [updateOwner](_contracts_models_drago_registry_.dragoregistry.md#updateowner)
* [updateOwners](_contracts_models_drago_registry_.dragoregistry.md#updateowners)
* [upgrade](_contracts_models_drago_registry_.dragoregistry.md#upgrade)
* [createAndValidate](_contracts_models_drago_registry_.dragoregistry.md#createandvalidate)
* [isDeployed](_contracts_models_drago_registry_.dragoregistry.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DragoRegistry**(web3: *`any`*, address: *`string`*): [DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md) Pool struct data Pool struct data Pool struct data Name of the pool Symbol of the pool Pool metadata

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
<a id="metachangedevent"></a>

###  MetaChangedEvent

▸ **MetaChangedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
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
<a id="registeredevent"></a>

###  RegisteredEvent

▸ **RegisteredEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="unregisteredevent"></a>

###  UnregisteredEvent

▸ **UnregisteredEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="version"></a>

###  VERSION

▸ **VERSION**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="addgroup"></a>

###  addGroup

Allows owner to add a group of pools (a factory)

▸ **addGroup**(_group: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _group | `string` | Address of the new group |

**Returns:** `Promise`<`TransactionObject`<`void`>>

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
<a id="dragocount"></a>

###  dragoCount

Provides the total number of registered pools

▸ **dragoCount**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="drain"></a>

###  drain

Allows owner to collect fees by draining the balance

▸ **drain**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="fee"></a>

###  fee

▸ **fee**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="fromaddress"></a>

###  fromAddress

Provides a pool's struct data

▸ **fromAddress**(_drago: *`string`*): `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _drago | `string` | Address of the pool | Address of the pool |

**Returns:** `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="fromid"></a>

###  fromId

Provides a pool's struct data

▸ **fromId**(_id: *`BigNumber`*): `Promise`<[`string`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber` | Registration number of the pool | Id number of the pool | Number corresponding to pool id | Number of the pool | uint256 of the target pool | uint256 of the target pool |

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="fromname"></a>

###  fromName

Provides a pool's struct data

▸ **fromName**(_name: *`string`*): `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _name | `string` | Name of the pool | Name of the pool |

**Returns:** `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="getfee"></a>

###  getFee

Provides the fee required to register a pool

▸ **getFee**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="getgroups"></a>

###  getGroups

Provides the addresses of the groups/factories

▸ **getGroups**(): `Promise`<`string`[]>

**Returns:** `Promise`<`string`[]>

___
<a id="getnamefromaddress"></a>

###  getNameFromAddress

Provides a pool's name from its address

▸ **getNameFromAddress**(_pool: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _pool | `string` | Address of the pool | Address of the pool |

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[DragoRegistryEvents](../enums/_contracts_models_drago_registry_.dragoregistryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoRegistryEvents](../enums/_contracts_models_drago_registry_.dragoregistryevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="getsymbolfromaddress"></a>

###  getSymbolFromAddress

Provides a pool's symbol from its address

▸ **getSymbolFromAddress**(_pool: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _pool | `string` |

**Returns:** `Promise`<`string`>

___
<a id="meta"></a>

###  meta

Provides a pool's metadata

▸ **meta**(_id: *`BigNumber`*, _key: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber` |
| _key | `string` | Bytes32 key | Bytes32 of the key |

**Returns:** `Promise`<`string`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[DragoRegistryEvents](../enums/_contracts_models_drago_registry_.dragoregistryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoRegistryEvents](../enums/_contracts_models_drago_registry_.dragoregistryevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="register"></a>

###  register

Allows a factory which is an authority to register a pool

▸ **register**(_drago: *`string`*, _name: *`string`*, _symbol: *`string`*, _dragoId: *`BigNumber`*, _owner: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _drago | `string` |
| _name | `string` |
| _symbol | `string` | Symbol of the pool |
| _dragoId | `BigNumber` | Id number of the pool |
| _owner | `string` | Address of the pool owner |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="setfee"></a>

###  setFee

Allows owner to set a fee to register pools

▸ **setFee**(_fee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _fee | `BigNumber` | Value of the fee in wei |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setmeta"></a>

###  setMeta

Allows pool owner to set metadata for a pool

▸ **setMeta**(_id: *`BigNumber`*, _key: *`string`*, _value: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber` |
| _key | `string` |
| _value | `string` | Bytes32 of the value |

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
<a id="setupgraded"></a>

###  setUpgraded

Allows owner to update version on registry upgrade

▸ **setUpgraded**(_version: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _version | `BigNumber` | Number of the new version |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="unregister"></a>

###  unregister

Allows owner to unregister a pool

▸ **unregister**(_id: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="updateowner"></a>

###  updateOwner

Allows anyone to update the owner in the registry

▸ **updateOwner**(_id: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="updateowners"></a>

###  updateOwners

Allows anyone to update many owners if they differ from registered

▸ **updateOwners**(_id: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _id | `BigNumber`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="upgrade"></a>

###  upgrade

Allows owner to create a new registry.When the registry gets upgraded, a migration of all funds is required

▸ **upgrade**(_newAddress: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newAddress | `string` | Address of new registry. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

