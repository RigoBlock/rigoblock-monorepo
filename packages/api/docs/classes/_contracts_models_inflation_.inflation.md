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

**Returns:** [Inflation](_contracts_models_inflation_.inflation.md) Bool the wizard can claim Value of the reward factor Bool the transaction executed correctly

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

Returns whether a wizard can claim reward tokens

▸ **canWithdraw**(_thePool: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _thePool | `string` | Address of the target pool | Address of the target pool |

**Returns:** `Promise`<`boolean`>

___
<a id="getinflationfactor"></a>

###  getInflationFactor

Return the reward factor for a group

▸ **getInflationFactor**(_group: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _group | `string` | Address of the group | Address of the group/factory |

**Returns:** `Promise`<`BigNumber`>

___
<a id="minimumgrg"></a>

###  minimumGRG

▸ **minimumGRG**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="mintinflation"></a>

###  mintInflation

Allows ProofOfPerformance to mint rewards

▸ **mintInflation**(_thePool: *`string`*, _reward: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _thePool | `string` |
| _reward | `BigNumber` | Number of reward in Rigo tokens |

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

Allows rigoblock dao to update the authority

▸ **setAuthority**(_authority: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _authority | `string` | Address of the authority |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setinflationfactor"></a>

###  setInflationFactor

Allows rigoblock dao to set the inflation factor for a group

▸ **setInflationFactor**(_group: *`string`*, _inflationFactor: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _group | `string` |
| _inflationFactor | `BigNumber` | Value of the reward factor |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setminimumrigo"></a>

###  setMinimumRigo

Allows rigoblock dao to set the minimum number of required tokens

▸ **setMinimumRigo**(_minimum: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _minimum | `BigNumber` | Number of minimum tokens |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setperiod"></a>

###  setPeriod

Allows rigoblock dao to set the minimum time between reward collection

▸ **setPeriod**(_newPeriod: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newPeriod | `BigNumber` | Number of blocks from 2 rewards |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setproofofperformance"></a>

###  setProofOfPerformance

Allows rigoblock dao to update proof of performance

▸ **setProofOfPerformance**(_pop: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _pop | `string` | Address of the Proof of Performance contract |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setrigoblock"></a>

###  setRigoblock

Allows rigoblock dao to upgrade its address

▸ **setRigoblock**(_newRigoblock: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newRigoblock | `string` | Address of the new rigoblock dao |

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

