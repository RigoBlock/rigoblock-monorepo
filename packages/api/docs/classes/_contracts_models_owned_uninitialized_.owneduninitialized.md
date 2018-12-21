[@rigoblock/api](../README.md) > ["contracts/models/owned_uninitialized"](../modules/_contracts_models_owned_uninitialized_.md) > [OwnedUninitialized](../classes/_contracts_models_owned_uninitialized_.owneduninitialized.md)

# Class: OwnedUninitialized

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[OwnedUninitializedEvents](../enums/_contracts_models_owned_uninitialized_.owneduninitializedevents.md)>

**↳ OwnedUninitialized**

## Index

### Constructors

* [constructor](_contracts_models_owned_uninitialized_.owneduninitialized.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_owned_uninitialized_.owneduninitialized.md#rawweb3contract)
* [address](_contracts_models_owned_uninitialized_.owneduninitialized.md#address)

### Methods

* [NewOwnerEvent](_contracts_models_owned_uninitialized_.owneduninitialized.md#newownerevent)
* [allEvents](_contracts_models_owned_uninitialized_.owneduninitialized.md#allevents)
* [getPastEvents](_contracts_models_owned_uninitialized_.owneduninitialized.md#getpastevents)
* [once](_contracts_models_owned_uninitialized_.owneduninitialized.md#once)
* [owner](_contracts_models_owned_uninitialized_.owneduninitialized.md#owner)
* [setOwner](_contracts_models_owned_uninitialized_.owneduninitialized.md#setowner)
* [createAndValidate](_contracts_models_owned_uninitialized_.owneduninitialized.md#createandvalidate)
* [isDeployed](_contracts_models_owned_uninitialized_.owneduninitialized.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new OwnedUninitialized**(web3: *`any`*, address: *`string`*): [OwnedUninitialized](_contracts_models_owned_uninitialized_.owneduninitialized.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [OwnedUninitialized](_contracts_models_owned_uninitialized_.owneduninitialized.md)

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
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[OwnedUninitializedEvents](../enums/_contracts_models_owned_uninitialized_.owneduninitializedevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [OwnedUninitializedEvents](../enums/_contracts_models_owned_uninitialized_.owneduninitializedevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[OwnedUninitializedEvents](../enums/_contracts_models_owned_uninitialized_.owneduninitializedevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [OwnedUninitializedEvents](../enums/_contracts_models_owned_uninitialized_.owneduninitializedevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

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
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[OwnedUninitialized](_contracts_models_owned_uninitialized_.owneduninitialized.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[OwnedUninitialized](_contracts_models_owned_uninitialized_.owneduninitialized.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

