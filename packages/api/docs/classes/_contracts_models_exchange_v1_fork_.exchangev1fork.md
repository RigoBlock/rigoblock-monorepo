[@rigoblock/api](../README.md) > ["contracts/models/exchange_v1_fork"](../modules/_contracts_models_exchange_v1_fork_.md) > [ExchangeV1Fork](../classes/_contracts_models_exchange_v1_fork_.exchangev1fork.md)

# Class: ExchangeV1Fork

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[ExchangeV1ForkEvents](../enums/_contracts_models_exchange_v1_fork_.exchangev1forkevents.md)>

**↳ ExchangeV1Fork**

## Index

### Constructors

* [constructor](_contracts_models_exchange_v1_fork_.exchangev1fork.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_exchange_v1_fork_.exchangev1fork.md#rawweb3contract)
* [address](_contracts_models_exchange_v1_fork_.exchangev1fork.md#address)

### Methods

* [EXTERNAL_QUERY_GAS_LIMIT](_contracts_models_exchange_v1_fork_.exchangev1fork.md#external_query_gas_limit)
* [LogCancelEvent](_contracts_models_exchange_v1_fork_.exchangev1fork.md#logcancelevent)
* [LogErrorEvent](_contracts_models_exchange_v1_fork_.exchangev1fork.md#logerrorevent)
* [LogFillEvent](_contracts_models_exchange_v1_fork_.exchangev1fork.md#logfillevent)
* [TOKEN_TRANSFER_PROXY_CONTRACT](_contracts_models_exchange_v1_fork_.exchangev1fork.md#token_transfer_proxy_contract)
* [VERSION](_contracts_models_exchange_v1_fork_.exchangev1fork.md#version)
* [ZRX_TOKEN_CONTRACT](_contracts_models_exchange_v1_fork_.exchangev1fork.md#zrx_token_contract)
* [allEvents](_contracts_models_exchange_v1_fork_.exchangev1fork.md#allevents)
* [batchCancelOrders](_contracts_models_exchange_v1_fork_.exchangev1fork.md#batchcancelorders)
* [batchFillOrKillOrders](_contracts_models_exchange_v1_fork_.exchangev1fork.md#batchfillorkillorders)
* [batchFillOrders](_contracts_models_exchange_v1_fork_.exchangev1fork.md#batchfillorders)
* [cancelOrder](_contracts_models_exchange_v1_fork_.exchangev1fork.md#cancelorder)
* [cancelled](_contracts_models_exchange_v1_fork_.exchangev1fork.md#cancelled)
* [fillOrKillOrder](_contracts_models_exchange_v1_fork_.exchangev1fork.md#fillorkillorder)
* [fillOrder](_contracts_models_exchange_v1_fork_.exchangev1fork.md#fillorder)
* [fillOrdersUpTo](_contracts_models_exchange_v1_fork_.exchangev1fork.md#fillordersupto)
* [filled](_contracts_models_exchange_v1_fork_.exchangev1fork.md#filled)
* [getOrderHash](_contracts_models_exchange_v1_fork_.exchangev1fork.md#getorderhash)
* [getPartialAmount](_contracts_models_exchange_v1_fork_.exchangev1fork.md#getpartialamount)
* [getPastEvents](_contracts_models_exchange_v1_fork_.exchangev1fork.md#getpastevents)
* [getSigner](_contracts_models_exchange_v1_fork_.exchangev1fork.md#getsigner)
* [getUnavailableTakerTokenAmount](_contracts_models_exchange_v1_fork_.exchangev1fork.md#getunavailabletakertokenamount)
* [isRoundingError](_contracts_models_exchange_v1_fork_.exchangev1fork.md#isroundingerror)
* [isValidSignature](_contracts_models_exchange_v1_fork_.exchangev1fork.md#isvalidsignature)
* [once](_contracts_models_exchange_v1_fork_.exchangev1fork.md#once)
* [setTokenTransferProxyContract](_contracts_models_exchange_v1_fork_.exchangev1fork.md#settokentransferproxycontract)
* [createAndValidate](_contracts_models_exchange_v1_fork_.exchangev1fork.md#createandvalidate)
* [isDeployed](_contracts_models_exchange_v1_fork_.exchangev1fork.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ExchangeV1Fork**(web3: *`any`*, address: *`string`*): [ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md) Amount of takerToken cancelled. Total amount of takerToken filled in trade. Total amount of fillTakerTokenAmount filled in orders. Keccak-256 hash of order. Partial value of target. Address of the signer Sum of values already filled and cancelled. Rounding error is present. Validity of order signature.

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

<a id="external_query_gas_limit"></a>

###  EXTERNAL_QUERY_GAS_LIMIT

▸ **EXTERNAL_QUERY_GAS_LIMIT**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="logcancelevent"></a>

###  LogCancelEvent

▸ **LogCancelEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="logerrorevent"></a>

###  LogErrorEvent

▸ **LogErrorEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="logfillevent"></a>

###  LogFillEvent

▸ **LogFillEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="token_transfer_proxy_contract"></a>

###  TOKEN_TRANSFER_PROXY_CONTRACT

▸ **TOKEN_TRANSFER_PROXY_CONTRACT**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="version"></a>

###  VERSION

▸ **VERSION**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="zrx_token_contract"></a>

###  ZRX_TOKEN_CONTRACT

▸ **ZRX_TOKEN_CONTRACT**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

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
<a id="batchcancelorders"></a>

###  batchCancelOrders

Synchronously cancels multiple orders in a single transaction.

▸ **batchCancelOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, cancelTakerTokenAmounts: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[][] | Array of address arrays containing individual order addresses. | Array of address arrays containing individual order addresses. | Array of address arrays containing individual order addresses. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. | Array of address arrays containing individual order addresses. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. |
| orderValues | `BigNumber`[][] | Array of uint arrays containing individual order values. | Array of uint arrays containing individual order values. | Array of uint arrays containing individual order values. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. | Array of uint arrays containing individual order values. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. |
| cancelTakerTokenAmounts | `BigNumber`[] | Array of desired amounts of takerToken to cancel in orders. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="batchfillorkillorders"></a>

###  batchFillOrKillOrders

Synchronously executes multiple fillOrKill orders in a single transaction.

▸ **batchFillOrKillOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmounts: *`BigNumber`[]*, v: *`Array`<`number` | `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmounts | `BigNumber`[] | Array of desired amounts of takerToken to fill in orders. | Array of desired amounts of takerToken to fill in orders. |
| v | `Array`<`number` | `BigNumber`> | Array ECDSA signature v parameters. | Array ECDSA signature v parameters. | ECDSA signature parameter v. | ECDSA signature parameter v. | Array ECDSA signature v parameters. | ECDSA signature parameter v. |
| r | `string`[] | Array of ECDSA signature r parameters. | Array of ECDSA signature r parameters. | ECDSA signature parameters r. | ECDSA signature parameters r. | Array of ECDSA signature r parameters. | ECDSA signature parameters r. |
| s | `string`[] | Array of ECDSA signature s parameters. | Array of ECDSA signature s parameters. | ECDSA signature parameters s. | ECDSA signature parameters s. | Array of ECDSA signature s parameters. | ECDSA signature parameters s. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="batchfillorders"></a>

###  batchFillOrders

Synchronously executes multiple fill orders in a single transaction.

▸ **batchFillOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmounts: *`BigNumber`[]*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: *`Array`<`number` | `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmounts | `BigNumber`[] |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` | Test if transfers will fail before attempting. | Test if transfer will fail before attempting. | Test if transfers will fail before attempting. |
| v | `Array`<`number` | `BigNumber`> |
| r | `string`[] |
| s | `string`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="cancelorder"></a>

###  cancelOrder

Cancels the input order.

▸ **cancelOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, cancelTakerTokenAmount: *`BigNumber`*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| cancelTakerTokenAmount | `BigNumber` | Desired amount of takerToken to cancel in order. |

**Returns:** `Promise`<`TransactionObject`<`BigNumber`>>

___
<a id="cancelled"></a>

###  cancelled

▸ **cancelled**(index_0: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="fillorkillorder"></a>

###  fillOrKillOrder

Fills an order with specified parameters and ECDSA signature, throws if specified amount not filled entirely.

▸ **fillOrKillOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, fillTakerTokenAmount: *`BigNumber`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| fillTakerTokenAmount | `BigNumber` | Desired amount of takerToken to fill. | Desired amount of takerToken to fill. | Desired total amount of takerToken to fill in orders. |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="fillorder"></a>

###  fillOrder

Fills the input order.

▸ **fillOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, fillTakerTokenAmount: *`BigNumber`*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| fillTakerTokenAmount | `BigNumber` |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`TransactionObject`<`BigNumber`>>

___
<a id="fillordersupto"></a>

###  fillOrdersUpTo

Synchronously executes multiple fill orders in a single transaction until total fillTakerTokenAmount filled.

▸ **fillOrdersUpTo**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmount: *`BigNumber`*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: *`Array`<`number` | `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmount | `BigNumber` |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` |
| v | `Array`<`number` | `BigNumber`> |
| r | `string`[] |
| s | `string`[] |

**Returns:** `Promise`<`TransactionObject`<`BigNumber`>>

___
<a id="filled"></a>

###  filled

▸ **filled**(index_0: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getorderhash"></a>

###  getOrderHash

Calculates Keccak-256 hash of order with specified parameters.

▸ **getOrderHash**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |

**Returns:** `Promise`<`string`>

___
<a id="getpartialamount"></a>

###  getPartialAmount

Calculates partial value given a numerator and denominator.

▸ **getPartialAmount**(numerator: *`BigNumber`*, denominator: *`BigNumber`*, target: *`BigNumber`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| numerator | `BigNumber` | Numerator. | Numerator. |
| denominator | `BigNumber` | Denominator. | Denominator. |
| target | `BigNumber` | Value to calculate partial of. | Value to multiply with numerator/denominator. |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[ExchangeV1ForkEvents](../enums/_contracts_models_exchange_v1_fork_.exchangev1forkevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangeV1ForkEvents](../enums/_contracts_models_exchange_v1_fork_.exchangev1forkevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="getsigner"></a>

###  getSigner

Get the address of the signer of a transaction, maker or fund manager

▸ **getSigner**(_target: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _target | `string` | Address to be inspected |

**Returns:** `Promise`<`string`>

___
<a id="getunavailabletakertokenamount"></a>

###  getUnavailableTakerTokenAmount

Calculates the sum of values already filled and cancelled for a given order.

▸ **getUnavailableTakerTokenAmount**(orderHash: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderHash | `string` | The Keccak-256 hash of the given order. |

**Returns:** `Promise`<`BigNumber`>

___
<a id="isroundingerror"></a>

###  isRoundingError

Checks if rounding error > 0.1%.

▸ **isRoundingError**(numerator: *`BigNumber`*, denominator: *`BigNumber`*, target: *`BigNumber`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| numerator | `BigNumber` |
| denominator | `BigNumber` |
| target | `BigNumber` |

**Returns:** `Promise`<`boolean`>

___
<a id="isvalidsignature"></a>

###  isValidSignature

Verifies that an order signature is valid.

▸ **isValidSignature**(signer: *`string`*, hash: *`string`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| signer | `string` | address of signer. |
| hash | `string` | Signed Keccak-256 hash. |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[ExchangeV1ForkEvents](../enums/_contracts_models_exchange_v1_fork_.exchangev1forkevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangeV1ForkEvents](../enums/_contracts_models_exchange_v1_fork_.exchangev1forkevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="settokentransferproxycontract"></a>

###  setTokenTransferProxyContract

▸ **setTokenTransferProxyContract**(proxy: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| proxy | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

