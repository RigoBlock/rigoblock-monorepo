// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
import {
    AwaitTransactionSuccessOpts,
    ContractFunctionObj,
    ContractTxFunctionObj,
    SendTransactionOpts,
    BaseContract,
    PromiseWithTransactionHash,
    methodAbiToFunctionSignature,
    linkLibrariesInBytecode,
} from '@0x/base-contract';
import { schemas } from '@0x/json-schemas';
import {
    BlockParam,
    BlockParamLiteral,
    BlockRange,
    CallData,
    ContractAbi,
    ContractArtifact,
    DecodedLogArgs,
    MethodAbi,
    TransactionReceiptWithDecodedLogs,
    TxData,
    TxDataPayable,
    SupportedProvider,
} from 'ethereum-types';
import { BigNumber, classUtils, hexUtils, logUtils, providerUtils } from '@0x/utils';
import { EventCallback, IndexedFilterValues, SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { assert } from '@0x/assert';
import * as ethers from 'ethers';
// tslint:enable:no-unused-variable



/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class SigVerifierContract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode = '0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631626ba7e8114610066578063a1c29ff5146100fe578063fdde841f146101ab578063ff772b95146101c0575b600080fd5b34801561007257600080fd5b506100ea6004803603604081101561008957600080fd5b813591908101906040810160208201356401000000008111156100ab57600080fd5b8201836020820111156100bd57600080fd5b803590602001918460018302840111640100000000831117156100df57600080fd5b509092509050610244565b604080519115158252519081900360200190f35b34801561010a57600080fd5b506101826004803603604081101561012157600080fd5b8135919081019060408101602082013564010000000081111561014357600080fd5b82018360208201111561015557600080fd5b8035906020019184600183028401116401000000008311171561017757600080fd5b509092509050610c05565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101b757600080fd5b50610182610c4f565b3480156101cc57600080fd5b50610182600480360360408110156101e357600080fd5b8135919081019060408101602082013564010000000081111561020557600080fd5b82018360208201111561021757600080fd5b8035906020019184600183028401116401000000008311171561023957600080fd5b509092509050610c6b565b6000806102878585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610cad92505050565b905060006102cb8686868080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610da792505050565b905073ffffffffffffffffffffffffffffffffffffffff821615610738573373ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040160206040518083038186803b15801561034b57600080fd5b505afa15801561035f573d6000803e3d6000fd5b505050506040513d602081101561037557600080fd5b505173ffffffffffffffffffffffffffffffffffffffff83811691161492508261040057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4549503731325f5349474e45525f494e56414c49440000000000000000000000604482015290519081900360640190fd5b600054604080517f8da5cb5b000000000000000000000000000000000000000000000000000000008152905168056bc75e2d631000009273ffffffffffffffffffffffffffffffffffffffff16916370a08231913391638da5cb5b916004808301926020929190829003018186803b15801561047b57600080fd5b505afa15801561048f573d6000803e3d6000fd5b505050506040513d60208110156104a557600080fd5b5051604080517c010000000000000000000000000000000000000000000000000000000063ffffffff851602815273ffffffffffffffffffffffffffffffffffffffff9092166004830152516024808301926020929190829003018186803b15801561051057600080fd5b505afa158015610524573d6000803e3d6000fd5b505050506040513d602081101561053a57600080fd5b50511061054a5760019250610733565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1663c112c7136040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040160206040518083038186803b1580156105c457600080fd5b505afa1580156105d8573d6000803e3d6000fd5b505050506040513d60208110156105ee57600080fd5b5051604080517f485ff697000000000000000000000000000000000000000000000000000000008152326004820152905173ffffffffffffffffffffffffffffffffffffffff9092169163485ff69791602480820192602092909190829003018186803b15801561065e57600080fd5b505afa158015610672573d6000803e3d6000fd5b505050506040513d602081101561068857600080fd5b505173ffffffffffffffffffffffffffffffffffffffff16141561073357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f56414c49445f4549503731325f4255545f4f524947494e5f4e4f545f5748495460448201527f454c495354454400000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b610b9e565b73ffffffffffffffffffffffffffffffffffffffff811615610b9e573373ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040160206040518083038186803b1580156107b657600080fd5b505afa1580156107ca573d6000803e3d6000fd5b505050506040513d60208110156107e057600080fd5b505173ffffffffffffffffffffffffffffffffffffffff82811691161492508261086b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4549503731325f5349474e45525f494e56414c49440000000000000000000000604482015290519081900360640190fd5b600054604080517f8da5cb5b000000000000000000000000000000000000000000000000000000008152905168056bc75e2d631000009273ffffffffffffffffffffffffffffffffffffffff16916370a08231913391638da5cb5b916004808301926020929190829003018186803b1580156108e657600080fd5b505afa1580156108fa573d6000803e3d6000fd5b505050506040513d602081101561091057600080fd5b5051604080517c010000000000000000000000000000000000000000000000000000000063ffffffff851602815273ffffffffffffffffffffffffffffffffffffffff9092166004830152516024808301926020929190829003018186803b15801561097b57600080fd5b505afa15801561098f573d6000803e3d6000fd5b505050506040513d60208110156109a557600080fd5b5051106109b55760019250610b9e565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1663c112c7136040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040160206040518083038186803b158015610a2f57600080fd5b505afa158015610a43573d6000803e3d6000fd5b505050506040513d6020811015610a5957600080fd5b5051604080517f485ff697000000000000000000000000000000000000000000000000000000008152326004820152905173ffffffffffffffffffffffffffffffffffffffff9092169163485ff69791602480820192602092909190829003018186803b158015610ac957600080fd5b505afa158015610add573d6000803e3d6000fd5b505050506040513d6020811015610af357600080fd5b505173ffffffffffffffffffffffffffffffffffffffff161415610b9e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f56414c49445f4554485349474e5f4255545f4f524947494e5f4e4f545f57484960448201527f54454c4953544544000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f5349474e41545552455f494e56414c4944320000000000000000000000000000604482015290519081900360640190fd5b6000610c478484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610cad92505050565b949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6000610c478484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610da792505050565b600080600080846000815181101515610cc257fe5b01602001517f0100000000000000000000000000000000000000000000000000000000000000908190048102049250610d0285600163ffffffff610ebc16565b9150610d1585602163ffffffff610ebc16565b905060018684848460405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610d74573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00151979650505050505050565b600080600080846000815181101515610dbc57fe5b01602001517f0100000000000000000000000000000000000000000000000000000000000000908190048102049250610dfc85600163ffffffff610ebc16565b9150610e0f85602163ffffffff610ebc16565b905060018660405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018281526020019150506040516020818303038152906040528051906020012084848460405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610d74573d6000803e3d6000fd5b600081602001835110151515610f5957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f524560448201527f5155495245440000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b5001602001519056fea165627a7a72305820dcf3c959e217a18a52ee8425c5cc0fefe288caaec726334934224b8c303426d40029';
public static contractName = 'SigVerifier';
    private readonly _methodABIIndex: { [name: string]: number } = {};
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _GRGTokenAddress: string,
    ): Promise<SigVerifierContract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        return SigVerifierContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _GRGTokenAddress
);
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _GRGTokenAddress: string,
    ): Promise<SigVerifierContract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        const libraryAddresses = await SigVerifierContract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return SigVerifierContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _GRGTokenAddress
);
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
            _GRGTokenAddress: string,
    ): Promise<SigVerifierContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_GRGTokenAddress
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_GRGTokenAddress
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_GRGTokenAddress
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToContractTxDataAsync(
            {
                data: txData,
                ...txDefaults,
            },
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`SigVerifier successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new SigVerifierContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [_GRGTokenAddress
];
        return contractInstance;
    }

    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                constant: true,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                    },
                    {
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                name: 'isValidSignature',
                outputs: [
                    {
                        name: 'isValid',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                    },
                    {
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                name: 'returnRecoveredEIP712',
                outputs: [
                    {
                        name: 'recovered',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'pure',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'GRGTokenAddress',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                    },
                    {
                        name: 'signature',
                        type: 'bytes',
                    },
                ],
                name: 'returnRecoveredETHSIGN',
                outputs: [
                    {
                        name: 'recovered',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'pure',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: '_GRGTokenAddress',
                        type: 'address',
                    },
                ],
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
        ] as ContractAbi;
        return abi;
    }

    protected static async _deployLibrariesAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        web3Wrapper: Web3Wrapper,
        txDefaults: Partial<TxData>,
        libraryAddresses: { [libraryName: string]: string } = {},
    ): Promise<{ [libraryName: string]: string }> {
        const links = artifact.compilerOutput.evm.bytecode.linkReferences;
        // Go through all linked libraries, recursively deploying them if necessary.
        for (const link of Object.values(links)) {
            for (const libraryName of Object.keys(link)) {
                if (!libraryAddresses[libraryName]) {
                    // Library not yet deployed.
                    const libraryArtifact = libraryArtifacts[libraryName];
                    if (!libraryArtifact) {
                        throw new Error(`Missing artifact for linked library "${libraryName}"`);
                    }
                    // Deploy any dependent libraries used by this library.
                    await SigVerifierContract._deployLibrariesAsync(
                        libraryArtifact,
                        libraryArtifacts,
                        web3Wrapper,
                        txDefaults,
                        libraryAddresses,
                    );
                    // Deploy this library.
                    const linkedLibraryBytecode = linkLibrariesInBytecode(
                        libraryArtifact,
                        libraryAddresses,
                    );
                    const txDataWithDefaults = await BaseContract._applyDefaultsToContractTxDataAsync(
                        {
                            data: linkedLibraryBytecode,
                            ...txDefaults,
                        },
                        web3Wrapper.estimateGasAsync.bind(web3Wrapper),
                    );
                    const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                    logUtils.log(`transactionHash: ${txHash}`);
                    const { contractAddress } = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
                    logUtils.log(`${libraryArtifact.contractName} successfully deployed at ${contractAddress}`);
                    libraryAddresses[libraryArtifact.contractName] = contractAddress as string;
                }
            }
        }
        return libraryAddresses;
    }

    public getFunctionSignature(methodName: string): string {
        const index = this._methodABIIndex[methodName];
        const methodAbi = SigVerifierContract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as SigVerifierContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as SigVerifierContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as SigVerifierContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    /**
     * Verifies that a signature is valid.
      * @param hash Message hash that is signed.
      * @param signature Proof of signing.
    * @returns Validity of order signature.
     */
    public isValidSignature(
            hash: string,
            signature: string,
    ): ContractFunctionObj<boolean
> {
        const self = this as any as SigVerifierContract;
            assert.isString('hash', hash);
            assert.isString('signature', signature);
        const functionSignature = 'isValidSignature(bytes32,bytes)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<boolean
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<boolean
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [hash,
            signature
            ]);
            },
        }
    };
    public returnRecoveredEIP712(
            hash: string,
            signature: string,
    ): ContractFunctionObj<string
> {
        const self = this as any as SigVerifierContract;
            assert.isString('hash', hash);
            assert.isString('signature', signature);
        const functionSignature = 'returnRecoveredEIP712(bytes32,bytes)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<string
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                } else {
                    rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<string
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [hash,
            signature
            ]);
            },
        }
    };
    public GRGTokenAddress(
    ): ContractFunctionObj<string
> {
        const self = this as any as SigVerifierContract;
        const functionSignature = 'GRGTokenAddress()';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<string
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<string
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, []);
            },
        }
    };
    public returnRecoveredETHSIGN(
            hash: string,
            signature: string,
    ): ContractFunctionObj<string
> {
        const self = this as any as SigVerifierContract;
            assert.isString('hash', hash);
            assert.isString('signature', signature);
        const functionSignature = 'returnRecoveredETHSIGN(bytes32,bytes)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<string
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                } else {
                    rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<string
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [hash,
            signature
            ]);
            },
        }
    };



    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = SigVerifierContract.deployedBytecode,
    ) {
        super('SigVerifier', SigVerifierContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
SigVerifierContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item as MethodAbi;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
}

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
