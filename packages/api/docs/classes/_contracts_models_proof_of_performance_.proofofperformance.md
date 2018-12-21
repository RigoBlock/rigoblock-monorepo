[@rigoblock/api](../README.md) > ["contracts/models/proof_of_performance"](../modules/_contracts_models_proof_of_performance_.md) > [ProofOfPerformance](../classes/_contracts_models_proof_of_performance_.proofofperformance.md)

# Class: ProofOfPerformance

## Hierarchy

**ProofOfPerformance**

## Index

### Constructors

* [constructor](_contracts_models_proof_of_performance_.proofofperformance.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_proof_of_performance_.proofofperformance.md#rawweb3contract)
* [address](_contracts_models_proof_of_performance_.proofofperformance.md#address)

### Methods

* [RIGOTOKENADDRESS](_contracts_models_proof_of_performance_.proofofperformance.md#rigotokenaddress)
* [claimPop](_contracts_models_proof_of_performance_.proofofperformance.md#claimpop)
* [dragoRegistry](_contracts_models_proof_of_performance_.proofofperformance.md#dragoregistry)
* [getHwm](_contracts_models_proof_of_performance_.proofofperformance.md#gethwm)
* [getPoolData](_contracts_models_proof_of_performance_.proofofperformance.md#getpooldata)
* [rigoblockDao](_contracts_models_proof_of_performance_.proofofperformance.md#rigoblockdao)
* [setRatio](_contracts_models_proof_of_performance_.proofofperformance.md#setratio)
* [setRegistry](_contracts_models_proof_of_performance_.proofofperformance.md#setregistry)
* [setRigoblockDao](_contracts_models_proof_of_performance_.proofofperformance.md#setrigoblockdao)
* [createAndValidate](_contracts_models_proof_of_performance_.proofofperformance.md#createandvalidate)
* [isDeployed](_contracts_models_proof_of_performance_.proofofperformance.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProofOfPerformance**(web3: *`any`*, address: *`string`*): [ProofOfPerformance](_contracts_models_proof_of_performance_.proofofperformance.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [ProofOfPerformance](_contracts_models_proof_of_performance_.proofofperformance.md)

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
<a id="claimpop"></a>

###  claimPop

▸ **claimPop**(_ofPool: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ofPool | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="dragoregistry"></a>

###  dragoRegistry

▸ **dragoRegistry**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="gethwm"></a>

###  getHwm

▸ **getHwm**(_ofPool: *`BigNumber`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ofPool | `BigNumber` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpooldata"></a>

###  getPoolData

▸ **getPoolData**(_ofPool: *`BigNumber`*): `Promise`<[`boolean`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ofPool | `BigNumber` |

**Returns:** `Promise`<[`boolean`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`]>

___
<a id="rigoblockdao"></a>

###  rigoblockDao

▸ **rigoblockDao**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="setratio"></a>

###  setRatio

▸ **setRatio**(_ofGroup: *`string`*, _ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ofGroup | `string` |
| _ratio | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setregistry"></a>

###  setRegistry

▸ **setRegistry**(_dragoRegistry: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoRegistry | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setrigoblockdao"></a>

###  setRigoblockDao

▸ **setRigoblockDao**(_rigoblockDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _rigoblockDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[ProofOfPerformance](_contracts_models_proof_of_performance_.proofofperformance.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[ProofOfPerformance](_contracts_models_proof_of_performance_.proofofperformance.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

