# calculateEthBalance

This task accepts `key`, `poolType` and `network` as parameters on the initialData object, `network` being the networkId. Depending on the poolType (_Drago_ or, in the future, _Vault_) and relative key, it will fetch the correct hash from redis and map over the addresses to obtain the ETH balance, using web3's method `web3.eth.getBalance(address)`

The balance data is then sent to statsD as gauge data type.

