[@rigoblock/api](../README.md) > ["contracts/models/weth9"](../modules/_contracts_models_weth9_.md) > [WETH9](../classes/_contracts_models_weth9_.weth9.md)

# Class: WETH9

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[WETH9Events](../enums/_contracts_models_weth9_.weth9events.md)>

**↳ WETH9**

## Index

### Constructors

* [constructor](_contracts_models_weth9_.weth9.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_weth9_.weth9.md#rawweb3contract)
* [address](_contracts_models_weth9_.weth9.md#address)

### Methods

* [ApprovalEvent](_contracts_models_weth9_.weth9.md#approvalevent)
* [DepositEvent](_contracts_models_weth9_.weth9.md#depositevent)
* [TransferEvent](_contracts_models_weth9_.weth9.md#transferevent)
* [WithdrawalEvent](_contracts_models_weth9_.weth9.md#withdrawalevent)
* [allEvents](_contracts_models_weth9_.weth9.md#allevents)
* [allowance](_contracts_models_weth9_.weth9.md#allowance)
* [approve](_contracts_models_weth9_.weth9.md#approve)
* [balanceOf](_contracts_models_weth9_.weth9.md#balanceof)
* [decimals](_contracts_models_weth9_.weth9.md#decimals)
* [deposit](_contracts_models_weth9_.weth9.md#deposit)
* [getPastEvents](_contracts_models_weth9_.weth9.md#getpastevents)
* [name](_contracts_models_weth9_.weth9.md#name)
* [once](_contracts_models_weth9_.weth9.md#once)
* [symbol](_contracts_models_weth9_.weth9.md#symbol)
* [totalSupply](_contracts_models_weth9_.weth9.md#totalsupply)
* [transfer](_contracts_models_weth9_.weth9.md#transfer)
* [transferFrom](_contracts_models_weth9_.weth9.md#transferfrom)
* [withdraw](_contracts_models_weth9_.weth9.md#withdraw)
* [createAndValidate](_contracts_models_weth9_.weth9.md#createandvalidate)
* [isDeployed](_contracts_models_weth9_.weth9.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WETH9**(web3: *`any`*, address: *`string`*): [WETH9](_contracts_models_weth9_.weth9.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [WETH9](_contracts_models_weth9_.weth9.md)

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

<a id="approvalevent"></a>

###  ApprovalEvent

▸ **ApprovalEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
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
<a id="transferevent"></a>

###  TransferEvent

▸ **TransferEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="withdrawalevent"></a>

###  WithdrawalEvent

▸ **WithdrawalEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="allowance"></a>

###  allowance

▸ **allowance**(index_0: *`string`*, index_1: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |
| index_1 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="approve"></a>

###  approve

▸ **approve**(guy: *`string`*, wad: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| guy | `string` |
| wad | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="balanceof"></a>

###  balanceOf

▸ **balanceOf**(index_0: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="decimals"></a>

###  decimals

▸ **decimals**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="deposit"></a>

###  deposit

▸ **deposit**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[WETH9Events](../enums/_contracts_models_weth9_.weth9events.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [WETH9Events](../enums/_contracts_models_weth9_.weth9events.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="name"></a>

###  name

▸ **name**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[WETH9Events](../enums/_contracts_models_weth9_.weth9events.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [WETH9Events](../enums/_contracts_models_weth9_.weth9events.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="symbol"></a>

###  symbol

▸ **symbol**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="totalsupply"></a>

###  totalSupply

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="transfer"></a>

###  transfer

▸ **transfer**(dst: *`string`*, wad: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| dst | `string` |
| wad | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="transferfrom"></a>

###  transferFrom

▸ **transferFrom**(src: *`string`*, dst: *`string`*, wad: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| src | `string` |
| dst | `string` |
| wad | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="withdraw"></a>

###  withdraw

▸ **withdraw**(wad: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| wad | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[WETH9](_contracts_models_weth9_.weth9.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[WETH9](_contracts_models_weth9_.weth9.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

