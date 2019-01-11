[@rigoblock/api](../README.md) > ["contracts/models/exchanges_authority"](../modules/_contracts_models_exchanges_authority_.md) > [ExchangesAuthority](../classes/_contracts_models_exchanges_authority_.exchangesauthority.md)

# Class: ExchangesAuthority

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[ExchangesAuthorityEvents](../enums/_contracts_models_exchanges_authority_.exchangesauthorityevents.md)>

**↳ ExchangesAuthority**

## Index

### Constructors

* [constructor](_contracts_models_exchanges_authority_.exchangesauthority.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_exchanges_authority_.exchangesauthority.md#rawweb3contract)
* [address](_contracts_models_exchanges_authority_.exchangesauthority.md#address)

### Methods

* [AuthoritySetEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#authoritysetevent)
* [NewCasperEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#newcasperevent)
* [NewExchangeEventfulEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#newexchangeeventfulevent)
* [NewOwnerEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#newownerevent)
* [NewSigVerifierEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#newsigverifierevent)
* [WhitelistedAssetEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistedassetevent)
* [WhitelistedExchangeEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistedexchangeevent)
* [WhitelistedMethodEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistedmethodevent)
* [WhitelistedProxyEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistedproxyevent)
* [WhitelistedWrapperEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistedwrapperevent)
* [WhitelisterSetEvent](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistersetevent)
* [accounts](_contracts_models_exchanges_authority_.exchangesauthority.md#accounts)
* [allEvents](_contracts_models_exchanges_authority_.exchangesauthority.md#allevents)
* [blocks](_contracts_models_exchanges_authority_.exchangesauthority.md#blocks)
* [canTradeTokenOnExchange](_contracts_models_exchanges_authority_.exchangesauthority.md#cantradetokenonexchange)
* [canWrapTokenOnWrapper](_contracts_models_exchanges_authority_.exchangesauthority.md#canwraptokenonwrapper)
* [getCasper](_contracts_models_exchanges_authority_.exchangesauthority.md#getcasper)
* [getExchangeAdapter](_contracts_models_exchanges_authority_.exchangesauthority.md#getexchangeadapter)
* [getPastEvents](_contracts_models_exchanges_authority_.exchangesauthority.md#getpastevents)
* [getSigVerifier](_contracts_models_exchanges_authority_.exchangesauthority.md#getsigverifier)
* [isAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md#isauthority)
* [isCasperInitialized](_contracts_models_exchanges_authority_.exchangesauthority.md#iscasperinitialized)
* [isMethodAllowed](_contracts_models_exchanges_authority_.exchangesauthority.md#ismethodallowed)
* [isWhitelistedAsset](_contracts_models_exchanges_authority_.exchangesauthority.md#iswhitelistedasset)
* [isWhitelistedExchange](_contracts_models_exchanges_authority_.exchangesauthority.md#iswhitelistedexchange)
* [isWhitelistedProxy](_contracts_models_exchanges_authority_.exchangesauthority.md#iswhitelistedproxy)
* [isWhitelistedWrapper](_contracts_models_exchanges_authority_.exchangesauthority.md#iswhitelistedwrapper)
* [once](_contracts_models_exchanges_authority_.exchangesauthority.md#once)
* [owner](_contracts_models_exchanges_authority_.exchangesauthority.md#owner)
* [setAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md#setauthority)
* [setCasper](_contracts_models_exchanges_authority_.exchangesauthority.md#setcasper)
* [setExchangeAdapter](_contracts_models_exchanges_authority_.exchangesauthority.md#setexchangeadapter)
* [setExchangeEventful](_contracts_models_exchanges_authority_.exchangesauthority.md#setexchangeeventful)
* [setOwner](_contracts_models_exchanges_authority_.exchangesauthority.md#setowner)
* [setSignatureVerifier](_contracts_models_exchanges_authority_.exchangesauthority.md#setsignatureverifier)
* [setWhitelister](_contracts_models_exchanges_authority_.exchangesauthority.md#setwhitelister)
* [types](_contracts_models_exchanges_authority_.exchangesauthority.md#types)
* [whitelistAsset](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistasset)
* [whitelistAssetOnExchange](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistassetonexchange)
* [whitelistExchange](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistexchange)
* [whitelistMethod](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistmethod)
* [whitelistTokenOnWrapper](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelisttokenonwrapper)
* [whitelistTokenTransferProxy](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelisttokentransferproxy)
* [whitelistWrapper](_contracts_models_exchanges_authority_.exchangesauthority.md#whitelistwrapper)
* [createAndValidate](_contracts_models_exchanges_authority_.exchangesauthority.md#createandvalidate)
* [isDeployed](_contracts_models_exchanges_authority_.exchangesauthority.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ExchangesAuthority**(web3: *`any`*, address: *`string`*): [ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md) Bool the token is whitelisted on the exchange Bool the token is whitelisted on the exchange Address of the adapter Bool is whitelisted Bool the method is allowed Bool is whitelisted Bool is whitelisted Bool is whitelisted Bool is whitelisted

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

<a id="authoritysetevent"></a>

###  AuthoritySetEvent

▸ **AuthoritySetEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newcasperevent"></a>

###  NewCasperEvent

▸ **NewCasperEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="newexchangeeventfulevent"></a>

###  NewExchangeEventfulEvent

▸ **NewExchangeEventfulEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

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
<a id="newsigverifierevent"></a>

###  NewSigVerifierEvent

▸ **NewSigVerifierEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistedassetevent"></a>

###  WhitelistedAssetEvent

▸ **WhitelistedAssetEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistedexchangeevent"></a>

###  WhitelistedExchangeEvent

▸ **WhitelistedExchangeEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistedmethodevent"></a>

###  WhitelistedMethodEvent

▸ **WhitelistedMethodEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistedproxyevent"></a>

###  WhitelistedProxyEvent

▸ **WhitelistedProxyEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistedwrapperevent"></a>

###  WhitelistedWrapperEvent

▸ **WhitelistedWrapperEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="whitelistersetevent"></a>

###  WhitelisterSetEvent

▸ **WhitelisterSetEvent**(options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `any`

___
<a id="accounts"></a>

###  accounts

▸ **accounts**(index_0: *`string`*): `Promise`<[`string`, `boolean`]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |

**Returns:** `Promise`<[`string`, `boolean`]>

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
<a id="blocks"></a>

###  blocks

▸ **blocks**(): `Promise`<[`string`, `string`, `string`]>

**Returns:** `Promise`<[`string`, `string`, `string`]>

___
<a id="cantradetokenonexchange"></a>

###  canTradeTokenOnExchange

Checkes whether a token is allowed on an exchange

▸ **canTradeTokenOnExchange**(_token: *`string`*, _exchange: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` | Address of the token | Address of the token | Address of the token |
| _exchange | `string` | Address of the exchange | Address of the exchange | Address of the target exchange | Address of the exchange | Address of the exchange | Address of the target exchange |

**Returns:** `Promise`<`boolean`>

___
<a id="canwraptokenonwrapper"></a>

###  canWrapTokenOnWrapper

Checkes whether a token is allowed on a wrapper

▸ **canWrapTokenOnWrapper**(_token: *`string`*, _wrapper: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _wrapper | `string` | Address of the token wrapper | Address of the target exchange | Address of the exchange | Address of the target token wrapper |

**Returns:** `Promise`<`boolean`>

___
<a id="getcasper"></a>

###  getCasper

Provides the address of the casper contract

▸ **getCasper**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getexchangeadapter"></a>

###  getExchangeAdapter

Provides the address of the exchange adapter

▸ **getExchangeAdapter**(_exchange: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchange | `string` |

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[ExchangesAuthorityEvents](../enums/_contracts_models_exchanges_authority_.exchangesauthorityevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangesAuthorityEvents](../enums/_contracts_models_exchanges_authority_.exchangesauthorityevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="getsigverifier"></a>

###  getSigVerifier

Provides the address of the signature verifier

▸ **getSigVerifier**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="isauthority"></a>

###  isAuthority

Provides whether an address is an authority

▸ **isAuthority**(_authority: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _authority | `string` | Address of the target authority | Address of the authority |

**Returns:** `Promise`<`boolean`>

___
<a id="iscasperinitialized"></a>

###  isCasperInitialized

Checkes whether casper has been inizialized

▸ **isCasperInitialized**(): `Promise`<`boolean`>

**Returns:** `Promise`<`boolean`>

___
<a id="ismethodallowed"></a>

###  isMethodAllowed

Checkes whether a method is allowed on an exchange

▸ **isMethodAllowed**(_method: *`string`*, _adapter: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _method | `string` | Bytes of the function signature | Hex of the function ABI |
| _adapter | `string` | Address of the exchange | Address of the adapter |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedasset"></a>

###  isWhitelistedAsset

Provides whether an asset is whitelisted

▸ **isWhitelistedAsset**(_asset: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _asset | `string` | Address of the target asset | Address of the token | Address of the token |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedexchange"></a>

###  isWhitelistedExchange

Provides whether an exchange is whitelisted

▸ **isWhitelistedExchange**(_exchange: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchange | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedproxy"></a>

###  isWhitelistedProxy

Provides whether a proxy is whitelisted

▸ **isWhitelistedProxy**(_tokenTransferProxy: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _tokenTransferProxy | `string` | Address of the proxy | Address of the proxy |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedwrapper"></a>

###  isWhitelistedWrapper

Provides whether a token wrapper is whitelisted

▸ **isWhitelistedWrapper**(_wrapper: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _wrapper | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[ExchangesAuthorityEvents](../enums/_contracts_models_exchanges_authority_.exchangesauthorityevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [ExchangesAuthorityEvents](../enums/_contracts_models_exchanges_authority_.exchangesauthorityevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="setauthority"></a>

###  setAuthority

Allows the owner to whitelist an authority

▸ **setAuthority**(_authority: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _authority | `string` |
| _isWhitelisted | `boolean` | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted | Bool whitelisted |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setcasper"></a>

###  setCasper

Allows the owner to set the casper contract

▸ **setCasper**(_casper: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _casper | `string` | Address of the casper contract |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setexchangeadapter"></a>

###  setExchangeAdapter

Allows the owner to associate an exchange to its adapter

▸ **setExchangeAdapter**(_exchange: *`string`*, _adapter: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchange | `string` |
| _adapter | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setexchangeeventful"></a>

###  setExchangeEventful

Allows the owner to set the exchange eventful

▸ **setExchangeEventful**(_exchangeEventful: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchangeEventful | `string` | Address of the exchange logs contract |

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
<a id="setsignatureverifier"></a>

###  setSignatureVerifier

Allows the owner to set the signature verifier

▸ **setSignatureVerifier**(_sigVerifier: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _sigVerifier | `string` | Address of the verifier contract |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setwhitelister"></a>

###  setWhitelister

Allows the owner to whitelist a whitelister

▸ **setWhitelister**(_whitelister: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _whitelister | `string` | Address of the whitelister |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="types"></a>

###  types

▸ **types**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="whitelistasset"></a>

###  whitelistAsset

Allows a whitelister to whitelist an asset

▸ **whitelistAsset**(_asset: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _asset | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistassetonexchange"></a>

###  whitelistAssetOnExchange

Allows a whitelister to enable trading on a particular exchange

▸ **whitelistAssetOnExchange**(_asset: *`string`*, _exchange: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _asset | `string` |
| _exchange | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistexchange"></a>

###  whitelistExchange

Allows a whitelister to whitelist an exchange

▸ **whitelistExchange**(_exchange: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _exchange | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistmethod"></a>

###  whitelistMethod

Allows an admin to whitelist a factory

▸ **whitelistMethod**(_method: *`string`*, _adapter: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _method | `string` |
| _adapter | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelisttokenonwrapper"></a>

###  whitelistTokenOnWrapper

Allows a whitelister to enable assiciate wrappers to a token

▸ **whitelistTokenOnWrapper**(_token: *`string`*, _wrapper: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _wrapper | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelisttokentransferproxy"></a>

###  whitelistTokenTransferProxy

Allows a whitelister to whitelist a tokenTransferProxy

▸ **whitelistTokenTransferProxy**(_tokenTransferProxy: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _tokenTransferProxy | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistwrapper"></a>

###  whitelistWrapper

Allows a whitelister to whitelist an token wrapper

▸ **whitelistWrapper**(_wrapper: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _wrapper | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

