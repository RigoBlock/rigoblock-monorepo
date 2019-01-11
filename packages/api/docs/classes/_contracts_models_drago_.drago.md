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

**Returns:** [Drago](_contracts_models_drago_.drago.md) Number of shares. Bool the function executed correctly. Validity of order signature. Bool the function executed correctly.

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

Calculates how many shares a user holds.

▸ **balanceOf**(_who: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _who | `string` | Address of the target account. |

**Returns:** `Promise`<`BigNumber`>

___
<a id="batchoperateonexchange"></a>

###  batchOperateOnExchange

Allows owner or approved exchange to send a transaction to exchangeWith data of signed/unsigned transaction

▸ **batchOperateOnExchange**(_exchange: *`string`*, transactions: *`Array`<`object`>*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchange | `string` | Address of the exchange | Address of the target exchange. |
| transactions | `Array`<`object`> | Array of ABI encoded transactions |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="buydrago"></a>

###  buyDrago

Allows a user to buy into a drago.

▸ **buyDrago**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="buydragoonbehalf"></a>

###  buyDragoOnBehalf

Allows a user to buy into a drago on behalf of an address.

▸ **buyDragoOnBehalf**(_hodler: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _hodler | `string` | Address of the target user. |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="calcshareprice"></a>

###  calcSharePrice

Returns the price of a pool.

▸ **calcSharePrice**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="changedragodao"></a>

###  changeDragoDao

Allows drago dao/factory to upgrade its address.

▸ **changeDragoDao**(_dragoDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _dragoDao | `string` | Address of the new drago dao. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

Allows owner to decide where to receive the fee.

▸ **changeFeeCollector**(_feeCollector: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _feeCollector | `string` | Address of the fee receiver. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeminperiod"></a>

###  changeMinPeriod

Allows drago dao/factory to change the minimum holding period.

▸ **changeMinPeriod**(_minPeriod: *`number` | `BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _minPeriod | `number` | `BigNumber` | Time in seconds. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeratio"></a>

###  changeRatio

Allows drago dao/factory to change fee split ratio.

▸ **changeRatio**(_ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _ratio | `BigNumber` | Number of ratio for wizard, from 0 to 100. |

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

Finds the administrative data of the pool.

▸ **getAdminData**(): `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

___
<a id="getdata"></a>

###  getData

Finds details of a drago pool.

▸ **getData**(): `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

___
<a id="geteventful"></a>

###  getEventful

Gets the address of the logger contract.

▸ **getEventful**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getexchangesauth"></a>

###  getExchangesAuth

Finds the exchanges authority.

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

Verifies that a signature is valid.

▸ **isValidSignature**(hash: *`string`*, signature: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `string` | Message hash that is signed. |
| signature | `string` | Proof of signing. |

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

Allows owner to operate on exchange through extension.

▸ **operateOnExchange**(_exchange: *`string`*, transaction: *`object`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

**_exchange: `string`**

**transaction: `object`**

| Name | Type | Description |
| ------ | ------ | ------ |
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

Allows a user to sell from a drago.

▸ **sellDrago**(_amount: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _amount | `BigNumber` | Number of shares to sell. | Number of tokens approved for spending. |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="setallowance"></a>

###  setAllowance

Allows owner to set an allowance to an approved token transfer proxy.

▸ **setAllowance**(_tokenTransferProxy: *`string`*, _token: *`string`*, _amount: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _tokenTransferProxy | `string` | Address of the proxy to be approved. | Address of the proxy to be approved. |
| _token | `string` | Address of the token to receive allowance for. |
| _amount | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setmultipleallowances"></a>

###  setMultipleAllowances

Allows owner to set allowances to multiple approved tokens with one call.

▸ **setMultipleAllowances**(_tokenTransferProxy: *`string`*, _tokens: *`string`[]*, _amounts: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _tokenTransferProxy | `string` |
| _tokens | `string`[] | Address of the token to receive allowance for. |
| _amounts | `BigNumber`[] | Array of number of tokens to be approved. |

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

Allows drago owner or authority to set the price for a drago.

▸ **setPrices**(_newSellPrice: *`BigNumber`*, _newBuyPrice: *`BigNumber`*, _signaturevaliduntilBlock: *`BigNumber`*, _hash: *`string`*, _signedData: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newSellPrice | `BigNumber` | Price in wei. |
| _newBuyPrice | `BigNumber` | Price in wei. |
| _signaturevaliduntilBlock | `BigNumber` | Number of blocks till expiry of new data. |
| _hash | `string` | Bytes32 of the transaction hash. |
| _signedData | `string` | Bytes of extradata and signature. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="settransactionfee"></a>

###  setTransactionFee

Allows drago owner to set the transaction fee.

▸ **setTransactionFee**(_transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _transactionFee | `BigNumber` | Value of the transaction fee in basis points. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="totalsupply"></a>

###  totalSupply

Returns the total amount of issued tokens for this drago.

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

undefined ABIencoded transaction. |