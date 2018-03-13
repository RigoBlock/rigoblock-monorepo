# Authority Contract
a contract for managing permissions.

Name in parity registry: authority-v2

## Authority version 0.4.1
```
Mainnet:
Ropsten:
Kovan: 
```
Bytecode
```
606060405260008054600160a060020a033316600160a060020a0319909116179055611562806100306000396000f30060606040526004361061017f5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663088f47ee811461018457806313af4035146101b35780631610ac4d146101d45780631a68f034146101f35780632314d79c1461021a5780632330f2471461022d57806326c7a0de1461024c57806336f8dc891461025f5780633f7532e2146102725780634493890014610291578063485ff697146102b05780636e571167146102cf578063770f434f146102f35780637b9d4d26146103125780638da5cb5b146103365780639aa4d0a0146103495780639e2de32d14610368578063a0ca3ee114610387578063a2ce2773146103ab578063a3254102146103ca578063ab1dc427146103ee578063ad562f401461040d578063b191f13b14610431578063b5f0d35c14610450578063c4ef5c8514610474578063cba91dd214610499578063d88c271e146104bd578063dcb7a3e014610368578063e2294065146104dc578063e6e66c681461054d575b600080fd5b341561018f57600080fd5b610197610571565b604051600160a060020a03909116815260200160405180910390f35b34156101be57600080fd5b6101d2600160a060020a0360043516610581565b005b34156101df57600080fd5b6101d2600160a060020a0360043516610603565b34156101fe57600080fd5b61020661066f565b604051901515815260200160405180910390f35b341561022557600080fd5b610197610693565b341561023857600080fd5b610206600160a060020a03600435166106a2565b341561025757600080fd5b6101976106da565b341561026a57600080fd5b6101976106e9565b341561027d57600080fd5b6101d2600160a060020a03600435166106f8565b341561029c57600080fd5b610206600160a060020a0360043516610780565b34156102bb57600080fd5b610197600160a060020a03600435166107b2565b34156102da57600080fd5b6101d2600160a060020a036004351660243515156107d0565b34156102fe57600080fd5b6101d2600160a060020a0360043516610901565b341561031d57600080fd5b6101d2600160a060020a0360043516602435151561096d565b341561034157600080fd5b610197610a9e565b341561035457600080fd5b610206600160a060020a0360043516610aad565b341561037357600080fd5b610206600160a060020a0360043516610ade565b341561039257600080fd5b6101d2600160a060020a03600435166024351515610b14565b34156103b657600080fd5b610206600160a060020a0360043516610c2b565b34156103d557600080fd5b6101d2600160a060020a03600435166024351515610c5e565b34156103f957600080fd5b610206600160a060020a0360043516610d6d565b341561041857600080fd5b6101d2600160a060020a03600435166024351515610da1565b341561043c57600080fd5b6101d2600160a060020a0360043516610eca565b341561045b57600080fd5b6101d2600160a060020a03600435166024351515610f36565b341561047f57600080fd5b6101d2600160a060020a036004358116906024351661105a565b34156104a457600080fd5b6101d2600160a060020a036004351660243515156110a3565b34156104c857600080fd5b610206600160a060020a03600435166111b8565b34156104e757600080fd5b6104fa60048035602481019101356111ed565b60405160208082528190810183818151815260200191508051906020019060200280838360005b83811015610539578082015183820152602001610521565b505050509050019250505060405180910390f35b341561055857600080fd5b6101d2600160a060020a0360043516602435151561127b565b600254600160a060020a03165b90565b60005433600160a060020a0390811691161461059c57600080fd5b600160a060020a03811615156105b157600080fd5b60008054600160a060020a031916600160a060020a03838116918217928390559091167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a350565b60005433600160a060020a0390811691161461061e57600080fd5b60028054600160a060020a031916600160a060020a038381169190911791829055167f37d58d4deca971056abaac97f609a16f360952edc136fdf5a48f81cfaf80b6b060405160405180910390a250565b600454600160a060020a031660008181526005602052604090205460ff16905b5090565b600454600160a060020a031690565b600160a060020a0316600090815260096020908152604080832060018085520190915290205468010000000000000000900460ff1690565b600154600160a060020a031690565b600354600160a060020a031690565b60005433600160a060020a0390811691161461071357600080fd5b60048054600160a060020a031916600160a060020a03838116918217835560009182526005602052604091829020805460ff191660011790559154909116907ff62b7326bb5f6084a70482a099d3ded86de8cfbbfcea28e4f5b04ad693bf55ce905160405180910390a250565b600160a060020a0316600090815260096020908152604080832060018085520190915290205462010000900460ff1690565b600160a060020a039081166000908152600a60205260409020541690565b60005433600160a060020a03908116911614806107f157506107f1336113a6565b15156107fc57600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805466ff00000000000019166601000000000000909202919091179055600880549091810161087e83826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507fc433d92e44d10de63551410275cfea397c5b0c0a921dc8fb929d73c284ecb379905082604051901515815260200160405180910390a25050565b60005433600160a060020a0390811691161461091c57600080fd5b60018054600160a060020a031916600160a060020a038381169190911791829055167fdb21a20ff3dcd8554e0c246ba9b9c22c3b9c49bc2c0c08382d0934c863398ef460405160405180910390a250565b60005433600160a060020a039081169116148061098e575061098e336113a6565b151561099957600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805466ff000000000000191666010000000000009092029190911790556008805490918101610a1b83826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507f65bedaa378abbf394977612180c7726f9ed88d11f75847c5a609ded0afdbc9d3905082604051901515815260200160405180910390a25050565b600054600160a060020a031681565b600160a060020a03166000908152600960209081526040808320600180855201909152902054610100900460ff1690565b600160a060020a031660009081526009602090815260408083206001808552019091529020546601000000000000900460ff1690565b610b1d336113a6565b1515610b2857600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805465ff00000000001916650100000000009092029190911790556008805490918101610ba883826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507f79ece9769f2bf951b895b98f1611bef27aad2da0a868bc16a81e9d11ddfd4ff1905082604051901515815260200160405180910390a25050565b600160a060020a031660009081526009602090815260408083206001808552019091529020546301000000900460ff1690565b610c67336113a6565b1515610c7257600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805461ff0019166101009092029190911790556008805490918101610cea83826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507fb541b66aaab15841e9f8a3a40fc50b777ddd85dc6378cfc6389a973d2117c7d5905082604051901515815260200160405180910390a25050565b600160a060020a03166000908152600960209081526040808320600180855201909152902054640100000000900460ff1690565b60005433600160a060020a0390811691161480610dc25750610dc2336113a6565b1515610dcd57600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805462ff00001916620100009092029190911790556008805490918101610e4783826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507ff89e34cb19e9c7d8c84fdaaafb2dce1db4b2e19031ff02be22622530dd80605b905082604051901515815260200160405180910390a25050565b60005433600160a060020a03908116911614610ee557600080fd5b60038054600160a060020a031916600160a060020a038381169190911791829055167f357d1ba45e9ef3fb937f4b33a26a6efed1b2f40114460d16fbfce82aca41575560405160405180910390a250565b60005433600160a060020a03908116911614610f5157600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a86151590810291909117855580845260019094019091529020805468ff0000000000000000191668010000000000000000909202919091179055610fce82826113d2565b6008805460018101610fe083826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507f1679749591538f58df6938d50167216de9dda7d8a999dbb21d9f098383a13e02905060405160405180910390a25050565b60005433600160a060020a0390811691161461107557600080fd5b600160a060020a039182166000908152600a602052604090208054600160a060020a03191691909216179055565b6110ac336113a6565b15156110b757600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805464ff000000001916640100000000909202919091179055600880549091810161113583826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507fb4e51190ac09d88100031de9d538eda33e031ff4ea0598f973dcb1531ce12eb1905082604051901515815260200160405180910390a25050565b600160a060020a0316600090815260096020908152604080832060018085520190915290205465010000000000900460ff1690565b6111f5611500565b6007838360405180838380828437820191505092505050908152602001604051809103902080548060200260200160405190810160405280929190818152602001828054801561126e57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311611250575b5050505050905092915050565b60005433600160a060020a039081169116148061129c575061129c336113a6565b15156112a757600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805463ff00000019166301000000909202919091179055600880549091810161132383826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507f535a127f1000c5fa3267e0a84f04d11295bf38e2ad4d65355edfc9718a661e65905082604051901515815260200160405180910390a25050565b600160a060020a0316600090815260096020908152604080832060018085520190915290205460ff1690565b60005433600160a060020a039081169116146113ed57600080fd5b600160a060020a03821660008181526009602090815260408083208054600160a060020a03191690941760a060020a60ff02191660a060020a8615159081029190911785558084526001948501909252909120805460ff19169091179055600880549091810161145d83826114d7565b916000526020600020900160006020604051908101604052600160a060020a038616815291905081518154600160a060020a031916600160a060020a0391821617909155841691507f0ca44eaf19ec8e07aaa42c7f82892b8ff7de9faf7b420a750585730a0b0b3878905060405160405180910390a25050565b8154818355818115116114fb576000838152602090206114fb918101908301611512565b505050565b60206040519081016040526000815290565b61057e91905b8082111561068f578054600160a060020a03191681556001016115185600a165627a7a723058206b22aa98bf1abbd9e9d65a20abdfbb639a6754809844abef8e946259d21689b20029
```
ABI
```
[
	{
		"constant": true,
		"inputs": [],
		"name": "getVaultEventful",
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
				"name": "_new",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_vaultEventful",
				"type": "address"
			}
		],
		"name": "setVaultEventful",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isCasperInitialized",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCasper",
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
		"inputs": [
			{
				"name": "_authority",
				"type": "address"
			}
		],
		"name": "isAuthority",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDragoEventful",
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
		"name": "getExchangeEventful",
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
				"name": "_casper",
				"type": "address"
			}
		],
		"name": "setCasper",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_drago",
				"type": "address"
			}
		],
		"name": "isWhitelistedDrago",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_exchange",
				"type": "address"
			}
		],
		"name": "getExchangeAdapter",
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
				"name": "_registry",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistRegistry",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dragoEventful",
				"type": "address"
			}
		],
		"name": "setDragoEventful",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_factory",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistFactory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
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
		"inputs": [
			{
				"name": "_exchange",
				"type": "address"
			}
		],
		"name": "isWhitelistedExchange",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_registry",
				"type": "address"
			}
		],
		"name": "isWhitelistedRegistry",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_target",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_vault",
				"type": "address"
			}
		],
		"name": "isWhitelistedVault",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_exchange",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistExchange",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_asset",
				"type": "address"
			}
		],
		"name": "isWhitelistedAsset",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_drago",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistDrago",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_exchangeEventful",
				"type": "address"
			}
		],
		"name": "setExchangeEventful",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_authority",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "setAuthority",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_exchange",
				"type": "address"
			},
			{
				"name": "_adapter",
				"type": "address"
			}
		],
		"name": "setExchangeAdapter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_asset",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistAsset",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_target",
				"type": "address"
			}
		],
		"name": "isWhitelistedUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_factory",
				"type": "address"
			}
		],
		"name": "isWhitelistedFactory",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_group",
				"type": "string"
			}
		],
		"name": "getListsByGroups",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
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
				"name": "_vault",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "whitelistVault",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "authority",
				"type": "address"
			}
		],
		"name": "SetAuthority",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "whitelister",
				"type": "address"
			}
		],
		"name": "SetWhitelister",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "target",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "asset",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedAsset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "exchange",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedExchange",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "registry",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedRegistry",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "factory",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedFactory",
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
				"indexed": false,
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "WhitelistedVault",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "drago",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "isWhitelisted",
				"type": "bool"
			}
		],
		"name": "WhitelistedDrago",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "dragoEventful",
				"type": "address"
			}
		],
		"name": "NewDragoEventful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "vaultEventful",
				"type": "address"
			}
		],
		"name": "NewVaultEventful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "exchangeEventful",
				"type": "address"
			}
		],
		"name": "NewExchangeEventful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "casper",
				"type": "address"
			}
		],
		"name": "NewCasper",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "old",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "current",
				"type": "address"
			}
		],
		"name": "NewOwner",
		"type": "event"
	}
]
```
