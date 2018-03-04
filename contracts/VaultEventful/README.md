# Vault Eventful Contract
a logger contract for vaults events.

Name in parity registry: vaulteventful-v2

## Vault Eventful version 0.4.1
```
Mainnet: 0xB2Abe57376D89da63f93A37F4cbeA496EC66c4C2
Ropsten: 0xB2Abe57376D89da63f93A37F4cbeA496EC66c4C2
Kovan: 0x93f943198C647b0f12C37CFEa0880690ea0939fa
```
Bytecode
```
6060604052341561000f57600080fd5b604051604080610fe5833981016040528080519190602001805160008054600160a060020a03958616600160a060020a03199182161790915560018054959092169416939093179092555050610f7b8061006a6000396000f3006060604052600436106100a05763ffffffff60e060020a60003504166306433b1b81146100a55780632f2d7bf4146100d457806340afc79d1461012f5780635b3dea5e1461015d57806389fcd796146101975780638f85a51c146101aa57806391f1df84146101d5578063b84d49e1146101fd578063d5aaa73a1461024b578063f39ba93214610273578063fee9da4a1461029e578063ffa1ad74146102e5575b600080fd5b34156100b057600080fd5b6100b861036f565b604051600160a060020a03909116815260200160405180910390f35b34156100df57600080fd5b61011b600160a060020a03600480358216916024803590911691604435916064359160843580830192908201359160a43591820191013561037e565b604051901515815260200160405180910390f35b341561013a57600080fd5b61011b600160a060020a03600435811690602435811690604435166064356104c9565b341561016857600080fd5b61011b600160a060020a036004358116906024358116906044358116906064358116906084351660a435610649565b34156101a257600080fd5b6100b86107dc565b34156101b557600080fd5b61011b600160a060020a03600435811690602435811690604435166107eb565b34156101e057600080fd5b61011b600160a060020a0360043581169060243516604435610974565b341561020857600080fd5b61011b600160a060020a036004803582169160248035821692604435831692606435808401939083013592608435918201929101359060a4359060c4351661097d565b341561025657600080fd5b61011b600160a060020a0360043581169060243516604435610ac0565b341561027e57600080fd5b61011b600160a060020a0360043581169060243581169060443516610c3c565b34156102a957600080fd5b61011b600160a060020a03600480358216916024803590911691604435916064359160843580830192908201359160a435918201910135610dc2565b34156102f057600080fd5b6102f8610f18565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561033457808201518382015260200161031c565b50505050905090810190601f1680156103615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600154600160a060020a031681565b600080548890600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156103da57600080fd5b6102c65a03f115156103eb57600080fd5b50505060405180519050156104bb5789600160a060020a031633600160a060020a031614151561041a57600080fd5b33600160a060020a03168b600160a060020a03168b600160a060020a03167f6141a2c56e3508b521d00477f5a870806718ec8575ab85abef01336b1ff47af48c8c8c8c8c8c604051868152602081018690526080604082018181529082018590526060820160a083018787808284379091018481038352858152602001905085858082843782019150509850505050505050505060405180910390a4600192505b505098975050505050505050565b600080548490600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561052557600080fd5b6102c65a03f1151561053657600080fd5b505050604051805190501561063f57600080548891600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156105a657600080fd5b6102c65a03f115156105b757600080fd5b505050604051805190501561063c5787600160a060020a031633600160a060020a03161415156105e657600080fd5b86600160a060020a031689600160a060020a031689600160a060020a03167fcc559ba8797304a1980209c4d33e0f6c650b18db7faf6a948701143d4ec424658960405190815260200160405180910390a4600194505b50505b5050949350505050565b600080548690600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156106a557600080fd5b6102c65a03f115156106b657600080fd5b50505060405180519050156107d057600080548a91600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561072657600080fd5b6102c65a03f1151561073757600080fd5b50505060405180519050156107cd5789600160a060020a031633600160a060020a031614151561076657600080fd5b88600160a060020a031688600160a060020a03168b600160a060020a03167f982bdc8d180375f96e97246bf98178a132eead25bae71432f6473a2a918cf5068a8a604051600160a060020a03909216825260208201526040908101905180910390a4600194505b50505b50509695505050505050565b600054600160a060020a031681565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561084757600080fd5b6102c65a03f1151561085857600080fd5b505050604051805190501561096b57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156108c857600080fd5b6102c65a03f115156108d957600080fd5b50505060405180519050156109685786600160a060020a031633600160a060020a031614151561090857600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fa7fd811628869bb4d099b1f287abd8664638b53aa8a51e3e97ed2cb17bf3eb8489604051600160a060020a03909116815260200160405180910390a4600194505b50505b50509392505050565b60009392505050565b600080548990600160a060020a03168063dcb7a3e083856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156109d957600080fd5b6102c65a03f115156109ea57600080fd5b5050506040518051905015610ab1578a600160a060020a031633600160a060020a0316141515610a1957600080fd5b83600160a060020a03168b600160a060020a03168b600160a060020a03167f64ed22ebf6a0e1e608cfc2a4fefa09fd94f6084554943b88d6cd6bf31536eaf8888d8d8d8d604051858152606060208201818152908201859052604082016080830187878082843790910184810383528581526020019050858580828437820191505097505050505050505060405180910390a4600192505b50509998505050505050505050565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610b1c57600080fd5b6102c65a03f11515610b2d57600080fd5b505050604051805190501561096b57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610b9d57600080fd5b6102c65a03f11515610bae57600080fd5b50505060405180519050156109685786600160a060020a031633600160a060020a0316141515610bdd57600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167f93d0111deb3c3657374f0dc73b64ff5ae0111e1e4e4d0b5860b0d799599d0a418960405190815260200160405180910390a4506001979650505050505050565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610c9857600080fd5b6102c65a03f11515610ca957600080fd5b505050604051805190501561096b57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610d1957600080fd5b6102c65a03f11515610d2a57600080fd5b50505060405180519050156109685786600160a060020a031633600160a060020a0316141515610d5957600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fefe40f758cd182716682db7a4bcd9dd6b9fba7e0bcc9fb0096282108db6f02ef89604051600160a060020a03909116815260200160405180910390a4506001979650505050505050565b600080548890600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610e1e57600080fd5b6102c65a03f11515610e2f57600080fd5b50505060405180519050156104bb5760008911610e4b57600080fd5b89600160a060020a031633600160a060020a0316141515610e6b57600080fd5b33600160a060020a03168b600160a060020a03168b600160a060020a03167f4aebdd85cf1c59f037ddd47abd2d880fea9ac8678f13a391cb5fb7cd8f7697668c8c8c8c8c8c604051868152602081018690526080604082018181529082018590526060820160a083018787808284379091018481038352858152602001905085858082843782019150509850505050505050505060405180910390a45060019a9950505050505050505050565b60408051908101604052600881527f444820302e342e310000000000000000000000000000000000000000000000006020820152815600a165627a7a72305820eddba1b1a6ea49c00428ee774843b58f469978c7e8ef40188b703db24935578b0029
```
ABI
```
[
	{
		"constant": true,
		"inputs": [],
		"name": "REGISTRY",
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
				"name": "_vaultFactory",
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
			},
			{
				"name": "_owner",
				"type": "address"
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
			},
			{
				"name": "_registry",
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
