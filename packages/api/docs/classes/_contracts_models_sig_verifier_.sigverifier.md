[@rigoblock/api](../README.md) > ["contracts/models/sig_verifier"](../modules/_contracts_models_sig_verifier_.md) > [SigVerifier](../classes/_contracts_models_sig_verifier_.sigverifier.md)

# Class: SigVerifier

## Hierarchy

**SigVerifier**

## Index

### Constructors

* [constructor](_contracts_models_sig_verifier_.sigverifier.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_sig_verifier_.sigverifier.md#rawweb3contract)
* [address](_contracts_models_sig_verifier_.sigverifier.md#address)

### Methods

* [isValidSignature](_contracts_models_sig_verifier_.sigverifier.md#isvalidsignature)
* [createAndValidate](_contracts_models_sig_verifier_.sigverifier.md#createandvalidate)
* [isDeployed](_contracts_models_sig_verifier_.sigverifier.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SigVerifier**(web3: *`any`*, address: *`string`*): [SigVerifier](_contracts_models_sig_verifier_.sigverifier.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [SigVerifier](_contracts_models_sig_verifier_.sigverifier.md) Validity of order signature.

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

<a id="isvalidsignature"></a>

###  isValidSignature

Verifies that a signature is valid.

▸ **isValidSignature**(hash: *`string`*, signature: *`string`*): `Promise`<`boolean`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `string` | Message hash that is signed. |
| signature | `string` | Proof of signing. |

**Returns:** `Promise`<`boolean`>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[SigVerifier](_contracts_models_sig_verifier_.sigverifier.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[SigVerifier](_contracts_models_sig_verifier_.sigverifier.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

