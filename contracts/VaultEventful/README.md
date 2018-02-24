# Vault Eventful Contract
a logger contract for vaults events.

## Vault Eventful version 0.4.1
```
Mainnet:
Ropsten:
Kovan:
```
Bytecode
```
0x6060604052341561000f57600080fd5b604051602080610f5d8339810160405280805160008054600160a060020a03909216600160a060020a03199092169190911790555050610f09806100546000396000f3006060604052600436106100955763ffffffff60e060020a60003504166336d06e09811461009a57806340afc79d146100d95780635531a584146101075780635b3dea5e1461013257806389fcd7961461016c5780638f85a51c1461019b57806391f1df84146101c6578063b84d49e1146101ee578063d5aaa73a1461023c578063f39ba93214610264578063ffa1ad741461028f575b600080fd5b34156100a557600080fd5b6100c5600160a060020a0360043581169060243516604435606435610319565b604051901515815260200160405180910390f35b34156100e457600080fd5b6100c5600160a060020a0360043581169060243581169060443516606435610429565b341561011257600080fd5b6100c5600160a060020a03600435811690602435166044356064356105a8565b341561013d57600080fd5b6100c5600160a060020a036004358116906024358116906044358116906064358116906084351660a4356106a9565b341561017757600080fd5b61017f61083c565b604051600160a060020a03909116815260200160405180910390f35b34156101a657600080fd5b6100c5600160a060020a036004358116906024358116906044351661084b565b34156101d157600080fd5b6100c5600160a060020a03600435811690602435166044356109d4565b34156101f957600080fd5b6100c5600160a060020a036004803582169160248035821692604435831692606435808401939083013592608435918201929101359060a4359060c435166109dd565b341561024757600080fd5b6100c5600160a060020a0360043581169060243516604435610ba4565b341561026f57600080fd5b6100c5600160a060020a0360043581169060243581169060443516610d20565b341561029a57600080fd5b6102a2610ea6565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156102de5780820151838201526020016102c6565b50505050905090810190601f16801561030b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600080548490600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561037557600080fd5b6102c65a03f1151561038657600080fd5b505050604051805190501561041f57600085116103a257600080fd5b85600160a060020a031633600160a060020a03161415156103c257600080fd5b33600160a060020a031687600160a060020a031687600160a060020a03167f28c6b26efcac3b781594aa5d92ce15021a3fd09e4372d05f39dcf2991135e9a9888860405191825260208201526040908101905180910390a4600192505b5050949350505050565b600080548490600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561048557600080fd5b6102c65a03f1151561049657600080fd5b505050604051805190501561041f57600080548891600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561050657600080fd5b6102c65a03f1151561051757600080fd5b505050604051805190501561059c5787600160a060020a031633600160a060020a031614151561054657600080fd5b86600160a060020a031689600160a060020a031689600160a060020a03167fcc559ba8797304a1980209c4d33e0f6c650b18db7faf6a948701143d4ec424658960405190815260200160405180910390a4600194505b50505050949350505050565b600080548490600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561060457600080fd5b6102c65a03f1151561061557600080fd5b505050604051805190501561041f5785600160a060020a031633600160a060020a031614151561064457600080fd5b33600160a060020a031687600160a060020a031687600160a060020a03167f86963e5cbc0818f5a30f64ebdf22f752f854e38e362166525228562be164b904888860405191825260208201526040908101905180910390a45060019695505050505050565b600080548690600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561070557600080fd5b6102c65a03f1151561071657600080fd5b505050604051805190501561083057600080548a91600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561078657600080fd5b6102c65a03f1151561079757600080fd5b505050604051805190501561082d5789600160a060020a031633600160a060020a03161415156107c657600080fd5b88600160a060020a031688600160a060020a03168b600160a060020a03167f982bdc8d180375f96e97246bf98178a132eead25bae71432f6473a2a918cf5068a8a604051600160a060020a03909216825260208201526040908101905180910390a4600194505b50505b50509695505050505050565b600054600160a060020a031681565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156108a757600080fd5b6102c65a03f115156108b857600080fd5b50505060405180519050156109cb57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b151561092857600080fd5b6102c65a03f1151561093957600080fd5b50505060405180519050156109c85786600160a060020a031633600160a060020a031614151561096857600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fa7fd811628869bb4d099b1f287abd8664638b53aa8a51e3e97ed2cb17bf3eb8489604051600160a060020a03909116815260200160405180910390a4600194505b50505b50509392505050565b60009392505050565b600080548990600160a060020a03168063dcb7a3e083856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610a3957600080fd5b6102c65a03f11515610a4a57600080fd5b5050506040518051905015610b9557600080548d91600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610aba57600080fd5b6102c65a03f11515610acb57600080fd5b5050506040518051905015610b92578c600160a060020a031633600160a060020a0316141515610afa57600080fd5b85600160a060020a03168d600160a060020a03168d600160a060020a03167f64ed22ebf6a0e1e608cfc2a4fefa09fd94f6084554943b88d6cd6bf31536eaf88a8f8f8f8f604051858152606060208201818152908201859052604082016080830187878082843790910184810383528581526020019050858580828437820191505097505050505050505060405180910390a4600194505b50505b50509998505050505050505050565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610c0057600080fd5b6102c65a03f11515610c1157600080fd5b50505060405180519050156109cb57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610c8157600080fd5b6102c65a03f11515610c9257600080fd5b50505060405180519050156109c85786600160a060020a031633600160a060020a0316141515610cc157600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167f93d0111deb3c3657374f0dc73b64ff5ae0111e1e4e4d0b5860b0d799599d0a418960405190815260200160405180910390a4506001979650505050505050565b600080548390600160a060020a03168063a2ce277383856040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610d7c57600080fd5b6102c65a03f11515610d8d57600080fd5b50505060405180519050156109cb57600080548791600160a060020a0390911690819063d88c271e9084906040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610dfd57600080fd5b6102c65a03f11515610e0e57600080fd5b50505060405180519050156109c85786600160a060020a031633600160a060020a0316141515610e3d57600080fd5b87600160a060020a031633600160a060020a031688600160a060020a03167fefe40f758cd182716682db7a4bcd9dd6b9fba7e0bcc9fb0096282108db6f02ef89604051600160a060020a03909116815260200160405180910390a4506001979650505050505050565b60408051908101604052600881527f444820302e342e310000000000000000000000000000000000000000000000006020820152815600a165627a7a72305820d929c67d4c283cca7f91cb2b2399f6ae415419dda6abf736e0bed41f0ae212cb0029
```
ABI
```
[
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
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_revenue",
				"type": "uint256"
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
			}
		],
		"name": "SellVault",
		"type": "event"
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
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "NewFee",
		"type": "event"
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
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_amount",
				"type": "uint256"
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
	}
]
```
