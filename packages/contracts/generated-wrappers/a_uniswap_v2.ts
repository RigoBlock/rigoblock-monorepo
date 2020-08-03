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
export class AUniswapV2Contract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode: string | undefined;
public static contractName = 'AUniswapV2';
    private readonly _methodABIIndex: { [name: string]: number } = {};
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<AUniswapV2Contract> {
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
        return AUniswapV2Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<AUniswapV2Contract> {
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
        const libraryAddresses = await AUniswapV2Contract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return AUniswapV2Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<AUniswapV2Contract> {
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
        logUtils.log(`AUniswapV2 successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new AUniswapV2Contract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }

    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'tokenA',
                        type: 'address',
                    },
                    {
                        name: 'tokenB',
                        type: 'address',
                    },
                    {
                        name: 'amountADesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBDesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountAMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'addLiquidity',
                outputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'sendETHAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenDesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'addLiquidityETH',
                outputs: [
                    {
                        name: 'amountToken',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'tokenA',
                        type: 'address',
                    },
                    {
                        name: 'tokenB',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountAMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidity',
                outputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidityETH',
                outputs: [
                    {
                        name: 'amountToken',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
                outputs: [
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'sendETHAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapETHForExactTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'exactETHAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactETHForTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'exactETHAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
                outputs: [
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForETH',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
                outputs: [
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
                outputs: [
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'amountInMax',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapTokensForExactETH',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'uniswapV2RouterAddress',
                        type: 'address',
                    },
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'amountInMax',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapTokensForExactTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
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
                    await AUniswapV2Contract._deployLibrariesAsync(
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
        const methodAbi = AUniswapV2Contract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AUniswapV2Contract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AUniswapV2Contract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AUniswapV2Contract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    public addLiquidity(
            uniswapV2RouterAddress: string,
            tokenA: string,
            tokenB: string,
            amountADesired: BigNumber,
            amountBDesired: BigNumber,
            amountAMin: BigNumber,
            amountBMin: BigNumber,
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<[BigNumber, BigNumber, BigNumber]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isString('tokenA', tokenA);
            assert.isString('tokenB', tokenB);
            assert.isBigNumber('amountADesired', amountADesired);
            assert.isBigNumber('amountBDesired', amountBDesired);
            assert.isBigNumber('amountAMin', amountAMin);
            assert.isBigNumber('amountBMin', amountBMin);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)';

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
            ): Promise<[BigNumber, BigNumber, BigNumber]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber, BigNumber]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            tokenA.toLowerCase(),
            tokenB.toLowerCase(),
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public addLiquidityETH(
            uniswapV2RouterAddress: string,
            token: string,
            sendETHAmount: BigNumber,
            amountTokenDesired: BigNumber,
            amountTokenMin: BigNumber,
            amountETHMin: BigNumber,
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<[BigNumber, BigNumber, BigNumber]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isString('token', token);
            assert.isBigNumber('sendETHAmount', sendETHAmount);
            assert.isBigNumber('amountTokenDesired', amountTokenDesired);
            assert.isBigNumber('amountTokenMin', amountTokenMin);
            assert.isBigNumber('amountETHMin', amountETHMin);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'addLiquidityETH(address,address,uint256,uint256,uint256,uint256,address,uint256)';

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
            ): Promise<[BigNumber, BigNumber, BigNumber]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber, BigNumber]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            token.toLowerCase(),
            sendETHAmount,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public removeLiquidity(
            uniswapV2RouterAddress: string,
            tokenA: string,
            tokenB: string,
            liquidity: BigNumber,
            amountAMin: BigNumber,
            amountBMin: BigNumber,
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<[BigNumber, BigNumber]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isString('tokenA', tokenA);
            assert.isString('tokenB', tokenB);
            assert.isBigNumber('liquidity', liquidity);
            assert.isBigNumber('amountAMin', amountAMin);
            assert.isBigNumber('amountBMin', amountBMin);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidity(address,address,address,uint256,uint256,uint256,address,uint256)';

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
            ): Promise<[BigNumber, BigNumber]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            tokenA.toLowerCase(),
            tokenB.toLowerCase(),
            liquidity,
            amountAMin,
            amountBMin,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public removeLiquidityETH(
            uniswapV2RouterAddress: string,
            token: string,
            liquidity: BigNumber,
            amountTokenMin: BigNumber,
            amountETHMin: BigNumber,
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<[BigNumber, BigNumber]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isString('token', token);
            assert.isBigNumber('liquidity', liquidity);
            assert.isBigNumber('amountTokenMin', amountTokenMin);
            assert.isBigNumber('amountETHMin', amountETHMin);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidityETH(address,address,uint256,uint256,uint256,address,uint256)';

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
            ): Promise<[BigNumber, BigNumber]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            token.toLowerCase(),
            liquidity,
            amountTokenMin,
            amountETHMin,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public removeLiquidityETHSupportingFeeOnTransferTokens(
            uniswapV2RouterAddress: string,
            token: string,
            liquidity: BigNumber,
            amountTokenMin: BigNumber,
            amountETHMin: BigNumber,
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isString('token', token);
            assert.isBigNumber('liquidity', liquidity);
            assert.isBigNumber('amountTokenMin', amountTokenMin);
            assert.isBigNumber('amountETHMin', amountETHMin);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidityETHSupportingFeeOnTransferTokens(address,address,uint256,uint256,uint256,address,uint256)';

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
            ): Promise<BigNumber
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            token.toLowerCase(),
            liquidity,
            amountTokenMin,
            amountETHMin,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapETHForExactTokens(
            uniswapV2RouterAddress: string,
            sendETHAmount: BigNumber,
            amountOut: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('sendETHAmount', sendETHAmount);
            assert.isBigNumber('amountOut', amountOut);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapETHForExactTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            sendETHAmount,
            amountOut,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactETHForTokens(
            uniswapV2RouterAddress: string,
            exactETHAmount: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('exactETHAmount', exactETHAmount);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactETHForTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            exactETHAmount,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactETHForTokensSupportingFeeOnTransferTokens(
            uniswapV2RouterAddress: string,
            exactETHAmount: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<void
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('exactETHAmount', exactETHAmount);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactETHForTokensSupportingFeeOnTransferTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<void
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<void
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            exactETHAmount,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactTokensForETH(
            uniswapV2RouterAddress: string,
            amountIn: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountIn', amountIn);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForETH(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountIn,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactTokensForETHSupportingFeeOnTransferTokens(
            uniswapV2RouterAddress: string,
            amountIn: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<void
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountIn', amountIn);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForETHSupportingFeeOnTransferTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<void
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<void
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountIn,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactTokensForTokens(
            uniswapV2RouterAddress: string,
            amountIn: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountIn', amountIn);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountIn,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapExactTokensForTokensSupportingFeeOnTransferTokens(
            uniswapV2RouterAddress: string,
            amountIn: BigNumber,
            amountOutMin: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<void
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountIn', amountIn);
            assert.isBigNumber('amountOutMin', amountOutMin);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForTokensSupportingFeeOnTransferTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<void
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<void
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountIn,
            amountOutMin,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapTokensForExactETH(
            uniswapV2RouterAddress: string,
            amountOut: BigNumber,
            amountInMax: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountOut', amountOut);
            assert.isBigNumber('amountInMax', amountInMax);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapTokensForExactETH(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountOut,
            amountInMax,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };
    public swapTokensForExactTokens(
            uniswapV2RouterAddress: string,
            amountOut: BigNumber,
            amountInMax: BigNumber,
            path: string[],
            to: string,
            deadline: BigNumber,
    ): ContractTxFunctionObj<BigNumber[]
> {
        const self = this as any as AUniswapV2Contract;
            assert.isString('uniswapV2RouterAddress', uniswapV2RouterAddress);
            assert.isBigNumber('amountOut', amountOut);
            assert.isBigNumber('amountInMax', amountInMax);
            assert.isArray('path', path);
            assert.isString('to', to);
            assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapTokensForExactTokens(address,uint256,uint256,address[],address,uint256)';

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
            ): Promise<BigNumber[]
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<BigNumber[]
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [uniswapV2RouterAddress.toLowerCase(),
            amountOut,
            amountInMax,
            path,
            to.toLowerCase(),
            deadline
            ]);
            },
        }
    };



    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = AUniswapV2Contract.deployedBytecode,
    ) {
        super('AUniswapV2', AUniswapV2Contract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
AUniswapV2Contract.ABI().forEach((item, index) => {
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
