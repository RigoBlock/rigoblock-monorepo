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

import { DragoRegistryFace as DragoRegistry } from "../Registry/DragoRegistryFace.sol";
import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { VaultFace as Vault } from "../Vault/VaultFace.sol";
import { VaultEventfulFace as VaultEventful } from "../VaultEventful/VaultEventfulFace.sol";

import { VaultFactoryLibrary } from "./VaultFactoryLibrary/VaultFactoryLibrary.sol";
import { OwnedUninitialized as Owned } from "../utils/Owned/OwnedUninitialized.sol";
import { VaultFactoryFace } from "./VaultFactoryFace.sol";

/// @title Vault Factory contract - allows creation of new vaults.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultFactory is Owned, VaultFactoryFace {

    VaultFactoryLibrary.NewVault libraryData;

    string public constant VERSION = 'VF 0.4.1';

    Data data;

    struct Data {
        uint fee;
        address vaultRegistry;
        address vaultDao;
        address authority;
        mapping(address => address[]) vaults;
    }

    event VaultCreated(
        string name,
        string symbol,
        address indexed vault,
        address indexed owner,
        uint vaultId
    );

    modifier whitelisted_factory(address _authority) {
        Authority auth = Authority(_authority);
        if (auth.isWhitelistedFactory(this)) _;
    }

    modifier when_fee_paid { require(msg.value >= data.fee); _; }
    modifier only_owner { require(msg.sender == owner); _; }
    modifier only_vault_dao { require(msg.sender == data.vaultDao); _; }

    function VaultFactory(
        address _registry,
        address _vaultDao,
        address _authority)
        public
    {
        data.vaultRegistry = _registry;
        data.vaultDao = _vaultDao;
        data.authority = _authority;
        owner = msg.sender;
    }

    // CORE FUNCTIONS

    /// @dev allows creation of a new vault
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @return Bool the transaction executed correctly
    function createVault(string _name, string _symbol)
        public
        returns (bool success)
    {
        DragoRegistry registry = DragoRegistry(data.vaultRegistry);
        uint regFee = registry.getFee();
        uint vaultId = registry.dragoCount();
        require(createVaultInternal(_name, _symbol, msg.sender, vaultId));
        assert(registry.register.value(regFee)(
            libraryData.newAddress,
            _name,
            _symbol,
            vaultId,
            msg.sender)
        );
        return true;
    }

    /// @dev Allows factory owner to update the address of the dao/factory
    /// @dev Enables manual update of dao for single vaults
    /// @param _targetVault Address of the target vault
    /// @param _vaultDao Address of the new vault dao
    function setTargetVaultDao(address _targetVault, address _vaultDao)
        public
        only_owner
    {
        Vault vault = Vault(_targetVault);
        vault.changeVaultDao(_vaultDao);
    }

    /// @dev Allows vault dao/factory to update its address
    /// @dev Creates internal record
    /// @param _newVaultDao Address of the vault dao
    function changeVaultDao(address _newVaultDao) public only_vault_dao {
        data.vaultDao = _newVaultDao;
    }

    /// @dev Allows owner to update the registry
    /// @param _newRegistry Address of the new registry
    function setRegistry(address _newRegistry) public only_owner {
        data.vaultRegistry = _newRegistry;
    }

    /// @dev Allows owner to set the address which can collect creation fees
    /// @param _vaultDao Address of the new vault dao/factory
    function setBeneficiary(address _vaultDao) public only_owner {
        data.vaultDao = _vaultDao;
    }

    /// @dev Allows owner to set the vault creation fee
    /// @param _fee Value of the fee in wei
    function setFee(uint _fee) public only_owner {
        data.fee = _fee;
    }

    /// @dev Allows owner to collect fees
    function drain() public only_owner {
        data.vaultDao.transfer(this.balance);
    }

    // CONSTANT PUBLIC FUNCTIONS

    /// @dev Returns the address of the pool registry
    /// @return Address of the registry
    function getRegistry() public constant returns (address) {
        return (data.vaultRegistry);
    }

    /// @dev Returns administrative data for this factory
    /// @return Address of the vault dao
    /// @return String of the version
    /// @return Number of the next vault from the registry
    function getStorage()
        public
        constant
        returns (
            address vaultDao,
            string version,
            uint nextVaultId
        )
    {
        return (
            vaultDao = data.vaultDao,
            version = VERSION,
            nextVaultId = getNextId()
        );
    }

    /// @dev Returns the next Id for a vault
    /// @return Number of the next Id from the registry
    function getNextId() public constant returns (uint nextVaultId) {
        DragoRegistry registry = DragoRegistry(data.vaultRegistry);
        nextVaultId = registry.dragoCount();
    }

    /// @dev Returns the address of the logger contract
    /// @dev Queries from authority contract
    /// @return Address of the eventful contract
    function getEventful() public constant returns (address) {
        Authority auth = Authority(data.authority);
        return auth.getVaultEventful();
    }

    /// @dev Returns an array of vaults the owner has created
    /// @param _owner Address of the queried owner
    /// @return Array of vault addresses
    function getVaultsByAddress(address _owner)
        public
        constant
        returns (address[])
    {
        return data.vaults[_owner];
    }

    // INTERNAL FUNCTIONS

    /// @dev Creates a vault and routes to eventful
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @param _owner Address of the owner
    /// @param _vaultId Number of the new vault Id
    /// @return Bool the transaction executed correctly
    function createVaultInternal(
        string _name,
        string _symbol,
        address _owner,
        uint _vaultId)
        internal
        when_fee_paid
        returns (bool success)
    {
        Authority auth = Authority(data.authority);
        require(VaultFactoryLibrary.createVault(
            libraryData,
            _name,
            _symbol,
            _owner,
            _vaultId,
            data.authority)
        );
        data.vaults[msg.sender].push(libraryData.newAddress);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.createVault(
            msg.sender,
            this,
            libraryData.newAddress,
            _name,
            _symbol,
            _vaultId,
            _owner)
        );
        auth.whitelistVault(libraryData.newAddress, true);
        auth.whitelistUser(msg.sender, true);
        VaultCreated(_name, _symbol, libraryData.newAddress, _owner, _vaultId);
        return true;
    }
}
