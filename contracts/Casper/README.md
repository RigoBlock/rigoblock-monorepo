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
