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

pragma solidity ^0.4.20;

  /*
  * import the vault contract code first
  */

/// @title Vault Factory library - Reduces size of vault factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library VaultFactoryLibrary {

  struct NewVault {
    string name;
    string symbol;
    uint256 vaultId;
    address owner;
    address newAddress;
  }

  /// @dev Address of authority contract is different on each network
  modifier whitelisted_factory {
    Authority auth = Authority(0x0C9579829547c95E35535FE3C57cf42F90a98785);
    if (auth.isWhitelistedFactory(this)) _;
  }

  /// @dev Allows an approved factory to create new vaults
  /// @param _name String of the name
  /// @param _symbol String of the symbol
  /// @param _owner Address of the owner
  /// @param _vaultId Number of Id of the vault from the registry
  /// @param _authority Address of the respective authority
  /// @return Bool the function executed
  function createVault(
    NewVault storage self,
    string _name,
    string _symbol,
    address _owner,
    uint _vaultId,
    address _authority)
    public
    whitelisted_factory
    returns (bool success)
  {
    Vault vault = new Vault(_name, _symbol, _vaultId, _owner, _authority);
    self.name = _name;
    self.symbol = _symbol;
    self.vaultId = _vaultId;
    self.newAddress = address(vault);
    self.owner = _owner;
    return true;
  }
}

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistry {

  //EVENTS

  event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
  event Unregistered(string indexed symbol, uint indexed id);
  event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

  // CORE FUNCTIONS

  function register(address _drago, string _name, string _symbol, uint _dragoID, address _owner) public payable returns (bool) {}
  function unregister(uint _id) public {}
  function setMeta(uint _id, bytes32 _key, bytes32 _value) public {}
  function addGroup(address _group) public {}
  function setFee(uint _fee) public {}
  function upgrade(address _newAddress) public payable {} //payable as there is a transfer of value, otherwise opcode might throw an error
  function setUpgraded(uint _version) public {}
  function drain() public {}
  function kill() public {}

  function dragoCount() public constant returns (uint) {}
  function fromId(uint _id) public constant returns (address drago, string name, string symbol, uint dragoID, address owner, address group) {}
  function fromAddress(address _drago) public constant returns (uint id, string name, string symbol, uint dragoID, address owner, address group) {}
  function fromSymbol(string _symbol) public constant returns (uint id, address drago, string name, uint dragoID, address owner, address group) {}
  function fromName(string _name) public constant returns (uint id, address drago, string symbol, uint dragoID, address owner, address group) {}
  function fromNameSymbol(string _name, string _symbol) public constant returns (address) {}
  function getNameFromAddress(address _pool) external constant returns (bytes32) {}
  function getSymbolFromAddress(address _pool) external constant returns (bytes32) {}
  function meta(uint _id, bytes32 _key) public constant returns (bytes32) {}
  function getGroups() public constant returns (address[]) {}
  function getFee() public constant returns (uint) {}
}


/// @title Vault Factory Interface - Allows external intaction with Vault Factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultFactoryFace {

  event VaultCreated(string name, string symbol, address indexed vault, address indexed owner, uint vaultId);

  function createVault(string _name, string _symbol) public returns (bool success) {}
  function setTargetVaultDao(address _targetVault, address _vaultDao) public {}
  function changeVaultDao(address _newVaultDao) public {}
  function setRegistry(address _newRegistry) public {}
  function setBeneficiary(address _vaultDao) public {}
  function setFee(uint _fee) public {}
  function drain() public {}

  function getRegistry() public constant returns (address) {}
  function getStorage() public constant returns (address vaultDao, uint nextVaultId) {}
  function getNextId() public constant returns (uint nextVaultId) {}
  function getEventful() public constant returns (address) {}
  function getVaultDao() public constant returns (address vaultDao) {}
  function getVersion() public constant returns (string) {}
  function getVaultsByAddress(address _owner) public constant returns (address[]) {}
}

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
      uint nextVaultId)
  {
    return (data.vaultDao, nextVaultId);
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

  /// @dev Returns the address of the vault dao
  /// @return Address of the vault dao
  function getVaultDao() public constant returns (address) {
    return data.vaultDao;
  }

  /// @dev Returns the version of this factory
  /// @return Address of the factory
  function getVersion() public constant returns (string) {
    return VERSION;
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
