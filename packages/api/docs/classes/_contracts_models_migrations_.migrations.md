[@rigoblock/api](../README.md) > ["contracts/models/migrations"](../modules/_contracts_models_migrations_.md) > [Migrations](../classes/_contracts_models_migrations_.migrations.md)

# Class: Migrations

## Hierarchy

**Migrations**

## Index

### Constructors

* [constructor](_contracts_models_migrations_.migrations.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_migrations_.migrations.md#rawweb3contract)
* [address](_contracts_models_migrations_.migrations.md#address)

### Methods

* [last_completed_migration](_contracts_models_migrations_.migrations.md#last_completed_migration)
* [owner](_contracts_models_migrations_.migrations.md#owner)
* [setCompleted](_contracts_models_migrations_.migrations.md#setcompleted)
* [upgrade](_contracts_models_migrations_.migrations.md#upgrade)
* [createAndValidate](_contracts_models_migrations_.migrations.md#createandvalidate)
* [isDeployed](_contracts_models_migrations_.migrations.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Migrations**(web3: *`any`*, address: *`string`*): [Migrations](_contracts_models_migrations_.migrations.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Migrations](_contracts_models_migrations_.migrations.md)

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

<a id="last_completed_migration"></a>

###  last_completed_migration

▸ **last_completed_migration**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="setcompleted"></a>

###  setCompleted

▸ **setCompleted**(completed: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| completed | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="upgrade"></a>

###  upgrade

▸ **upgrade**(new_address: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| new_address | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Migrations](_contracts_models_migrations_.migrations.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Migrations](_contracts_models_migrations_.migrations.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

