[@rigoblock/api](../README.md) > ["contracts/models/token_transfer_proxy"](../modules/_contracts_models_token_transfer_proxy_.md) > [TokenTransferProxy](../classes/_contracts_models_token_transfer_proxy_.tokentransferproxy.md)

# Class: TokenTransferProxy

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[TokenTransferProxyEvents](../enums/_contracts_models_token_transfer_proxy_.tokentransferproxyevents.md)>

**↳ TokenTransferProxy**

## Index

### Constructors

* [constructor](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#rawweb3contract)
* [address](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#address)

### Methods

* [LogAuthorizedAddressAddedEvent](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#logauthorizedaddressaddedevent)
* [LogAuthorizedAddressRemovedEvent](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#logauthorizedaddressremovedevent)
* [NewOwnerEvent](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#newownerevent)
* [addAuthorizedAddress](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#addauthorizedaddress)
* [allEvents](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#allevents)
* [authorities](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#authorities)
* [authorized](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#authorized)
* [getAuthorizedAddresses](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#getauthorizedaddresses)
* [getPastEvents](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#getpastevents)
* [once](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#once)
* [owner](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#owner)
* [removeAuthorizedAddress](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#removeauthorizedaddress)
* [setOwner](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#setowner)
* [transferFrom](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#transferfrom)
* [createAndValidate](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#createandvalidate)
* [isDeployed](_contracts_models_token_transfer_proxy_.tokentransferproxy.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TokenTransferProxy**(web3: *`any`*, address: *`string`*): [TokenTransferProxy](_contracts_models_token_transfer_proxy_.tokentransferproxy.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [TokenTransferProxy](_contracts_models_token_transfer_proxy_.tokentransferproxy.md) Success of transfer.

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

<a id="logauthorizedaddressaddedevent"></a>

###  LogAuthorizedAddressAddedEvent

▸ **LogAuthorizedAddressAddedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="logauthorizedaddressremovedevent"></a>

###  LogAuthorizedAddressRemovedEvent

▸ **LogAuthorizedAddressRemovedEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
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
<a id="addauthorizedaddress"></a>

###  addAuthorizedAddress

Authorizes an address.

▸ **addAuthorizedAddress**(target: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| target | `string` | Address to authorize. | Address to remove authorization from. |

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
<a id="authorities"></a>

###  authorities

▸ **authorities**(index_0: *`BigNumber`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `BigNumber` |

**Returns:** `Promise`<`string`>

___
<a id="authorized"></a>

###  authorized

▸ **authorized**(index_0: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="getauthorizedaddresses"></a>

###  getAuthorizedAddresses

Gets all authorized addresses.

▸ **getAuthorizedAddresses**(): `Promise`<`string`[]>

**Returns:** `Promise`<`string`[]>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[TokenTransferProxyEvents](../enums/_contracts_models_token_transfer_proxy_.tokentransferproxyevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [TokenTransferProxyEvents](../enums/_contracts_models_token_transfer_proxy_.tokentransferproxyevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[TokenTransferProxyEvents](../enums/_contracts_models_token_transfer_proxy_.tokentransferproxyevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [TokenTransferProxyEvents](../enums/_contracts_models_token_transfer_proxy_.tokentransferproxyevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="removeauthorizedaddress"></a>

###  removeAuthorizedAddress

Removes authorizion of an address.

▸ **removeAuthorizedAddress**(target: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| target | `string` |

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
<a id="transferfrom"></a>

###  transferFrom

Calls into ERC20 Token contract, invoking transferFrom.

▸ **transferFrom**(token: *`string`*, from: *`string`*, to: *`string`*, value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| token | `string` | Address of token to transfer. |
| from | `string` | Address to transfer token from. |
| to | `string` | Address to transfer token to. |
| value | `BigNumber` | Amount of token to transfer. |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[TokenTransferProxy](_contracts_models_token_transfer_proxy_.tokentransferproxy.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[TokenTransferProxy](_contracts_models_token_transfer_proxy_.tokentransferproxy.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

