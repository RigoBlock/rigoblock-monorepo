---
category: "API reference"
---


[@rigoblock/api](../quick_start.md) > ["contracts/models/h_get_drago_data"](../modules/_contracts_models_h_get_drago_data_.md) > [HGetDragoData](../classes/_contracts_models_h_get_drago_data_.hgetdragodata.md)

# Class: HGetDragoData

## Hierarchy

**HGetDragoData**

## Index

### Constructors

* [constructor](_contracts_models_h_get_drago_data_.hgetdragodata.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_h_get_drago_data_.hgetdragodata.md#rawweb3contract)
* [address](_contracts_models_h_get_drago_data_.hgetdragodata.md#address)

### Methods

* [queryDataFromAddress](_contracts_models_h_get_drago_data_.hgetdragodata.md#querydatafromaddress)
* [queryDataFromId](_contracts_models_h_get_drago_data_.hgetdragodata.md#querydatafromid)
* [queryMultiDataFromAddress](_contracts_models_h_get_drago_data_.hgetdragodata.md#querymultidatafromaddress)
* [queryMultiDataFromId](_contracts_models_h_get_drago_data_.hgetdragodata.md#querymultidatafromid)
* [createAndValidate](_contracts_models_h_get_drago_data_.hgetdragodata.md#createandvalidate)
* [isDeployed](_contracts_models_h_get_drago_data_.hgetdragodata.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HGetDragoData**(web3: *`any`*, address: *`string`*): [HGetDragoData](_contracts_models_h_get_drago_data_.hgetdragodata.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [HGetDragoData](_contracts_models_h_get_drago_data_.hgetdragodata.md)

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

<a id="querydatafromaddress"></a>

###  queryDataFromAddress

▸ **queryDataFromAddress**(_dragoRegistry: *`string`*, _dragoAddress: *`string`*): `Promise`<`object`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoRegistry | `string` |
| _dragoAddress | `string` |

**Returns:** `Promise`<`object`>

___
<a id="querydatafromid"></a>

###  queryDataFromId

▸ **queryDataFromId**(_dragoRegistry: *`string`*, _dragoId: *`BigNumber`*): `Promise`<`object`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoRegistry | `string` |
| _dragoId | `BigNumber` |

**Returns:** `Promise`<`object`>

___
<a id="querymultidatafromaddress"></a>

###  queryMultiDataFromAddress

▸ **queryMultiDataFromAddress**(_dragoRegistry: *`string`*, _dragoAddresses: *`string`[]*): `Promise`<`Array`<`object`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoRegistry | `string` |
| _dragoAddresses | `string`[] |

**Returns:** `Promise`<`Array`<`object`>>

___
<a id="querymultidatafromid"></a>

###  queryMultiDataFromId

▸ **queryMultiDataFromId**(_dragoRegistry: *`string`*, _dragoIds: *`BigNumber`[]*): `Promise`<`Array`<`object`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoRegistry | `string` |
| _dragoIds | `BigNumber`[] |

**Returns:** `Promise`<`Array`<`object`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[HGetDragoData](_contracts_models_h_get_drago_data_.hgetdragodata.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[HGetDragoData](_contracts_models_h_get_drago_data_.hgetdragodata.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

