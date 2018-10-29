# calculateNav

## _initialData_ properties:

- key
- poolType
- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Fetch the correct list of pools from _Redis_ according to the `poolType` and `key`
- Instantiate the correct pool Contract according to the `poolType`
- Map over the pools calling the Contract's `getData` to obtain the _BuyPrice_ and _SellPrice_
- Send the prices to _Telegraf_ as two separate series following **StatsD Protocol**

