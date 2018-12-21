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

**Returns:** [DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md)

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

▸ **addGroup**(_group: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _group | `string` |

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

▸ **dragoCount**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="drain"></a>

###  drain

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

▸ **fromAddress**(_drago: *`string`*): `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _drago | `string` |

**Returns:** `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="fromid"></a>

###  fromId

▸ **fromId**(_id: *`BigNumber`*): `Promise`<[`string`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber` |

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="fromname"></a>

###  fromName

▸ **fromName**(_name: *`string`*): `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _name | `string` |

**Returns:** `Promise`<[`BigNumber`, `string`, `string`, `BigNumber`, `string`, `string`]>

___
<a id="getfee"></a>

###  getFee

▸ **getFee**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="getgroups"></a>

###  getGroups

▸ **getGroups**(): `Promise`<`string`[]>

**Returns:** `Promise`<`string`[]>

___
<a id="getnamefromaddress"></a>

###  getNameFromAddress

▸ **getNameFromAddress**(_pool: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _pool | `string` |

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

▸ **getSymbolFromAddress**(_pool: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _pool | `string` |

**Returns:** `Promise`<`string`>

___
<a id="meta"></a>

###  meta

▸ **meta**(_id: *`BigNumber`*, _key: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber` |
| _key | `string` |

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

▸ **register**(_drago: *`string`*, _name: *`string`*, _symbol: *`string`*, _dragoId: *`BigNumber`*, _owner: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _drago | `string` |
| _name | `string` |
| _symbol | `string` |
| _dragoId | `BigNumber` |
| _owner | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

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
<a id="setmeta"></a>

###  setMeta

▸ **setMeta**(_id: *`BigNumber`*, _key: *`string`*, _value: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber` |
| _key | `string` |
| _value | `string` |

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

▸ **setUpgraded**(_version: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _version | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="unregister"></a>

###  unregister

▸ **unregister**(_id: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="updateowner"></a>

###  updateOwner

▸ **updateOwner**(_id: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="updateowners"></a>

###  updateOwners

▸ **updateOwners**(_id: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `BigNumber`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="upgrade"></a>

###  upgrade

▸ **upgrade**(_newAddress: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newAddress | `string` |

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

