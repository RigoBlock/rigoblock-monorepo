[@rigoblock/api](../README.md) > ["contracts/models/vault"](../modules/_contracts_models_vault_.md) > [Vault](../classes/_contracts_models_vault_.vault.md)

# Class: Vault

## Hierarchy

 [BaseContract](_contracts_basecontract_.basecontract.md)<[VaultEvents](../enums/_contracts_models_vault_.vaultevents.md)>

**↳ Vault**

## Index

### Constructors

* [constructor](_contracts_models_vault_.vault.md#constructor)

### Properties

* [rawWeb3Contract](_contracts_models_vault_.vault.md#rawweb3contract)
* [address](_contracts_models_vault_.vault.md#address)

### Methods

* [NewOwnerEvent](_contracts_models_vault_.vault.md#newownerevent)
* [allEvents](_contracts_models_vault_.vault.md#allevents)
* [balanceOf](_contracts_models_vault_.vault.md#balanceof)
* [buyVault](_contracts_models_vault_.vault.md#buyvault)
* [buyVaultOnBehalf](_contracts_models_vault_.vault.md#buyvaultonbehalf)
* [calcSharePrice](_contracts_models_vault_.vault.md#calcshareprice)
* [changeFeeCollector](_contracts_models_vault_.vault.md#changefeecollector)
* [changeMinPeriod](_contracts_models_vault_.vault.md#changeminperiod)
* [changeRatio](_contracts_models_vault_.vault.md#changeratio)
* [changeVaultDao](_contracts_models_vault_.vault.md#changevaultdao)
* [depositLock](_contracts_models_vault_.vault.md#depositlock)
* [depositToken](_contracts_models_vault_.vault.md#deposittoken)
* [depositTokenOnBehalf](_contracts_models_vault_.vault.md#deposittokenonbehalf)
* [getAdminData](_contracts_models_vault_.vault.md#getadmindata)
* [getData](_contracts_models_vault_.vault.md#getdata)
* [getEventful](_contracts_models_vault_.vault.md#geteventful)
* [getPastEvents](_contracts_models_vault_.vault.md#getpastevents)
* [once](_contracts_models_vault_.vault.md#once)
* [owner](_contracts_models_vault_.vault.md#owner)
* [sellVault](_contracts_models_vault_.vault.md#sellvault)
* [setOwner](_contracts_models_vault_.vault.md#setowner)
* [setTransactionFee](_contracts_models_vault_.vault.md#settransactionfee)
* [timeToUnlock](_contracts_models_vault_.vault.md#timetounlock)
* [tokenBalanceOf](_contracts_models_vault_.vault.md#tokenbalanceof)
* [tokenBalances](_contracts_models_vault_.vault.md#tokenbalances)
* [tokensInVault](_contracts_models_vault_.vault.md#tokensinvault)
* [totalSupply](_contracts_models_vault_.vault.md#totalsupply)
* [updatePrice](_contracts_models_vault_.vault.md#updateprice)
* [withdrawToken](_contracts_models_vault_.vault.md#withdrawtoken)
* [createAndValidate](_contracts_models_vault_.vault.md#createandvalidate)
* [isDeployed](_contracts_models_vault_.vault.md#isdeployed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Vault**(web3: *`any`*, address: *`string`*): [Vault](_contracts_models_vault_.vault.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** [Vault](_contracts_models_vault_.vault.md) Number of shares Bool the function executed correctly Bool the function executed correctly Time in seconds Number of tokens _value in custody Bool the transaction was successful

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
<a id="balanceof"></a>

###  balanceOf

Calculates how many shares a user holds

▸ **balanceOf**(_from: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _from | `string` | Address of the target account |

**Returns:** `Promise`<`BigNumber`>

___
<a id="buyvault"></a>

###  buyVault

Allows a user to buy into a vault

▸ **buyVault**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="buyvaultonbehalf"></a>

###  buyVaultOnBehalf

Allows a user to buy into a vault on behalf of an address

▸ **buyVaultOnBehalf**(_hodler: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _hodler | `string` | Address of the target user |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="calcshareprice"></a>

###  calcSharePrice

Returns the price of a pool

▸ **calcSharePrice**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

Allows owner to decide where to receive the fee

▸ **changeFeeCollector**(_feeCollector: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _feeCollector | `string` | Address of the fee receiver |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeminperiod"></a>

###  changeMinPeriod

Allows vault dao/factory to change the minimum holding period

▸ **changeMinPeriod**(_minPeriod: *`number` | `BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _minPeriod | `number` | `BigNumber` | Lockup time in seconds |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeratio"></a>

###  changeRatio

Allows vault dao/factory to change fee split ratio

▸ **changeRatio**(_ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _ratio | `BigNumber` | Number of ratio for wizard, from 0 to 100 |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changevaultdao"></a>

###  changeVaultDao

Allows vault dao/factory to upgrade its address

▸ **changeVaultDao**(_vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _vaultDao | `string` | Address of the new vault dao |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="depositlock"></a>

###  depositLock

▸ **depositLock**(index_0: *`string`*, index_1: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |
| index_1 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="deposittoken"></a>

###  depositToken

Allows anyone to deposit tokens to a vault

▸ **depositToken**(_token: *`string`*, _value: *`BigNumber`*, _forTime: *`number` | `BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` | Address of the token | Address of the token | Address of the token | Address of the token | Address of the token | Address of the token |
| _value | `BigNumber` | Amount to deposit | Amount to deposit | Amount to withdraw |
| _forTime | `number` | `BigNumber` | Lockup time in seconds | Lockup time in seconds |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="deposittokenonbehalf"></a>

###  depositTokenOnBehalf

Allows anyone to deposit tokens to a vault on behalf of someone

▸ **depositTokenOnBehalf**(_token: *`string`*, _hodler: *`string`*, _value: *`BigNumber`*, _forTime: *`number` | `BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _hodler | `string` |
| _value | `BigNumber` |
| _forTime | `number` | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="getadmindata"></a>

###  getAdminData

Finds the administrative data of the pool

▸ **getAdminData**(): `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

___
<a id="getdata"></a>

###  getData

Finds details of a vault pool

▸ **getData**(): `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

___
<a id="geteventful"></a>

###  getEventful

Gets the address of the logger contract

▸ **getEventful**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="getpastevents"></a>

###  getPastEvents

▸ **getPastEvents**(eventName: *[VaultEvents](../enums/_contracts_models_vault_.vaultevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*): `Promise`<`EventLog`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultEvents](../enums/_contracts_models_vault_.vaultevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |

**Returns:** `Promise`<`EventLog`[]>

___
<a id="once"></a>

###  once

▸ **once**(eventName: *[VaultEvents](../enums/_contracts_models_vault_.vaultevents.md)*, options?: *[EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md)*, cb?: *`Function`*): `Promise`<`EventEmitter`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [VaultEvents](../enums/_contracts_models_vault_.vaultevents.md) |
| `Optional` options | [EventOptions](../interfaces/_contracts_basecontract_.eventoptions.md) |
| `Optional` cb | `Function` |

**Returns:** `Promise`<`EventEmitter`>

___
<a id="owner"></a>

###  owner

▸ **owner**(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="sellvault"></a>

###  sellVault

Allows a user to sell from a vault

▸ **sellVault**(_amount: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _amount | `BigNumber` | Number of shares to sell |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

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
<a id="settransactionfee"></a>

###  setTransactionFee

Allows vault owner to set the transaction fee

▸ **setTransactionFee**(_transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _transactionFee | `BigNumber` | Value of the transaction fee in basis points |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="timetounlock"></a>

###  timeToUnlock

Returns the time needed to withdraw

▸ **timeToUnlock**(_token: *`string`*, _user: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _user | `string` | Address of the user |

**Returns:** `Promise`<`BigNumber`>

___
<a id="tokenbalanceof"></a>

###  tokenBalanceOf

Returns a user balance of a certain deposited token

▸ **tokenBalanceOf**(_token: *`string`*, _owner: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _owner | `string` | Address of the user |

**Returns:** `Promise`<`BigNumber`>

___
<a id="tokenbalances"></a>

###  tokenBalances

▸ **tokenBalances**(index_0: *`string`*, index_1: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| index_0 | `string` |
| index_1 | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="tokensinvault"></a>

###  tokensInVault

Returns the amount of tokens of a certain token in vault

▸ **tokensInVault**(_token: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="totalsupply"></a>

###  totalSupply

Returns the total amount of issued tokens for this vault

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="updateprice"></a>

###  updatePrice

Allows anyone to pay and update the priceThis function allows to write the new navNAV is provided by view functions

▸ **updatePrice**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="withdrawtoken"></a>

###  withdrawToken

Allows anyone to withdraw tokens from a vault

▸ **withdrawToken**(_token: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _token | `string` |
| _value | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="createandvalidate"></a>

### `<Static>` createAndValidate

▸ **createAndValidate**(web3: *`any`*, address: *`string`*): `Promise`<[Vault](_contracts_models_vault_.vault.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| web3 | `any` |
| address | `string` |

**Returns:** `Promise`<[Vault](_contracts_models_vault_.vault.md)>

___
<a id="isdeployed"></a>

### `<Static>` isDeployed

▸ **isDeployed**(): `boolean`

**Returns:** `boolean`

___

