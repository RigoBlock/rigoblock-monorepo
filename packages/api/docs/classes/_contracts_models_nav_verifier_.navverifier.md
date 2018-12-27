[@rigoblock/api](../README.md) > ["contracts/models/nav_verifier"](../modules/_contracts_models_nav_verifier_.md) > [NavVerifier](../classes/_contracts_models_nav_verifier_.navverifier.md)

# Class: NavVerifier

## Hierarchy

**NavVerifier**

## Index

### Constructors

* [constructor](_contracts_models_nav_verifier_.navverifier.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_nav_verifier_.navverifier.md#rawweb3contract)
* [address](_contracts_models_nav_verifier_.navverifier.md#address)

### Methods

* [isValidNav](_contracts_models_nav_verifier_.navverifier.md#isvalidnav)
* [createAndValidate](_contracts_models_nav_verifier_.navverifier.md#createandvalidate)
* [isDeployed](_contracts_models_nav_verifier_.navverifier.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NavVerifier**(web3: *`any`*, address: *`string`*): [NavVerifier](_contracts_models_nav_verifier_.navverifier.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [NavVerifier](_contracts_models_nav_verifier_.navverifier.md)

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

<a id="isvalidnav"></a>

###  isValidNav

Verifies that a signature is valid.

▸ **isValidNav**(sellPrice: *`BigNumber`*, buyPrice: *`BigNumber`*, signaturevaliduntilBlock: *`BigNumber`*, hash: *`string`*, signedData: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| sellPrice | `BigNumber` | Price in wei |
| buyPrice | `BigNumber` | Price in wei |
| signaturevaliduntilBlock | `BigNumber` | Number of blocks till price expiry |
| hash | `string` | Message hash that is signed. |
| signedData | `string` | Proof of nav validity. |

**Returns:** `Promise`<`boolean`>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[NavVerifier](_contracts_models_nav_verifier_.navverifier.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[NavVerifier](_contracts_models_nav_verifier_.navverifier.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

