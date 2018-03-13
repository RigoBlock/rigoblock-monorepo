# Vault Eventful Contract
a logger contract for vaults events.

Name in parity registry: vaulteventful-v2

## Vault Eventful version 0.4.1
```
Mainnet:
Ropsten:
Kovan:
```
Bytecode
```
6060604052341561000f57600080fd5b604051602080610ecc8339810160405280805160008054600160a060020a03909216600160a060020a03199092169190911790555050610e78806100546000396000f3006060604052600436106100955763ffffffff60e060020a60003504166306165749811461009a5780632f2d7bf4146100f057806340afc79d146101375780635b3dea5e1461016557806389fcd7961461019f5780638f85a51c146101ce57806391f1df84146101f9578063d5aaa73a14610221578063f39ba93214610249578063fee9da4a14610274578063ffa1ad74146102bb575b600080fd5b34156100a557600080fd5b6100dc600160a060020a03600480358216916024803590911691604435808301929082013591606435918201910135608435610345565b604051901515815260200160405180910390f35b34156100fb57600080fd5b6100dc600160a060020a03600480358216916024803590911691604435916064359160843580830192908201359160a43591820191013561045c565b341561014257600080fd5b6100dc600160a060020a036004358116906024358116906044351660643561057d565b341561017057600080fd5b6100dc600160a060020a036004358116906024358116906044358116906064358116906084351660a4356106c4565b34156101aa57600080fd5b6101b261081e565b604051600160a060020a03909116815260200160405180910390f35b34156101d957600080fd5b6100dc600160a060020a036004358116906024358116906044351661082d565b341561020457600080fd5b6100dc600160a060020a036004358116906024351660443561097d565b341561022c57600080fd5b6100dc600160a060020a0360043581169060243516604435610a51565b341561025457600080fd5b6100dc600160a060020a0360043581169060243581169060443516610b97565b341561027f57600080fd5b6100dc600160a060020a03600480358216916024803590911691604435916064359160843580830192908201359160a435918201910135610ce7565b34156102c657600080fd5b6102ce610e15565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561030a5780820151838201526020016102f2565b50505050905090810190601f1680156103375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600080543390600160a060020a03168063dcb7a3e08360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b151561039757600080fd5b5afa15156103a457600080fd5b5050506040518051905015156103b957600080fd5b89600160a060020a031633600160a060020a03168a600160a060020a03167f64ed22ebf6a0e1e608cfc2a4fefa09fd94f6084554943b88d6cd6bf31536eaf8878c8c8c8c604051858152606060208201818152908201859052604082016080830187878082843790910184810383528581526020019050858580828437820191505097505050505050505060405180910390a45060019998505050505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b15156104ae57600080fd5b5afa15156104bb57600080fd5b5050506040518051905015156104d057600080fd5b33600160a060020a03168b600160a060020a03168b600160a060020a03167f6141a2c56e3508b521d00477f5a870806718ec8575ab85abef01336b1ff47af48c8c8c8c8c8c604051868152602081018690526080604082018181529082018590526060820160a083018787808284379091018481038352858152602001905085858082843782019150509850505050505050505060405180910390a45060019a9950505050505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b15156105cf57600080fd5b5afa15156105dc57600080fd5b5050506040518051905015156105f157600080fd5b6000548790600160a060020a03168063d88c271e8360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b151561064257600080fd5b5afa151561064f57600080fd5b50505060405180519050151561066457600080fd5b86600160a060020a031689600160a060020a031689600160a060020a03167fcc559ba8797304a1980209c4d33e0f6c650b18db7faf6a948701143d4ec424658960405190815260200160405180910390a450600198975050505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b151561071657600080fd5b5afa151561072357600080fd5b50505060405180519050151561073857600080fd5b6000548990600160a060020a03168063d88c271e8360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b151561078957600080fd5b5afa151561079657600080fd5b5050506040518051905015156107ab57600080fd5b88600160a060020a031688600160a060020a03168b600160a060020a03167f982bdc8d180375f96e97246bf98178a132eead25bae71432f6473a2a918cf5068a8a604051600160a060020a03909216825260208201526040908101905180910390a45060019a9950505050505050505050565b600054600160a060020a031681565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b151561087f57600080fd5b5afa151561088c57600080fd5b5050506040518051905015156108a157600080fd5b6000548690600160a060020a03168063d88c271e8360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b15156108f257600080fd5b5afa15156108ff57600080fd5b50505060405180519050151561091457600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fa7fd811628869bb4d099b1f287abd8664638b53aa8a51e3e97ed2cb17bf3eb8489604051600160a060020a03909116815260200160405180910390a4506001979650505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b15156109cf57600080fd5b5afa15156109dc57600080fd5b5050506040518051905015156109f157600080fd5b600084116109fe57600080fd5b85600160a060020a031685600160a060020a03167f3b2429646ab0dd9a6002c77159344aa6dd3e6fdfc7c685513c2583d782e13f888660405190815260200160405180910390a350600195945050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b1515610aa357600080fd5b5afa1515610ab057600080fd5b505050604051805190501515610ac557600080fd5b6000548690600160a060020a03168063d88c271e8360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b1515610b1657600080fd5b5afa1515610b2357600080fd5b505050604051805190501515610b3857600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167f93d0111deb3c3657374f0dc73b64ff5ae0111e1e4e4d0b5860b0d799599d0a418960405190815260200160405180910390a4506001979650505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b1515610be957600080fd5b5afa1515610bf657600080fd5b505050604051805190501515610c0b57600080fd5b6000548690600160a060020a03168063d88c271e8360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b1515610c5c57600080fd5b5afa1515610c6957600080fd5b505050604051805190501515610c7e57600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fefe40f758cd182716682db7a4bcd9dd6b9fba7e0bcc9fb0096282108db6f02ef89604051600160a060020a03909116815260200160405180910390a4506001979650505050505050565b600080543390600160a060020a03168063a2ce27738360405160e060020a63ffffffff8416028152600160a060020a03909116600482015260240160206040518083038186803b1515610d3957600080fd5b5afa1515610d4657600080fd5b505050604051805190501515610d5b57600080fd5b60008911610d6857600080fd5b33600160a060020a03168b600160a060020a03168b600160a060020a03167f4aebdd85cf1c59f037ddd47abd2d880fea9ac8678f13a391cb5fb7cd8f7697668c8c8c8c8c8c604051868152602081018690526080604082018181529082018590526060820160a083018787808284379091018481038352858152602001905085858082843782019150509850505050505050505060405180910390a45060019a9950505050505050505050565b60408051908101604052600881527f444820302e342e310000000000000000000000000000000000000000000000006020820152815600a165627a7a72305820013379cba53060767f957b892a9d6f1270391a3e7f11d0bd241f8f06e85da8840029
```
ABI
```
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_newVault",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_vaultId",
				"type": "uint256"
			}
		],
		"name": "createVault",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "bytes"
			},
			{
				"name": "_symbol",
				"type": "bytes"
			}
		],
		"name": "buyVault",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_casper",
				"type": "address"
			},
			{
				"name": "_validatorIndex",
				"type": "uint256"
			}
		],
		"name": "withdrawFromCasper",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_casper",
				"type": "address"
			},
			{
				"name": "_validation",
				"type": "address"
			},
			{
				"name": "_withdrawal",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositToCasper",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "AUTHORITY",
		"outputs": [
			{
				"name": "",
				"type": "address"
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
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_vaultDao",
				"type": "address"
			}
		],
		"name": "changeVaultDao",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_ratio",
				"type": "uint256"
			}
		],
		"name": "changeRatio",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_transactionFee",
				"type": "uint256"
			}
		],
		"name": "setTransactionFee",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_feeCollector",
				"type": "address"
			}
		],
		"name": "changeFeeCollector",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_who",
				"type": "address"
			},
			{
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_revenue",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "bytes"
			},
			{
				"name": "_symbol",
				"type": "bytes"
			}
		],
		"name": "sellVault",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "VERSION",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_authority",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "revenue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "bytes"
			}
		],
		"name": "BuyVault",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "revenue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "bytes"
			}
		],
		"name": "SellVault",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "newRatio",
				"type": "uint256"
			}
		],
		"name": "NewRatio",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "NewFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "collector",
				"type": "address"
			}
		],
		"name": "NewCollector",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "vaultDao",
				"type": "address"
			}
		],
		"name": "VaultDao",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "validator",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "casper",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "withdrawal",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DepositCasper",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "validator",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "casper",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "validatorIndex",
				"type": "uint256"
			}
		],
		"name": "WithdrawCasper",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vault",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "group",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "vaultId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "VaultCreated",
		"type": "event"
	}
]
```
