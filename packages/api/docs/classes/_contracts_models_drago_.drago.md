[@rigoblock/api](../README.md) > ["contracts/models/drago"](../modules/_contracts_models_drago_.md) > [Drago](../classes/_contracts_models_drago_.drago.md)

# Class: Drago

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[DragoEvents](../enums/_contracts_models_drago_.dragoevents.md)>

**↳ Drago**

## Index

### Constructors

* [constructor](_contracts_models_drago_.drago.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_drago_.drago.md#rawweb3contract)
* [address](_contracts_models_drago_.drago.md#address)

### Methods

* [NewOwnerEvent](_contracts_models_drago_.drago.md#newownerevent)
* [allEvents](_contracts_models_drago_.drago.md#allevents)
* [balanceOf](_contracts_models_drago_.drago.md#balanceof)
* [batchOperateOnExchange](_contracts_models_drago_.drago.md#batchoperateonexchange)
* [buyDrago](_contracts_models_drago_.drago.md#buydrago)
* [buyDragoOnBehalf](_contracts_models_drago_.drago.md#buydragoonbehalf)
* [calcSharePrice](_contracts_models_drago_.drago.md#calcshareprice)
* [changeDragoDao](_contracts_models_drago_.drago.md#changedragodao)
* [changeFeeCollector](_contracts_models_drago_.drago.md#changefeecollector)
* [changeMinPeriod](_contracts_models_drago_.drago.md#changeminperiod)
* [changeRatio](_contracts_models_drago_.drago.md#changeratio)
* [enforceKyc](_contracts_models_drago_.drago.md#enforcekyc)
* [getAdminData](_contracts_models_drago_.drago.md#getadmindata)
* [getData](_contracts_models_drago_.drago.md#getdata)
* [getEventful](_contracts_models_drago_.drago.md#geteventful)
* [getExchangesAuth](_contracts_models_drago_.drago.md#getexchangesauth)
* [getKycProvider](_contracts_models_drago_.drago.md#getkycprovider)
* [getPastEvents](_contracts_models_drago_.drago.md#getpastevents)
* [isValidSignature](_contracts_models_drago_.drago.md#isvalidsignature)
* [once](_contracts_models_drago_.drago.md#once)
* [operateOnExchange](_contracts_models_drago_.drago.md#operateonexchange)
* [owner](_contracts_models_drago_.drago.md#owner)
* [sellDrago](_contracts_models_drago_.drago.md#selldrago)
* [setAllowance](_contracts_models_drago_.drago.md#setallowance)
* [setMultipleAllowances](_contracts_models_drago_.drago.md#setmultipleallowances)
* [setOwner](_contracts_models_drago_.drago.md#setowner)
* [setPrices](_contracts_models_drago_.drago.md#setprices)
* [setTransactionFee](_contracts_models_drago_.drago.md#settransactionfee)
* [totalSupply](_contracts_models_drago_.drago.md#totalsupply)
* [createAndValidate](_contracts_models_drago_.drago.md#createandvalidate)
* [isDeployed](_contracts_models_drago_.drago.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Drago**(web3: *`any`*, address: *`string`*): [Drago](_contracts_models_drago_.drago.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Drago](_contracts_models_drago_.drago.md)

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

<a id="newownerevent"></a>

###  NewOwnerEvent

▸ **NewOwnerEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="balanceof"></a>

###  balanceOf

▸ **balanceOf**(_who: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="batchoperateonexchange"></a>

###  batchOperateOnExchange

▸ **batchOperateOnExchange**(_exchange: *`string`*, transactions: *`Array`<`object`>*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _exchange | `string` |
| transactions | `Array`<`object`> |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="buydrago"></a>

###  buyDrago

▸ **buyDrago**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="buydragoonbehalf"></a>

###  buyDragoOnBehalf

▸ **buyDragoOnBehalf**(_hodler: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _hodler | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="calcshareprice"></a>

###  calcSharePrice

▸ **calcSharePrice**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="changedragodao"></a>

###  changeDragoDao

▸ **changeDragoDao**(_dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _dragoDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

▸ **changeFeeCollector**(_feeCollector: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _feeCollector | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeminperiod"></a>

###  changeMinPeriod

▸ **changeMinPeriod**(_minPeriod: * `number` &#124; `BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _minPeriod |  `number` &#124; `BigNumber`|

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeratio"></a>

###  changeRatio

▸ **changeRatio**(_ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ratio | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="enforcekyc"></a>

###  enforceKyc

▸ **enforceKyc**(_enforced: *`boolean`*, _kycProvider: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _enforced | `boolean` |
| _kycProvider | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="getadmindata"></a>

###  getAdminData

▸ **getAdminData**(): `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

___
<a id="getdata"></a>

###  getData

▸ **getData**(): `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

___
<a id="geteventful"></a>

###  getEventful

▸ **getEventful**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getexchangesauth"></a>

###  getExchangesAuth

▸ **getExchangesAuth**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getkycprovider"></a>

###  getKycProvider

▸ **getKycProvider**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[DragoEvents](../enums/_contracts_models_drago_.dragoevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoEvents](../enums/_contracts_models_drago_.dragoevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="isvalidsignature"></a>

###  isValidSignature

▸ **isValidSignature**(hash: *`string`*, signature: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |
| signature | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[DragoEvents](../enums/_contracts_models_drago_.dragoevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoEvents](../enums/_contracts_models_drago_.dragoevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="operateonexchange"></a>

###  operateOnExchange

▸ **operateOnExchange**(_exchange: *`string`*, transaction: *`object`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

**_exchange: `string`**

**transaction: `object`**

| Name | Type |
| ------ | ------ |
| assembledData | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="selldrago"></a>

###  sellDrago

▸ **sellDrago**(_amount: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _amount | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="setallowance"></a>

###  setAllowance

▸ **setAllowance**(_tokenTransferProxy: *`string`*, _token: *`string`*, _amount: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _tokenTransferProxy | `string` |
| _token | `string` |
| _amount | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setmultipleallowances"></a>

###  setMultipleAllowances

▸ **setMultipleAllowances**(_tokenTransferProxy: *`string`*, _tokens: *`string`[]*, _amounts: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _tokenTransferProxy | `string` |
| _tokens | `string`[] |
| _amounts | `BigNumber`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setowner"></a>

###  setOwner

▸ **setOwner**(_new: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _new | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setprices"></a>

###  setPrices

▸ **setPrices**(_newSellPrice: *`BigNumber`*, _newBuyPrice: *`BigNumber`*, _signaturevaliduntilBlock: *`BigNumber`*, _hash: *`string`*, _signedData: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newSellPrice | `BigNumber` |
| _newBuyPrice | `BigNumber` |
| _signaturevaliduntilBlock | `BigNumber` |
| _hash | `string` |
| _signedData | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="settransactionfee"></a>

###  setTransactionFee

▸ **setTransactionFee**(_transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _transactionFee | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="totalsupply"></a>

###  totalSupply

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Drago](_contracts_models_drago_.drago.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Drago](_contracts_models_drago_.drago.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

