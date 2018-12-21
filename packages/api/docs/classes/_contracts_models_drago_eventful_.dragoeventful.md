[@rigoblock/api](../README.md) > ["contracts/models/drago_eventful"](../modules/_contracts_models_drago_eventful_.md) > [DragoEventful](../classes/_contracts_models_drago_eventful_.dragoeventful.md)

# Class: DragoEventful

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[DragoEventfulEvents](../enums/_contracts_models_drago_eventful_.dragoeventfulevents.md)>

**↳ DragoEventful**

## Index

### Constructors

* [constructor](_contracts_models_drago_eventful_.dragoeventful.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_drago_eventful_.dragoeventful.md#rawweb3contract)
* [address](_contracts_models_drago_eventful_.dragoeventful.md#address)

### Methods

* [AUTHORITY](_contracts_models_drago_eventful_.dragoeventful.md#authority)
* [BuyDragoEvent](_contracts_models_drago_eventful_.dragoeventful.md#buydragoevent)
* [CancelOrderEvent](_contracts_models_drago_eventful_.dragoeventful.md#cancelorderevent)
* [CustomDragoLog2Event](_contracts_models_drago_eventful_.dragoeventful.md#customdragolog2event)
* [CustomDragoLogEvent](_contracts_models_drago_eventful_.dragoeventful.md#customdragologevent)
* [DealFinalizedEvent](_contracts_models_drago_eventful_.dragoeventful.md#dealfinalizedevent)
* [DepositExchangeEvent](_contracts_models_drago_eventful_.dragoeventful.md#depositexchangeevent)
* [DragoCreatedEvent](_contracts_models_drago_eventful_.dragoeventful.md#dragocreatedevent)
* [DragoDaoEvent](_contracts_models_drago_eventful_.dragoeventful.md#dragodaoevent)
* [NewCollectorEvent](_contracts_models_drago_eventful_.dragoeventful.md#newcollectorevent)
* [NewFeeEvent](_contracts_models_drago_eventful_.dragoeventful.md#newfeeevent)
* [NewNAVEvent](_contracts_models_drago_eventful_.dragoeventful.md#newnavevent)
* [NewRatioEvent](_contracts_models_drago_eventful_.dragoeventful.md#newratioevent)
* [OrderExchangeEvent](_contracts_models_drago_eventful_.dragoeventful.md#orderexchangeevent)
* [SellDragoEvent](_contracts_models_drago_eventful_.dragoeventful.md#selldragoevent)
* [TradeExchangeEvent](_contracts_models_drago_eventful_.dragoeventful.md#tradeexchangeevent)
* [VERSION](_contracts_models_drago_eventful_.dragoeventful.md#version)
* [WithdrawExchangeEvent](_contracts_models_drago_eventful_.dragoeventful.md#withdrawexchangeevent)
* [allEvents](_contracts_models_drago_eventful_.dragoeventful.md#allevents)
* [buyDrago](_contracts_models_drago_eventful_.dragoeventful.md#buydrago)
* [changeDragoDao](_contracts_models_drago_eventful_.dragoeventful.md#changedragodao)
* [changeFeeCollector](_contracts_models_drago_eventful_.dragoeventful.md#changefeecollector)
* [changeRatio](_contracts_models_drago_eventful_.dragoeventful.md#changeratio)
* [createDrago](_contracts_models_drago_eventful_.dragoeventful.md#createdrago)
* [customDragoLog](_contracts_models_drago_eventful_.dragoeventful.md#customdragolog)
* [customDragoLog2](_contracts_models_drago_eventful_.dragoeventful.md#customdragolog2)
* [customExchangeLog](_contracts_models_drago_eventful_.dragoeventful.md#customexchangelog)
* [customExchangeLog2](_contracts_models_drago_eventful_.dragoeventful.md#customexchangelog2)
* [depositToExchange](_contracts_models_drago_eventful_.dragoeventful.md#deposittoexchange)
* [getPastEvents](_contracts_models_drago_eventful_.dragoeventful.md#getpastevents)
* [once](_contracts_models_drago_eventful_.dragoeventful.md#once)
* [sellDrago](_contracts_models_drago_eventful_.dragoeventful.md#selldrago)
* [setDragoPrice](_contracts_models_drago_eventful_.dragoeventful.md#setdragoprice)
* [setTransactionFee](_contracts_models_drago_eventful_.dragoeventful.md#settransactionfee)
* [withdrawFromExchange](_contracts_models_drago_eventful_.dragoeventful.md#withdrawfromexchange)
* [createAndValidate](_contracts_models_drago_eventful_.dragoeventful.md#createandvalidate)
* [isDeployed](_contracts_models_drago_eventful_.dragoeventful.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DragoEventful**(web3: *`any`*, address: *`string`*): [DragoEventful](_contracts_models_drago_eventful_.dragoeventful.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [DragoEventful](_contracts_models_drago_eventful_.dragoeventful.md)

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

<a id="authority"></a>

###  AUTHORITY

▸ **AUTHORITY**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="buydragoevent"></a>

###  BuyDragoEvent

▸ **BuyDragoEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="cancelorderevent"></a>

###  CancelOrderEvent

▸ **CancelOrderEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="customdragolog2event"></a>

###  CustomDragoLog2Event

▸ **CustomDragoLog2Event**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="customdragologevent"></a>

###  CustomDragoLogEvent

▸ **CustomDragoLogEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="dealfinalizedevent"></a>

###  DealFinalizedEvent

▸ **DealFinalizedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="depositexchangeevent"></a>

###  DepositExchangeEvent

▸ **DepositExchangeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="dragocreatedevent"></a>

###  DragoCreatedEvent

▸ **DragoCreatedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="dragodaoevent"></a>

###  DragoDaoEvent

▸ **DragoDaoEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newcollectorevent"></a>

###  NewCollectorEvent

▸ **NewCollectorEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newfeeevent"></a>

###  NewFeeEvent

▸ **NewFeeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newnavevent"></a>

###  NewNAVEvent

▸ **NewNAVEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newratioevent"></a>

###  NewRatioEvent

▸ **NewRatioEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="orderexchangeevent"></a>

###  OrderExchangeEvent

▸ **OrderExchangeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="selldragoevent"></a>

###  SellDragoEvent

▸ **SellDragoEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="tradeexchangeevent"></a>

###  TradeExchangeEvent

▸ **TradeExchangeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="version"></a>

###  VERSION

▸ **VERSION**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="withdrawexchangeevent"></a>

###  WithdrawExchangeEvent

▸ **WithdrawExchangeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="buydrago"></a>

###  buyDrago

▸ **buyDrago**(_who: *`string`*, _targetDrago: *`string`*, _value: *`BigNumber`*, _amount: *`BigNumber`*, _name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _value | `BigNumber` |
| _amount | `BigNumber` |
| _name | `string` |
| _symbol | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changedragodao"></a>

###  changeDragoDao

▸ **changeDragoDao**(_who: *`string`*, _targetDrago: *`string`*, _dragoDao: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _dragoDao | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

▸ **changeFeeCollector**(_who: *`string`*, _targetDrago: *`string`*, _feeCollector: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _feeCollector | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="changeratio"></a>

###  changeRatio

▸ **changeRatio**(_who: *`string`*, _targetDrago: *`string`*, _ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _ratio | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createdrago"></a>

###  createDrago

▸ **createDrago**(_who: *`string`*, _newDrago: *`string`*, _name: *`string`*, _symbol: *`string`*, _dragoId: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _newDrago | `string` |
| _name | `string` |
| _symbol | `string` |
| _dragoId | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="customdragolog"></a>

###  customDragoLog

▸ **customDragoLog**(_methodHash: *`string`*, _encodedParams: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _methodHash | `string` |
| _encodedParams | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="customdragolog2"></a>

###  customDragoLog2

▸ **customDragoLog2**(_methodHash: *`string`*, topic2: *`string`*, topic3: *`string`*, _encodedParams: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _methodHash | `string` |
| topic2 | `string` |
| topic3 | `string` |
| _encodedParams | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="customexchangelog"></a>

###  customExchangeLog

▸ **customExchangeLog**(_methodHash: *`string`*, _encodedParams: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _methodHash | `string` |
| _encodedParams | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="customexchangelog2"></a>

###  customExchangeLog2

▸ **customExchangeLog2**(_methodHash: *`string`*, topic2: *`string`*, topic3: *`string`*, _encodedParams: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _methodHash | `string` |
| topic2 | `string` |
| topic3 | `string` |
| _encodedParams | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="deposittoexchange"></a>

###  depositToExchange

▸ **depositToExchange**(_who: *`string`*, _targetDrago: *`string`*, _exchange: *`string`*, _token: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _exchange | `string` |
| _token | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[DragoEventfulEvents](../enums/_contracts_models_drago_eventful_.dragoeventfulevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoEventfulEvents](../enums/_contracts_models_drago_eventful_.dragoeventfulevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[DragoEventfulEvents](../enums/_contracts_models_drago_eventful_.dragoeventfulevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [DragoEventfulEvents](../enums/_contracts_models_drago_eventful_.dragoeventfulevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="selldrago"></a>

###  sellDrago

▸ **sellDrago**(_who: *`string`*, _targetDrago: *`string`*, _amount: *`BigNumber`*, _revenue: *`BigNumber`*, _name: *`string`*, _symbol: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _amount | `BigNumber` |
| _revenue | `BigNumber` |
| _name | `string` |
| _symbol | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="setdragoprice"></a>

###  setDragoPrice

▸ **setDragoPrice**(_who: *`string`*, _targetDrago: *`string`*, _sellPrice: *`BigNumber`*, _buyPrice: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _sellPrice | `BigNumber` |
| _buyPrice | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="settransactionfee"></a>

###  setTransactionFee

▸ **setTransactionFee**(_who: *`string`*, _targetDrago: *`string`*, _transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _transactionFee | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="withdrawfromexchange"></a>

###  withdrawFromExchange

▸ **withdrawFromExchange**(_who: *`string`*, _targetDrago: *`string`*, _exchange: *`string`*, _token: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _who | `string` |
| _targetDrago | `string` |
| _exchange | `string` |
| _token | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[DragoEventful](_contracts_models_drago_eventful_.dragoeventful.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[DragoEventful](_contracts_models_drago_eventful_.dragoeventful.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

