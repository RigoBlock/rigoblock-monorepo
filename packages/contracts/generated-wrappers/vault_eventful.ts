// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
import {
    AwaitTransactionSuccessOpts,
    ContractFunctionObj,
    ContractTxFunctionObj,
    SendTransactionOpts,
    BaseContract,
    SubscriptionManager,PromiseWithTransactionHash,
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
    LogWithDecodedArgs,
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


export type VaultEventfulEventArgs =
    | VaultEventfulBuyVaultEventArgs
    | VaultEventfulSellVaultEventArgs
    | VaultEventfulNewRatioEventArgs
    | VaultEventfulNewFeeEventArgs
    | VaultEventfulNewCollectorEventArgs
    | VaultEventfulVaultDaoEventArgs
    | VaultEventfulVaultCreatedEventArgs;

export enum VaultEventfulEvents {
    BuyVault = 'BuyVault',
    SellVault = 'SellVault',
    NewRatio = 'NewRatio',
    NewFee = 'NewFee',
    NewCollector = 'NewCollector',
    VaultDao = 'VaultDao',
    VaultCreated = 'VaultCreated',
}

export interface VaultEventfulBuyVaultEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    to: string;
    amount: BigNumber;
    revenue: BigNumber;
    name: string;
    symbol: string;
}

export interface VaultEventfulSellVaultEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    to: string;
    amount: BigNumber;
    revenue: BigNumber;
    name: string;
    symbol: string;
}

export interface VaultEventfulNewRatioEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    newRatio: BigNumber;
}

export interface VaultEventfulNewFeeEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    to: string;
    fee: BigNumber;
}

export interface VaultEventfulNewCollectorEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    to: string;
    collector: string;
}

export interface VaultEventfulVaultDaoEventArgs extends DecodedLogArgs {
    vault: string;
    from: string;
    to: string;
    vaultDao: string;
}

export interface VaultEventfulVaultCreatedEventArgs extends DecodedLogArgs {
    vault: string;
    group: string;
    owner: string;
    vaultId: BigNumber;
    name: string;
    symbol: string;
}


/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class VaultEventfulContract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode: string | undefined;
public static contractName = 'VaultEventful';
    private readonly _methodABIIndex: { [name: string]: number } = {};
private readonly _subscriptionManager: SubscriptionManager<VaultEventfulEventArgs, VaultEventfulEvents>;
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _authority: string,
    ): Promise<VaultEventfulContract> {
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
        return VaultEventfulContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _authority
);
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _authority: string,
    ): Promise<VaultEventfulContract> {
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
        const libraryAddresses = await VaultEventfulContract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return VaultEventfulContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _authority
);
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
            _authority: string,
    ): Promise<VaultEventfulContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_authority
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_authority
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_authority
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
        logUtils.log(`VaultEventful successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new VaultEventfulContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [_authority
];
        return contractInstance;
    }

    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_newVault',
                        type: 'address',
                    },
                    {
                        name: '_name',
                        type: 'string',
                    },
                    {
                        name: '_symbol',
                        type: 'string',
                    },
                    {
                        name: '_vaultId',
                        type: 'uint256',
                    },
                ],
                name: 'createVault',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                    {
                        name: '_name',
                        type: 'bytes',
                    },
                    {
                        name: '_symbol',
                        type: 'bytes',
                    },
                ],
                name: 'buyVault',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'AUTHORITY',
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
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_vaultDao',
                        type: 'address',
                    },
                ],
                name: 'changeVaultDao',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_ratio',
                        type: 'uint256',
                    },
                ],
                name: 'changeRatio',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_transactionFee',
                        type: 'uint256',
                    },
                ],
                name: 'setTransactionFee',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_feeCollector',
                        type: 'address',
                    },
                ],
                name: 'changeFeeCollector',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: '_who',
                        type: 'address',
                    },
                    {
                        name: '_targetVault',
                        type: 'address',
                    },
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                    {
                        name: '_revenue',
                        type: 'uint256',
                    },
                    {
                        name: '_name',
                        type: 'bytes',
                    },
                    {
                        name: '_symbol',
                        type: 'bytes',
                    },
                ],
                name: 'sellVault',
                outputs: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'VERSION',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: '_authority',
                        type: 'address',
                    },
                ],
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'revenue',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'name',
                        type: 'bytes',
                        indexed: false,
                    },
                    {
                        name: 'symbol',
                        type: 'bytes',
                        indexed: false,
                    },
                ],
                name: 'BuyVault',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'revenue',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'name',
                        type: 'bytes',
                        indexed: false,
                    },
                    {
                        name: 'symbol',
                        type: 'bytes',
                        indexed: false,
                    },
                ],
                name: 'SellVault',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'newRatio',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'NewRatio',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'fee',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'NewFee',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'collector',
                        type: 'address',
                        indexed: false,
                    },
                ],
                name: 'NewCollector',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'vaultDao',
                        type: 'address',
                        indexed: false,
                    },
                ],
                name: 'VaultDao',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'vault',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'group',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'owner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'vaultId',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'name',
                        type: 'string',
                        indexed: false,
                    },
                    {
                        name: 'symbol',
                        type: 'string',
                        indexed: false,
                    },
                ],
                name: 'VaultCreated',
                outputs: [
                ],
                type: 'event',
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
                    await VaultEventfulContract._deployLibrariesAsync(
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
        const methodAbi = VaultEventfulContract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as VaultEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as VaultEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as VaultEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    /**
     * Logs a new Vault creation by factory
      * @param _who Address of the caller
      * @param _newVault Address of the new vault
      * @param _name String of the name of the new vault
      * @param _symbol String of the symbol of the new vault
      * @param _vaultId Number of the new vault Id
    * @returns Bool the transaction executed successfully
     */
    public createVault(
            _who: string,
            _newVault: string,
            _name: string,
            _symbol: string,
            _vaultId: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_newVault', _newVault);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
            assert.isBigNumber('_vaultId', _vaultId);
        const functionSignature = 'createVault(address,address,string,string,uint256)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _newVault.toLowerCase(),
            _name,
            _symbol,
            _vaultId
            ]);
            },
        }
    };
    /**
     * Logs a Buy Vault event.
      * @param _who Address of who is buying
      * @param _targetVault Address of the target vault
      * @param _value Value of the transaction in Ether
      * @param _amount Number of shares purchased
    * @returns Bool the transaction executed successfully
     */
    public buyVault(
            _who: string,
            _targetVault: string,
            _value: BigNumber,
            _amount: BigNumber,
            _name: string,
            _symbol: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isBigNumber('_value', _value);
            assert.isBigNumber('_amount', _amount);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
        const functionSignature = 'buyVault(address,address,uint256,uint256,bytes,bytes)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _value,
            _amount,
            _name,
            _symbol
            ]);
            },
        }
    };
    public AUTHORITY(
    ): ContractFunctionObj<string
> {
        const self = this as any as VaultEventfulContract;
        const functionSignature = 'AUTHORITY()';

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
    /**
     * Logs a change in the vault dao of an approved vault
      * @param _who Address of the caller
      * @param _targetVault Address of the vault
      * @param _vaultDao Address of the new vault dao
    * @returns Bool the transaction executed successfully
     */
    public changeVaultDao(
            _who: string,
            _targetVault: string,
            _vaultDao: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isString('_vaultDao', _vaultDao);
        const functionSignature = 'changeVaultDao(address,address,address)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _vaultDao.toLowerCase()
            ]);
            },
        }
    };
    /**
     * Logswhen rigoblock dao changes fee split.
      * @param _who Address of the caller
      * @param _targetVault Address of the target vault
      * @param _ratio Ratio number from 0 to 100
    * @returns Bool the transaction executed successfully
     */
    public changeRatio(
            _who: string,
            _targetVault: string,
            _ratio: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isBigNumber('_ratio', _ratio);
        const functionSignature = 'changeRatio(address,address,uint256)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _ratio
            ]);
            },
        }
    };
    /**
     * Logs a modification of the transaction fee event
      * @param _who Address of the caller
      * @param _targetVault Address of the target Vault
      * @param _transactionFee Value of the transaction fee in basis points
    * @returns Bool the transaction executed successfully
     */
    public setTransactionFee(
            _who: string,
            _targetVault: string,
            _transactionFee: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isBigNumber('_transactionFee', _transactionFee);
        const functionSignature = 'setTransactionFee(address,address,uint256)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _transactionFee
            ]);
            },
        }
    };
    /**
     * Logs when wizard changes fee collector address
      * @param _who Address of the caller
      * @param _targetVault Address of the target Vault
      * @param _feeCollector Address of the new fee collector
    * @returns Bool the transaction executed successfully
     */
    public changeFeeCollector(
            _who: string,
            _targetVault: string,
            _feeCollector: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isString('_feeCollector', _feeCollector);
        const functionSignature = 'changeFeeCollector(address,address,address)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _feeCollector.toLowerCase()
            ]);
            },
        }
    };
    /**
     * Logs a Sell Vault event.
      * @param _who Address of who is selling
      * @param _targetVault Address of the target vault
      * @param _amount Number of shares purchased
      * @param _revenue Value of the transaction in Ether
    * @returns Bool the transaction executed successfully
     */
    public sellVault(
            _who: string,
            _targetVault: string,
            _amount: BigNumber,
            _revenue: BigNumber,
            _name: string,
            _symbol: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as VaultEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetVault', _targetVault);
            assert.isBigNumber('_amount', _amount);
            assert.isBigNumber('_revenue', _revenue);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
        const functionSignature = 'sellVault(address,address,uint256,uint256,bytes,bytes)';

        return {
            async sendTransactionAsync(
                txData?: Partial<TxData> | undefined,
                opts: SendTransactionOpts = { shouldValidate: true },
            ): Promise<string> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() },
                    this.estimateGasAsync.bind(this),
                );
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(
                txData?: Partial<TxData>,
                opts: AwaitTransactionSuccessOpts = { shouldValidate: true },
            ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(
                txData?: Partial<TxData> | undefined,
            ): Promise<number> {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync(
                    { ...txData, data: this.getABIEncodedTransactionData() }
                );
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
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
                return self._strictEncodeArguments(functionSignature, [_who.toLowerCase(),
            _targetVault.toLowerCase(),
            _amount,
            _revenue,
            _name,
            _symbol
            ]);
            },
        }
    };
    public VERSION(
    ): ContractFunctionObj<string
> {
        const self = this as any as VaultEventfulContract;
        const functionSignature = 'VERSION()';

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

    /**
     * Subscribe to an event type emitted by the VaultEventful contract.
     * @param eventName The VaultEventful contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    public subscribe<ArgsType extends VaultEventfulEventArgs>(
        eventName: VaultEventfulEvents,
        indexFilterValues: IndexedFilterValues,
        callback: EventCallback<ArgsType>,
        isVerbose: boolean = false,
        blockPollingIntervalMs?: number,
    ): string {
        assert.doesBelongToStringEnum('eventName', eventName, VaultEventfulEvents);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe<ArgsType>(
            this.address,
            eventName,
            indexFilterValues,
            VaultEventfulContract.ABI(),
            callback,
            isVerbose,
            blockPollingIntervalMs,
        );
        return subscriptionToken;
    }

    /**
     * Cancel a subscription
     * @param subscriptionToken Subscription token returned by `subscribe()`
     */
    public unsubscribe(subscriptionToken: string): void {
        this._subscriptionManager.unsubscribe(subscriptionToken);
    }

    /**
     * Cancels all existing subscriptions
     */
    public unsubscribeAll(): void {
        this._subscriptionManager.unsubscribeAll();
    }

    /**
     * Gets historical logs without creating a subscription
     * @param eventName The VaultEventful contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    public async getLogsAsync<ArgsType extends VaultEventfulEventArgs>(
        eventName: VaultEventfulEvents,
        blockRange: BlockRange,
        indexFilterValues: IndexedFilterValues,
    ): Promise<Array<LogWithDecodedArgs<ArgsType>>> {
        assert.doesBelongToStringEnum('eventName', eventName, VaultEventfulEvents);
        assert.doesConformToSchema('blockRange', blockRange, schemas.blockRangeSchema);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync<ArgsType>(
            this.address,
            eventName,
            blockRange,
            indexFilterValues,
            VaultEventfulContract.ABI(),
        );
        return logs;
    }

    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = VaultEventfulContract.deployedBytecode,
    ) {
        super('VaultEventful', VaultEventfulContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
this._subscriptionManager = new SubscriptionManager<VaultEventfulEventArgs, VaultEventfulEvents>(
            VaultEventfulContract.ABI(),
            this._web3Wrapper,
        );
VaultEventfulContract.ABI().forEach((item, index) => {
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
