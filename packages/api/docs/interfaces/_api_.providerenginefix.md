[@rigoblock/api](../README.md) > ["api"](../modules/_api_.md) > [ProviderEngineFix](../interfaces/_api_.providerenginefix.md)

# Interface: ProviderEngineFix

## Hierarchy

 `Web3ProviderEngine`

**↳ ProviderEngineFix**

## Implements

* `Provider`

## Index

### Constructors

* [constructor](_api_.providerenginefix.md#constructor)

### Methods

* [addProvider](_api_.providerenginefix.md#addprovider)
* [emit](_api_.providerenginefix.md#emit)
* [on](_api_.providerenginefix.md#on)
* [send](_api_.providerenginefix.md#send)
* [sendAsync](_api_.providerenginefix.md#sendasync)
* [start](_api_.providerenginefix.md#start)
* [stop](_api_.providerenginefix.md#stop)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProviderEngineFix**(options?: *`Web3ProviderEngineOptions`*): [ProviderEngineFix](_api_.providerenginefix.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | `Web3ProviderEngineOptions` |

**Returns:** [ProviderEngineFix](_api_.providerenginefix.md)

___

## Methods

<a id="addprovider"></a>

###  addProvider

▸ **addProvider**(provider: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| provider | `any` |

**Returns:** `void`

___
<a id="emit"></a>

### `<Optional>` emit

▸ **emit**(name: *`string`*, err: *`any`*, notification: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| err | `any` |
| notification | `any` |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, handler: *`function`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | `function` |

**Returns:** `void`

___
<a id="send"></a>

###  send

▸ **send**(payload: *`JSONRPCRequestPayload`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `JSONRPCRequestPayload` |

**Returns:** `void`

___
<a id="sendasync"></a>

###  sendAsync

▸ **sendAsync**(payload: *`JSONRPCRequestPayload`*, callback: *`function`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `JSONRPCRequestPayload` |
| callback | `function` |

**Returns:** `void`

___
<a id="start"></a>

###  start

▸ **start**(cb?: *`Function`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` cb | `Function` |

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

**Returns:** `void`

___

