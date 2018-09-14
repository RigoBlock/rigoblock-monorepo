# getTotalSupply

This task accepts `key`, `poolType` and `network` as parameters on the initialData object, `network` being the networkId. Depending on the poolType (_Drago_ or, in the future, _Vault_) and relative key, it will fetch the correct hash from redis and map over the addresses, instantiate the pool using the correct abi and address, and call the `totalSupply()` method, which returns the totalSupply of each pool.

_totalSupply_ data is sent to statsD as gauge data type.

