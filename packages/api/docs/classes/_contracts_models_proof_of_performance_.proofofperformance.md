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

**Returns:** [ProofOfPerformance](_contracts_models_proof_of_performance_.proofofperformance.md) Value of the all-time-high pool nav. Bool the pool is active.address of the pool.address of the pool factory.price of the pool in wei.total supply of the pool in units.total value of the pool in wei.value of the reward factor or said pool.ratio of assets/performance reward (from 0 to 10000).value of the pop reward to be claimed in GRGs.

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

Allows anyone to allocate the pop reward to pool wizards.

▸ **claimPop**(_ofPool: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _ofPool | `BigNumber` | Number of pool id in registry. | Id of the pool. | Id of the pool. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="dragoregistry"></a>

###  dragoRegistry

▸ **dragoRegistry**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="gethwm"></a>

###  getHwm

Returns the highwatermark of a pool.

▸ **getHwm**(_ofPool: *`BigNumber`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _ofPool | `BigNumber` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpooldata"></a>

###  getPoolData

Gets data of a pool.

▸ **getPoolData**(_ofPool: *`BigNumber`*): `Promise`<[`boolean`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
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

Allows RigoBlock Dao to set the ratio between assets and performance reward for a group.

▸ **setRatio**(_ofGroup: *`string`*, _ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _ofGroup | `string` | Id of the pool. |
| _ratio | `BigNumber` | Id of the pool. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setregistry"></a>

###  setRegistry

Allows RigoBlock Dao to update the pools registry.

▸ **setRegistry**(_dragoRegistry: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _dragoRegistry | `string` | Address of new registry. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setrigoblockdao"></a>

###  setRigoblockDao

Allows RigoBlock Dao to update its address.

▸ **setRigoblockDao**(_rigoblockDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _rigoblockDao | `string` | Address of new dao. |

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

