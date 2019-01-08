[@rigoblock/api](../README.md) > ["contracts/models/rigo_token"](../modules/_contracts_models_rigo_token_.md) > [RigoToken](../classes/_contracts_models_rigo_token_.rigotoken.md)

# Class: RigoToken

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[RigoTokenEvents](../enums/_contracts_models_rigo_token_.rigotokenevents.md)>

**↳ RigoToken**

## Index

### Constructors

* [constructor](_contracts_models_rigo_token_.rigotoken.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_rigo_token_.rigotoken.md#rawweb3contract)
* [address](_contracts_models_rigo_token_.rigotoken.md#address)

### Methods

* [ApprovalEvent](_contracts_models_rigo_token_.rigotoken.md#approvalevent)
* [TokenMintedEvent](_contracts_models_rigo_token_.rigotoken.md#tokenmintedevent)
* [TransferEvent](_contracts_models_rigo_token_.rigotoken.md#transferevent)
* [allEvents](_contracts_models_rigo_token_.rigotoken.md#allevents)
* [allowance](_contracts_models_rigo_token_.rigotoken.md#allowance)
* [approve](_contracts_models_rigo_token_.rigotoken.md#approve)
* [balanceOf](_contracts_models_rigo_token_.rigotoken.md#balanceof)
* [changeMintingAddress](_contracts_models_rigo_token_.rigotoken.md#changemintingaddress)
* [changeRigoblockAddress](_contracts_models_rigo_token_.rigotoken.md#changerigoblockaddress)
* [decimals](_contracts_models_rigo_token_.rigotoken.md#decimals)
* [getPastEvents](_contracts_models_rigo_token_.rigotoken.md#getpastevents)
* [mintToken](_contracts_models_rigo_token_.rigotoken.md#minttoken)
* [minter](_contracts_models_rigo_token_.rigotoken.md#minter)
* [name](_contracts_models_rigo_token_.rigotoken.md#name)
* [once](_contracts_models_rigo_token_.rigotoken.md#once)
* [rigoblock](_contracts_models_rigo_token_.rigotoken.md#rigoblock)
* [symbol](_contracts_models_rigo_token_.rigotoken.md#symbol)
* [totalSupply](_contracts_models_rigo_token_.rigotoken.md#totalsupply)
* [transfer](_contracts_models_rigo_token_.rigotoken.md#transfer)
* [transferFrom](_contracts_models_rigo_token_.rigotoken.md#transferfrom)
* [createAndValidate](_contracts_models_rigo_token_.rigotoken.md#createandvalidate)
* [isDeployed](_contracts_models_rigo_token_.rigotoken.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RigoToken**(web3: *`any`*, address: *`string`*): [RigoToken](_contracts_models_rigo_token_.rigotoken.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [RigoToken](_contracts_models_rigo_token_.rigotoken.md) Success of transfer.

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

<a id="approvalevent"></a>

###  ApprovalEvent

▸ **ApprovalEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="tokenmintedevent"></a>

###  TokenMintedEvent

▸ **TokenMintedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="transferevent"></a>

###  TransferEvent

▸ **TransferEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="allowance"></a>

###  allowance

▸ **allowance**(_owner: *`string`*, _spender: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |
| _spender | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="approve"></a>

###  approve

▸ **approve**(_spender: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _spender | `string` |
| _value | `BigNumber` | Amount to transfer. |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="balanceof"></a>

###  balanceOf

▸ **balanceOf**(_owner: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="changemintingaddress"></a>

###  changeMintingAddress

Allows rigoblock dao to change minter

▸ **changeMintingAddress**(_newAddress: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newAddress | `string` | Address of the new minter | Address of the new rigoblock dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changerigoblockaddress"></a>

###  changeRigoblockAddress

Allows rigoblock dao to upgrade dao

▸ **changeRigoblockAddress**(_newAddress: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _newAddress | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="decimals"></a>

###  decimals

▸ **decimals**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[RigoTokenEvents](../enums/_contracts_models_rigo_token_.rigotokenevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [RigoTokenEvents](../enums/_contracts_models_rigo_token_.rigotokenevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="minttoken"></a>

###  mintToken

Allows minter to create new tokens

▸ **mintToken**(_recipient: *`string`*, _amount: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _recipient | `string` | Address of who receives new tokens |
| _amount | `BigNumber` | Number of new tokens |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="minter"></a>

###  minter

▸ **minter**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="name"></a>

###  name

▸ **name**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[RigoTokenEvents](../enums/_contracts_models_rigo_token_.rigotokenevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [RigoTokenEvents](../enums/_contracts_models_rigo_token_.rigotokenevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="rigoblock"></a>

###  rigoblock

▸ **rigoblock**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="symbol"></a>

###  symbol

▸ **symbol**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="totalsupply"></a>

###  totalSupply

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="transfer"></a>

###  transfer

▸ **transfer**(_to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _to | `string` | Address to transfer to. |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="transferfrom"></a>

###  transferFrom

ERC20 transferFrom, modified such that an allowance of MAX_UINT represents an unlimited allowance.

▸ **transferFrom**(_from: *`string`*, _to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _from | `string` | Address to transfer from. |
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[RigoToken](_contracts_models_rigo_token_.rigotoken.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[RigoToken](_contracts_models_rigo_token_.rigotoken.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

