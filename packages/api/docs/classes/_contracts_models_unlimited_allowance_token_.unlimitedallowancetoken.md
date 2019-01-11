[@rigoblock/api](../README.md) > ["contracts/models/unlimited_allowance_token"](../modules/_contracts_models_unlimited_allowance_token_.md) > [UnlimitedAllowanceToken](../classes/_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md)

# Class: UnlimitedAllowanceToken

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[UnlimitedAllowanceTokenEvents](../enums/_contracts_models_unlimited_allowance_token_.unlimitedallowancetokenevents.md)>

**↳ UnlimitedAllowanceToken**

## Index

### Constructors

* [constructor](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#rawweb3contract)
* [address](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#address)

### Methods

* [ApprovalEvent](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#approvalevent)
* [TransferEvent](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#transferevent)
* [allEvents](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#allevents)
* [allowance](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#allowance)
* [approve](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#approve)
* [balanceOf](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#balanceof)
* [getPastEvents](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#getpastevents)
* [once](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#once)
* [totalSupply](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#totalsupply)
* [transfer](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#transfer)
* [transferFrom](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#transferfrom)
* [createAndValidate](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#createandvalidate)
* [isDeployed](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new UnlimitedAllowanceToken**(web3: *`any`*, address: *`string`*): [UnlimitedAllowanceToken](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [UnlimitedAllowanceToken](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md) Success of transfer.

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

▸ **allowance**(_owner: *`string`*, _spender: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |
| _spender | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="approve"></a>

###  approve

▸ **approve**(_spender: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _spender | `string` |
| _value | `BigNumber` | Amount to transfer. |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="balanceof"></a>

###  balanceOf

▸ **balanceOf**(_owner: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[UnlimitedAllowanceTokenEvents](../enums/_contracts_models_unlimited_allowance_token_.unlimitedallowancetokenevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [UnlimitedAllowanceTokenEvents](../enums/_contracts_models_unlimited_allowance_token_.unlimitedallowancetokenevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[UnlimitedAllowanceTokenEvents](../enums/_contracts_models_unlimited_allowance_token_.unlimitedallowancetokenevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [UnlimitedAllowanceTokenEvents](../enums/_contracts_models_unlimited_allowance_token_.unlimitedallowancetokenevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="totalsupply"></a>

###  totalSupply

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="transfer"></a>

###  transfer

▸ **transfer**(_to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _to | `string` | Address to transfer to. |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="transferfrom"></a>

###  transferFrom

ERC20 transferFrom, modified such that an allowance of MAX_UINT represents an unlimited allowance.

▸ **transferFrom**(_from: *`string`*, _to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _from | `string` | Address to transfer from. |
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[UnlimitedAllowanceToken](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[UnlimitedAllowanceToken](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

