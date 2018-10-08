# calculateBalance

## _initialData_ properties:

- symbol
- address
- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Instantiate a Web3 Contract using the token `symbol` and `address`
- Map over the pools calling the Contract's `balanceOf` method
- Send balances to _Telegraf_ following **StatsD Protocol**

