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

**Returns:** [ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md)

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

▸ **batchFillOrKillOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmounts: *`BigNumber`[]*, v: *`Array`< `number` &#124; `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmounts | `BigNumber`[] |
| v | `Array`< `number` &#124; `BigNumber`> |
| r | `string`[] |
| s | `string`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="batchfillorders"></a>

###  batchFillOrders

▸ **batchFillOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmounts: *`BigNumber`[]*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: *`Array`< `number` &#124; `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmounts | `BigNumber`[] |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` |
| v | `Array`< `number` &#124; `BigNumber`> |
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

▸ **fillOrKillOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, fillTakerTokenAmount: *`BigNumber`*, v: * `number` &#124; `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| fillTakerTokenAmount | `BigNumber` |
| v |  `number` &#124; `BigNumber`|
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="fillorder"></a>

###  fillOrder

▸ **fillOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, fillTakerTokenAmount: *`BigNumber`*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: * `number` &#124; `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| fillTakerTokenAmount | `BigNumber` |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` |
| v |  `number` &#124; `BigNumber`|
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`TransactionObject`<`BigNumber`>>

___
<a id="fillordersupto"></a>

###  fillOrdersUpTo

▸ **fillOrdersUpTo**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, fillTakerTokenAmount: *`BigNumber`*, shouldThrowOnInsufficientBalanceOrAllowance: *`boolean`*, v: *`Array`< `number` &#124; `BigNumber`>*, r: *`string`[]*, s: *`string`[]*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| fillTakerTokenAmount | `BigNumber` |
| shouldThrowOnInsufficientBalanceOrAllowance | `boolean` |
| v | `Array`< `number` &#124; `BigNumber`> |
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

▸ **getOrderHash**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |

**Returns:** `Promise`<`string`>

___
<a id="getpartialamount"></a>

###  getPartialAmount

▸ **getPartialAmount**(numerator: *`BigNumber`*, denominator: *`BigNumber`*, target: *`BigNumber`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| numerator | `BigNumber` |
| denominator | `BigNumber` |
| target | `BigNumber` |

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

▸ **getUnavailableTakerTokenAmount**(orderHash: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderHash | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="isroundingerror"></a>

###  isRoundingError

▸ **isRoundingError**(numerator: *`BigNumber`*, denominator: *`BigNumber`*, target: *`BigNumber`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| numerator | `BigNumber` |
| denominator | `BigNumber` |
| target | `BigNumber` |

**Returns:** `Promise`<`boolean`>

___
<a id="isvalidsignature"></a>

###  isValidSignature

▸ **isValidSignature**(maker: *`string`*, hash: *`string`*, v: * `number` &#124; `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| maker | `string` |
| hash | `string` |
| v |  `number` &#124; `BigNumber`|
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

▸ **setSignatureValidatorApproval**(validatorAddress: *`string`*, approval: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| validatorAddress | `string` |
| approval | `boolean` |

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

