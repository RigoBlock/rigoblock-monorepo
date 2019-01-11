[@rigoblock/api](../README.md) > ["contracts/baseContract"](../modules/_contracts_basecontract_.md) > [BaseContract](../classes/_contracts_basecontract_.basecontract.md)

# Class: BaseContract

## Type parameters
#### Events 
## Hierarchy

**BaseContract**

↳  [Authority](_contracts_models_authority_.authority.md)

↳  [Distribution](_contracts_models_distribution_.distribution.md)

↳  [Drago](_contracts_models_drago_.drago.md)

↳  [DragoEventful](_contracts_models_drago_eventful_.dragoeventful.md)

↳  [DragoFactory](_contracts_models_drago_factory_.dragofactory.md)

↳  [DragoRegistry](_contracts_models_drago_registry_.dragoregistry.md)

↳  [ERC20](_contracts_models_erc20_.erc20.md)

↳  [ExchangeEfx](_contracts_models_exchange_efx_.exchangeefx.md)

↳  [ExchangeV1Fork](_contracts_models_exchange_v1_fork_.exchangev1fork.md)

↳  [ExchangesAuthority](_contracts_models_exchanges_authority_.exchangesauthority.md)

↳  [Faucet](_contracts_models_faucet_.faucet.md)

↳  [Owned](_contracts_models_owned_.owned.md)

↳  [OwnedUninitialized](_contracts_models_owned_uninitialized_.owneduninitialized.md)

↳  [RigoToken](_contracts_models_rigo_token_.rigotoken.md)

↳  [TokenTransferProxy](_contracts_models_token_transfer_proxy_.tokentransferproxy.md)

↳  [UnlimitedAllowanceToken](_contracts_models_unlimited_allowance_token_.unlimitedallowancetoken.md)

↳  [Vault](_contracts_models_vault_.vault.md)

↳  [VaultEventful](_contracts_models_vault_eventful_.vaulteventful.md)

↳  [VaultFactory](_contracts_models_vault_factory_.vaultfactory.md)

↳  [WETH9](_contracts_models_weth9_.weth9.md)

↳  [WrapperLock](_contracts_models_wrapper_lock_.wrapperlock.md)

↳  [WrapperLockEth](_contracts_models_wrapper_lock_eth_.wrapperlocketh.md)

## Index

### Properties

* [rawWeb3Contract](_contracts_basecontract_.basecontract.md#rawweb3contract)

### Methods

* [allEvents](_contracts_basecontract_.basecontract.md#allevents)
* [getPastEvents](_contracts_basecontract_.basecontract.md#getpastevents)
* [once](_contracts_basecontract_.basecontract.md#once)

---

## Properties

<a id="rawweb3contract"></a>

###  rawWeb3Contract

**● rawWeb3Contract**: *`any`*

___

## Methods

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
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *`Events`*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | `Events` |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *`Events`*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | `Events` |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___

