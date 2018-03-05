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

pragma solidity ^0.4.19;

import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { VaultEventfulFace } from "./VaultEventfulFace.sol";

/// @title Vault Eventful - Logs events for all vaults.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultEventful is VaultEventfulFace {

    string public constant VERSION = 'DH 0.4.1';

    address public AUTHORITY;
    address public REGISTRY;

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

    event NewFee(
        address indexed vault,
        address indexed from,
        address indexed to,
        uint fee
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
        uint amount
    );

    event WithdrawCasper(
        address indexed vault,
        address indexed validator,
        address indexed casper,
        uint validatorIndex
    );

    event VaultCreated(
        address indexed vault,
        address indexed group,
        address indexed owner,
        uint vaultId,
        string name,
        string symbol
    );

    modifier approved_factory_only(address _factory) {
        Authority auth = Authority(AUTHORITY);
        if (auth.isWhitelistedFactory(_factory)) _;
    }

    modifier approved_vault_only(address _vault) {
        Authority auth = Authority(AUTHORITY);
        if (auth.isWhitelistedVault(_vault)) _;
    }

    modifier is_casper(address _casper) {
        Authority auth = Authority(AUTHORITY);
        if (auth.getCasper() == _casper) _;
    }

    modifier approved_user_only(address _user) {
        Authority auth = Authority(AUTHORITY);
        if (auth.isWhitelistedUser(_user)) _;
    }

    function VaultEventful(address _authority, address _registry) public {
        AUTHORITY = _authority;
        REGISTRY = _registry;
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
        uint _value,
        uint _amount,
        bytes _name,
        bytes _symbol)
        external
        approved_vault_only(_targetVault)
        returns (bool success)
    {
        require(msg.sender == _targetVault);
        BuyVault(_targetVault, _who, msg.sender, _value, _amount, _name, _symbol);
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
        uint _amount,
        uint _revenue,
        bytes _name,
        bytes _symbol)
        external
        approved_vault_only(_targetVault)
        returns(bool success)
    {
        require(_amount > 0);
        require(msg.sender == _targetVault);
        SellVault(_targetVault, _who, msg.sender, _amount, _revenue, _name, _symbol);
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
        uint _transactionFee)
        external
        approved_vault_only(_targetVault)
        approved_user_only(_who)
        returns(bool success)
    {
        require(msg.sender == _targetVault);
        NewFee(_targetVault, msg.sender, _who, _transactionFee);
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
        approved_vault_only(_targetVault)
        approved_user_only(_who)
        returns(bool success)
    {
        require(msg.sender == _targetVault);
        NewCollector(_targetVault, msg.sender, _who, _feeCollector);
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
        approved_vault_only(_targetVault)
        approved_user_only(_who)
        returns(bool success)
    {
        require(msg.sender == _targetVault);
        VaultDao(_targetVault, msg.sender, _who, _vaultDao);
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
        uint _amount)
        external
        approved_vault_only(_targetVault)
        approved_user_only(_who)
        returns(bool success)
    {
        require(msg.sender == _targetVault);
        DepositCasper(_targetVault, _validation, _casper, _withdrawal, _amount);
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
        uint _validatorIndex)
        external
        approved_vault_only(_targetVault)
        approved_user_only(_who)
        returns(bool success)
    {
        require(msg.sender == _targetVault);
        WithdrawCasper(_targetVault, _who, _casper, _validatorIndex);
        return true;
    }

    /// @dev Logs a new Vault creation by factory
    /// @param _who Address of the caller
    /// @param _vaultFactory Address of the factory
    /// @param _newVault Address of the new vault
    /// @param _name String of the name of the new vault
    /// @param _symbol String of the symbol of the new vault
    /// @param _vaultId Number of the new vault Id
    /// @return Bool the transaction executed successfully
    function createVault(
        address _who,
        address _vaultFactory,
        address _newVault,
        string _name,
        string _symbol,
        uint _vaultId)
        external
        approved_factory_only(_vaultFactory)
        returns(bool success)
    {
        require(msg.sender == _vaultFactory);
        VaultCreated(_newVault, _vaultFactory, _who, _vaultId, _name, _symbol);
        return true;
    }
}
