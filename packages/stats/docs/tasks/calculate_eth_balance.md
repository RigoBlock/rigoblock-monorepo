# calculateEthBalance

## _initialData_ properties:

- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Map over the pools calling `web3.eth.getBalance(address)` to obtain ETH balance
- Send balances to _Telegraf_ following **StatsD Protocol**

