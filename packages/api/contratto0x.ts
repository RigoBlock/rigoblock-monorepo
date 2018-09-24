// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unused-variable
// tslint:disable:no-unbound-method
import { BaseContract } from '@0xproject/base-contract';
import { BlockParam, BlockParamLiteral, CallData, ContractAbi, ContractArtifact, DecodedLogArgs, MethodAbi, Provider, TxData, TxDataPayable } from 'ethereum-types';
import { BigNumber, classUtils, logUtils } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import * as ethers from 'ethers';
import * as _ from 'lodash';
// tslint:enable:no-unused-variable

export type AuthorityEventArgs =
    | AuthoritySetAuthorityEventArgs
    | AuthoritySetWhitelisterEventArgs
    | AuthorityWhitelistedUserEventArgs
    | AuthorityWhitelistedRegistryEventArgs
    | AuthorityWhitelistedFactoryEventArgs
    | AuthorityWhitelistedVaultEventArgs
    | AuthorityWhitelistedDragoEventArgs
    | AuthorityNewDragoEventfulEventArgs
    | AuthorityNewVaultEventfulEventArgs
    | AuthorityNewNavVerifierEventArgs
    | AuthorityNewExchangesAuthorityEventArgs
    | AuthorityNewOwnerEventArgs;

export enum AuthorityEvents {
    SetAuthority = 'SetAuthority',
    SetWhitelister = 'SetWhitelister',
    WhitelistedUser = 'WhitelistedUser',
    WhitelistedRegistry = 'WhitelistedRegistry',
    WhitelistedFactory = 'WhitelistedFactory',
    WhitelistedVault = 'WhitelistedVault',
    WhitelistedDrago = 'WhitelistedDrago',
    NewDragoEventful = 'NewDragoEventful',
    NewVaultEventful = 'NewVaultEventful',
    NewNavVerifier = 'NewNavVerifier',
    NewExchangesAuthority = 'NewExchangesAuthority',
    NewOwner = 'NewOwner',
}

export interface AuthoritySetAuthorityEventArgs extends DecodedLogArgs {
    authority: string;
}

export interface AuthoritySetWhitelisterEventArgs extends DecodedLogArgs {
    whitelister: string;
}

export interface AuthorityWhitelistedUserEventArgs extends DecodedLogArgs {
    target: string;
    approved: boolean;
}

export interface AuthorityWhitelistedRegistryEventArgs extends DecodedLogArgs {
    registry: string;
    approved: boolean;
}

export interface AuthorityWhitelistedFactoryEventArgs extends DecodedLogArgs {
    factory: string;
    approved: boolean;
}

export interface AuthorityWhitelistedVaultEventArgs extends DecodedLogArgs {
    vault: string;
    approved: boolean;
}

export interface AuthorityWhitelistedDragoEventArgs extends DecodedLogArgs {
    drago: string;
    isWhitelisted: boolean;
}

export interface AuthorityNewDragoEventfulEventArgs extends DecodedLogArgs {
    dragoEventful: string;
}

export interface AuthorityNewVaultEventfulEventArgs extends DecodedLogArgs {
    vaultEventful: string;
}

export interface AuthorityNewNavVerifierEventArgs extends DecodedLogArgs {
    navVerifier: string;
}

export interface AuthorityNewExchangesAuthorityEventArgs extends DecodedLogArgs {
    exchangesAuthority: string;
}

export interface AuthorityNewOwnerEventArgs extends DecodedLogArgs {
    old: string;
    current: string;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class AuthorityContract extends BaseContract {
    public getVaultEventful = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'getVaultEventful()';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [] = BaseContract._formatABIDataItemList(inputAbi, [], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, []);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.getVaultEventful(
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'getVaultEventful'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public setOwner = {
        async sendTransactionAsync(
            _new: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setOwner(address)').inputs;
            [_new
    ] = BaseContract._formatABIDataItemList(inputAbi, [_new
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_new
    ]);
            const encodedData = self._lookupEthersInterface('setOwner(address)').functions.setOwner(
                _new
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setOwner.estimateGasAsync.bind(
                    self,
                    _new
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _new: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setOwner(address)').inputs;
            [_new
    ] = BaseContract._formatABIDataItemList(inputAbi, [_new
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setOwner(address)').functions.setOwner(
                _new
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _new: string,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setOwner(address)').inputs;
            [_new
    ] = BaseContract._formatABIDataItemList(inputAbi, [_new
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setOwner(address)').functions.setOwner(
                _new
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _new: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setOwner(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_new
        ] = BaseContract._formatABIDataItemList(inputAbi, [_new
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_new
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setOwner(
                _new
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setOwner'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public setVaultEventful = {
        async sendTransactionAsync(
            _vaultEventful: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setVaultEventful(address)').inputs;
            [_vaultEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vaultEventful
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_vaultEventful
    ]);
            const encodedData = self._lookupEthersInterface('setVaultEventful(address)').functions.setVaultEventful(
                _vaultEventful
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setVaultEventful.estimateGasAsync.bind(
                    self,
                    _vaultEventful
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _vaultEventful: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setVaultEventful(address)').inputs;
            [_vaultEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vaultEventful
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setVaultEventful(address)').functions.setVaultEventful(
                _vaultEventful
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _vaultEventful: string,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setVaultEventful(address)').inputs;
            [_vaultEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vaultEventful
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setVaultEventful(address)').functions.setVaultEventful(
                _vaultEventful
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _vaultEventful: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setVaultEventful(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_vaultEventful
        ] = BaseContract._formatABIDataItemList(inputAbi, [_vaultEventful
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_vaultEventful
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setVaultEventful(
                _vaultEventful
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setVaultEventful'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public isAuthority = {
        async callAsync(
            _authority: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isAuthority(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_authority
        ] = BaseContract._formatABIDataItemList(inputAbi, [_authority
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_authority
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isAuthority(
                _authority
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isAuthority'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public getDragoEventful = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'getDragoEventful()';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [] = BaseContract._formatABIDataItemList(inputAbi, [], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, []);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.getDragoEventful(
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'getDragoEventful'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public isWhitelistedDrago = {
        async callAsync(
            _drago: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isWhitelistedDrago(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_drago
        ] = BaseContract._formatABIDataItemList(inputAbi, [_drago
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_drago
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isWhitelistedDrago(
                _drago
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isWhitelistedDrago'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public whitelistRegistry = {
        async sendTransactionAsync(
            _registry: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistRegistry(address,bool)').inputs;
            [_registry,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_registry,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_registry,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('whitelistRegistry(address,bool)').functions.whitelistRegistry(
                _registry,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.whitelistRegistry.estimateGasAsync.bind(
                    self,
                    _registry,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _registry: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistRegistry(address,bool)').inputs;
            [_registry,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_registry,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('whitelistRegistry(address,bool)').functions.whitelistRegistry(
                _registry,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _registry: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistRegistry(address,bool)').inputs;
            [_registry,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_registry,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('whitelistRegistry(address,bool)').functions.whitelistRegistry(
                _registry,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _registry: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'whitelistRegistry(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_registry,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_registry,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_registry,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.whitelistRegistry(
                _registry,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'whitelistRegistry'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public setDragoEventful = {
        async sendTransactionAsync(
            _dragoEventful: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setDragoEventful(address)').inputs;
            [_dragoEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_dragoEventful
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_dragoEventful
    ]);
            const encodedData = self._lookupEthersInterface('setDragoEventful(address)').functions.setDragoEventful(
                _dragoEventful
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setDragoEventful.estimateGasAsync.bind(
                    self,
                    _dragoEventful
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _dragoEventful: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setDragoEventful(address)').inputs;
            [_dragoEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_dragoEventful
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setDragoEventful(address)').functions.setDragoEventful(
                _dragoEventful
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _dragoEventful: string,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setDragoEventful(address)').inputs;
            [_dragoEventful
    ] = BaseContract._formatABIDataItemList(inputAbi, [_dragoEventful
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setDragoEventful(address)').functions.setDragoEventful(
                _dragoEventful
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _dragoEventful: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setDragoEventful(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_dragoEventful
        ] = BaseContract._formatABIDataItemList(inputAbi, [_dragoEventful
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_dragoEventful
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setDragoEventful(
                _dragoEventful
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setDragoEventful'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public whitelistFactory = {
        async sendTransactionAsync(
            _factory: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistFactory(address,bool)').inputs;
            [_factory,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_factory,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_factory,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('whitelistFactory(address,bool)').functions.whitelistFactory(
                _factory,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.whitelistFactory.estimateGasAsync.bind(
                    self,
                    _factory,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _factory: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistFactory(address,bool)').inputs;
            [_factory,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_factory,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('whitelistFactory(address,bool)').functions.whitelistFactory(
                _factory,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _factory: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistFactory(address,bool)').inputs;
            [_factory,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_factory,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('whitelistFactory(address,bool)').functions.whitelistFactory(
                _factory,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _factory: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'whitelistFactory(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_factory,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_factory,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_factory,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.whitelistFactory(
                _factory,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'whitelistFactory'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public getExchangesAuthority = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'getExchangesAuthority()';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [] = BaseContract._formatABIDataItemList(inputAbi, [], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, []);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.getExchangesAuthority(
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'getExchangesAuthority'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public setNavVerifier = {
        async sendTransactionAsync(
            _navVerifier: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setNavVerifier(address)').inputs;
            [_navVerifier
    ] = BaseContract._formatABIDataItemList(inputAbi, [_navVerifier
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_navVerifier
    ]);
            const encodedData = self._lookupEthersInterface('setNavVerifier(address)').functions.setNavVerifier(
                _navVerifier
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setNavVerifier.estimateGasAsync.bind(
                    self,
                    _navVerifier
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _navVerifier: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setNavVerifier(address)').inputs;
            [_navVerifier
    ] = BaseContract._formatABIDataItemList(inputAbi, [_navVerifier
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setNavVerifier(address)').functions.setNavVerifier(
                _navVerifier
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _navVerifier: string,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setNavVerifier(address)').inputs;
            [_navVerifier
    ] = BaseContract._formatABIDataItemList(inputAbi, [_navVerifier
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setNavVerifier(address)').functions.setNavVerifier(
                _navVerifier
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _navVerifier: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setNavVerifier(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_navVerifier
        ] = BaseContract._formatABIDataItemList(inputAbi, [_navVerifier
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_navVerifier
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setNavVerifier(
                _navVerifier
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setNavVerifier'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public setExchangesAuthority = {
        async sendTransactionAsync(
            _exchangesAuthority: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setExchangesAuthority(address)').inputs;
            [_exchangesAuthority
    ] = BaseContract._formatABIDataItemList(inputAbi, [_exchangesAuthority
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_exchangesAuthority
    ]);
            const encodedData = self._lookupEthersInterface('setExchangesAuthority(address)').functions.setExchangesAuthority(
                _exchangesAuthority
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setExchangesAuthority.estimateGasAsync.bind(
                    self,
                    _exchangesAuthority
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _exchangesAuthority: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setExchangesAuthority(address)').inputs;
            [_exchangesAuthority
    ] = BaseContract._formatABIDataItemList(inputAbi, [_exchangesAuthority
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setExchangesAuthority(address)').functions.setExchangesAuthority(
                _exchangesAuthority
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _exchangesAuthority: string,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setExchangesAuthority(address)').inputs;
            [_exchangesAuthority
    ] = BaseContract._formatABIDataItemList(inputAbi, [_exchangesAuthority
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setExchangesAuthority(address)').functions.setExchangesAuthority(
                _exchangesAuthority
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _exchangesAuthority: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setExchangesAuthority(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_exchangesAuthority
        ] = BaseContract._formatABIDataItemList(inputAbi, [_exchangesAuthority
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_exchangesAuthority
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setExchangesAuthority(
                _exchangesAuthority
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setExchangesAuthority'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public owner = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'owner()';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [] = BaseContract._formatABIDataItemList(inputAbi, [], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, []);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.owner(
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'owner'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public isWhitelistedRegistry = {
        async callAsync(
            _registry: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isWhitelistedRegistry(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_registry
        ] = BaseContract._formatABIDataItemList(inputAbi, [_registry
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_registry
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isWhitelistedRegistry(
                _registry
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isWhitelistedRegistry'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public whitelistUser = {
        async sendTransactionAsync(
            _target: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistUser(address,bool)').inputs;
            [_target,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_target,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_target,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('whitelistUser(address,bool)').functions.whitelistUser(
                _target,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.whitelistUser.estimateGasAsync.bind(
                    self,
                    _target,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _target: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistUser(address,bool)').inputs;
            [_target,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_target,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('whitelistUser(address,bool)').functions.whitelistUser(
                _target,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _target: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistUser(address,bool)').inputs;
            [_target,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_target,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('whitelistUser(address,bool)').functions.whitelistUser(
                _target,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _target: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'whitelistUser(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_target,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_target,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_target,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.whitelistUser(
                _target,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'whitelistUser'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public isWhitelistedVault = {
        async callAsync(
            _vault: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isWhitelistedVault(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_vault
        ] = BaseContract._formatABIDataItemList(inputAbi, [_vault
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_vault
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isWhitelistedVault(
                _vault
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isWhitelistedVault'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public whitelistDrago = {
        async sendTransactionAsync(
            _drago: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistDrago(address,bool)').inputs;
            [_drago,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_drago,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_drago,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('whitelistDrago(address,bool)').functions.whitelistDrago(
                _drago,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.whitelistDrago.estimateGasAsync.bind(
                    self,
                    _drago,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _drago: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistDrago(address,bool)').inputs;
            [_drago,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_drago,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('whitelistDrago(address,bool)').functions.whitelistDrago(
                _drago,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _drago: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistDrago(address,bool)').inputs;
            [_drago,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_drago,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('whitelistDrago(address,bool)').functions.whitelistDrago(
                _drago,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _drago: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'whitelistDrago(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_drago,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_drago,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_drago,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.whitelistDrago(
                _drago,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'whitelistDrago'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public setAuthority = {
        async sendTransactionAsync(
            _authority: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setAuthority(address,bool)').inputs;
            [_authority,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_authority,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_authority,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('setAuthority(address,bool)').functions.setAuthority(
                _authority,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setAuthority.estimateGasAsync.bind(
                    self,
                    _authority,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _authority: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setAuthority(address,bool)').inputs;
            [_authority,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_authority,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setAuthority(address,bool)').functions.setAuthority(
                _authority,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _authority: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setAuthority(address,bool)').inputs;
            [_authority,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_authority,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setAuthority(address,bool)').functions.setAuthority(
                _authority,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _authority: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setAuthority(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_authority,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_authority,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_authority,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setAuthority(
                _authority,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setAuthority'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public getNavVerifier = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'getNavVerifier()';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [] = BaseContract._formatABIDataItemList(inputAbi, [], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, []);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.getNavVerifier(
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'getNavVerifier'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public setWhitelister = {
        async sendTransactionAsync(
            _whitelister: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setWhitelister(address,bool)').inputs;
            [_whitelister,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_whitelister,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_whitelister,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('setWhitelister(address,bool)').functions.setWhitelister(
                _whitelister,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setWhitelister.estimateGasAsync.bind(
                    self,
                    _whitelister,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _whitelister: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setWhitelister(address,bool)').inputs;
            [_whitelister,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_whitelister,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('setWhitelister(address,bool)').functions.setWhitelister(
                _whitelister,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _whitelister: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('setWhitelister(address,bool)').inputs;
            [_whitelister,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_whitelister,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('setWhitelister(address,bool)').functions.setWhitelister(
                _whitelister,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _whitelister: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'setWhitelister(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_whitelister,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_whitelister,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_whitelister,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.setWhitelister(
                _whitelister,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'setWhitelister'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public isWhitelistedUser = {
        async callAsync(
            _target: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isWhitelistedUser(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_target
        ] = BaseContract._formatABIDataItemList(inputAbi, [_target
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_target
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isWhitelistedUser(
                _target
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isWhitelistedUser'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public isWhitelistedFactory = {
        async callAsync(
            _factory: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'isWhitelistedFactory(address)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_factory
        ] = BaseContract._formatABIDataItemList(inputAbi, [_factory
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_factory
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.isWhitelistedFactory(
                _factory
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'isWhitelistedFactory'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray[0];
        },
    };
    public whitelistVault = {
        async sendTransactionAsync(
            _vault: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistVault(address,bool)').inputs;
            [_vault,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vault,
    _isWhitelisted
    ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_vault,
    _isWhitelisted
    ]);
            const encodedData = self._lookupEthersInterface('whitelistVault(address,bool)').functions.whitelistVault(
                _vault,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.whitelistVault.estimateGasAsync.bind(
                    self,
                    _vault,
                    _isWhitelisted
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _vault: string,
            _isWhitelisted: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistVault(address,bool)').inputs;
            [_vault,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vault,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const encodedData = self._lookupEthersInterface('whitelistVault(address,bool)').functions.whitelistVault(
                _vault,
                _isWhitelisted
            ).data;
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _vault: string,
            _isWhitelisted: boolean,
        ): string {
            const self = this as any as AuthorityContract;
            const inputAbi = self._lookupAbi('whitelistVault(address,bool)').inputs;
            [_vault,
    _isWhitelisted
    ] = BaseContract._formatABIDataItemList(inputAbi, [_vault,
    _isWhitelisted
    ], BaseContract._bigNumberToString);
            const abiEncodedTransactionData = self._lookupEthersInterface('whitelistVault(address,bool)').functions.whitelistVault(
                _vault,
                _isWhitelisted
            ).data;
            return abiEncodedTransactionData;
        },
        async callAsync(
            _vault: string,
            _isWhitelisted: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as AuthorityContract;
            const functionSignature = 'whitelistVault(address,bool)';
            const inputAbi = self._lookupAbi(functionSignature).inputs;
            [_vault,
        _isWhitelisted
        ] = BaseContract._formatABIDataItemList(inputAbi, [_vault,
        _isWhitelisted
        ], BaseContract._bigNumberToString.bind(self));
            BaseContract.strictArgumentEncodingCheck(inputAbi, [_vault,
        _isWhitelisted
        ]);
            const ethersFunction = self._lookupEthersInterface(functionSignature).functions.whitelistVault(
                _vault,
                _isWhitelisted
            ) as any
            const encodedData = ethersFunction.data;
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            let resultArray = ethersFunction.parse(rawCallResult);
            const outputAbi = (_.find(self.abi, {name: 'whitelistVault'}) as MethodAbi).outputs;
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._lowercaseAddress.bind(this));
            resultArray = BaseContract._formatABIDataItemList(outputAbi, resultArray, BaseContract._bnToBigNumber.bind(this));
            return resultArray;
        },
    };
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<AuthorityContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return AuthorityContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<AuthorityContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const txData = ethers.Contract.getDeployTransaction(bytecode, abi, );
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            txData,
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`Authority successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new AuthorityContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('Authority', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_ethersInterfacesByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
