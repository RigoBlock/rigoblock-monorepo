//! the Drago Registry contract.
//!
//! Copyright 2017-2018 Gabriele Rigo, RigoBlock, Rigo Investment Sagl.
//!
//! Licensed under the Apache License, Version 2.0 (the "License");
//! you may not use this file except in compliance with the License.
//! You may obtain a copy of the License at
//!
//!     http://www.apache.org/licenses/LICENSE-2.0
//!
//! Unless required by applicable law or agreed to in writing, software
//! distributed under the License is distributed on an "AS IS" BASIS,
//! WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//! See the License for the specific language governing permissions and
//! limitations under the License.
//!
//! Inspired by https://github.com/paritytech/contracts/blob/master/TokenReg.sol

pragma solidity ^0.4.19;

contract Owned {

	modifier only_owner { require(msg.sender == owner); _; }

	event NewOwner(address indexed old, address indexed current);

	function setOwner(address _new) public only_owner {
		owner = _new;
		NewOwner(owner, _new);
	}

	function getOwner() public constant returns (address) {
	    return owner;
	}

	address public owner = msg.sender;
}

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
  event WhitelistedGabcoin(address indexed gabcoin, bool approved);
  event WhitelistedDrago(address indexed drago, bool approved);
  event NewEventful(address indexed eventful);

  // METHODS

  function setAuthority(address _authority, bool _isWhitelisted) public {}
  function setWhitelister(address _whitelister, bool _isWhitelisted) public {}
  function whitelistUser(address _target, bool _isWhitelisted) public {}
  function whitelistAsset(address _asset, bool _isWhitelisted) public {}
  function whitelistExchange(address _exchange, bool _isWhitelisted) public {}
  function whitelistDrago(address _drago, bool _isWhitelisted) public {}
  function whitelistGabcoin(address _gabcoin, bool _isWhitelisted) public {}
  function whitelistRegistry(address _registry, bool _isWhitelisted) public {}
  function whitelistFactory(address _factory, bool _isWhitelisted) public {}
  function setEventful(address _eventful) public {}
  function setGabcoinEventful(address _gabcoinEventful) public {}
  function setExchangeEventful(address _exchangeEventful) public {}
  function setCasper(address _casper) public {}

  function isWhitelistedUser(address _target) public constant returns (bool) {}
  function isWhitelister(address _whitelister) public constant returns (bool) {}
  function isAuthority(address _authority) public constant returns (bool) {}
  function isWhitelistedAsset(address _asset) public constant returns (bool) {}
  function isWhitelistedExchange(address _exchange) public constant returns (bool) {}
  function isWhitelistedRegistry(address _registry) public constant returns (bool) {}
  function isWhitelistedDrago(address _drago) public constant returns (bool) {}
  function isWhitelistedGabcoin(address _gabcoin) public constant returns (bool) {}
  function isWhitelistedFactory(address _factory) public constant returns (bool) {}
  function getEventful() public constant returns (address) {}
  function getGabcoinEventful() public constant returns (address) {}
  function getExchangeEventful() public constant returns (address) {}
  function getCasper() public constant returns (address) {}
  function getOwner() public constant returns (address) {}
  function getListsByGroups(string _group) public constant returns (address[]) {}
}

contract DragoRegistryFace {

	//EVENTS

	event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
	event Unregistered(string indexed symbol, uint indexed id);
	event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

	// METHODS

	function register(address _drago, string _name, string _symbol, uint _dragoID, address _owner) public payable returns (bool) {}
	function registerAs(address _drago, string _name, string _symbol, uint _dragoID, address _owner, address _group) public payable returns (bool) {}
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

contract DragoRegistry is DragoRegistryFace, Owned {

  address public constant AUTHORITY;
  uint public constant VERSION;

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

	// METHODS

	function DragoRegistry(address _authority) public {
	  AUTHORITY = _authority;
	}

	function register(
    address _drago,
    string _name,
    string _symbol,
    uint _dragoID,
    address _owner)
    public
    payable
    only_authority
    returns (bool)
  {
		return registerAs(_drago, _name, _symbol, _dragoID, _owner, msg.sender);
	}

	function registerAs(
    address _drago,
    string _name,
    string _symbol,
    uint _dragoID,
    address _owner,
    address _group)
    public
    payable
	  only_authority
	  when_fee_paid
	  when_address_free(_drago)
	  when_name_free(_name)
	  when_is_symbol(_symbol)
	  returns (bool)
	{
		dragos.push(Drago(_drago, _name, _symbol, _dragoID, _owner, _group));
		mapFromAddress[_drago] = dragos.length;
		mapFromName[_name] = dragos.length;
		mapFromSymbol[_symbol] = dragos.length;
		Registered(_name, _symbol, dragos.length - 1, _drago, _owner, _group);
		return true;
	}

	function unregister(uint _id) public only_owner {
		Unregistered(dragos[_id].name, dragos[_id].symbol, _id);
		delete mapFromAddress[dragos[_id].drago];
		delete mapFromName[dragos[_id].name];
		delete mapFromSymbol[dragos[_id].symbol];
		delete dragos[_id];
	}

	function setMeta(uint _id, bytes32 _key, bytes32 _value)
    public
    only_drago_owner(_id)
  {
		dragos[_id].meta[_key] = _value;
		MetaChanged(_id, _key, _value);
	}

  function addGroup(address _group)
    public
    only_owner
  {
  	groups.push(_group);
  }

	function setFee(uint _fee) public only_owner {
		fee = _fee;
	}

	//watch out, when the registry gets upgraded, a migration of all funds has to be performed
	function upgrade(address _newAddress) public payable only_owner {
		DragoRegistry registry = DragoRegistry(_newAddress);
		++VERSION;
		registry.setUpgraded(VERSION);
		address(registry).transfer(this.balance);
	}

	function setUpgraded(uint _version) public only_owner {
    	VERSION = _version;
  	}

	function drain() public only_owner {
		msg.sender.transfer(this.balance);
	}

	function kill() public only_owner {
	    selfdestruct(msg.sender);
	}

	// CONSTANT METHODS

	function dragoCount() public constant returns (uint) {
	    return dragos.length;
	}

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
		var t = dragos[_id];
		drago = t.drago;
		name = t.name;
		symbol = t.symbol;
		dragoID = t.dragoID;
		owner = t.owner;
		group = t.group;
	}

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
		var t = dragos[id];
		name = t.name;
		symbol = t.symbol;
		dragoID = t.dragoID;
		owner = t.owner;
		group = t.group;
	}

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
		var t = dragos[id];
		drago = t.drago;
		name = t.name;
		dragoID = t.dragoID;
		owner = t.owner;
		group = t.group;
	}

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
		var t = dragos[id];
		symbol = t.symbol;
		drago = t.drago;
		dragoID = t.dragoID;
		owner = t.owner;
		group = t.group;
	}

	function fromNameSymbol(string _name, string _symbol)
    public
    constant
    returns (address)
  {
	  var id = mapFromName[_name] - 1;
	  var idCheck = mapFromSymbol[_symbol] - 1;
	  var t = dragos[id];
	  require(id == idCheck);
	  address drago = t.drago;
	  return drago;
	}

	function getNameFromAddress(address _pool)
    external
    constant
    returns (bytes32)
  {
	  var id = mapFromAddress[_pool] - 1;
		var t = dragos[id];
		return keccak256(t.name);
	}

  function getSymbolFromAddress(address _pool)
    external
    constant
    returns (bytes32)
  {
    var id = mapFromAddress[_pool] - 1;
		var t = dragos[id];
		return keccak256(t.symbol);
  }

	function meta(uint _id, bytes32 _key)
    public
    constant
    returns (bytes32)
  {
		return dragos[_id].meta[_key];
	}

  function getGroups()
    public
    constant
    returns (address[])
  {
	  return groups;
	}

	function getFee() public constant returns (uint) {
	    return fee;
	}
}
