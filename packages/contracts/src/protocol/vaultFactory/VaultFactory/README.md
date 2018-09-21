# Vault Factory Contract

Deploy Vaults like a master!.

Name in parity registry: vaultfactory-v2

## version 0.4.2

```
Mainnet: //0xdc04786d38ca630ce7ba842dfbd415e5c098fd8a
Ropsten: //0xdc04786d38ca630ce7ba842dfbd415e5c098fd8a
Kovan: 0xde5b654c6c60487f9a29885bfdda53621a2505a8
```
Bytecode:
```
608060405234801561001057600080fd5b50604051606080613ddc833981016040528051602091820180519201516006600181018054600061010081900a600160a060020a038181021993841697811682029790971790935560028401805483169787168402979097179096556003909201805483169385168202939093179092558354163390921602178155613d4090819061009c90396000f300608060405260043610620000c55763ffffffff60e060020a60003504166313af40358114620000ca5780631c31f71014620000f05780633408f73a14620001145780635082520714620001c75780635ab1bd5314620001eb57806369fe0e2d146200022b578063837929b614620002465780638da5cb5b146200025e5780639890220b1462000276578063a390d7e1146200028e578063a91ee0dc14620002c8578063b11e2beb14620002ec578063ed3b49ac1462000362578063ffa1ad74146200038f575b600080fd5b348015620000d757600080fd5b50620000ee600160a060020a03600435166200041f565b005b348015620000fd57600080fd5b50620000ee600160a060020a0360043516620004f4565b3480156200012157600080fd5b506200012c62000556565b6040518084600160a060020a0316600160a060020a0316815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b83811015620001895781810151838201526020016200016f565b50505050905090810190601f168015620001b75780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b348015620001d457600080fd5b50620000ee600160a060020a0360043516620005bd565b348015620001f857600080fd5b5062000203620005f6565b6040518082600160a060020a0316600160a060020a0316815260200191505060405180910390f35b3480156200023857600080fd5b50620000ee60043562000611565b3480156200025357600080fd5b50620002036200064e565b3480156200026b57600080fd5b5062000203620006de565b3480156200028357600080fd5b50620000ee620006f6565b620002b1600480358101602081810192913591818101350190810190356200078a565b604080519115151515825251602090910181900390f35b348015620002d557600080fd5b50620000ee600160a060020a036004351662000a36565b348015620002f957600080fd5b5062000310600160a060020a036004351662000a98565b60405160208082018281038352835181528351839291820191858101910280838360005b838110156200034e57818101518382015260200162000334565b505050509050019250505060405180910390f35b3480156200036f57600080fd5b50620000ee60048035600160a060020a0390811691602001351662000b36565b3480156200039c57600080fd5b50620003a762000bea565b6040516020808201828103835283518152835183929182019185019080838360005b83811015620003e3578181015183820152602001620003c9565b50505050905090810190601f168015620004115780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156200045457600080fd5b6000600160a060020a031681600160a060020a0316141515156200047757600080fd5b806000806101000a815481600160a060020a030219169083600160a060020a0316021790555080600160a060020a03166000809054906101000a9004600160a060020a0316600160a060020a03167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a350565b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156200052957600080fd5b80600660020160006101000a815481600160a060020a030219169083600160a060020a0316021790555050565b60026006015460408051808201909152600881527f564620302e342e320000000000000000000000000000000000000000000000006020820152600160a060020a03600061010081900a90930416918282620005b162000c21565b91945092509050909192565b600660020160009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156200052957600080fd5b60066001015460006101000a9004600160a060020a03165b90565b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156200064657600080fd5b600060060155565b600080600660030160009054906101000a9004600160a060020a0316905080600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015620006a957600080fd5b505afa158015620006be573d6000803e3d6000fd5b505050506040513d6020811015620006d557600080fd5b505191505b5090565b6000809054906101000a9004600160a060020a031681565b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156200072b57600080fd5b600660020160009054906101000a9004600160a060020a0316600160a060020a03166108fc30600160a060020a0316319081150290604051600060405180830381858888f1935050505015801562000787573d6000803e3d6000fd5b50565b6000806000806006600001543410151515620007a557600080fd5b600660010160009054906101000a9004600160a060020a0316925082600160a060020a031663ced72f876040518163ffffffff1660e060020a02815260040160206040518083038186803b158015620007fd57600080fd5b505afa15801562000812573d6000803e3d6000fd5b505050506040513d60208110156200082957600080fd5b50516040805163cd6f4e0d63ffffffff811660e060020a0282529151929450600160a060020a038616926004909101906020908083038186803b1580156200087057600080fd5b505afa15801562000885573d6000803e3d6000fd5b505050506040513d60208110156200089c57600080fd5b5051604080516020601f8b018190048102810182019092528981529192506200090d91908a908a90819084018382808284375050604080516020601f8e018190048102810182019092528c815294508c93508b92508291508401838280828437820191505050505050338462000c7c565b15156200091957600080fd5b82600160a060020a0316633fa7d3e383600160040160009054906101000a9004600160a060020a03168b8b8b8b88336040518963ffffffff1660e060020a0281526004018088600160a060020a0316600160a060020a03168152602001806020018060200185815260200184600160a060020a0316600160a060020a03168152602001838103835289898281815260200192508082843790910184810383528781526020019050878780828437820191505099505050505050505050506020604051808303818588803b158015620009f057600080fd5b505af115801562000a05573d6000803e3d6000fd5b50505050506040513d602081101562000a1d57600080fd5b5051151562000a2857fe5b506001979650505050505050565b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151562000a6b57600080fd5b80600660010160006101000a815481600160a060020a030219169083600160a060020a0316021790555050565b60606006600401600083600160a060020a0316600160a060020a0316815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801562000b2a57602002820191906000526020600020905b8160009054906101000a9004600160a060020a0316600160a060020a03168152602001906001019080831162000af9575b50505050509050919050565b60008060009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151562000b6d57600080fd5b82905080600160a060020a03166350825207836040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050600060405180830381600087803b15801562000bcc57600080fd5b505af115801562000be1573d6000803e3d6000fd5b50505050505050565b60408051808201909152600881527f564620302e342e32000000000000000000000000000000000000000000000000602082015281565b600080600660010160009054906101000a9004600160a060020a0316905080600160a060020a031663cd6f4e0d6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015620006a957600080fd5b60066003015460009061010082900a9004600160a060020a03168162000ca860018888888887620011c4565b151562000cb457600080fd5b6006600401600086600160a060020a0316600160a060020a03168152602001908152602001600020600160040160009054906101000a9004600160a060020a031690806001815401808255809150509060018203906000526020600020016000909192909190916101000a815481600160a060020a030219169083600160a060020a031602179055505081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801562000d7b57600080fd5b505afa15801562000d90573d6000803e3d6000fd5b505050506040513d602081101562000da757600080fd5b8101908080519060200190929190505050905080600160a060020a0316630616574986600160040160009054906101000a9004600160a060020a03168a8a896040518663ffffffff1660e060020a0281526004018086600160a060020a0316600160a060020a0316815260200185600160a060020a0316600160a060020a031681526020018060200180602001848152602001838103835286818151815260200191508051906020019080838360005b8381101562000e7157818101518382015260200162000e57565b50505050905090810190601f16801562000e9f5780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b8381101562000ed457818101518382015260200162000eba565b50505050905090810190601f16801562000f025780820380516001836020036101000a031916815260200191505b50975050505050505050602060405180830381600087803b15801562000f2757600080fd5b505af115801562000f3c573d6000803e3d6000fd5b505050506040513d602081101562000f5357600080fd5b5051151562000f6157600080fd5b81600160a060020a031663e6e66c68600160040160009054906101000a9004600160a060020a031660016040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a031681526020018215151515815260200192505050600060405180830381600087803b15801562000fe257600080fd5b505af115801562000ff7573d6000803e3d6000fd5b5050505081600160a060020a031663a0ca3ee18660016040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a031681526020018215151515815260200192505050600060405180830381600087803b1580156200106457600080fd5b505af115801562001079573d6000803e3d6000fd5b5050505084600160a060020a0316600160040160009054906101000a9004600160a060020a0316600160a060020a03167fa4d67dc007d63bf037b4ddf55b81abcac4baa236e678684cfa426913b6e75474898988604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b8381101562001116578181015183820152602001620010fc565b50505050905090810190601f168015620011445780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b83811015620011795781810151838201526020016200115f565b50505050905090810190601f168015620011a75780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a35060019695505050505050565b84516000908190620011df908983019060208a0190620013a9565b8651620011f69060018b019060208a0190620013a9565b858a600201819055878b60030160006101000a815481600160a060020a030219169083600160a060020a03160217905586620012316200142a565b6020808201808201868152600160a060020a0380871681169184019182528581161690830190815282018381038452885460026001610100818416150203909116048082528493919091019089908015620012d05780601f10620012a457610100808354040283529160200191620012d0565b820191906000526020600020905b815481529060010190602001808311620012b257829003601f168201915b505083810382528754600260016101008184161502039091160480825260209091019088908015620013465780601f106200131a5761010080835404028352916020019162001346565b820191906000526020600020905b8154815290600101906020018083116200132857829003601f168201915b5050975050505050505050604051809103906000f0801580156200136e573d6000803e3d6000fd5b509050808860040160006101000a815481600160a060020a030219169083600160a060020a0316021790555060019150509695505050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620013ec57805160ff19168380011785556200141c565b828001600101855582156200141c579182015b828111156200141c578251825591602001919060010190620013ff565b50620006da9291506200143b565b6040516128bc806200145983390190565b6200060e91905b80821115620006da576000815560010162001442560060806040523480156200001157600080fd5b50604051620028bc380380620028bc833981016040528051602080830180519082018051908301805190840151948601805190969390930194919390926200006391600060010191908801906200010e565b5083516200007b90600180019060208701906200010e565b506001600281810194909455670de0b6b3a76400006004808301919091556000805461010082900a600160a060020a03818102199283169781168202978817845560089384018054841697821683029790971790965593820180548216339096169094029490941790925566038d7ea4c68000600383015593810180549092169092179055605091015550620001b39050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200015157805160ff191683800117855562000181565b8280016001018555821562000181579182015b828111156200018157825182559160200191906001019062000164565b506200018f92915062000193565b5090565b620001b091905b808211156200018f57600081556001016200019a565b90565b6126f980620001c36000396000f3006080604052600436106101035763ffffffff60e060020a600035041663096a8ab781146101a55780630d8e6e2c146101bf57806313af40351461024957806318160ddd1461026a5780631f46822914610292578063240d9cba146102da5780633bc5de30146102f257806350825207146103ed57806354bdbd4d1461040e578063673a7e281461042c57806370a082311461044157806379e102e6146104625780637f69fd5c14610477578063837929b61461048c5780638da5cb5b146104c95780638f7a844b146104de5780639245290d1461056e5780639489fa841461058f578063af41cec0146105a4578063d5947f14146105b8578063f6a33253146105c0575b6000600860000160009054906101000a9004600160a060020a0316905080600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561015c57600080fd5b505afa158015610170573d6000803e3d6000fd5b505050506040513d602081101561018657600080fd5b505133600160a060020a0390811691161415156101a257600080fd5b50005b3480156101b157600080fd5b506101bd6004356105d8565b005b3480156101cb57600080fd5b506101d4610745565b6040516020808201828103835283518152835183929182019185019080838360005b8381101561020e5781810151838201526020016101f6565b50505050905090810190601f16801561023b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561025557600080fd5b506101bd600160a060020a036004351661077c565b34801561027657600080fd5b5061027f61084f565b6040805191825251602090910181900390f35b34801561029e57600080fd5b506102c3600160a060020a036004803582169160209182018035909116910135610858565b604080519115151515825251602090910181900390f35b3480156102e657600080fd5b506102c3600435610c40565b3480156102fe57600080fd5b50610307610d9c565b604051602080820180820185815282018481528201838103845287518152875184939182019189019080838360005b8381101561034e578181015183820152602001610336565b50505050905090810190601f16801561037b5780820380516001836020036101000a031916815260200191505b50838103825286518152865160209182019188019080838360005b838110156103ae578181015183820152602001610396565b50505050905090810190601f1680156103db5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b3480156103f957600080fd5b506101bd600160a060020a0360043516610eec565b34801561041a57600080fd5b506101bd63ffffffff60043516611078565b34801561043857600080fd5b506101bd6110d7565b34801561044d57600080fd5b5061027f600160a060020a03600435166110e1565b34801561046e57600080fd5b5061027f611104565b34801561048357600080fd5b506101bd611113565b34801561049857600080fd5b506104a161140f565b6040518082600160a060020a0316600160a060020a0316815260200191505060405180910390f35b3480156104d557600080fd5b506104a161149c565b3480156104ea57600080fd5b506104f36114b4565b6040518087600160a060020a0316600160a060020a0316815260200186600160a060020a0316600160a060020a0316815260200185600160a060020a0316600160a060020a031681526020018481526020018381526020018263ffffffff1663ffffffff168152602001965050505050505060405180910390f35b34801561057a57600080fd5b506101bd600160a060020a0360043516611509565b34801561059b57600080fd5b5061027f611691565b6102c3600160a060020a036004351661169b565b6102c36116d0565b3480156105cc57600080fd5b506101bd600435611704565b6000806000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151561060f57600080fd5b6064831115151561061f57600080fd5b600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561067657600080fd5b505afa15801561068a573d6000803e3d6000fd5b505050506040513d60208110156106a057600080fd5b50516040805163d5aaa73a63ffffffff811660e060020a028252600160a060020a0333811681166004909301928352308116811660209384019081528301888152935194955085169390928201919080830381600087803b15801561070457600080fd5b505af1158015610718573d6000803e3d6000fd5b505050506040513d602081101561072e57600080fd5b5051151561073b57600080fd5b5050600560010155565b60408051808201909152600881527f564320302e352e32000000000000000000000000000000000000000000000000602082015290565b6000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156107b057600080fd5b6000600160a060020a031681600160a060020a0316141515156107d257600080fd5b806000806101000a815481600160a060020a030219169083600160a060020a0316021790555080600160a060020a03166000809054906101000a9004600160a060020a0316600160a060020a03167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a350565b60036001015490565b6000806000806000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151561089257600080fd5b8460086003015481101515156108a757600080fd5b30600160a060020a031687600160a060020a03161415156108c757600080fd5b600860000160009054906101000a9004600160a060020a0316935083600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561091e57600080fd5b505afa158015610932573d6000803e3d6000fd5b505050506040513d602081101561094857600080fd5b50516040805163cc680dbb63ffffffff811660e060020a0282529151929550600160a060020a038616926004909101906020908083038186803b15801561098e57600080fd5b505afa1580156109a2573d6000803e3d6000fd5b505050506040513d60208110156109b857600080fd5b8101908080519060200190929190505050600160060160046101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff16021790555082600160a060020a031663f9609f08878a8a6040518463ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182600160a060020a0316600160a060020a03168152602001925050506000604051808303818588803b158015610a7957600080fd5b505af1158015610a8d573d6000803e3d6000fd5b505050505083600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015610ace57600080fd5b505afa158015610ae2573d6000803e3d6000fd5b505050506040513d6020811015610af857600080fd5b8101908080519060200190929190505050915081600160a060020a0316635b3dea5e333087600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015610b5857600080fd5b505afa158015610b6c573d6000803e3d6000fd5b505050506040513d6020811015610b8257600080fd5b50516040805160e060020a63ffffffff8716028152600160a060020a0394851685166004909101908152928416841660209384019081529184168416918301918252838e168416918301918252838d1690931690820190815281018a815291519181019180830381600087803b158015610bfb57600080fd5b505af1158015610c0f573d6000803e3d6000fd5b505050506040513d6020811015610c2557600080fd5b50511515610c3257600080fd5b506001979650505050505050565b60008060008060008580600d600033600160a060020a0316600160a060020a031681526020019081526020016000206000015410151515610c8057600080fd5b600160a060020a03338116166000818152600d6020808301828152908101808420840154948452919052812001548891908201111515610cbf57600080fd5b600d600033600160a060020a0316600160a060020a0316815260200190815260200160002060010160000160009054906101000a900463ffffffff1663ffffffff164210151515610d0f57600080fd5b610d17611865565b610d2088611888565b92985090965094509250610d348884611915565b610d4033898888611c6a565b610d4f60016003015485611dd5565b600360010155604051600160a060020a0333169084156108fc0290859060008180800381858888f19350505050158015610d8d573d6000803e3d6000fd5b50600198975050505050505050565b600160008181018054604080516020601f6002610100868a161502989098039094169690960492830186900486028601810190915281815260609485949384939091830182828015610e2f5780601f10610e0457610100808354040283529160200191610e2f565b820191906000526020600020905b815481529060010190602001808311610e1257829003601f168201915b50505060018080018054604080516020600284871615610100029690960390931694909404601f81018390048302830185019091528084529599508995929450909250830182828015610ec35780601f10610e9857610100808354040283529160200191610ec3565b820191906000526020600020905b815481529060010190602001808311610ea657829003601f168201915b5050505050935083610ed3611de9565b935083610ede611de9565b929791965094509092509050565b600080600860010160009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a0316141515610f2757600080fd5b600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015610f7e57600080fd5b505afa158015610f92573d6000803e3d6000fd5b505050506040513d6020811015610fa857600080fd5b505160408051638f85a51c63ffffffff811660e060020a028252600160a060020a0333811681166004909301928352308116811660209384019081528882168216908401908152935194955085169390928201919080830381600087803b15801561101257600080fd5b505af1158015611026573d6000803e3d6000fd5b505050506040513d602081101561103c57600080fd5b5051151561104957600080fd5b82600860010160006101000a815481600160a060020a030219169083600160a060020a03160217905550505050565b600860010160009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a03161415156110b057600080fd5b80600160060160006101000a81548163ffffffff021916908363ffffffff16021790555050565b6110df611865565b565b600160a060020a03908116166000908152600d6020808301918252018120015490565b600061110e611e57565b905090565b60008060008060009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151561114c57600080fd5b600860000160009054906101000a9004600160a060020a0316925082600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b1580156111a357600080fd5b505afa1580156111b7573d6000803e3d6000fd5b505050506040513d60208110156111cd57600080fd5b5051600160060154604080516302387a7b63ffffffff811660e060020a028252600461010081900a9094046fffffffffffffffffffffffffffffffff908116811616939091019283529051929450600160a060020a03851692909160200190600090808303818387803b15801561124357600080fd5b505af1158015611257573d6000803e3d6000fd5b5050505082600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561129757600080fd5b505afa1580156112ab573d6000803e3d6000fd5b505050506040513d60208110156112c157600080fd5b8101908080519060200190929190505050905080600160a060020a03166340afc79d333086600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561132157600080fd5b505afa158015611335573d6000803e3d6000fd5b505050506040513d602081101561134b57600080fd5b50516001600601546040805163ffffffff871660e060020a028152600160a060020a0395861686166004918201908152948616861660209586019081529386169095169284019283526101009490940a90046fffffffffffffffffffffffffffffffff9081161690820190815291519181019180830381600087803b1580156113d357600080fd5b505af11580156113e7573d6000803e3d6000fd5b505050506040513d60208110156113fd57600080fd5b5051151561140a57600080fd5b505050565b600080600860000160009054906101000a9004600160a060020a0316905080600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561146957600080fd5b505afa15801561147d573d6000803e3d6000fd5b505050506040513d602081101561149357600080fd5b505191505b5090565b6000809054906101000a9004600160a060020a031681565b600080546008600281015460018083015460049093015460058201546006909201546101009690960a94859004600160a060020a03908116979386900481169694869004169490939192910463ffffffff1690565b6000806000809054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151561154057600080fd5b600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561159757600080fd5b505afa1580156115ab573d6000803e3d6000fd5b505050506040513d60208110156115c157600080fd5b50516040805163f39ba93263ffffffff811660e060020a028252600160a060020a0333811681166004909301928352308116811660209384019081528882168216908401908152935194955085169390928201919080830381600087803b15801561162b57600080fd5b505af115801561163f573d6000803e3d6000fd5b505050506040513d602081101561165557600080fd5b5051151561166257600080fd5b82600860020160006101000a815481600160a060020a030219169083600160a060020a03160217905550505050565b600061110e611de9565b60003460086003015481101515156116b257600080fd5b6116bc8334611f4b565b15156116c757600080fd5b50600192915050565b60003460086003015481101515156116e757600080fd5b6116f13334611f4b565b15156116fc57600080fd5b600191505090565b600080600860010160009054906101000a9004600160a060020a0316600160a060020a031633600160a060020a031614151561173f57600080fd5b600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561179657600080fd5b505afa1580156117aa573d6000803e3d6000fd5b505050506040513d60208110156117c057600080fd5b5051604080516391f1df8463ffffffff811660e060020a028252600160a060020a0333811681166004909301928352308116811660209384019081528301888152935194955085169390928201919080830381600087803b15801561182457600080fd5b505af1158015611838573d6000803e3d6000fd5b505050506040513d602081101561184e57600080fd5b5051151561185b57600080fd5b5050600460080155565b600030600160a060020a03163111156110df57611880611de9565b600460010155565b60008060008060006127106118a287600160050154611fa9565b8115156118ab57fe5b04905060646118bf82600860040154611fa9565b8115156118c857fe5b049450846118d68286611dd5565b9450846118e38884611dd5565b945084620f42406118f987600160040154611fa9565b81151561190257fe5b939a929950909750909104945092505050565b600160008181018054604080516020601f6002610100868a1615029890980390941696909604928301869004860286018101909152818152606094859493849390918301828280156119a85780601f1061197d576101008083540402835291602001916119a8565b820191906000526020600020905b81548152906001019060200180831161198b57829003601f168201915b50505060018080018054604080516020601f6002610100868916150297909703909416959095049283018590048502850181019091528181529599509093509150830182828015611a3a5780601f10611a0f57610100808354040283529160200191611a3a565b820191906000526020600020905b815481529060010190602001808311611a1d57829003601f168201915b50505050509250600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b158015611a9857600080fd5b505afa158015611aac573d6000803e3d6000fd5b505050506040513d6020811015611ac257600080fd5b8101908080519060200190929190505050905080600160a060020a031663fee9da4a3330898989896040518763ffffffff1660e060020a0281526004018087600160a060020a0316600160a060020a0316815260200186600160a060020a0316600160a060020a031681526020018581526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015611b79578181015183820152602001611b61565b50505050905090810190601f168015611ba65780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015611bd9578181015183820152602001611bc1565b50505050905090810190601f168015611c065780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b158015611c2b57600080fd5b505af1158015611c3f573d6000803e3d6000fd5b505050506040513d6020811015611c5557600080fd5b50511515611c6257600080fd5b505050505050565b611c9c600d600086600160a060020a0316600160a060020a031681526020019081526020016000206000015484611dd5565b600d600086600160a060020a0316600160a060020a0316815260200190815260200160002060000181905550611d12600d6000600860020160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a031681526020019081526020016000206000015483611fd5565b600d6000600860020160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a0316815260200190815260200160002060000181905550611da0600d6000600860010160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a031681526020019081526020016000206000015482611fd5565b600160080154600160a060020a03600061010081900a90920481168116168152600d6020808301918252018120015550505050565b6000828211151515611de357fe5b50900390565b6000806000611df6611ff1565b611e01576000611e09565b611e09611e57565b915034611e2030600160a060020a03163184611fd5565b039050600160030154600014611e4957611e44620f4240820260016003015461204b565b611e50565b6001600401545b9250505090565b600080611e62611ff1565b15611f4257611e6f612082565b905080600160a060020a0316633e1a114e600160060160049054906101000a90046fffffffffffffffffffffffffffffffff166040518263ffffffff1660e060020a02815260040180826fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015611efd57600080fd5b505afa158015611f11573d6000803e3d6000fd5b505050506040513d6020811015611f2757600080fd5b50516fffffffffffffffffffffffffffffffff169150611498565b60009150611498565b6000806000806000611f5b611865565b611f6486612116565b92965090945092509050611f7781612198565b611f83878285856124ec565b611f9260016003015485611fd5565b600160030181905550600194505050505092915050565b600082820283821480611fc65750828482811515611fc357fe5b04145b1515611fce57fe5b9392505050565b6000828201838110158015611fc65750828110151515611fce57fe5b600080600860000160009054906101000a9004600160a060020a0316905080600160a060020a0316631a68f0346040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561146957600080fd5b60008060008311151561205a57fe5b828481151561206557fe5b049050828481151561207357fe5b068184020184141515611fce57fe5b6000600881015461010082900a9004600160a060020a03166120a2611ff1565b156114985780600160a060020a0316632314d79c6040518163ffffffff1660e060020a02815260040160206040518083038186803b1580156120e357600080fd5b505afa1580156120f7573d6000803e3d6000fd5b505050506040513d602081101561210d57600080fd5b50519150611498565b6000806000806000612132620f4240870260016004015461204b565b945061271061214686600160050154611fa9565b81151561214f57fe5b04905084606461216483600860040154611fa9565b81151561216d57fe5b0494508461217b8387611dd5565b9450846121888885611dd5565b9299919850965090945092505050565b600160008181018054604080516020601f6002610100868a16150298909803909416969096049283018690048602860181019091528181526060948594938493909183018282801561222b5780601f106122005761010080835404028352916020019161222b565b820191906000526020600020905b81548152906001019060200180831161220e57829003601f168201915b50505060018080018054604080516020601f60026101008689161502979097039094169590950492830185900485028501810190915281815295995090935091508301828280156122bd5780601f10612292576101008083540402835291602001916122bd565b820191906000526020600020905b8154815290600101906020018083116122a057829003601f168201915b50505050509250600860000160009054906101000a9004600160a060020a0316915081600160a060020a031663088f47ee6040518163ffffffff1660e060020a02815260040160206040518083038186803b15801561231b57600080fd5b505afa15801561232f573d6000803e3d6000fd5b505050506040513d602081101561234557600080fd5b8101908080519060200190929190505050905080600160a060020a0316632f2d7bf43330348989896040518763ffffffff1660e060020a0281526004018087600160a060020a0316600160a060020a0316815260200186600160a060020a0316600160a060020a031681526020018581526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156123fc5781810151838201526020016123e4565b50505050905090810190601f1680156124295780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b8381101561245c578181015183820152602001612444565b50505050905090810190601f1680156124895780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b1580156124ae57600080fd5b505af11580156124c2573d6000803e3d6000fd5b505050506040513d60208110156124d857600080fd5b505115156124e557600080fd5b5050505050565b61251e600d600086600160a060020a0316600160a060020a031681526020019081526020016000206000015484611fd5565b600d600086600160a060020a0316600160a060020a0316815260200190815260200160002060000181905550612594600d6000600860020160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a031681526020019081526020016000206000015483611fd5565b600d6000600860020160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a0316815260200190815260200160002060000181905550612622600d6000600860010160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a031681526020019081526020016000206000015482611fd5565b600d6000600860010160009054906101000a9004600160a060020a0316600160a060020a0316600160a060020a0316815260200190815260200160002060000181905550600160060160009054906101000a900463ffffffff164201600d600086600160a060020a0316600160a060020a0316815260200190815260200160002060010160000160006101000a81548163ffffffff021916908363ffffffff160217905550505050505600a165627a7a72305820e39b5f4a49b5855b1f02692d36c3bd87cba1f12457690e1d62c59f6096a2a6480029a165627a7a72305820c5d09b3e1622aa6623d04f7018ded3ad621556586ed94a3a79d6698e15da22a20029

```
ABI
```
[
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
				"name": "_vaultDao",
				"type": "address"
			}
		],
		"name": "setBeneficiary",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getStorage",
		"outputs": [
			{
				"name": "vaultDao",
				"type": "address"
			},
			{
				"name": "version",
				"type": "string"
			},
			{
				"name": "nextVaultId",
				"type": "uint256"
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
				"name": "_newVaultDao",
				"type": "address"
			}
		],
		"name": "changeVaultDao",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRegistry",
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
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEventful",
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
		"constant": false,
		"inputs": [],
		"name": "drain",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			}
		],
		"name": "createVault",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newRegistry",
				"type": "address"
			}
		],
		"name": "setRegistry",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getVaultsByAddress",
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
				"name": "_targetVault",
				"type": "address"
			},
			{
				"name": "_vaultDao",
				"type": "address"
			}
		],
		"name": "setTargetVaultDao",
		"outputs": [],
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
				"name": "_registry",
				"type": "address"
			},
			{
				"name": "_vaultDao",
				"type": "address"
			},
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
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			},
			{
				"indexed": true,
				"name": "vault",
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
			}
		],
		"name": "VaultCreated",
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