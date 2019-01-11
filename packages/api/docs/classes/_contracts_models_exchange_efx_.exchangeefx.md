[@rigoblock/api](../README.md) > ["contracts/models/exchange_efx"](../modules/_contracts_models_exchange_efx_.md) > [ExchangeEfx](../classes/_contracts_models_exchange_efx_.exchangeefx.md)

# Class: ExchangeEfx

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[ExchangeEfxEvents](../enums/_contracts_models_exchange_efx_.exchangeefxevents.md)>

**↳ ExchangeEfx**

## Index

### Constructors

* [constructor](_contracts_models_exchange_efx_.exchangeefx.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_exchange_efx_.exchangeefx.md#rawweb3contract)
* [address](_contracts_models_exchange_efx_.exchangeefx.md#address)

### Methods

* [ETHFINEX_FEE](_contracts_models_exchange_efx_.exchangeefx.md#ethfinex_fee)
* [EXTERNAL_QUERY_GAS_LIMIT](_contracts_models_exchange_efx_.exchangeefx.md#external_query_gas_limit)
* [LogCancelEvent](_contracts_models_exchange_efx_.exchangeefx.md#logcancelevent)
* [LogErrorEvent](_contracts_models_exchange_efx_.exchangeefx.md#logerrorevent)
* [LogFillEvent](_contracts_models_exchange_efx_.exchangeefx.md#logfillevent)
* [SignatureValidatorApprovalEvent](_contracts_models_exchange_efx_.exchangeefx.md#signaturevalidatorapprovalevent)
* [TOKEN_TRANSFER_PROXY_CONTRACT](_contracts_models_exchange_efx_.exchangeefx.md#token_transfer_proxy_contract)
* [VERSION](_contracts_models_exchange_efx_.exchangeefx.md#version)
* [allEvents](_contracts_models_exchange_efx_.exchangeefx.md#allevents)
* [allowedValidators](_contracts_models_exchange_efx_.exchangeefx.md#allowedvalidators)
* [batchFillOrKillOrders](_contracts_models_exchange_efx_.exchangeefx.md#batchfillorkillorders)
* [batchFillOrders](_contracts_models_exchange_efx_.exchangeefx.md#batchfillorders)
* [cancelled](_contracts_models_exchange_efx_.exchangeefx.md#cancelled)
* [fillOrKillOrder](_contracts_models_exchange_efx_.exchangeefx.md#fillorkillorder)
* [fillOrder](_contracts_models_exchange_efx_.exchangeefx.md#fillorder)
* [fillOrdersUpTo](_contracts_models_exchange_efx_.exchangeefx.md#fillordersupto)
* [filled](_contracts_models_exchange_efx_.exchangeefx.md#filled)
* [getOrderHash](_contracts_models_exchange_efx_.exchangeefx.md#getorderhash)
* [getPartialAmount](_contracts_models_exchange_efx_.exchangeefx.md#getpartialamount)
* [getPastEvents](_contracts_models_exchange_efx_.exchangeefx.md#getpastevents)
* [getUnavailableTakerTokenAmount](_contracts_models_exchange_efx_.exchangeefx.md#getunavailabletakertokenamount)
* [isRoundingError](_contracts_models_exchange_efx_.exchangeefx.md#isroundingerror)
* [isValidSignature](_contracts_models_exchange_efx_.exchangeefx.md#isvalidsignature)
* [once](_contracts_models_exchange_efx_.exchangeefx.md#once)
* [setSignatureValidatorApproval](_contracts_models_exchange_efx_.exchangeefx.md#setsignaturevalidatorapproval)
* [createAndValidate](_contracts_models_exchange_efx_.exchangeefx.md#createandvalidate)
* [isDeployed](_contracts_models_exchange_efx_.exchangeefx.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ExchangeEfx**(web3: *`any`*, address: *`string`*): [ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md) Total amount of takerToken filled in trade. Total amount of fillTakerTokenAmount filled in orders. Keccak-256 hash of order. Partial value of target. Sum of values already filled and cancelled. Rounding error is present. Validity of order signature.

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

<a id="ethfinex_fee"></a>

###  ETHFINEX_FEE

▸ **ETHFINEX_FEE**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
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
<a id="signaturevalidatorapprovalevent"></a>

###  SignatureValidatorApprovalEvent

▸ **SignatureValidatorApprovalEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="allowedvalidators"></a>

###  allowedValidators

▸ **allowedValidators**(index_0: *`string`*, index_1: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |
| index_1 | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="batchfillorkillorders"></a>

###  batchFillOrKillOrders

Synchronously executes multiple fillOrKill orders in a single transaction.

▸ **batchFillOrKillOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmounts: *`BigNumber`[]*, v: *`Array`<`number` | `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| orderAddresses | `string`[][] | Array of address arrays containing individual order addresses. | Array of address arrays containing individual order addresses. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. | Array of address arrays containing individual order addresses. | Array of order's maker, taker, makerToken, takerToken, and feeRecipient. |
| orderValues | `BigNumber`[][] | Array of uint arrays containing individual order values. | Array of uint arrays containing individual order values. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. | Array of uint arrays containing individual order values. | Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt. |
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

▸ **getPastEvents**(eventName: *[ExchangeEfxEvents](../enums/_contracts_models_exchange_efx_.exchangeefxevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangeEfxEvents](../enums/_contracts_models_exchange_efx_.exchangeefxevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

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

▸ **isValidSignature**(maker: *`string`*, hash: *`string`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| maker | `string` | address of maker. |
| hash | `string` | Signed Keccak-256 hash. |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[ExchangeEfxEvents](../enums/_contracts_models_exchange_efx_.exchangeefxevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangeEfxEvents](../enums/_contracts_models_exchange_efx_.exchangeefxevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="setsignaturevalidatorapproval"></a>

###  setSignatureValidatorApproval

Approves/unnapproves a Validator contract to verify signatures on signer's behalf.

▸ **setSignatureValidatorApproval**(validatorAddress: *`string`*, approval: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| validatorAddress | `string` | Address of Validator contract. |
| approval | `boolean` | Approval or disapproval of  Validator contract. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

