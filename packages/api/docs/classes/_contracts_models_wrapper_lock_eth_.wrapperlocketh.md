[@rigoblock/api](../README.md) > ["contracts/models/wrapper_lock_eth"](../modules/_contracts_models_wrapper_lock_eth_.md) > [WrapperLockEth](../classes/_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)

# Class: WrapperLockEth

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[WrapperLockEthEvents](../enums/_contracts_models_wrapper_lock_eth_.wrapperlockethevents.md)>

**↳ WrapperLockEth**

## Index

### Constructors

* [constructor](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#rawweb3contract)
* [address](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#address)

### Methods

* [OwnershipTransferredEvent](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#ownershiptransferredevent)
* [TRANSFER_PROXY](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#transfer_proxy)
* [TransferEvent](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#transferevent)
* [addSigner](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#addsigner)
* [allEvents](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#allevents)
* [allowance](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#allowance)
* [balanceOf](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#balanceof)
* [balances](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#balances)
* [decimals](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#decimals)
* [deposit](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#deposit)
* [depositLock](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#depositlock)
* [getPastEvents](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#getpastevents)
* [isSigner](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#issigner)
* [isValidSignature](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#isvalidsignature)
* [keccak](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#keccak)
* [name](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#name)
* [once](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#once)
* [originalToken](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#originaltoken)
* [owner](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#owner)
* [symbol](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#symbol)
* [totalSupply](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#totalsupply)
* [transfer](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#transfer)
* [transferFrom](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#transferfrom)
* [transferOwnership](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#transferownership)
* [withdraw](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#withdraw)
* [withdrawDifferentToken](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#withdrawdifferenttoken)
* [createAndValidate](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#createandvalidate)
* [isDeployed](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WrapperLockEth**(web3: *`any`*, address: *`string`*): [WrapperLockEth](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [WrapperLockEth](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)

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

<a id="ownershiptransferredevent"></a>

###  OwnershipTransferredEvent

▸ **OwnershipTransferredEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="transfer_proxy"></a>

###  TRANSFER_PROXY

▸ **TRANSFER_PROXY**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

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
<a id="addsigner"></a>

###  addSigner

▸ **addSigner**(_newSigner: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _newSigner | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

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
<a id="balanceof"></a>

###  balanceOf

▸ **balanceOf**(_owner: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _owner | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="balances"></a>

###  balances

▸ **balances**(index_0: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="decimals"></a>

###  decimals

▸ **decimals**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="deposit"></a>

###  deposit

▸ **deposit**(_value: *`BigNumber`*, _forTime: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _value | `BigNumber` |
| _forTime | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="depositlock"></a>

###  depositLock

▸ **depositLock**(index_0: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[WrapperLockEthEvents](../enums/_contracts_models_wrapper_lock_eth_.wrapperlockethevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [WrapperLockEthEvents](../enums/_contracts_models_wrapper_lock_eth_.wrapperlockethevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="issigner"></a>

###  isSigner

▸ **isSigner**(index_0: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="isvalidsignature"></a>

###  isValidSignature

▸ **isValidSignature**(hash: *`string`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="keccak"></a>

###  keccak

▸ **keccak**(_sender: *`string`*, _wrapper: *`string`*, _validTill: *`BigNumber`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _sender | `string` |
| _wrapper | `string` |
| _validTill | `BigNumber` |

**Returns:** `Promise`<`string`>

___
<a id="name"></a>

###  name

▸ **name**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[WrapperLockEthEvents](../enums/_contracts_models_wrapper_lock_eth_.wrapperlockethevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [WrapperLockEthEvents](../enums/_contracts_models_wrapper_lock_eth_.wrapperlockethevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="originaltoken"></a>

###  originalToken

▸ **originalToken**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="symbol"></a>

###  symbol

▸ **symbol**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="totalsupply"></a>

###  totalSupply

Total number of tokens in existence

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="transfer"></a>

###  transfer

▸ **transfer**(_to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="transferfrom"></a>

###  transferFrom

▸ **transferFrom**(_from: *`string`*, _to: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _from | `string` |
| _to | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="transferownership"></a>

###  transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.

▸ **transferOwnership**(newOwner: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| newOwner | `string` | The address to transfer ownership to. |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="withdraw"></a>

###  withdraw

▸ **withdraw**(_value: *`BigNumber`*, v: *`number` | `BigNumber`*, r: *`string`*, s: *`string`*, signatureValidUntilBlock: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _value | `BigNumber` |
| v | `number` | `BigNumber` |
| r | `string` |
| s | `string` |
| signatureValidUntilBlock | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="withdrawdifferenttoken"></a>

###  withdrawDifferentToken

▸ **withdrawDifferentToken**(_token: *`string`*, _erc20old: *`boolean`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _erc20old | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[WrapperLockEth](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[WrapperLockEth](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

