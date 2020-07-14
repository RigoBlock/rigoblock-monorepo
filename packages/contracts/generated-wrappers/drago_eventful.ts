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


export type DragoEventfulEventArgs =
    | DragoEventfulBuyDragoEventArgs
    | DragoEventfulSellDragoEventArgs
    | DragoEventfulNewRatioEventArgs
    | DragoEventfulNewNAVEventArgs
    | DragoEventfulNewFeeEventArgs
    | DragoEventfulNewCollectorEventArgs
    | DragoEventfulDragoDaoEventArgs
    | DragoEventfulDepositExchangeEventArgs
    | DragoEventfulWithdrawExchangeEventArgs
    | DragoEventfulOrderExchangeEventArgs
    | DragoEventfulTradeExchangeEventArgs
    | DragoEventfulCancelOrderEventArgs
    | DragoEventfulDealFinalizedEventArgs
    | DragoEventfulCustomDragoLogEventArgs
    | DragoEventfulCustomDragoLog2EventArgs
    | DragoEventfulDragoCreatedEventArgs;

export enum DragoEventfulEvents {
    BuyDrago = 'BuyDrago',
    SellDrago = 'SellDrago',
    NewRatio = 'NewRatio',
    NewNAV = 'NewNAV',
    NewFee = 'NewFee',
    NewCollector = 'NewCollector',
    DragoDao = 'DragoDao',
    DepositExchange = 'DepositExchange',
    WithdrawExchange = 'WithdrawExchange',
    OrderExchange = 'OrderExchange',
    TradeExchange = 'TradeExchange',
    CancelOrder = 'CancelOrder',
    DealFinalized = 'DealFinalized',
    CustomDragoLog = 'CustomDragoLog',
    CustomDragoLog2 = 'CustomDragoLog2',
    DragoCreated = 'DragoCreated',
}

export interface DragoEventfulBuyDragoEventArgs extends DecodedLogArgs {
    drago: string;
    from: string;
    to: string;
    amount: BigNumber;
    revenue: BigNumber;
    name: string;
    symbol: string;
}

export interface DragoEventfulSellDragoEventArgs extends DecodedLogArgs {
    drago: string;
    from: string;
    to: string;
    amount: BigNumber;
    revenue: BigNumber;
    name: string;
    symbol: string;
}

export interface DragoEventfulNewRatioEventArgs extends DecodedLogArgs {
    drago: string;
    from: string;
    newRatio: BigNumber;
}

export interface DragoEventfulNewNAVEventArgs extends DecodedLogArgs {
    drago: string;
    from: string;
    to: string;
    sellPrice: BigNumber;
    buyPrice: BigNumber;
}

export interface DragoEventfulNewFeeEventArgs extends DecodedLogArgs {
    drago: string;
    group: string;
    who: string;
    transactionFee: BigNumber;
}

export interface DragoEventfulNewCollectorEventArgs extends DecodedLogArgs {
    drago: string;
    group: string;
    who: string;
    feeCollector: string;
}

export interface DragoEventfulDragoDaoEventArgs extends DecodedLogArgs {
    drago: string;
    from: string;
    to: string;
    dragoDao: string;
}

export interface DragoEventfulDepositExchangeEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    token: string;
    value: BigNumber;
    amount: BigNumber;
}

export interface DragoEventfulWithdrawExchangeEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    token: string;
    value: BigNumber;
    amount: BigNumber;
}

export interface DragoEventfulOrderExchangeEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    cfd: string;
    value: BigNumber;
    revenue: BigNumber;
}

export interface DragoEventfulTradeExchangeEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    tokenGet: string;
    tokenGive: string;
    amountGet: BigNumber;
    amountGive: BigNumber;
    get: string;
}

export interface DragoEventfulCancelOrderEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    cfd: string;
    value: BigNumber;
    id: BigNumber;
}

export interface DragoEventfulDealFinalizedEventArgs extends DecodedLogArgs {
    drago: string;
    exchange: string;
    cfd: string;
    value: BigNumber;
    id: BigNumber;
}

export interface DragoEventfulCustomDragoLogEventArgs extends DecodedLogArgs {
    method: string;
    encodedParams: string;
}

export interface DragoEventfulCustomDragoLog2EventArgs extends DecodedLogArgs {
    methodHash: string;
    topic2: string;
    topic3: string;
    encodedParams: string;
}

export interface DragoEventfulDragoCreatedEventArgs extends DecodedLogArgs {
    drago: string;
    group: string;
    owner: string;
    dragoId: BigNumber;
    name: string;
    symbol: string;
}


/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class DragoEventfulContract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode: string | undefined;
public static contractName = 'DragoEventful';
    private readonly _methodABIIndex: { [name: string]: number } = {};
private readonly _subscriptionManager: SubscriptionManager<DragoEventfulEventArgs, DragoEventfulEvents>;
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _authority: string,
    ): Promise<DragoEventfulContract> {
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
        return DragoEventfulContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _authority
);
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            _authority: string,
    ): Promise<DragoEventfulContract> {
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
        const libraryAddresses = await DragoEventfulContract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return DragoEventfulContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _authority
);
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
            _authority: string,
    ): Promise<DragoEventfulContract> {
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
        logUtils.log(`DragoEventful successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new DragoEventfulContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
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
                        name: '_methodHash',
                        type: 'bytes4',
                    },
                    {
                        name: '_encodedParams',
                        type: 'bytes',
                    },
                ],
                name: 'customExchangeLog',
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
                        name: '_targetDrago',
                        type: 'address',
                    },
                    {
                        name: '_dragoDao',
                        type: 'address',
                    },
                ],
                name: 'changeDragoDao',
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
                        name: '_targetDrago',
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
                name: 'buyDrago',
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
                        name: '_targetDrago',
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
                name: 'sellDrago',
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
                        name: '_newDrago',
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
                        name: '_dragoId',
                        type: 'uint256',
                    },
                ],
                name: 'createDrago',
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
                        name: '_targetDrago',
                        type: 'address',
                    },
                    {
                        name: '_exchange',
                        type: 'address',
                    },
                    {
                        name: '_token',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'withdrawFromExchange',
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
                        name: '_methodHash',
                        type: 'bytes4',
                    },
                    {
                        name: 'topic2',
                        type: 'bytes32',
                    },
                    {
                        name: 'topic3',
                        type: 'bytes32',
                    },
                    {
                        name: '_encodedParams',
                        type: 'bytes',
                    },
                ],
                name: 'customExchangeLog2',
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
                        name: '_targetDrago',
                        type: 'address',
                    },
                    {
                        name: '_sellPrice',
                        type: 'uint256',
                    },
                    {
                        name: '_buyPrice',
                        type: 'uint256',
                    },
                ],
                name: 'setDragoPrice',
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
                        name: '_methodHash',
                        type: 'bytes4',
                    },
                    {
                        name: '_encodedParams',
                        type: 'bytes',
                    },
                ],
                name: 'customDragoLog',
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
                        name: '_targetDrago',
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
                        name: '_targetDrago',
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
                        name: '_methodHash',
                        type: 'bytes4',
                    },
                    {
                        name: 'topic2',
                        type: 'bytes32',
                    },
                    {
                        name: 'topic3',
                        type: 'bytes32',
                    },
                    {
                        name: '_encodedParams',
                        type: 'bytes',
                    },
                ],
                name: 'customDragoLog2',
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
                        name: '_targetDrago',
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
                        name: '_targetDrago',
                        type: 'address',
                    },
                    {
                        name: '_exchange',
                        type: 'address',
                    },
                    {
                        name: '_token',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'depositToExchange',
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
                        name: 'drago',
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
                name: 'BuyDrago',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
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
                name: 'SellDrago',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
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
                        name: 'drago',
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
                        name: 'sellPrice',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'buyPrice',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'NewNAV',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'group',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'who',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'transactionFee',
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
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'group',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'who',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'feeCollector',
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
                        name: 'drago',
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
                        name: 'dragoDao',
                        type: 'address',
                        indexed: false,
                    },
                ],
                name: 'DragoDao',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'token',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'DepositExchange',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'token',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'WithdrawExchange',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'cfd',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'revenue',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'OrderExchange',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'tokenGet',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'tokenGive',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'amountGet',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'amountGive',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'get',
                        type: 'address',
                        indexed: false,
                    },
                ],
                name: 'TradeExchange',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'cfd',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'id',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'CancelOrder',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'cfd',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'id',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'DealFinalized',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'method',
                        type: 'bytes4',
                        indexed: true,
                    },
                    {
                        name: 'encodedParams',
                        type: 'bytes',
                        indexed: false,
                    },
                ],
                name: 'CustomDragoLog',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'methodHash',
                        type: 'bytes4',
                        indexed: true,
                    },
                    {
                        name: 'topic2',
                        type: 'bytes32',
                        indexed: true,
                    },
                    {
                        name: 'topic3',
                        type: 'bytes32',
                        indexed: true,
                    },
                    {
                        name: 'encodedParams',
                        type: 'bytes',
                        indexed: false,
                    },
                ],
                name: 'CustomDragoLog2',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'drago',
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
                        name: 'dragoId',
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
                name: 'DragoCreated',
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
                    await DragoEventfulContract._deployLibrariesAsync(
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
        const methodAbi = DragoEventfulContract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as DragoEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as DragoEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as DragoEventfulContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    /**
     * Logs an event sent from an approved exchange
      * @param _methodHash the method of the call
      * @param _encodedParams the arbitrary data array
    * @returns Bool the transaction executed successfully
     */
    public customExchangeLog(
            _methodHash: string,
            _encodedParams: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_methodHash', _methodHash);
            assert.isString('_encodedParams', _encodedParams);
        const functionSignature = 'customExchangeLog(bytes4,bytes)';

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
                return self._strictEncodeArguments(functionSignature, [_methodHash,
            _encodedParams
            ]);
            },
        }
    };
    /**
     * Logs a change in the drago dao of an approved vault
      * @param _who Address of the caller
      * @param _targetDrago Address of the drago
      * @param _dragoDao Address of the new drago dao
    * @returns Bool the transaction executed successfully
     */
    public changeDragoDao(
            _who: string,
            _targetDrago: string,
            _dragoDao: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isString('_dragoDao', _dragoDao);
        const functionSignature = 'changeDragoDao(address,address,address)';

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
            _targetDrago.toLowerCase(),
            _dragoDao.toLowerCase()
            ]);
            },
        }
    };
    /**
     * Logs a Buy Drago event.
      * @param _who Address of who is buying
      * @param _targetDrago Address of the target drago
      * @param _value Value of the transaction in Ether
      * @param _amount Number of shares purchased
    * @returns Bool the transaction executed successfully
     */
    public buyDrago(
            _who: string,
            _targetDrago: string,
            _value: BigNumber,
            _amount: BigNumber,
            _name: string,
            _symbol: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isBigNumber('_value', _value);
            assert.isBigNumber('_amount', _amount);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
        const functionSignature = 'buyDrago(address,address,uint256,uint256,bytes,bytes)';

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
            _targetDrago.toLowerCase(),
            _value,
            _amount,
            _name,
            _symbol
            ]);
            },
        }
    };
    /**
     * Logs a Sell Drago event.
      * @param _who Address of who is selling
      * @param _targetDrago Address of the target drago
      * @param _amount Number of shares purchased
      * @param _revenue Value of the transaction in Ether
    * @returns Bool the transaction executed successfully
     */
    public sellDrago(
            _who: string,
            _targetDrago: string,
            _amount: BigNumber,
            _revenue: BigNumber,
            _name: string,
            _symbol: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isBigNumber('_amount', _amount);
            assert.isBigNumber('_revenue', _revenue);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
        const functionSignature = 'sellDrago(address,address,uint256,uint256,bytes,bytes)';

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
            _targetDrago.toLowerCase(),
            _amount,
            _revenue,
            _name,
            _symbol
            ]);
            },
        }
    };
    /**
     * Logs a new Drago creation by factory
      * @param _who Address of the caller
      * @param _newDrago Address of the new Drago
      * @param _name String of the name of the new drago
      * @param _symbol String of the symbol of the new drago
      * @param _dragoId Number of the new drago Id
    * @returns Bool the transaction executed successfully
     */
    public createDrago(
            _who: string,
            _newDrago: string,
            _name: string,
            _symbol: string,
            _dragoId: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_newDrago', _newDrago);
            assert.isString('_name', _name);
            assert.isString('_symbol', _symbol);
            assert.isBigNumber('_dragoId', _dragoId);
        const functionSignature = 'createDrago(address,address,string,string,uint256)';

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
            _newDrago.toLowerCase(),
            _name,
            _symbol,
            _dragoId
            ]);
            },
        }
    };
    /**
     * Logs a Drago Withdraw From Exchange event
      * @param _who Address of the caller
      * @param _targetDrago Address of the target Drago
      * @param _exchange Address of the exchange
      * @param _token Address of the withdrawn token
      * @param _value Number of withdrawn tokens
    * @returns Bool the transaction executed successfully
     */
    public withdrawFromExchange(
            _who: string,
            _targetDrago: string,
            _exchange: string,
            _token: string,
            _value: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isString('_exchange', _exchange);
            assert.isString('_token', _token);
            assert.isBigNumber('_value', _value);
        const functionSignature = 'withdrawFromExchange(address,address,address,address,uint256)';

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
            _targetDrago.toLowerCase(),
            _exchange.toLowerCase(),
            _token.toLowerCase(),
            _value
            ]);
            },
        }
    };
    /**
     * Logs an event sent from an approved exchange
      * @param _methodHash the method of the call
      * @param _encodedParams the arbitrary data array
    * @returns Bool the transaction executed successfully
     */
    public customExchangeLog2(
            _methodHash: string,
            topic2: string,
            topic3: string,
            _encodedParams: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_methodHash', _methodHash);
            assert.isString('topic2', topic2);
            assert.isString('topic3', topic3);
            assert.isString('_encodedParams', _encodedParams);
        const functionSignature = 'customExchangeLog2(bytes4,bytes32,bytes32,bytes)';

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
                return self._strictEncodeArguments(functionSignature, [_methodHash,
            topic2,
            topic3,
            _encodedParams
            ]);
            },
        }
    };
    /**
     * Logs a Set Drago Price event
      * @param _who Address of the caller
      * @param _targetDrago Address of the target Drago
      * @param _sellPrice Value of the price of one share in wei
      * @param _buyPrice Value of the price of one share in wei
    * @returns Bool the transaction executed successfully
     */
    public setDragoPrice(
            _who: string,
            _targetDrago: string,
            _sellPrice: BigNumber,
            _buyPrice: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isBigNumber('_sellPrice', _sellPrice);
            assert.isBigNumber('_buyPrice', _buyPrice);
        const functionSignature = 'setDragoPrice(address,address,uint256,uint256)';

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
            _targetDrago.toLowerCase(),
            _sellPrice,
            _buyPrice
            ]);
            },
        }
    };
    /**
     * Logs an event sent from a drago
      * @param _methodHash the method of the call
      * @param _encodedParams the arbitrary data array
    * @returns Bool the transaction executed successfully
     */
    public customDragoLog(
            _methodHash: string,
            _encodedParams: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_methodHash', _methodHash);
            assert.isString('_encodedParams', _encodedParams);
        const functionSignature = 'customDragoLog(bytes4,bytes)';

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
                return self._strictEncodeArguments(functionSignature, [_methodHash,
            _encodedParams
            ]);
            },
        }
    };
    public AUTHORITY(
    ): ContractFunctionObj<string
> {
        const self = this as any as DragoEventfulContract;
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
     * Logswhen rigoblock dao changes fee split.
      * @param _who Address of the caller
      * @param _targetDrago Address of the target drago
      * @param _ratio Ratio number from 0 to 100
    * @returns Bool the transaction executed successfully
     */
    public changeRatio(
            _who: string,
            _targetDrago: string,
            _ratio: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
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
            _targetDrago.toLowerCase(),
            _ratio
            ]);
            },
        }
    };
    /**
     * Logs a modification of the transaction fee event
      * @param _who Address of the caller
      * @param _targetDrago Address of the target Drago
      * @param _transactionFee Value of the transaction fee in basis points
    * @returns Bool the transaction executed successfully
     */
    public setTransactionFee(
            _who: string,
            _targetDrago: string,
            _transactionFee: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
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
            _targetDrago.toLowerCase(),
            _transactionFee
            ]);
            },
        }
    };
    /**
     * Logs an event sent from a drago
      * @param _methodHash the method of the call
      * @param _encodedParams the arbitrary data array
    * @returns Bool the transaction executed successfully
     */
    public customDragoLog2(
            _methodHash: string,
            topic2: string,
            topic3: string,
            _encodedParams: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_methodHash', _methodHash);
            assert.isString('topic2', topic2);
            assert.isString('topic3', topic3);
            assert.isString('_encodedParams', _encodedParams);
        const functionSignature = 'customDragoLog2(bytes4,bytes32,bytes32,bytes)';

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
                return self._strictEncodeArguments(functionSignature, [_methodHash,
            topic2,
            topic3,
            _encodedParams
            ]);
            },
        }
    };
    /**
     * Logs when wizard changes fee collector address
      * @param _who Address of the caller
      * @param _targetDrago Address of the target Drago
      * @param _feeCollector Address of the new fee collector
    * @returns Bool the transaction executed successfully
     */
    public changeFeeCollector(
            _who: string,
            _targetDrago: string,
            _feeCollector: string,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
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
            _targetDrago.toLowerCase(),
            _feeCollector.toLowerCase()
            ]);
            },
        }
    };
    /**
     * Logs a Drago Deposit To Exchange event
      * @param _who Address of the caller
      * @param _targetDrago Address of the target Drago
      * @param _exchange Address of the exchange
      * @param _token Address of the deposited token
      * @param _value Number of deposited tokens
    * @returns Bool the transaction executed successfully
     */
    public depositToExchange(
            _who: string,
            _targetDrago: string,
            _exchange: string,
            _token: string,
            _value: BigNumber,
    ): ContractTxFunctionObj<boolean
> {
        const self = this as any as DragoEventfulContract;
            assert.isString('_who', _who);
            assert.isString('_targetDrago', _targetDrago);
            assert.isString('_exchange', _exchange);
            assert.isString('_token', _token);
            assert.isBigNumber('_value', _value);
        const functionSignature = 'depositToExchange(address,address,address,address,uint256)';

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
            _targetDrago.toLowerCase(),
            _exchange.toLowerCase(),
            _token.toLowerCase(),
            _value
            ]);
            },
        }
    };
    public VERSION(
    ): ContractFunctionObj<string
> {
        const self = this as any as DragoEventfulContract;
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
     * Subscribe to an event type emitted by the DragoEventful contract.
     * @param eventName The DragoEventful contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    public subscribe<ArgsType extends DragoEventfulEventArgs>(
        eventName: DragoEventfulEvents,
        indexFilterValues: IndexedFilterValues,
        callback: EventCallback<ArgsType>,
        isVerbose: boolean = false,
        blockPollingIntervalMs?: number,
    ): string {
        assert.doesBelongToStringEnum('eventName', eventName, DragoEventfulEvents);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe<ArgsType>(
            this.address,
            eventName,
            indexFilterValues,
            DragoEventfulContract.ABI(),
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
     * @param eventName The DragoEventful contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    public async getLogsAsync<ArgsType extends DragoEventfulEventArgs>(
        eventName: DragoEventfulEvents,
        blockRange: BlockRange,
        indexFilterValues: IndexedFilterValues,
    ): Promise<Array<LogWithDecodedArgs<ArgsType>>> {
        assert.doesBelongToStringEnum('eventName', eventName, DragoEventfulEvents);
        assert.doesConformToSchema('blockRange', blockRange, schemas.blockRangeSchema);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync<ArgsType>(
            this.address,
            eventName,
            blockRange,
            indexFilterValues,
            DragoEventfulContract.ABI(),
        );
        return logs;
    }

    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = DragoEventfulContract.deployedBytecode,
    ) {
        super('DragoEventful', DragoEventfulContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
this._subscriptionManager = new SubscriptionManager<DragoEventfulEventArgs, DragoEventfulEvents>(
            DragoEventfulContract.ABI(),
            this._web3Wrapper,
        );
DragoEventfulContract.ABI().forEach((item, index) => {
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
