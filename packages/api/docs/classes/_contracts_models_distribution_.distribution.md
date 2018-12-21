[@rigoblock/api](../README.md) > ["contracts/models/distribution"](../modules/_contracts_models_distribution_.md) > [Distribution](../classes/_contracts_models_distribution_.distribution.md)

# Class: Distribution

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[DistributionEvents](../enums/_contracts_models_distribution_.distributionevents.md)>

**↳ Distribution**

## Index

### Constructors

* [constructor](_contracts_models_distribution_.distribution.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_distribution_.distribution.md#rawweb3contract)
* [address](_contracts_models_distribution_.distribution.md#address)

### Methods

* [SubscriptionEvent](_contracts_models_distribution_.distribution.md#subscriptionevent)
* [allEvents](_contracts_models_distribution_.distribution.md#allevents)
* [getFee](_contracts_models_distribution_.distribution.md#getfee)
* [getPastEvents](_contracts_models_distribution_.distribution.md#getpastevents)
* [once](_contracts_models_distribution_.distribution.md#once)
* [setFee](_contracts_models_distribution_.distribution.md#setfee)
* [subscribe](_contracts_models_distribution_.distribution.md#subscribe)
* [createAndValidate](_contracts_models_distribution_.distribution.md#createandvalidate)
* [isDeployed](_contracts_models_distribution_.distribution.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Distribution**(web3: *`any`*, address: *`string`*): [Distribution](_contracts_models_distribution_.distribution.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Distribution](_contracts_models_distribution_.distribution.md)

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

<a id="subscriptionevent"></a>

###  SubscriptionEvent

▸ **SubscriptionEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="getfee"></a>

###  getFee

▸ **getFee**(_distributor: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _distributor | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[DistributionEvents](../enums/_contracts_models_distribution_.distributionevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DistributionEvents](../enums/_contracts_models_distribution_.distributionevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[DistributionEvents](../enums/_contracts_models_distribution_.distributionevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DistributionEvents](../enums/_contracts_models_distribution_.distributionevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="setfee"></a>

###  setFee

▸ **setFee**(_fee: *`BigNumber`*, _distributor: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _fee | `BigNumber` |
| _distributor | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="subscribe"></a>

###  subscribe

▸ **subscribe**(_pool: *`string`*, _distributor: *`string`*, _buyer: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _pool | `string` |
| _distributor | `string` |
| _buyer | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Distribution](_contracts_models_distribution_.distribution.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Distribution](_contracts_models_distribution_.distribution.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

