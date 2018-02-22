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

contract Owned {

  address public owner = msg.sender;

  event NewOwner(address indexed old, address indexed current);

  modifier only_owner { require(msg.sender == owner); _; }

  function setOwner(address _new) public only_owner {
    owner = _new;
    NewOwner(owner, _new);
  }

  function getOwner() public constant returns (address) {
    return owner;
  }
}

/// @title Authority Interface - Allows external interaction with Authrity contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Authority {

  // EVENTS

  event SetAuthority (address indexed authority);
  event SetWhitelister (address indexed whitelister);
  event SetEventful(address indexed eventful);
  event WhitelistedUser(address indexed target, bool approved);
  event WhitelistedAsset(address indexed asset, bool approved);
  event WhitelistedExchange(address indexed exchange, bool approved);
  event WhitelistedRegistry(address indexed registry, bool approved);
  event WhitelistedFactory(address indexed factory, bool approved);
  event WhitelistedVault(address indexed vault, bool approved);
  event WhitelistedDrago(address indexed drago, bool approved);
  event NewEventful(address indexed eventful);

  // METHODS

  function setAuthority(address _authority, bool _isWhitelisted) public {}
  function setWhitelister(address _whitelister, bool _isWhitelisted) public {}
  function whitelistUser(address _target, bool _isWhitelisted) public {}
  function whitelistAsset(address _asset, bool _isWhitelisted) public {}
  function whitelistExchange(address _exchange, bool _isWhitelisted) public {}
  function whitelistDrago(address _drago, bool _isWhitelisted) public {}
  function whitelistVault(address _vault, bool _isWhitelisted) public {}
  function whitelistRegistry(address _registry, bool _isWhitelisted) public {}
  function whitelistFactory(address _factory, bool _isWhitelisted) public {}
  function setEventful(address _eventful) public {}
  function setVaultEventful(address _vaultEventful) public {}
  function setExchangeEventful(address _exchangeEventful) public {}
  function setCasper(address _casper) public {}

  function isWhitelistedUser(address _target) public constant returns (bool) {}
  function isWhitelister(address _whitelister) public constant returns (bool) {}
  function isAuthority(address _authority) public constant returns (bool) {}
  function isWhitelistedAsset(address _asset) public constant returns (bool) {}
  function isWhitelistedExchange(address _exchange) public constant returns (bool) {}
  function isWhitelistedRegistry(address _registry) public constant returns (bool) {}
  function isWhitelistedDrago(address _drago) public constant returns (bool) {}
  function isWhitelistedVault(address _vault) public constant returns (bool) {}
  function isWhitelistedFactory(address _factory) public constant returns (bool) {}
  function getEventful() public constant returns (address) {}
  function getVaultEventful() public constant returns (address) {}
  function getExchangeEventful() public constant returns (address) {}
  function getCasper() public constant returns (address) {}
  function getOwner() public constant returns (address) {}
  function getListsByGroups(string _group) public constant returns (address[]) {}
}

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistryFace {

  //EVENTS

  event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
  event Unregistered(string indexed symbol, uint indexed id);
  event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

  // METHODS

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

/// @title Drago Registry - Allows registration of pools.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistry is DragoRegistryFace, Owned {

  address public AUTHORITY;
  uint public VERSION;

  uint public fee = 0;

  address[] groups;

  Drago[] dragos;

  mapping (bytes32 => address) mapFromKey;
  mapping (address => uint) mapFromAddress;
  mapping (string => uint) mapFromName;
  mapping (string => uint) mapFromSymbol;

  struct Drago {
    address drago;
    string name;
    string symbol;
    uint dragoID;
    address owner;
    address group;
    mapping (bytes32 => bytes32) meta;
  }

  // EVENTS

  event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
  event Unregistered(string indexed name, string indexed symbol, uint indexed id);
  event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

  // MODIFIERS

  modifier when_fee_paid {
    require(msg.value >= fee);
    _;
  }

  modifier when_address_free(address _drago) {
    require(mapFromAddress[_drago] == 0);
    _;
  }

  modifier when_is_symbol(string _symbol) {
    require(bytes(_symbol).length == 3);
    _;
  }

  modifier when_has_symbol(string _symbol) {
    require(mapFromSymbol[_symbol] != 0);
    _;
  }

  modifier only_drago_owner(uint _id) {
    require(dragos[_id].owner == msg.sender);
    _;
  }

  modifier when_name_free(string _name) {
    require(mapFromName[_name] == 0);
    _;
  }

  modifier when_has_name(string _name) {
    require(mapFromName[_name] != 0);
    _;
  }

  modifier only_authority {
    Authority auth = Authority(AUTHORITY);
    require(auth.isAuthority(msg.sender) == true);
    _;
  }

  function DragoRegistry(address _authority) public {
    AUTHORITY = _authority;
  }

  // CORE METHODS

  /// @dev Allows a factory which is an authority to register a pool
  /// @param _drago Address of the pool
  /// @param _name Name of the pool
  /// @param _symbol Symbol of the pool
  /// @param _dragoID ID number of the pool
  /// @param _owner Address of the pool owner
  function register(
    address _drago,
    string _name,
    string _symbol,
    uint _dragoID,
    address _owner)
    public
    payable
    only_authority
    when_fee_paid
    when_address_free(_drago)
    when_name_free(_name)
    when_is_symbol(_symbol)
    returns (bool)
  {
    return registerAs(_drago, _name, _symbol, _dragoID, _owner, msg.sender);
  }

  /// @dev Allows owner to unregister a pool
  /// @param _id Number of the pool
  function unregister(uint _id) public only_owner {
    Unregistered(dragos[_id].name, dragos[_id].symbol, _id);
    delete mapFromAddress[dragos[_id].drago];
    delete mapFromName[dragos[_id].name];
    delete mapFromSymbol[dragos[_id].symbol];
    delete dragos[_id];
  }

  /// @dev Allows pool owner to set metadata for a pool
  /// @param _id Number corresponding to pool id
  /// @param _key Bytes32 of the key
  /// @param _value Bytes32 of the value
  function setMeta(uint _id, bytes32 _key, bytes32 _value)
    public
    only_drago_owner(_id)
  {
    dragos[_id].meta[_key] = _value;
    MetaChanged(_id, _key, _value);
  }

  /// @dev Allows owner to add a group of pools (a factory)
  /// @param _group Address of the new group
  function addGroup(address _group)
    public
    only_owner
  {
    groups.push(_group);
  }

  /// @dev Allows owner to set a fee to register pools
  /// @param _fee Value of the fee in wei
  function setFee(uint _fee) public only_owner {
    fee = _fee;
  }

  /// @dev Allows owner to create a new registry.
  /// @dev When the registry gets upgraded, a migration of all funds is required
  /// @param _newAddress Address of new registry.
  function upgrade(address _newAddress) public payable only_owner {
    DragoRegistry registry = DragoRegistry(_newAddress);
    ++VERSION;
    registry.setUpgraded(VERSION);
    address(registry).transfer(this.balance);
  }

  /// @dev Allows owner to update version on registry upgrade
  /// @param _version Number of the new version
  function setUpgraded(uint _version) external only_owner {
    VERSION = _version;
  }

  /// @dev Allows owner to collect fees by draining the balance
  function drain() public only_owner {
    msg.sender.transfer(this.balance);
  }

  /// @dev Allows owner to selfdestruct old registry
  function kill() public only_owner {
    selfdestruct(msg.sender);
  }

  // CONSTANT METHODS

  /// @dev Provides the total number of registered pools
  /// @return Number of pools
  function dragoCount() public constant returns (uint) {
    return dragos.length;
  }

  /// @dev Provides a pool's struct data
  /// @param _id Registration number of the pool
  /// @return Pool struct data
  function fromId(uint _id)
    public
    constant
    returns (
      address drago,
      string name,
      string symbol,
      uint dragoID,
      address owner,
      address group
    )
  {
    Drago memory pool = dragos[_id];
    drago = pool.drago;
    name = pool.name;
    symbol = pool.symbol;
    dragoID = pool.dragoID;
    owner = pool.owner;
    group = pool.group;
  }

  /// @dev Provides a pool's struct data
  /// @param _drago Address of the pool
  /// @return Pool struct data
  function fromAddress(address _drago)
    public
    constant
    returns (
      uint id,
      string name,
      string symbol,
      uint dragoID,
      address owner,
      address group
    )
  {
    id = mapFromAddress[_drago] - 1;
    Drago memory pool = dragos[id];
    name = pool.name;
    symbol = pool.symbol;
    dragoID = pool.dragoID;
    owner = pool.owner;
    group = pool.group;
  }

  /// @dev Provides a pool's struct data
  /// @param _symbol Symbol of the pool
  /// @return Pool struct data
  function fromSymbol(string _symbol)
    public
    constant
    returns (
      uint id,
      address drago,
      string name,
      uint dragoID,
      address owner,
      address group
    )
  {
    id = mapFromSymbol[_symbol] - 1;
    Drago memory pool = dragos[id];
    drago = pool.drago;
    name = pool.name;
    dragoID = pool.dragoID;
    owner = pool.owner;
    group = pool.group;
  }

  /// @dev Provides a pool's struct data
  /// @param _name Name of the pool
  /// @return Pool struct data
  function fromName(string _name)
    public
    constant
    returns (
      uint id,
      address drago,
      string symbol,
      uint dragoID,
      address owner,
      address group
    )
  {
    id = mapFromName[_name] - 1;
    Drago memory pool = dragos[id];
    symbol = pool.symbol;
    drago = pool.drago;
    dragoID = pool.dragoID;
    owner = pool.owner;
    group = pool.group;
  }

  /// @dev Provides a pool's struct data
  /// @param _name Name of the pool
  /// @param _symbol Symbol of the pool
  /// @return Pool struct data
  function fromNameSymbol(string _name, string _symbol)
    public
    constant
    returns (address)
  {
    uint id = mapFromName[_name] - 1;
    uint idCheck = mapFromSymbol[_symbol] - 1;
    Drago memory pool = dragos[id];
    require(id == idCheck);
    address drago = pool.drago;
    return drago;
  }

  /// @dev Provides a pool's name from its address
  /// @param _pool Address of the pool
  /// @return Name of the pool
  function getNameFromAddress(address _pool)
    external
    constant
    returns (bytes32)
  {
    uint id = mapFromAddress[_pool] - 1;
    Drago memory pool = dragos[id];
    return keccak256(pool.name);
  }

  /// @dev Provides a pool's symbol from its address
  /// @param _pool Address of the pool
  /// @return Symbol of the pool
  function getSymbolFromAddress(address _pool)
    external
    constant
    returns (bytes32)
  {
    uint id = mapFromAddress[_pool] - 1;
    Drago memory pool = dragos[id];
    return keccak256(pool.symbol);
  }

  /// @dev Provides a pool's metadata
  /// @param _id ID number of the pool
  /// @param _key Bytes32 key
  /// @return Pool metadata
  function meta(uint _id, bytes32 _key)
    public
    constant
    returns (bytes32)
  {
    return dragos[_id].meta[_key];
  }

  /// @dev Provides the addresses of the groups/factories
  /// @return Array of addresses of the groups
  function getGroups()
    public
    constant
    returns (address[])
  {
    return groups;
  }

  /// @dev Provides the fee required to register a pool
  /// @return Number of the fee in wei
  function getFee() public constant returns (uint) {
    return fee;
  }

  // INTERNAL METHODS

  /// @dev Allows authority to register a pool for a certain group
  /// @param _drago Address of the pool
  /// @param _name Name of the pool
  /// @param _symbol Symbol of the pool
  /// @param _dragoID ID number of the pool
  /// @param _owner Address of the pool owner
  /// @param _group Address of the group/factory
  function registerAs(
    address _drago,
    string _name,
    string _symbol,
    uint _dragoID,
    address _owner,
    address _group)
    internal
    returns (bool)
  {
    dragos.push(Drago(_drago, _name, _symbol, _dragoID, _owner, _group));
    mapFromAddress[_drago] = dragos.length;
    mapFromName[_name] = dragos.length;
    mapFromSymbol[_symbol] = dragos.length;
    Registered(_name, _symbol, dragos.length - 1, _drago, _owner, _group);
    return true;
  }
}
