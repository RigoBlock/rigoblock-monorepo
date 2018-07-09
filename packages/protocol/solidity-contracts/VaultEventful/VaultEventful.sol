/*

 Copyright 2017-2018 RigoBlock, Rigo Investment Sagl.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

*/

pragma solidity ^0.4.24;
pragma experimental "v0.5.0";

import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { VaultEventfulFace } from "./VaultEventfulFace.sol";

/// @title Vault Eventful - Logs events for all vaults.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultEventful is VaultEventfulFace {

    string public constant VERSION = 'DH 0.4.2';

    address public AUTHORITY;

    event BuyVault(
        address indexed vault,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 revenue,
        bytes name,
        bytes symbol
    );

    event SellVault(
        address indexed vault,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 revenue,
        bytes name,
        bytes symbol
    );

    event NewRatio(
        address indexed vault,
        address indexed from,
        uint256 newRatio
    );


    event NewFee(
        address indexed vault,
        address indexed from,
        address indexed to,
        uint256 fee
    );

    event NewCollector(
        address indexed vault,
        address indexed from,
        address indexed to,
        address collector
    );

    event VaultDao(
        address indexed vault,
        address indexed from,
        address indexed to,
        address vaultDao
    );

    event DepositCasper(
        address indexed vault,
        address indexed validator,
        address indexed casper,
        address withdrawal,
        uint256 amount
    );

    event WithdrawCasper(
        address indexed vault,
        address indexed validator,
        address indexed casper,
        uint256 validatorIndex
    );

    event VaultCreated(
        address indexed vault,
        address indexed group,
        address indexed owner,
        uint256 vaultId,
        string name,
        string symbol
    );

    modifier approvedFactoryOnly(address _factory) {
        Authority auth = Authority(AUTHORITY);
        require(auth.isWhitelistedFactory(_factory));
        _;
    }

    modifier approvedVaultOnly(address _vault) {
        Authority auth = Authority(AUTHORITY);
        require(auth.isWhitelistedVault(_vault));
        _;
    }

    modifier isCasper(address _casper) {
        Authority auth = Authority(AUTHORITY);
        require(auth.getCasper() == _casper);
        _;
    }

    modifier approvedUserOnly(address _user) {
        Authority auth = Authority(AUTHORITY);
        require(auth.isWhitelistedUser(_user));
        _;
    }

    constructor(address _authority) public {
        AUTHORITY = _authority;
    }

    // CORE FUNCTIONS

    /// @dev Logs a Buy Vault event.
    /// @param _who Address of who is buying
    /// @param _targetVault Address of the target vault
    /// @param _value Value of the transaction in Ether
    /// @param _amount Number of shares purchased
    /// @return Bool the transaction executed successfully
    /// @notice transform name and symbol in .js with web3.toAscii(bytes32_date)
    function buyVault(
        address _who,
        address _targetVault,
        uint256 _value,
        uint256 _amount,
        bytes _name,
        bytes _symbol)
        external
        approvedVaultOnly(msg.sender)
        returns (bool success)
    {
        buyVaultInternal(_targetVault, _who, msg.sender, _value, _amount, _name, _symbol);
        return true;
    }

    /// @dev Logs a Sell Vault event.
    /// @param _who Address of who is selling
    /// @param _targetVault Address of the target vault
    /// @param _amount Number of shares purchased
    /// @param _revenue Value of the transaction in Ether
    /// @return Bool the transaction executed successfully
    /// @notice transform name and symbol in .js with web3.toAscii(bytes32_date)
    function sellVault(
        address _who,
        address _targetVault,
        uint256 _amount,
        uint256 _revenue,
        bytes _name,
        bytes _symbol)
        external
        approvedVaultOnly(msg.sender)
        returns(bool success)
    {
        require(_amount > 0);
        sellVaultInternal(_targetVault, _who, msg.sender, _amount, _revenue, _name, _symbol);
        return true;
    }

    /// @dev Logswhen rigoblock dao changes fee split.
    /// @param _who Address of the caller
    /// @param _targetVault Address of the target vault
    /// @param _ratio Ratio number from 0 to 100
    /// @return Bool the transaction executed successfully
    function changeRatio(
        address _who,
        address _targetVault,
        uint256 _ratio)
        external
        approvedVaultOnly(msg.sender)
        returns(bool success)
    {
        require(_ratio > 0);
        emit NewRatio(_targetVault, _who, _ratio);
        return true;
    }


    /// @dev Logs a modification of the transaction fee event
    /// @param _who Address of the caller
    /// @param _targetVault Address of the target Vault
    /// @param _transactionFee Value of the transaction fee in basis points
    /// @return Bool the transaction executed successfully
    function setTransactionFee(
        address _who,
        address _targetVault,
        uint256 _transactionFee)
        external
        approvedVaultOnly(msg.sender)
        approvedUserOnly(_who)
        returns(bool success)
    {
        emit NewFee(_targetVault, msg.sender, _who, _transactionFee);
        return true;
    }

    /// @dev Logs when wizard changes fee collector address
    /// @param _who Address of the caller
    /// @param _targetVault Address of the target Vault
    /// @param _feeCollector Address of the new fee collector
    /// @return Bool the transaction executed successfully
    function changeFeeCollector(
        address _who,
        address _targetVault,
        address _feeCollector)
        external
        approvedVaultOnly(msg.sender)
        approvedUserOnly(_who)
        returns(bool success)
    {
        emit NewCollector(_targetVault, msg.sender, _who, _feeCollector);
        return true;
    }

    /// @dev Logs a change in the vault dao of an approved vault
    /// @param _who Address of the caller
    /// @param _targetVault Address of the vault
    /// @param _vaultDao Address of the new vault dao
    /// @return Bool the transaction executed successfully
    function changeVaultDao(
        address _who,
        address _targetVault,
        address _vaultDao)
        external
        approvedVaultOnly(msg.sender)
        approvedUserOnly(_who)
        returns(bool success)
    {
        emit VaultDao(_targetVault, msg.sender, _who, _vaultDao);
        return true;
    }

    /// @dev Logs a vault deposit to the casper contract
    /// @param _who Address of the caller
    /// @param _targetVault Address of the vault
    /// @param _casper Address of the casper contract
    /// @param _validation Address of the PoS miner
    /// @param _withdrawal Address of casper withdrawal, must be the vault
    /// @return Bool the transaction executed successfully
    function depositToCasper(
        address _who,
        address _targetVault,
        address _casper,
        address _validation,
        address _withdrawal,
        uint256 _amount)
        external
        approvedVaultOnly(msg.sender)
        approvedUserOnly(_who)
        returns(bool success)
    {
        emit DepositCasper(_targetVault, _validation, _casper, _withdrawal, _amount);
        return true;
    }

    /// @dev Logs a vault withdrawal from the casper contract
    /// @param _who Address of the caller
    /// @param _targetVault Address of the vault
    /// @param _casper Address of the casper contract
    /// @param _validatorIndex Number of the validator in the casper contract
    /// @return Bool the transaction executed successfully
    function withdrawFromCasper(
        address _who,
        address _targetVault,
        address _casper,
        uint256 _validatorIndex)
        external
        approvedVaultOnly(msg.sender)
        approvedUserOnly(_who)
        returns(bool success)
    {
        emit WithdrawCasper(_targetVault, _who, _casper, _validatorIndex);
        return true;
    }

    /// @dev Logs a new Vault creation by factory
    /// @param _who Address of the caller
    /// @param _newVault Address of the new vault
    /// @param _name String of the name of the new vault
    /// @param _symbol String of the symbol of the new vault
    /// @param _vaultId Number of the new vault Id
    /// @return Bool the transaction executed successfully
    function createVault(
        address _who,
        address _newVault,
        string _name,
        string _symbol,
        uint256 _vaultId)
        external
        approvedFactoryOnly(msg.sender)
        returns(bool success)
    {
        createVaultInternal(_newVault, msg.sender, _who, _name, _symbol, _vaultId);
        return true;
    }

    // INTERNAL FUNCTIONS

    /// @dev Logs a purchase event
    /// @param _who Address of the caller
    /// @param _targetVault Address of the vault
    /// @param _factory Address of the factory
    /// @param _value Value of transaction in wei
    /// @param _amount Number of new tokens
    /// @param _name Hex encoded bytes of the name
    /// @param _symbol Hex encoded bytes of the symbol
    function buyVaultInternal(
        address _targetVault,
        address _who,
        address _factory,
        uint256 _value,
        uint256 _amount,
        bytes _name,
        bytes _symbol)
        internal
    {
        emit BuyVault(_targetVault, _who, _factory, _value, _amount, _name, _symbol);
    }

    /// @dev Logs a sale event
    /// @param _who Address of the caller
    /// @param _targetVault Address of the vault
    /// @param _factory Address of the factory
    /// @param _amount Number of burnt tokens
    /// @param _revenue Value of transaction in wei
    /// @param _name Hex encoded bytes of the name
    /// @param _symbol Hex encoded bytes of the symbol
    function sellVaultInternal(
        address _targetVault,
        address _who,
        address _factory,
        uint256 _amount,
        uint256 _revenue,
        bytes _name,
        bytes _symbol)
        internal
    {
        emit SellVault(_targetVault, _who, _factory, _amount, _revenue, _name, _symbol);
    }

    /// @dev Logs a new vault creation by factory
    /// @param _who Address of the caller
    /// @param _newVault Address of the new vault
    /// @param _factory Address of the factory
    /// @param _name Bytes array of the name
    /// @param _symbol Bytes array of the symbol
    /// @param _vaultId Number of the pool in registry
    function createVaultInternal(
        address _newVault,
        address _factory,
        address _who,
        string _name,
        string _symbol,
        uint256 _vaultId)
        internal
    {
        emit VaultCreated(_newVault, _factory, _who, _vaultId, _name, _symbol);
    }
}
