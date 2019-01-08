[@rigoblock/api](../README.md) > ["contracts/models/owned"](../modules/_contracts_models_owned_.md) > [Owned](../classes/_contracts_models_owned_.owned.md)

# Class: Owned

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[OwnedEvents](../enums/_contracts_models_owned_.ownedevents.md)>

**↳ Owned**

## Index

### Constructors

* [constructor](_contracts_models_owned_.owned.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_owned_.owned.md#rawweb3contract)
* [address](_contracts_models_owned_.owned.md#address)

### Methods

* [NewOwnerEvent](_contracts_models_owned_.owned.md#newownerevent)
* [allEvents](_contracts_models_owned_.owned.md#allevents)
* [getPastEvents](_contracts_models_owned_.owned.md#getpastevents)
* [once](_contracts_models_owned_.owned.md#once)
* [owner](_contracts_models_owned_.owned.md#owner)
* [setOwner](_contracts_models_owned_.owned.md#setowner)
* [createAndValidate](_contracts_models_owned_.owned.md#createandvalidate)
* [isDeployed](_contracts_models_owned_.owned.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Owned**(web3: *`any`*, address: *`string`*): [Owned](_contracts_models_owned_.owned.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Owned](_contracts_models_owned_.owned.md)

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

▸ **getPastEvents**(eventName: *[OwnedEvents](../enums/_contracts_models_owned_.ownedevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [OwnedEvents](../enums/_contracts_models_owned_.ownedevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[OwnedEvents](../enums/_contracts_models_owned_.ownedevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [OwnedEvents](../enums/_contracts_models_owned_.ownedevents.md) |
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

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Owned](_contracts_models_owned_.owned.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Owned](_contracts_models_owned_.owned.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

