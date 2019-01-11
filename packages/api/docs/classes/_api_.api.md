[@rigoblock/api](../README.md) > ["api"](../modules/_api_.md) > [Api](../classes/_api_.api.md)

# Class: Api

## Hierarchy

**Api**

## Index

### Properties

* [contract](_api_.api.md#contract)
* [engine](_api_.api.md#engine)
* [web3](_api_.api.md#web3)

### Methods

* [init](_api_.api.md#init)
* [startEngine](_api_.api.md#startengine)

---

## Properties

<a id="contract"></a>

###  contract

**● contract**: *[ContractsList](_contracts_contractslist_.contractslist.md)*

List of contract instances exposed by the API

___
<a id="engine"></a>

###  engine

**● engine**: *[ProviderEngineFix](../interfaces/_api_.providerenginefix.md)*

Metamask's provider engine instance

___
<a id="web3"></a>

###  web3

**● web3**: *`Web3`*

Web3 instance in use

___

## Methods

<a id="init"></a>

###  init

▸ **init**(web3?: *`Web3`*): `Promise`<`this`>

Initializes the RigoBlock API, starts the websocket connection and wallet integration

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` web3 | `Web3` |  window[&#x27;web3&#x27;] |  Web3 instance, if non provided then window.web3 is used |

**Returns:** `Promise`<`this`>
the api instance

___
<a id="startengine"></a>

###  startEngine

▸ **startEngine**(): `Promise`<`Object`>

Promisified version of ProviderEngine start method starts the provider engine connections (e.g. WS)

**Returns:** `Promise`<`Object`>
a promise that fulfils when the engine is started

___

