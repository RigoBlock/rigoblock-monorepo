# Casper Interface Contract
a mock casper contract interface

## Casper contract version 0.4.1
```
Mainnet:
Ropsten:
Kovan:

```
mock Bytecode
```
6060604052341561000f57600080fd5b6101558061001e6000396000f3006060604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166302387a7b81146100665780633632588514610090578063f0afa25f146100c8578063f9609f08146100f0575b600080fd5b341561007157600080fd5b61008e6fffffffffffffffffffffffffffffffff60043516610117565b005b341561009b57600080fd5b6100a361011a565b6040516fffffffffffffffffffffffffffffffff909116815260200160405180910390f35b34156100d357600080fd5b6100a36fffffffffffffffffffffffffffffffff6004351661011f565b61008e73ffffffffffffffffffffffffffffffffffffffff60043581169060243516610125565b50565b600090565b50600090565b50505600a165627a7a72305820f78262512849be2fa0be8481b63151bd4db9bd7eb9c4ba7b9db457d65051e2c30029

```
mock ABI
```

[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_validatorIndex",
				"type": "uint128"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_nextValidatorIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_validatorIndex",
				"type": "uint128"
			}
		],
		"name": "get_deposit_size",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_validation",
				"type": "address"
			},
			{
				"name": "_withdrawal",
				"type": "address"
			}
		],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]

```
