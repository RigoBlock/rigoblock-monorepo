# Casper Interface Contract
a mock casper contract interface

## Casper contract version 0.4.2
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
				"name": "_validator_index",
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
		"inputs": [
			{
				"name": "_validator_index",
				"type": "uint128"
			}
		],
		"name": "deposit_size",
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
		"inputs": [],
		"name": "nextValidatorIndex",
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
				"name": "validation_addr",
				"type": "address"
			},
			{
				"name": "withdrawal_addr",
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
