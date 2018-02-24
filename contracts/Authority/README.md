# Authority Contract
a contract for managing permissions.

## Authority version 0.4.1
```
Mainnet:
Ropsten:
Kovan:
```
Bytecode
```
0x6060604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612f11806100536000396000f300606060405260043610610196576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063088f47ee1461019b57806313af4035146101f05780631610ac4d146102295780632314d79c146102625780632330f247146102b757806326c7a0de1461030857806336f8dc891461035d5780633f7532e2146103b257806344938900146103eb578063485ff6971461043c5780636e571167146104b5578063770f434f146104f95780637b9d4d26146105325780637d0c269f14610576578063893d20e8146105c75780638da5cb5b1461061c5780639aa4d0a0146106715780639e2de32d146106c2578063a0ca3ee114610713578063a2ce277314610757578063a3254102146107a8578063ab1dc427146107ec578063ad562f401461083d578063b191f13b14610881578063b5f0d35c146108ba578063c4ef5c85146108fe578063c91b014914610956578063cba91dd21461099a578063d88c271e146109de578063dcb7a3e014610a2f578063e229406514610a80578063e6e66c6814610b32575b600080fd5b34156101a657600080fd5b6101ae610b76565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101fb57600080fd5b610227600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610ba2565b005b341561023457600080fd5b610260600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610cbb565b005b341561026d57600080fd5b610275610dc3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102c257600080fd5b6102ee600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610df0565b604051808215151515815260200191505060405180910390f35b341561031357600080fd5b61031b610e62565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036857600080fd5b610370610e8f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103bd57600080fd5b6103e9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610ebc565b005b34156103f657600080fd5b610422600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610fc6565b604051808215151515815260200191505060405180910390f35b341561044757600080fd5b610473600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611038565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104c057600080fd5b6104f7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506110a1565b005b341561050457600080fd5b610530600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611343565b005b341561053d57600080fd5b610574600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505061144d565b005b341561058157600080fd5b6105ad600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506116ef565b604051808215151515815260200191505060405180910390f35b34156105d257600080fd5b6105da611761565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561062757600080fd5b61062f611766565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561067c57600080fd5b6106a8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061178b565b604051808215151515815260200191505060405180910390f35b34156106cd57600080fd5b6106f9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506117fd565b604051808215151515815260200191505060405180910390f35b341561071e57600080fd5b610755600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505061186f565b005b341561076257600080fd5b61078e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611aba565b604051808215151515815260200191505060405180910390f35b34156107b357600080fd5b6107ea600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050611b2c565b005b34156107f757600080fd5b610823600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611d77565b604051808215151515815260200191505060405180910390f35b341561084857600080fd5b61087f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050611de9565b005b341561088c57600080fd5b6108b8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061208b565b005b34156108c557600080fd5b6108fc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050612195565b005b341561090957600080fd5b610954600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612427565b005b341561096157600080fd5b610998600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050612504565b005b34156109a557600080fd5b6109dc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505061278c565b005b34156109e957600080fd5b610a15600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506129d7565b604051808215151515815260200191505060405180910390f35b3415610a3a57600080fd5b610a66600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612a49565b604051808215151515815260200191505060405180910390f35b3415610a8b57600080fd5b610adb600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050612abb565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610b1e578082015181840152602081019050610b03565b505050509050019250505060405180910390f35b3415610b3d57600080fd5b610b74600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050612bbd565b005b60006001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bfd57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a350565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d1657600080fd5b806001800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f37d58d4deca971056abaac97f609a16f360952edc136fdf5a48f81cfaf80b6b060405160405180910390a250565b6000600160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160089054906101000a900460ff169050919050565b6000600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f1757600080fd5b80600160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff62b7326bb5f6084a70482a099d3ded86de8cfbbfcea28e4f5b04ad693bf55ce60405160405180910390a250565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160029054906101000a900460ff169050919050565b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806111015750611100336116ef565b5b1561133f5781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160066101000a81548160ff0219169083151502179055506005600201805480600101828161126a9190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167fc433d92e44d10de63551410275cfea397c5b0c0a921dc8fb929d73c284ecb37982604051808215151515815260200191505060405180910390a25b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561139e57600080fd5b80600160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fdb21a20ff3dcd8554e0c246ba9b9c22c3b9c49bc2c0c08382d0934c863398ef460405160405180910390a250565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806114ad57506114ac336116ef565b5b156116eb5781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160066101000a81548160ff021916908315150217905550600560020180548060010182816116169190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167f65bedaa378abbf394977612180c7726f9ed88d11f75847c5a609ded0afdbc9d382604051808215151515815260200191505060405180910390a25b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160009054906101000a900460ff169050919050565b600090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160019054906101000a900460ff169050919050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160069054906101000a900460ff169050919050565b611878336116ef565b15611ab65781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160056101000a81548160ff021916908315150217905550600560020180548060010182816119e19190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167f79ece9769f2bf951b895b98f1611bef27aad2da0a868bc16a81e9d11ddfd4ff182604051808215151515815260200191505060405180910390a25b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160039054906101000a900460ff169050919050565b611b35336116ef565b15611d735781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160016101000a81548160ff02191690831515021790555060056002018054806001018281611c9e9190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167fb541b66aaab15841e9f8a3a40fc50b777ddd85dc6378cfc6389a973d2117c7d582604051808215151515815260200191505060405180910390a25b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160049054906101000a900460ff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611e495750611e48336116ef565b5b156120875781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160026101000a81548160ff02191690831515021790555060056002018054806001018281611fb29190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167ff89e34cb19e9c7d8c84fdaaafb2dce1db4b2e19031ff02be22622530dd80605b82604051808215151515815260200191505060405180910390a25b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156120e657600080fd5b80600160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f357d1ba45e9ef3fb937f4b33a26a6efed1b2f40114460d16fbfce82aca41575560405160405180910390a250565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156121f057600080fd5b81600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160086101000a81548160ff0219169083151502179055506123478282612504565b6005600201805480600101828161235e9190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167f1679749591538f58df6938d50167216de9dda7d8a999dbb21d9f098383a13e0260405160405180910390a25050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561248257600080fd5b80600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561255f57600080fd5b81600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160006101000a81548160ff021916908315150217905550600560020180548060010182816126c39190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167f0ca44eaf19ec8e07aaa42c7f82892b8ff7de9faf7b420a750585730a0b0b387860405160405180910390a25050565b612795336116ef565b156129d35781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160046101000a81548160ff021916908315150217905550600560020180548060010182816128fe9190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167fb4e51190ac09d88100031de9d538eda33e031ff4ea0598f973dcb1531ce12eb182604051808215151515815260200191505060405180910390a25b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160059054906101000a900460ff169050919050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600115151515815260200190815260200160002060000160069054906101000a900460ff169050919050565b612ac3612e8b565b6005600101826040518082805190602001908083835b602083101515612afe5780518252602082019150602081019050602083039250612ad9565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020805480602002602001604051908101604052809291908181526020018280548015612bb157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612b67575b50505050509050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480612c1d5750612c1c336116ef565b5b15612e5b5781600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160146101000a81548160ff02191690831515021790555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008315151515815260200190815260200160002060000160036101000a81548160ff02191690831515021790555060056002018054806001018281612d869190612e5f565b916000526020600020900160006020604051908101604052808673ffffffffffffffffffffffffffffffffffffffff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050508173ffffffffffffffffffffffffffffffffffffffff167f535a127f1000c5fa3267e0a84f04d11295bf38e2ad4d65355edfc9718a661e6582604051808215151515815260200191505060405180910390a25b5050565b815481835581811511612e8657818360005260206000209182019101612e859190612e9f565b5b505050565b602060405190810160405280600081525090565b612ee291905b80821115612ede57600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550600101612ea5565b5090565b905600a165627a7a723058205cd9d5908aef0cf885084b3f79bbb43e7977280dcd34c0480f39dfb0955e57bf0029
```
ABI
```
[
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
		"constant": true,
		"inputs": [],
		"name": "getOwner",
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
		"inputs": [
			{
				"name": "_whitelister",
				"type": "address"
			}
		],
		"name": "isWhitelister",
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
		"constant": false,
		"inputs": [
			{
				"name": "_whitelister",
				"type": "address"
			},
			{
				"name": "_isWhitelisted",
				"type": "bool"
			}
		],
		"name": "setWhitelister",
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
		"name": "NewExchangeEventful",
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
		"name": "NewVaultEventful",
		"type": "event"
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
	}
]
```
