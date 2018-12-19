# calculateNav

## _initialData_ properties:

- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Fetch the list of tokens and their relative addresses and wrapper addresses
- Instantiate the correct pool Contract according to the `poolType`
- Map over the pools: for each pool calculate the balance of each token and wrapper
- Send the prices to _Telegraf_ as two separate series following **StatsD Protocol**

