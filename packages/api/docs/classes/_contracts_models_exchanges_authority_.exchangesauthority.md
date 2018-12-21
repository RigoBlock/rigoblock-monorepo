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

**Returns:** [ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md)

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

▸ **canTradeTokenOnExchange**(_token: *`string`*, _exchange: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _exchange | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="canwraptokenonwrapper"></a>

###  canWrapTokenOnWrapper

▸ **canWrapTokenOnWrapper**(_token: *`string`*, _wrapper: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _wrapper | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="getcasper"></a>

###  getCasper

▸ **getCasper**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getexchangeadapter"></a>

###  getExchangeAdapter

▸ **getExchangeAdapter**(_exchange: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
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

▸ **getSigVerifier**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="isauthority"></a>

###  isAuthority

▸ **isAuthority**(_authority: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _authority | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iscasperinitialized"></a>

###  isCasperInitialized

▸ **isCasperInitialized**(): `Promise`<`boolean`>

**Returns:** `Promise`<`boolean`>

___
<a id="ismethodallowed"></a>

###  isMethodAllowed

▸ **isMethodAllowed**(_method: *`string`*, _adapter: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _method | `string` |
| _adapter | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedasset"></a>

###  isWhitelistedAsset

▸ **isWhitelistedAsset**(_asset: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _asset | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedexchange"></a>

###  isWhitelistedExchange

▸ **isWhitelistedExchange**(_exchange: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _exchange | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedproxy"></a>

###  isWhitelistedProxy

▸ **isWhitelistedProxy**(_tokenTransferProxy: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _tokenTransferProxy | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="iswhitelistedwrapper"></a>

###  isWhitelistedWrapper

▸ **isWhitelistedWrapper**(_wrapper: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
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

▸ **setAuthority**(_authority: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _authority | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setcasper"></a>

###  setCasper

▸ **setCasper**(_casper: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _casper | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setexchangeadapter"></a>

###  setExchangeAdapter

▸ **setExchangeAdapter**(_exchange: *`string`*, _adapter: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _exchange | `string` |
| _adapter | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setexchangeeventful"></a>

###  setExchangeEventful

▸ **setExchangeEventful**(_exchangeEventful: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _exchangeEventful | `string` |

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

▸ **setSignatureVerifier**(_sigVerifier: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _sigVerifier | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="setwhitelister"></a>

###  setWhitelister

▸ **setWhitelister**(_whitelister: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _whitelister | `string` |
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

▸ **whitelistAsset**(_asset: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _asset | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistassetonexchange"></a>

###  whitelistAssetOnExchange

▸ **whitelistAssetOnExchange**(_asset: *`string`*, _exchange: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _asset | `string` |
| _exchange | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistexchange"></a>

###  whitelistExchange

▸ **whitelistExchange**(_exchange: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _exchange | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistmethod"></a>

###  whitelistMethod

▸ **whitelistMethod**(_method: *`string`*, _adapter: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _method | `string` |
| _adapter | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelisttokenonwrapper"></a>

###  whitelistTokenOnWrapper

▸ **whitelistTokenOnWrapper**(_token: *`string`*, _wrapper: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _wrapper | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelisttokentransferproxy"></a>

###  whitelistTokenTransferProxy

▸ **whitelistTokenTransferProxy**(_tokenTransferProxy: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _tokenTransferProxy | `string` |
| _isWhitelisted | `boolean` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="whitelistwrapper"></a>

###  whitelistWrapper

▸ **whitelistWrapper**(_wrapper: *`string`*, _isWhitelisted: *`boolean`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
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

