[@rigoblock/api](../README.md) > ["contracts/models/drago_factory"](../modules/_contracts_models_drago_factory_.md) > [DragoFactory](../classes/_contracts_models_drago_factory_.dragofactory.md)

# Class: DragoFactory

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[DragoFactoryEvents](../enums/_contracts_models_drago_factory_.dragofactoryevents.md)>

**↳ DragoFactory**

## Index

### Constructors

* [constructor](_contracts_models_drago_factory_.dragofactory.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_drago_factory_.dragofactory.md#rawweb3contract)
* [address](_contracts_models_drago_factory_.dragofactory.md#address)

### Methods

* [DragoCreatedEvent](_contracts_models_drago_factory_.dragofactory.md#dragocreatedevent)
* [NewOwnerEvent](_contracts_models_drago_factory_.dragofactory.md#newownerevent)
* [VERSION](_contracts_models_drago_factory_.dragofactory.md#version)
* [allEvents](_contracts_models_drago_factory_.dragofactory.md#allevents)
* [changeDragoDao](_contracts_models_drago_factory_.dragofactory.md#changedragodao)
* [createDrago](_contracts_models_drago_factory_.dragofactory.md#createdrago)
* [drain](_contracts_models_drago_factory_.dragofactory.md#drain)
* [getDragosByAddress](_contracts_models_drago_factory_.dragofactory.md#getdragosbyaddress)
* [getEventful](_contracts_models_drago_factory_.dragofactory.md#geteventful)
* [getPastEvents](_contracts_models_drago_factory_.dragofactory.md#getpastevents)
* [getRegistry](_contracts_models_drago_factory_.dragofactory.md#getregistry)
* [getStorage](_contracts_models_drago_factory_.dragofactory.md#getstorage)
* [once](_contracts_models_drago_factory_.dragofactory.md#once)
* [owner](_contracts_models_drago_factory_.dragofactory.md#owner)
* [setBeneficiary](_contracts_models_drago_factory_.dragofactory.md#setbeneficiary)
* [setFee](_contracts_models_drago_factory_.dragofactory.md#setfee)
* [setOwner](_contracts_models_drago_factory_.dragofactory.md#setowner)
* [setRegistry](_contracts_models_drago_factory_.dragofactory.md#setregistry)
* [setTargetDragoDao](_contracts_models_drago_factory_.dragofactory.md#settargetdragodao)
* [createAndValidate](_contracts_models_drago_factory_.dragofactory.md#createandvalidate)
* [isDeployed](_contracts_models_drago_factory_.dragofactory.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DragoFactory**(web3: *`any`*, address: *`string`*): [DragoFactory](_contracts_models_drago_factory_.dragofactory.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [DragoFactory](_contracts_models_drago_factory_.dragofactory.md) Bool the transaction executed correctly Array of drago addresses

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

<a id="dragocreatedevent"></a>

###  DragoCreatedEvent

▸ **DragoCreatedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="version"></a>

###  VERSION

▸ **VERSION**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

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
<a id="changedragodao"></a>

###  changeDragoDao

Allows drago dao/factory to update its addressCreates internal record

▸ **changeDragoDao**(_newDragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newDragoDao | `string` | Address of the drago dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createdrago"></a>

###  createDrago

Allows creation of a new drago

▸ **createDrago**(_name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

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
<a id="getdragosbyaddress"></a>

###  getDragosByAddress

Returns an array of dragos the owner has created

▸ **getDragosByAddress**(_owner: *`string`*): `Promise`<`string`[]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _owner | `string` | Address of the queried owner |

**Returns:** `Promise`<`string`[]>

___
<a id="geteventful"></a>

###  getEventful

Returns the address of the logger contractQueries from authority contract

▸ **getEventful**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[DragoFactoryEvents](../enums/_contracts_models_drago_factory_.dragofactoryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoFactoryEvents](../enums/_contracts_models_drago_factory_.dragofactoryevents.md) |
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
<a id="once"></a>

###  once

▸ **once**(eventName: *[DragoFactoryEvents](../enums/_contracts_models_drago_factory_.dragofactoryevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoFactoryEvents](../enums/_contracts_models_drago_factory_.dragofactoryevents.md) |
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

▸ **setBeneficiary**(_dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _dragoDao | `string` | Address of the new drago dao/factory | Address of the new drago dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setfee"></a>

###  setFee

Allows owner to set the drago creation fee

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
<a id="settargetdragodao"></a>

###  setTargetDragoDao

Allows factory owner to update the address of the dao/factoryEnables manual update of dao for single dragos

▸ **setTargetDragoDao**(_targetDrago: *`string`*, _dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _targetDrago | `string` | Address of the target drago |
| _dragoDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[DragoFactory](_contracts_models_drago_factory_.dragofactory.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[DragoFactory](_contracts_models_drago_factory_.dragofactory.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

