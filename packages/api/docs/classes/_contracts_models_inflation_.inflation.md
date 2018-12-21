[@rigoblock/api](../README.md) > ["contracts/models/inflation"](../modules/_contracts_models_inflation_.md) > [Inflation](../classes/_contracts_models_inflation_.inflation.md)

# Class: Inflation

## Hierarchy

**Inflation**

## Index

### Constructors

* [constructor](_contracts_models_inflation_.inflation.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_inflation_.inflation.md#rawweb3contract)
* [address](_contracts_models_inflation_.inflation.md#address)

### Methods

* [RIGOTOKENADDRESS](_contracts_models_inflation_.inflation.md#rigotokenaddress)
* [authority](_contracts_models_inflation_.inflation.md#authority)
* [canWithdraw](_contracts_models_inflation_.inflation.md#canwithdraw)
* [getInflationFactor](_contracts_models_inflation_.inflation.md#getinflationfactor)
* [minimumGRG](_contracts_models_inflation_.inflation.md#minimumgrg)
* [mintInflation](_contracts_models_inflation_.inflation.md#mintinflation)
* [period](_contracts_models_inflation_.inflation.md#period)
* [proofOfPerformance](_contracts_models_inflation_.inflation.md#proofofperformance)
* [rigoblockDao](_contracts_models_inflation_.inflation.md#rigoblockdao)
* [setAuthority](_contracts_models_inflation_.inflation.md#setauthority)
* [setInflationFactor](_contracts_models_inflation_.inflation.md#setinflationfactor)
* [setMinimumRigo](_contracts_models_inflation_.inflation.md#setminimumrigo)
* [setPeriod](_contracts_models_inflation_.inflation.md#setperiod)
* [setProofOfPerformance](_contracts_models_inflation_.inflation.md#setproofofperformance)
* [setRigoblock](_contracts_models_inflation_.inflation.md#setrigoblock)
* [createAndValidate](_contracts_models_inflation_.inflation.md#createandvalidate)
* [isDeployed](_contracts_models_inflation_.inflation.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Inflation**(web3: *`any`*, address: *`string`*): [Inflation](_contracts_models_inflation_.inflation.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Inflation](_contracts_models_inflation_.inflation.md)

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

<a id="rigotokenaddress"></a>

###  RIGOTOKENADDRESS

▸ **RIGOTOKENADDRESS**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="authority"></a>

###  authority

▸ **authority**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="canwithdraw"></a>

###  canWithdraw

▸ **canWithdraw**(_thePool: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _thePool | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="getinflationfactor"></a>

###  getInflationFactor

▸ **getInflationFactor**(_group: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _group | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="minimumgrg"></a>

###  minimumGRG

▸ **minimumGRG**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="mintinflation"></a>

###  mintInflation

▸ **mintInflation**(_thePool: *`string`*, _reward: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _thePool | `string` |
| _reward | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="period"></a>

###  period

▸ **period**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="proofofperformance"></a>

###  proofOfPerformance

▸ **proofOfPerformance**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="rigoblockdao"></a>

###  rigoblockDao

▸ **rigoblockDao**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="setauthority"></a>

###  setAuthority

▸ **setAuthority**(_authority: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _authority | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setinflationfactor"></a>

###  setInflationFactor

▸ **setInflationFactor**(_group: *`string`*, _inflationFactor: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _group | `string` |
| _inflationFactor | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setminimumrigo"></a>

###  setMinimumRigo

▸ **setMinimumRigo**(_minimum: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _minimum | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setperiod"></a>

###  setPeriod

▸ **setPeriod**(_newPeriod: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newPeriod | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setproofofperformance"></a>

###  setProofOfPerformance

▸ **setProofOfPerformance**(_pop: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _pop | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setrigoblock"></a>

###  setRigoblock

▸ **setRigoblock**(_newRigoblock: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newRigoblock | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Inflation](_contracts_models_inflation_.inflation.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Inflation](_contracts_models_inflation_.inflation.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

