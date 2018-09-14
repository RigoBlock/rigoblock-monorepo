# calculateBalance

This task accepts `symbol`, `address`, `key`, `poolType` and `network` as parameters on the initialData object, `network` being the networkId and `address` being the specified token's address. Depending on the poolType (_Drago_ or, in the future, _Vault_) and relative key, it will fetch the correct hash from redis, instantiate an ERC20 contract instance with the supplied token address, and map over the addresses performing a `balanceOf` call.

The balance data is then sent to statsD as gauge data type.

