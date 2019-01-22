# getTotalSupply

## _initialData_ properties:

- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Instantiate the correct pool Contract according to the `poolType`
- Map over the pools calling the Contract's `totalSupply()` method to obtain the _TotalSupply_
- Send totalSupply to _Telegraf_ following **StatsD Protocol**

