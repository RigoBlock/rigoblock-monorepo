# calculateNav

## _initialData_ properties:

- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Fetch the list of tokens and their relative addresses and wrapper addresses from Ethfinex
- Fetch all token prices from Ethfinex
- Instantiate the correct pool Contract according to the `poolType`
- Map over the pools: for each pool calculate the balance of each token and wrapper
- Calculate the nav of each pool
- Send the nav value to _Telegraf_ following **StatsD Protocol**, with all balances and prices as labels

