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
export class HGetDragoDataContract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode: string | undefined;
public static contractName = 'HGetDragoData';
    private readonly _methodABIIndex: { [name: string]: number } = {};
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<HGetDragoDataContract> {
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
        return HGetDragoDataContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<HGetDragoDataContract> {
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
        const libraryAddresses = await HGetDragoDataContract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return HGetDragoDataContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<HGetDragoDataContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
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
        logUtils.log(`HGetDragoData successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new HGetDragoDataContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
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
                        name: '_dragoRegistry',
                        type: 'address',
                    },
                    {
                        name: '_dragoAddresses',
                        type: 'address[]',
                    },
                ],
                name: 'queryMultiDataFromAddress',
                outputs: [
                    {
                        name: '',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'name',
                                type: 'string',
                            },
                            {
                                name: 'symbol',
                                type: 'string',
                            },
                            {
                                name: 'sellPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'buyPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'owner',
                                type: 'address',
                            },
                            {
                                name: 'feeCollector',
                                type: 'address',
                            },
                            {
                                name: 'dragoDao',
                                type: 'address',
                            },
                            {
                                name: 'ratio',
                                type: 'uint256',
                            },
                            {
                                name: 'transactionFee',
                                type: 'uint256',
                            },
                            {
                                name: 'totalSupply',
                                type: 'uint256',
                            },
                            {
                                name: 'ethBalance',
                                type: 'uint256',
                            },
                            {
                                name: 'minPeriod',
                                type: 'uint32',
                            },
                            {
                                name: 'id',
                                type: 'uint256',
                            },
                            {
                                name: 'drago',
                                type: 'address',
                            },
                        ]
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
                        name: '_dragoRegistry',
                        type: 'address',
                    },
                    {
                        name: '_dragoAddress',
                        type: 'address',
                    },
                ],
                name: 'queryDataFromAddress',
                outputs: [
                    {
                        name: 'dragoData',
                        type: 'tuple',
                        components: [
                            {
                                name: 'name',
                                type: 'string',
                            },
                            {
                                name: 'symbol',
                                type: 'string',
                            },
                            {
                                name: 'sellPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'buyPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'owner',
                                type: 'address',
                            },
                            {
                                name: 'feeCollector',
                                type: 'address',
                            },
                            {
                                name: 'dragoDao',
                                type: 'address',
                            },
                            {
                                name: 'ratio',
                                type: 'uint256',
                            },
                            {
                                name: 'transactionFee',
                                type: 'uint256',
                            },
                            {
                                name: 'totalSupply',
                                type: 'uint256',
                            },
                            {
                                name: 'ethBalance',
                                type: 'uint256',
                            },
                            {
                                name: 'minPeriod',
                                type: 'uint32',
                            },
                            {
                                name: 'id',
                                type: 'uint256',
                            },
                            {
                                name: 'drago',
                                type: 'address',
                            },
                        ]
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
                        name: '_dragoRegistry',
                        type: 'address',
                    },
                    {
                        name: '_dragoId',
                        type: 'uint256',
                    },
                ],
                name: 'queryDataFromId',
                outputs: [
                    {
                        name: 'dragoData',
                        type: 'tuple',
                        components: [
                            {
                                name: 'name',
                                type: 'string',
                            },
                            {
                                name: 'symbol',
                                type: 'string',
                            },
                            {
                                name: 'sellPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'buyPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'owner',
                                type: 'address',
                            },
                            {
                                name: 'feeCollector',
                                type: 'address',
                            },
                            {
                                name: 'dragoDao',
                                type: 'address',
                            },
                            {
                                name: 'ratio',
                                type: 'uint256',
                            },
                            {
                                name: 'transactionFee',
                                type: 'uint256',
                            },
                            {
                                name: 'totalSupply',
                                type: 'uint256',
                            },
                            {
                                name: 'ethBalance',
                                type: 'uint256',
                            },
                            {
                                name: 'minPeriod',
                                type: 'uint32',
                            },
                            {
                                name: 'id',
                                type: 'uint256',
                            },
                            {
                                name: 'drago',
                                type: 'address',
                            },
                        ]
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
                        name: '_dragoRegistry',
                        type: 'address',
                    },
                    {
                        name: '_dragoIds',
                        type: 'uint256[]',
                    },
                ],
                name: 'queryMultiDataFromId',
                outputs: [
                    {
                        name: '',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'name',
                                type: 'string',
                            },
                            {
                                name: 'symbol',
                                type: 'string',
                            },
                            {
                                name: 'sellPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'buyPrice',
                                type: 'uint256',
                            },
                            {
                                name: 'owner',
                                type: 'address',
                            },
                            {
                                name: 'feeCollector',
                                type: 'address',
                            },
                            {
                                name: 'dragoDao',
                                type: 'address',
                            },
                            {
                                name: 'ratio',
                                type: 'uint256',
                            },
                            {
                                name: 'transactionFee',
                                type: 'uint256',
                            },
                            {
                                name: 'totalSupply',
                                type: 'uint256',
                            },
                            {
                                name: 'ethBalance',
                                type: 'uint256',
                            },
                            {
                                name: 'minPeriod',
                                type: 'uint32',
                            },
                            {
                                name: 'id',
                                type: 'uint256',
                            },
                            {
                                name: 'drago',
                                type: 'address',
                            },
                        ]
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
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
                    await HGetDragoDataContract._deployLibrariesAsync(
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
        const methodAbi = HGetDragoDataContract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as HGetDragoDataContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as HGetDragoDataContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as HGetDragoDataContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    /**
     * Returns structs of infos on a drago from its address.
      * @param _dragoRegistry Address of the pools registry.
      * @param _dragoAddresses Array of addresses of the target dragos.
    * @returns Arrays of structs of data and related address of a drago.
     */
    public queryMultiDataFromAddress(
            _dragoRegistry: string,
            _dragoAddresses: string[],
    ): ContractFunctionObj<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
> {
        const self = this as any as HGetDragoDataContract;
            assert.isString('_dragoRegistry', _dragoRegistry);
            assert.isArray('_dragoAddresses', _dragoAddresses);
        const functionSignature = 'queryMultiDataFromAddress(address,address[])';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [_dragoRegistry.toLowerCase(),
            _dragoAddresses
            ]);
            },
        }
    };
    /**
     * Returns structs of infos on a drago from its address.
      * @param _dragoRegistry Address of the pools registry.
      * @param _dragoAddress Array of addresses of the target drago.
    * @returns Arrays of structs of data.
     */
    public queryDataFromAddress(
            _dragoRegistry: string,
            _dragoAddress: string,
    ): ContractFunctionObj<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
> {
        const self = this as any as HGetDragoDataContract;
            assert.isString('_dragoRegistry', _dragoRegistry);
            assert.isString('_dragoAddress', _dragoAddress);
        const functionSignature = 'queryDataFromAddress(address,address)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [_dragoRegistry.toLowerCase(),
            _dragoAddress.toLowerCase()
            ]);
            },
        }
    };
    /**
     * Returns structs of infos on a drago from its ID.
      * @param _dragoRegistry Address of the pools registry.
      * @param _dragoId Number of the target drago ID.
    * @returns Structs of data.
     */
    public queryDataFromId(
            _dragoRegistry: string,
            _dragoId: BigNumber,
    ): ContractFunctionObj<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
> {
        const self = this as any as HGetDragoDataContract;
            assert.isString('_dragoRegistry', _dragoRegistry);
            assert.isBigNumber('_dragoId', _dragoId);
        const functionSignature = 'queryDataFromId(address,uint256)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [_dragoRegistry.toLowerCase(),
            _dragoId
            ]);
            },
        }
    };
    /**
     * Returns structs of infos on a drago from its ID.
      * @param _dragoRegistry Address of the drago registry.
      * @param _dragoIds Array of IDs of the target dragos.
    * @returns Arrays of structs of data and related address of a drago.
     */
    public queryMultiDataFromId(
            _dragoRegistry: string,
            _dragoIds: BigNumber[],
    ): ContractFunctionObj<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
> {
        const self = this as any as HGetDragoDataContract;
            assert.isString('_dragoRegistry', _dragoRegistry);
            assert.isArray('_dragoIds', _dragoIds);
        const functionSignature = 'queryMultiDataFromId(address,uint256[])';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<Array<{name: string;symbol: string;sellPrice: BigNumber;buyPrice: BigNumber;owner: string;feeCollector: string;dragoDao: string;ratio: BigNumber;transactionFee: BigNumber;totalSupply: BigNumber;ethBalance: BigNumber;minPeriod: number;id: BigNumber;drago: string}>
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [_dragoRegistry.toLowerCase(),
            _dragoIds
            ]);
            },
        }
    };



    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = HGetDragoDataContract.deployedBytecode,
    ) {
        super('HGetDragoData', HGetDragoDataContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
HGetDragoDataContract.ABI().forEach((item, index) => {
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
