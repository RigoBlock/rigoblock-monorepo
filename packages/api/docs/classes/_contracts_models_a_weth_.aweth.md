[@rigoblock/api](../README.md) > ["contracts/models/a_weth"](../modules/_contracts_models_a_weth_.md) > [AWeth](../classes/_contracts_models_a_weth_.aweth.md)

# Class: AWeth

## Hierarchy

**AWeth**

## Index

### Constructors

* [constructor](_contracts_models_a_weth_.aweth.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_a_weth_.aweth.md#rawweb3contract)
* [address](_contracts_models_a_weth_.aweth.md#address)

### Methods

* [unwrapEth](_contracts_models_a_weth_.aweth.md#unwrapeth)
* [wrapEth](_contracts_models_a_weth_.aweth.md#wrapeth)
* [createAndValidate](_contracts_models_a_weth_.aweth.md#createandvalidate)
* [isDeployed](_contracts_models_a_weth_.aweth.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AWeth**(web3: *`any`*, address: *`string`*): [AWeth](_contracts_models_a_weth_.aweth.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [AWeth](_contracts_models_a_weth_.aweth.md)

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

<a id="unwrapeth"></a>

###  unwrapEth

Allows a manager to withdraw ETH from WETH9

▸ **unwrapEth**(wrapper: *`string`*, amount: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| wrapper | `string` | Address of the weth9 contract | Address of the target exchange |
| amount | `BigNumber` | Value of the Eth in wei | Value of the Eth in wei |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="wrapeth"></a>

###  wrapEth

Allows a manager to deposit eth to an approved exchange/wrap eth

▸ **wrapEth**(wrapper: *`string`*, amount: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| wrapper | `string` |
| amount | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[AWeth](_contracts_models_a_weth_.aweth.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[AWeth](_contracts_models_a_weth_.aweth.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

