# getSharePrice

This task accepts `key`, `poolType` and `network` as parameters on the initialData object, `network` being the networkId. Depending on the poolType (_Drago_ or, in the future, _Vault_) and relative key, it will fetch the correct hash from redis and map over the addresses, instantiate the pool using the correct abi and address, and call the `getData` method, which returns buyPrice and sellPrice of each pool.

_sellPrice_ and _buyprice_ data are sent to statsD as two separate series as gauge data type.

