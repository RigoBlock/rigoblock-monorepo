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

**Returns:** [Vault](_contracts_models_vault_.vault.md)

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

▸ **balanceOf**(_from: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _from | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="buyvault"></a>

###  buyVault

▸ **buyVault**(): `Promise`<`TransactionObject`<`boolean`>>

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="buyvaultonbehalf"></a>

###  buyVaultOnBehalf

▸ **buyVaultOnBehalf**(_hodler: *`string`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _hodler | `string` |

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="calcshareprice"></a>

###  calcSharePrice

▸ **calcSharePrice**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="changefeecollector"></a>

###  changeFeeCollector

▸ **changeFeeCollector**(_feeCollector: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _feeCollector | `string` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeminperiod"></a>

###  changeMinPeriod

▸ **changeMinPeriod**(_minPeriod: * `number` &#124; `BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _minPeriod |  `number` &#124; `BigNumber`|

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changeratio"></a>

###  changeRatio

▸ **changeRatio**(_ratio: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _ratio | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="changevaultdao"></a>

###  changeVaultDao

▸ **changeVaultDao**(_vaultDao: *`string`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _vaultDao | `string` |

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

▸ **depositToken**(_token: *`string`*, _value: *`BigNumber`*, _forTime: * `number` &#124; `BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _value | `BigNumber` |
| _forTime |  `number` &#124; `BigNumber`|

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="deposittokenonbehalf"></a>

###  depositTokenOnBehalf

▸ **depositTokenOnBehalf**(_token: *`string`*, _hodler: *`string`*, _value: *`BigNumber`*, _forTime: * `number` &#124; `BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _hodler | `string` |
| _value | `BigNumber` |
| _forTime |  `number` &#124; `BigNumber`|

**Returns:** `Promise`<`TransactionObject`<`boolean`>>

___
<a id="getadmindata"></a>

###  getAdminData

▸ **getAdminData**(): `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `string`, `BigNumber`, `BigNumber`, `BigNumber`]>

___
<a id="getdata"></a>

###  getData

▸ **getData**(): `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

**Returns:** `Promise`<[`string`, `string`, `BigNumber`, `BigNumber`]>

___
<a id="geteventful"></a>

###  getEventful

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

▸ **sellVault**(_amount: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _amount | `BigNumber` |

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

▸ **setTransactionFee**(_transactionFee: *`BigNumber`*): `Promise`<`TransactionObject`<`void`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _transactionFee | `BigNumber` |

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="timetounlock"></a>

###  timeToUnlock

▸ **timeToUnlock**(_token: *`string`*, _user: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _user | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="tokenbalanceof"></a>

###  tokenBalanceOf

▸ **tokenBalanceOf**(_token: *`string`*, _owner: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |
| _owner | `string` |

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

▸ **tokensInVault**(_token: *`string`*): `Promise`<`BigNumber`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `string` |

**Returns:** `Promise`<`BigNumber`>

___
<a id="totalsupply"></a>

###  totalSupply

▸ **totalSupply**(): `Promise`<`BigNumber`>

**Returns:** `Promise`<`BigNumber`>

___
<a id="updateprice"></a>

###  updatePrice

▸ **updatePrice**(): `Promise`<`TransactionObject`<`void`>>

**Returns:** `Promise`<`TransactionObject`<`void`>>

___
<a id="withdrawtoken"></a>

###  withdrawToken

▸ **withdrawToken**(_token: *`string`*, _value: *`BigNumber`*): `Promise`<`TransactionObject`<`boolean`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
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

