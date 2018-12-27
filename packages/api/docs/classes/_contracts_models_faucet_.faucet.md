[@rigoblock/api](../README.md) > ["contracts/models/faucet"](../modules/_contracts_models_faucet_.md) > [Faucet](../classes/_contracts_models_faucet_.faucet.md)

# Class: Faucet

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[FaucetEvents](../enums/_contracts_models_faucet_.faucetevents.md)>

**↳ Faucet**

## Index

### Constructors

* [constructor](_contracts_models_faucet_.faucet.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_faucet_.faucet.md#rawweb3contract)
* [address](_contracts_models_faucet_.faucet.md#address)

### Methods

* [DepositEvent](_contracts_models_faucet_.faucet.md#depositevent)
* [FaucetOffEvent](_contracts_models_faucet_.faucet.md#faucetoffevent)
* [FaucetOnEvent](_contracts_models_faucet_.faucet.md#faucetonevent)
* [NewOwnerEvent](_contracts_models_faucet_.faucet.md#newownerevent)
* [OneTokenSentEvent](_contracts_models_faucet_.faucet.md#onetokensentevent)
* [allEvents](_contracts_models_faucet_.faucet.md#allevents)
* [drip1Token](_contracts_models_faucet_.faucet.md#drip1token)
* [faucetName](_contracts_models_faucet_.faucet.md#faucetname)
* [faucetStatus](_contracts_models_faucet_.faucet.md#faucetstatus)
* [getPastEvents](_contracts_models_faucet_.faucet.md#getpastevents)
* [once](_contracts_models_faucet_.faucet.md#once)
* [owner](_contracts_models_faucet_.faucet.md#owner)
* [setOwner](_contracts_models_faucet_.faucet.md#setowner)
* [tokenInstance](_contracts_models_faucet_.faucet.md#tokeninstance)
* [turnFaucetOff](_contracts_models_faucet_.faucet.md#turnfaucetoff)
* [turnFaucetOn](_contracts_models_faucet_.faucet.md#turnfauceton)
* [withdraw](_contracts_models_faucet_.faucet.md#withdraw)
* [createAndValidate](_contracts_models_faucet_.faucet.md#createandvalidate)
* [isDeployed](_contracts_models_faucet_.faucet.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Faucet**(web3: *`any`*, address: *`string`*): [Faucet](_contracts_models_faucet_.faucet.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Faucet](_contracts_models_faucet_.faucet.md) bool on success

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

<a id="depositevent"></a>

###  DepositEvent

▸ **DepositEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="faucetoffevent"></a>

###  FaucetOffEvent

▸ **FaucetOffEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="faucetonevent"></a>

###  FaucetOnEvent

▸ **FaucetOnEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="onetokensentevent"></a>

###  OneTokenSentEvent

▸ **OneTokenSentEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="drip1token"></a>

###  drip1Token

Send 1000 Token with a minimum time lock of 1 hour

▸ **drip1Token**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="faucetname"></a>

###  faucetName

▸ **faucetName**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="faucetstatus"></a>

###  faucetStatus

▸ **faucetStatus**(): `Promise`<`boolean`>

**Returns:** `Promise`<`boolean`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[FaucetEvents](../enums/_contracts_models_faucet_.faucetevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [FaucetEvents](../enums/_contracts_models_faucet_.faucetevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[FaucetEvents](../enums/_contracts_models_faucet_.faucetevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [FaucetEvents](../enums/_contracts_models_faucet_.faucetevents.md) |
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
<a id="tokeninstance"></a>

###  tokenInstance

▸ **tokenInstance**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="turnfaucetoff"></a>

###  turnFaucetOff

Turn faucet off

▸ **turnFaucetOff**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="turnfauceton"></a>

###  turnFaucetOn

Turn faucet on

▸ **turnFaucetOn**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="withdraw"></a>

###  withdraw

Allow withdrawal from the owner

▸ **withdraw**(_value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Faucet](_contracts_models_faucet_.faucet.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Faucet](_contracts_models_faucet_.faucet.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

