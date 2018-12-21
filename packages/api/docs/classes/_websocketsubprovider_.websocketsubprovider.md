[@rigoblock/api](../README.md) > ["webSocketSubprovider"](../modules/_websocketsubprovider_.md) > [WebsocketSubprovider](../classes/_websocketsubprovider_.websocketsubprovider.md)

# Class: WebsocketSubprovider

## Hierarchy

 `any`

**↳ WebsocketSubprovider**

## Index

### Constructors

* [constructor](_websocketsubprovider_.websocketsubprovider.md#constructor)

### Methods

* [_handleSocketClose](_websocketsubprovider_.websocketsubprovider.md#_handlesocketclose)
* [_handleSocketMessage](_websocketsubprovider_.websocketsubprovider.md#_handlesocketmessage)
* [_handleSocketOpen](_websocketsubprovider_.websocketsubprovider.md#_handlesocketopen)
* [_openSocket](_websocketsubprovider_.websocketsubprovider.md#_opensocket)
* [handleRequest](_websocketsubprovider_.websocketsubprovider.md#handlerequest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WebsocketSubprovider**(options: *`object`*): [WebsocketSubprovider](_websocketsubprovider_.websocketsubprovider.md)

**Parameters:**

**options: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` debug | `boolean` |
| `Optional` origin | `any` |
| rpcUrl | `string` |

**Returns:** [WebsocketSubprovider](_websocketsubprovider_.websocketsubprovider.md)

___

## Methods

<a id="_handlesocketclose"></a>

###  _handleSocketClose

▸ **_handleSocketClose**(__namedParameters: *`object`*): `void`

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| code | `any` |
| reason | `any` |

**Returns:** `void`

___
<a id="_handlesocketmessage"></a>

###  _handleSocketMessage

▸ **_handleSocketMessage**(message: *`any`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `any` |

**Returns:** `any`

___
<a id="_handlesocketopen"></a>

###  _handleSocketOpen

▸ **_handleSocketOpen**(): `void`

**Returns:** `void`

___
<a id="_opensocket"></a>

###  _openSocket

▸ **_openSocket**(): `void`

**Returns:** `void`

___
<a id="handlerequest"></a>

###  handleRequest

▸ **handleRequest**(payload: *`any`*, next: *`any`*, end: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `any` |
| next | `any` |
| end | `any` |

**Returns:** `void`

___

