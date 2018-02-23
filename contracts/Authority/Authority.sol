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

  address public owner;

  event NewOwner(address indexed old, address indexed current);

  modifier only_owner { require(msg.sender == owner); _; }

  function Owned() public {
    owner = msg.sender;
  }

  function setOwner(address _new) public only_owner {
    owner = _new;
    NewOwner(owner, _new);
  }

  function getOwner() public constant returns (address) {
    return owner;
  }
}

/// @title Authority Interface - Allows interaction with the Authority contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract AuthorityFace {

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

  // CORE FUNCTIONS

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

/// @title Authority - Allows interaction with the Authority contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Authority is Owned, AuthorityFace {

  BuildingBlocks blocks;
  Type types;

  mapping (address => Account) accounts;

  struct List {
    address target;
  }

  struct Type {
    string types;
    mapping (string=> address[]) mapFromGroup;
    List[] list;
  }

  struct Group {
    bool whitelister;
    bool exchange;
    bool drago;
    bool vault;
    bool asset;
    bool user;
    bool registry;
    bool factory;
    bool authority;
  }

  struct Account {
    address account;
    bool authorized;
    mapping (bool => Group) groups; //mapping account to bool authorized to bool group
  }

  struct BuildingBlocks {
    address eventful;
    address vaultEventful;
    address exchangeEventful;
    address casper;
  }

  // EVENTS

  event SetAuthority (address indexed authority);
  event SetWhitelister (address indexed whitelister);
  event WhitelistedUser(address indexed target, bool approved);
  event WhitelistedAsset(address indexed asset, bool approved);
  event WhitelistedExchange(address indexed exchange, bool approved);
  event WhitelistedDrago(address indexed drago, bool isWhitelisted);
  event WhitelistedRegistry(address indexed registry, bool approved);
  event NewEventful(address indexed eventful);
  event NewVaultEventful(address indexed exchangeEventful);
  event NewExchangeEventful(address indexed vaultEventful);
  event NewCasper(address indexed casper);

  // MODIFIERS

  modifier only_admin {
    if (msg.sender == owner || isWhitelister(msg.sender)) _;
  }

  modifier only_whitelister { if (isWhitelister(msg.sender)) _; }
  modifier only_authority { if (isAuthority(msg.sender)) _; }

  // CORE CORE FUNCTIONS

  /// @dev Allows the owner to whitelist an authority
  /// @param _authority Address of the authority
  /// @param _isWhitelisted Bool whitelisted
  function setAuthority(address _authority, bool _isWhitelisted)
    public
    only_owner
  {
    accounts[_authority].account = _authority;
    accounts[_authority].authorized = _isWhitelisted;
    accounts[_authority].groups[_isWhitelisted].authority = _isWhitelisted;
    setWhitelister(_authority, _isWhitelisted);
    types.list.push(List(_authority));
    SetAuthority(_authority);
  }

  /// @dev Allows the owner to whitelist a whitelister
  /// @param _whitelister Address of the whitelister
  /// @param _isWhitelisted Bool whitelisted
  function setWhitelister(address _whitelister, bool _isWhitelisted)
    public
    only_owner
  {
    accounts[_whitelister].account = _whitelister;
    accounts[_whitelister].authorized = _isWhitelisted;
    accounts[_whitelister].groups[_isWhitelisted].whitelister = _isWhitelisted;
    types.list.push(List(_whitelister));
    SetWhitelister(_whitelister);
  }

  /// @dev Allows a whitelister to whitelist a user
  /// @param _target Address of the target user
  /// @param _isWhitelisted Bool whitelisted
  function whitelistUser(address _target, bool _isWhitelisted)
    public
    only_whitelister
  {
    accounts[_target].account = _target;
    accounts[_target].authorized = _isWhitelisted;
    accounts[_target].groups[_isWhitelisted].user = _isWhitelisted;
    types.list.push(List(_target));
    WhitelistedUser(_target, _isWhitelisted);
  }

  /// @dev Allows a whitelister to whitelist an asset
  /// @param _asset Address of the token
  /// @param _isWhitelisted Bool whitelisted
  function whitelistAsset(address _asset, bool _isWhitelisted)
    public
    only_whitelister
  {
    accounts[_asset].account = _asset;
    accounts[_asset].authorized = _isWhitelisted;
    accounts[_asset].groups[_isWhitelisted].asset = _isWhitelisted;
    types.list.push(List(_asset));
    WhitelistedAsset(_asset, _isWhitelisted);
  }

  /// @dev Allows a whitelister to whitelist an exchange
  /// @param _exchange Address of the target exchange
  /// @param _isWhitelisted Bool whitelisted
  function whitelistExchange(address _exchange, bool _isWhitelisted)
    public
    only_whitelister
  {
    accounts[_exchange].account = _exchange;
    accounts[_exchange].authorized = _isWhitelisted;
    accounts[_exchange].groups[_isWhitelisted].exchange = _isWhitelisted;
    types.list.push(List(_exchange));
    WhitelistedExchange(_exchange, _isWhitelisted);
  }

  /// @dev Allows an admin to whitelist a drago
  /// @param _drago Address of the target drago
  /// @param _isWhitelisted Bool whitelisted
  function whitelistDrago(address _drago, bool _isWhitelisted)
    public
    only_admin
  {
    accounts[_drago].account = _drago;
    accounts[_drago].authorized = _isWhitelisted;
    accounts[_drago].groups[_isWhitelisted].drago = _isWhitelisted;
    types.list.push(List(_drago));
    WhitelistedDrago(_drago, _isWhitelisted);
  }

  /// @dev Allows an admin to whitelist a vault
  /// @param _vault Address of the target vault
  /// @param _isWhitelisted Bool whitelisted
  function whitelistVault(address _vault, bool _isWhitelisted)
    public
    only_admin
  {
    accounts[_vault].account = _vault;
    accounts[_vault].authorized = _isWhitelisted;
    accounts[_vault].groups[_isWhitelisted].vault = _isWhitelisted;
    types.list.push(List(_vault));
    WhitelistedDrago(_vault, _isWhitelisted);
  }

  /// @dev Allows an admin to whitelist a registry
  /// @param _registry Address of the target registry
  /// @param _isWhitelisted Bool whitelisted
  function whitelistRegistry(address _registry, bool _isWhitelisted)
    public
    only_admin
  {
    accounts[_registry].account = _registry;
    accounts[_registry].authorized = _isWhitelisted;
    accounts[_registry].groups[_isWhitelisted].registry = _isWhitelisted;
    types.list.push(List(_registry));
    WhitelistedRegistry(_registry, _isWhitelisted);
  }

  /// @dev Allows an admin to whitelist a factory
  /// @param _factory Address of the target factory
  /// @param _isWhitelisted Bool whitelisted
  function whitelistFactory(address _factory, bool _isWhitelisted)
    public
    only_admin
  {
    accounts[_factory].account = _factory;
    accounts[_factory].authorized = _isWhitelisted;
    accounts[_factory].groups[_isWhitelisted].registry = _isWhitelisted;
    types.list.push(List(_factory));
    WhitelistedFactory(_factory, _isWhitelisted);
  }

  /// @dev Allows the owner to set the eventful
  /// @param _eventful Address of the logs contract
  function setEventful(address _eventful)
    public
    only_owner
  {
    blocks.eventful = _eventful;
    NewEventful(blocks.eventful);
  }

  /// @dev Allows the owner to set the vault eventful
  /// @param _vaultEventful Address of the vault logs contract
  function setVaultEventful(address _vaultEventful)
    public
    only_owner
  {
    blocks.vaultEventful = _vaultEventful;
    NewVaultEventful(blocks.vaultEventful);
  }

  /// @dev Allows the owner to set the exchange eventful
  /// @param _exchangeEventful Address of the exchange logs contract
  function setExchangeEventful(address _exchangeEventful)
    public
    only_owner
  {
    blocks.exchangeEventful = _exchangeEventful;
    NewExchangeEventful(blocks.exchangeEventful);
  }

  /// @dev Allows the owner to set the casper contract
  /// @param _casper Address of the casper contract
  function setCasper(address _casper)
    public
    only_owner
  {
    blocks.casper = _casper;
    NewCasper(blocks.casper);
  }

  // CONSTANT PUBLIC CORE FUNCTIONS

  /// @dev Provides whether a user is whitelisted
  /// @param _target Address of the target user
  /// @return Bool is whitelisted
  function isWhitelistedUser(address _target)
    public
    constant
    returns (bool)
  {
    return accounts[_target].groups[true].user;
  }

  /// @dev Provides whether an address is whitelister
  /// @param _whitelister Address of the target whitelister
  /// @return Bool is whitelisted
  function isWhitelister(address _whitelister)
    public
    constant
    returns (bool)
  {
    return accounts[_whitelister].groups[true].whitelister;
  }

  /// @dev Provides whether an address is an authority
  /// @param _authority Address of the target authority
  /// @return Bool is whitelisted
  function isAuthority(address _authority)
    public
    constant
    returns (bool)
  {
    return accounts[_authority].groups[true].authority;
  }

  /// @dev Provides whether an asset is whitelisted
  /// @param _asset Address of the target asset
  /// @return Bool is whitelisted
  function isWhitelistedAsset(address _asset)
    public
    constant
    returns (bool)
  {
    return accounts[_asset].groups[true].asset;
  }

  /// @dev Provides whether an exchange is whitelisted
  /// @param _exchange Address of the target exchange
  /// @return Bool is whitelisted
  function isWhitelistedExchange(address _exchange)
    public
    constant
    returns (bool)
  {
    return accounts[_exchange].groups[true].exchange;
  }

  /// @dev Provides whether a drago is whitelisted
  /// @param _drago Address of the target drago
  /// @return Bool is whitelisted
  function isWhitelistedDrago(address _drago)
    public
    constant
    returns (bool)
  {
    return accounts[_drago].groups[true].drago;
  }

  /// @dev Provides whether a vault is whitelisted
  /// @param _vault Address of the target vault
  /// @return Bool is whitelisted
  function isWhitelistedVault(address _vault)
    public
    constant
    returns (bool)
  {
    return accounts[_vault].groups[true].vault;
  }

  /// @dev Provides whether a registry is whitelisted
  /// @param _registry Address of the target registry
  /// @return Bool is whitelisted
  function isWhitelistedRegistry(address _registry)
    public
    constant
    returns (bool)
  {
    return accounts[_registry].groups[true].registry;
  }

  /// @dev Provides whether a factory is whitelisted
  /// @param _factory Address of the target factory
  /// @return Bool is whitelisted
  function isWhitelistedFactory(address _factory)
    public
    constant
    returns (bool)
  {
    return accounts[_factory].groups[true].registry;
  }

  /// @dev Provides the address of the drago logs contract
  /// @return Address of the drago logs contract
  function getEventful() public constant returns (address) {
    return blocks.eventful;
  }

  /// @dev Provides the address of the vault logs contract
  /// @return Address of the vault logs contract
  function getVaultEventful() public constant returns (address) {
    return blocks.vaultEventful;
  }

  /// @dev Provides the address of the exchange logs contract
  /// @return Address of the exchange logs contract
  function getExchangeEventful() public constant returns (address) {
    return blocks.exchangeEventful;
  }

  /// @dev Provides the address of the casper contract
  /// @return Address of the casper contract
  function getCasper() public constant returns (address) {
    return blocks.casper;
  }

  /// @dev Provides an array of addresses for a group
  /// @param _group Address of the group/factory
  /// @return Array of addresses of the pools for a specific group
  function getListsByGroups(string _group)
    public
    constant
    returns (address[])
  {
    return types.mapFromGroup[_group];
  }
}
