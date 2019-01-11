[@rigoblock/api](../README.md) > ["contracts/models/a_ethfinex"](../modules/_contracts_models_a_ethfinex_.md) > [AEthfinex](../classes/_contracts_models_a_ethfinex_.aethfinex.md)

# Class: AEthfinex

## Hierarchy

**AEthfinex**

## Index

### Constructors

* [constructor](_contracts_models_a_ethfinex_.aethfinex.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_a_ethfinex_.aethfinex.md#rawweb3contract)
* [address](_contracts_models_a_ethfinex_.aethfinex.md#address)

### Methods

* [unwrap](_contracts_models_a_ethfinex_.aethfinex.md#unwrap)
* [wrapToEfx](_contracts_models_a_ethfinex_.aethfinex.md#wraptoefx)
* [createAndValidate](_contracts_models_a_ethfinex_.aethfinex.md#createandvalidate)
* [isDeployed](_contracts_models_a_ethfinex_.aethfinex.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AEthfinex**(web3: *`any`*, address: *`string`*): [AEthfinex](_contracts_models_a_ethfinex_.aethfinex.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [AEthfinex](_contracts_models_a_ethfinex_.aethfinex.md)

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

<a id="unwrap"></a>

###  unwrap

Unwraps eth or tokens from the ethfinex wrappers.

▸ **unwrap**(token: *`string`*, wrapper: *`string`*, value: *`BigNumber`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*, signatureValidUntilBlock: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| token | `string` | Address of the base token. | Address of the base token. |
| wrapper | `string` | Address of the token wrapper. | Address of the token wrapper. |
| value | `BigNumber` | Number of tokens to withdraw. |
| v | `number` | `BigNumber` | ECDSA signature parameter v. |
| r | `string` | ECDSA signature parameters r. |
| s | `string` | ECDSA signature parameters s. |
| signatureValidUntilBlock | `BigNumber` | Signature for withdrawing before lockup. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="wraptoefx"></a>

###  wrapToEfx

Wraps eth or tokens to the ethfinex wrappers.

▸ **wrapToEfx**(token: *`string`*, wrapper: *`string`*, amount: *`BigNumber`*, forTime: *`BigNumber`*, erc20Old: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| token | `string` |
| wrapper | `string` |
| amount | `BigNumber` | Number of tokens. |
| forTime | `BigNumber` | Number of hours for lockup. |
| erc20Old | `boolean` | Bool is an old ERC20. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[AEthfinex](_contracts_models_a_ethfinex_.aethfinex.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[AEthfinex](_contracts_models_a_ethfinex_.aethfinex.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

