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

**Returns:** [ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md)

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

▸ **batchCancelOrders**(orderAddresses: *`string`[][]*, orderValues: *`BigNumber`[][]*, cancelTakerTokenAmounts: *`BigNumber`[]*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[][] |
| orderValues | `BigNumber`[][] |
| cancelTakerTokenAmounts | `BigNumber`[] |

**Returns:** `Promise`<`TransactionObject`<`void`>>

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
<a id="cancelorder"></a>

###  cancelOrder

▸ **cancelOrder**(orderAddresses: *`string`[]*, orderValues: *`BigNumber`[]*, cancelTakerTokenAmount: *`BigNumber`*): `Promise`<`TransactionObject`<`BigNumber`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| orderAddresses | `string`[] |
| orderValues | `BigNumber`[] |
| cancelTakerTokenAmount | `BigNumber` |

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

▸ **getSigner**(_target: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _target | `string` |

**Returns:** `Promise`<`string`>

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

▸ **isValidSignature**(signer: *`string`*, hash: *`string`*, v: * `number` &#124; `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| signer | `string` |
| hash | `string` |
| v |  `number` &#124; `BigNumber`|
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

