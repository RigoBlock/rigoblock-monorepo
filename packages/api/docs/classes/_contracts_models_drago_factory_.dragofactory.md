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

**Returns:** [DragoFactory](_contracts_models_drago_factory_.dragofactory.md)

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

▸ **changeDragoDao**(_newDragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newDragoDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createdrago"></a>

###  createDrago

▸ **createDrago**(_name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

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
<a id="getdragosbyaddress"></a>

###  getDragosByAddress

▸ **getDragosByAddress**(_owner: *`string`*): `Promise`<`string`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |

**Returns:** `Promise`<`string`[]>

___
<a id="geteventful"></a>

###  getEventful

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

▸ **getRegistry**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getstorage"></a>

###  getStorage

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

▸ **setBeneficiary**(_dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoDao | `string` |

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
<a id="settargetdragodao"></a>

###  setTargetDragoDao

▸ **setTargetDragoDao**(_targetDrago: *`string`*, _dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _targetDrago | `string` |
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

