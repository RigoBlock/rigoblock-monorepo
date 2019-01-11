[@rigoblock/api](../README.md) > ["contracts/models/erc20"](../modules/_contracts_models_erc20_.md) > [ERC20](../classes/_contracts_models_erc20_.erc20.md)

# Class: ERC20

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[ERC20Events](../enums/_contracts_models_erc20_.erc20events.md)>

**↳ ERC20**

## Index

### Constructors

* [constructor](_contracts_models_erc20_.erc20.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_erc20_.erc20.md#rawweb3contract)
* [address](_contracts_models_erc20_.erc20.md#address)

### Methods

* [ApprovalEvent](_contracts_models_erc20_.erc20.md#approvalevent)
* [TransferEvent](_contracts_models_erc20_.erc20.md#transferevent)
* [allEvents](_contracts_models_erc20_.erc20.md#allevents)
* [allowance](_contracts_models_erc20_.erc20.md#allowance)
* [approve](_contracts_models_erc20_.erc20.md#approve)
* [balanceOf](_contracts_models_erc20_.erc20.md#balanceof)
* [getPastEvents](_contracts_models_erc20_.erc20.md#getpastevents)
* [once](_contracts_models_erc20_.erc20.md#once)
* [totalSupply](_contracts_models_erc20_.erc20.md#totalsupply)
* [transfer](_contracts_models_erc20_.erc20.md#transfer)
* [transferFrom](_contracts_models_erc20_.erc20.md#transferfrom)
* [createAndValidate](_contracts_models_erc20_.erc20.md#createandvalidate)
* [isDeployed](_contracts_models_erc20_.erc20.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ERC20**(web3: *`any`*, address: *`string`*): [ERC20](_contracts_models_erc20_.erc20.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [ERC20](_contracts_models_erc20_.erc20.md)

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
| _value | `BigNumber` |

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

▸ **getPastEvents**(eventName: *[ERC20Events](../enums/_contracts_models_erc20_.erc20events.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ERC20Events](../enums/_contracts_models_erc20_.erc20events.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[ERC20Events](../enums/_contracts_models_erc20_.erc20events.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ERC20Events](../enums/_contracts_models_erc20_.erc20events.md) |
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
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="transferfrom"></a>

###  transferFrom

▸ **transferFrom**(_from: *`string`*, _to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _from | `string` |
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[ERC20](_contracts_models_erc20_.erc20.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[ERC20](_contracts_models_erc20_.erc20.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

