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

contract SafeMath {

  function safeMul(uint a, uint b) internal pure returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeDiv(uint a, uint b) internal pure returns (uint) {
    assert(b > 0);
    uint c = a / b;
    assert(a == b * c + a % b);
    return c;
  }

  function safeSub(uint a, uint b) internal pure returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal pure returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function max64(uint64 a, uint64 b) internal pure returns (uint64) {
    return a >= b ? a : b;
  }

  function min64(uint64 a, uint64 b) internal pure returns (uint64) {
    return a < b ? a : b;
  }

  function max256(uint256 a, uint256 b) internal pure returns (uint256) {
    return a >= b ? a : b;
  }

  function min256(uint256 a, uint256 b) internal pure returns (uint256) {
    return a < b ? a : b;
  }
}

/// @title Pool Interface - Interface of pool generic view functions.
/// @author Gabriele Rigo - <gab@rigoblock.com>
/// @notice only public view functions are used
contract Pool {

  // CONSTANT PUBLIC FUNCTIONS

	function balanceOf(address _who) constant returns (uint256 balance) {}
	function totalSupply() constant returns (uint256 totalSupply) {}
	function getEventful() constant returns (address) {}
	function getData() constant returns (string name, string symbol, uint sellPrice, uint buyPrice) {}
	function getAdminData() constant returns (address feeCollector, address dragodAO, uint ratio, uint transactionFee, uint32 minPeriod) {}
	function getOwner() constant returns (address) {}
}

/// @title Rigo Token Interface - Allows interaction with the Rigo token.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract RigoToken {

  // EVENTS

  event TokenMinted(address indexed recipient, uint amount);

  // CORE FUNCTIONS

  function mintToken(address _recipient, uint _amount) external {}
  //function transfer(address _recipient, uint _amount) public returns (bool success) {}
  //function transferFrom(address _sender, address _recipient, uint _amount) public returns (bool success) {}
  function changeMintingAddress(address _newAddress) public {}
  function changeRigoblockAddress(address _newAddress) public {}

  // CONSTANT PUBLIC FUNCTIONS

  function balanceOf(address _owner) public constant returns (uint256 balance) {}
  function totalSupply() public constant returns (uint256 totalSupply) {}
  function getName() public constant returns (string) {}
  function getSymbol() public constant returns (string) {}
  function getDecimals() public constant returns (uint) {}
  function getMinter() public constant returns (address) {}
  function getRigoblock() public constant returns (address) {}
  function getInflationFactor(address _group) public constant returns (uint) {}
}

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistry {

  //EVENTS

  event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
  event Unregistered(string indexed symbol, uint indexed id);
  event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

  // CORE FUNCTIONS

  function register(address _drago, string _name, string _symbol, uint _dragoId, address _owner) public payable returns (bool) {}
  function unregister(uint _id) public {}
  function setMeta(uint _id, bytes32 _key, bytes32 _value) public {}
  function addGroup(address _group) public {}
  function setFee(uint _fee) public {}
  function upgrade(address _newAddress) public payable {} //payable as there is a transfer of value, otherwise opcode might throw an error
  function setUpgraded(uint _version) public {}
  function drain() public {}
  function kill() public {}

  function dragoCount() public constant returns (uint) {}
  function fromId(uint _id) public constant returns (address drago, string name, string symbol, uint dragoId, address owner, address group) {}
  function fromAddress(address _drago) public constant returns (uint id, string name, string symbol, uint dragoId, address owner, address group) {}
  function fromSymbol(string _symbol) public constant returns (uint id, address drago, string name, uint dragoId, address owner, address group) {}
  function fromName(string _name) public constant returns (uint id, address drago, string symbol, uint dragoId, address owner, address group) {}
  function fromNameSymbol(string _name, string _symbol) public constant returns (address) {}
  function getNameFromAddress(address _pool) external constant returns (bytes32) {}
  function getSymbolFromAddress(address _pool) external constant returns (bytes32) {}
  function meta(uint _id, bytes32 _key) public constant returns (bytes32) {}
  function getGroups() public constant returns (address[]) {}
  function getFee() public constant returns (uint) {}
}

/// @title Inflation Interface - Allows interaction with the Inflation contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Inflation {

  // CORE FUNCTIONS

  function mintInflation(address _thePool, uint _reward) external returns (bool) {}
  function setInflationFactor(address _group, uint _inflationFactor) public {}
  function setMinimumRigo(uint _minimum) public {}
  function setRigoblock(address _newRigoblock) public {}
  function setAuthority(address _authority) public {}
  function setPeriod(uint _newPeriod) public {}

  // CONSTANT PUBLIC FUNCTIONS

  function canWithdraw(address _thePool) public constant returns (bool) {}
  function getInflationFactor(address _group) public constant returns (uint) {}
}

/// @title Proof of Performance Interface - Allows interaction with the PoP contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract ProofOfPerformanceFace {

  // CORE FUNCTIONS

  function claimPop(uint _ofPool) public {}
  function setRegistry(address _dragoRegistry) external {}
  function setRigoblockDao(address _rigoblockDao) external {}
  function setRatio(address _ofGroup, uint _ratio) public {}
  function setMinimumRigo(uint256 _amount) external {}

  // CONSTANT PUBLIC FUNCTIONS

  function isActive(uint _ofPool) public constant returns (bool) {}
  function addressFromId(uint _ofPool) public constant returns (address pool, address group) {}
  function getPoolPrice(uint _ofPool) public constant returns (uint thePoolPrice, uint totalTokens) {}
  function getPoolPrices() public constant returns (address[] pools, uint[] poolPrices, uint[] totalTokens) {}
  function calcPoolValue(uint256 _ofPool) public /*internal*/ constant returns (uint256 aum, bool success) {}
  function calcNetworkValue() public constant returns (uint networkValue, uint numberOfFunds) {}
  function getEpochReward(uint _ofPool) public constant returns (uint) {}
  function getRatio(uint _ofPool) public constant returns (uint) {}
  function proofOfPerformance(uint _ofPool) public constant returns (uint256) {}
  function getHwm(uint _ofPool) public constant returns (uint) {}
}

contract ProofOfPerformance is SafeMath, ProofOfPerformanceFace {

  address public RIGOTOKENADDRESS;

  address public dragoRegistry;
  address public rigoblockDao;
  uint256 public minimumRigo;
  address inflation;

  mapping (uint => PoolPrice) poolPrice;
  mapping (address => Group) groups;

  struct PoolPrice {
    uint highwatermark;
  }

  struct Group {
    uint rewardRatio;
  }

  modifier only_minter {
    RigoToken token = RigoToken(RIGOTOKENADDRESS);
    require(msg.sender == token.getMinter());
    _;
  }

  modifier only_rigoblock_dao {
    require(msg.sender == rigoblockDao);
    _;
  }

  modifier only_pool_owner(uint _thePool) {
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    address poolAddress;
    (poolAddress, , , , , ) = registry.fromId(_thePool);
    //address drago, string name, string symbol, uint dragoId, address owner, address group
    Pool pool = Pool(poolAddress);
    assert(msg.sender == pool.getOwner());
    _;
  }

  modifier minimum_rigoblock {
    RigoToken rigoToken = RigoToken(RIGOTOKENADDRESS);
    require(rigoToken.balanceOf(msg.sender) >= minimumRigo);
    _;
  }

  function ProofOfPerformance(
    address _rigoTokenAddress,
    address _rigoblockDao,
    address _dragoRegistry,
    address _inflation)
    public
  {
    RIGOTOKENADDRESS = _rigoTokenAddress;
    rigoblockDao = _rigoblockDao;
    dragoRegistry = _dragoRegistry;
    inflation = _inflation;
  }

  // CORE FUNCTIONS

  function claimPop(uint _ofPool) public {
    Inflation infl = Inflation(inflation);
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    address poolAddress;
    (poolAddress, , , , , ) = registry.fromId(_ofPool);
    uint pop = proofOfPerformance(_ofPool);
    uint price;
    uint supply;
    (price, supply) = getPoolPrice(_ofPool);
    poolPrice[_ofPool].highwatermark = price;
    require(infl.mintInflation(poolAddress, pop));
  }

  function setRegistry(address _dragoRegistry) external only_rigoblock_dao {
    dragoRegistry = _dragoRegistry;
  }

  function setRigoblockDao(address _rigoblockDao) external only_rigoblock_dao {
    rigoblockDao = _rigoblockDao;
  }

  function setMinimumRigo(uint256 _amount) external only_rigoblock_dao {
    minimumRigo = _amount;
  }

  /// @notice only_rigoblock_dao can set ratio, as it determines
  /// @notice the split between asset and performance reward for a said group
  function setRatio(address _ofGroup, uint _ratio)
    public
    only_rigoblock_dao
  {
    require(_ratio <= 10000); //(from 0 to 10000)
    groups[_ofGroup].rewardRatio = _ratio;
  }

  // CONSTANT PUBLIC FUNCTIONS

  /// @dev Checks whether a pool is registered and active
  /// @param _ofPool Id of the pool
  /// @return Bool the pool is active
  function isActive(uint _ofPool) public constant returns (bool) {
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    address thePool;
    (thePool, , , , , ) = registry.fromId(_ofPool);
    if (thePool != address(0)) {
      return true;
    }
  }

  /// @dev Returns the address and the group of a pool from its id
  /// @param _ofPool Id of the pool
  /// @return Address of the target pool
  /// @return Address of the pool's group
  function addressFromId(uint _ofPool)
    public
    constant
    returns (
      address pool,
      address group)
  {
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    address thePool;
    address theGroup;
    (thePool, , , , , theGroup) = registry.fromId(_ofPool);
    pool = thePool;
    group = theGroup;
  }

  /// @dev Returns the price a pool from its id
  /// @param _ofPool Id of the pool
  /// @return Price of the pool in wei
  /// @return Number of tokens of a pool (totalSupply)
  function getPoolPrice(uint _ofPool)
    public
    constant
    returns (
      uint thePoolPrice,
      uint totalTokens)
  {
    address fund;
    address group;
    (fund,group) = addressFromId(_ofPool);
    address poolAddress = fund;
    Pool pool = Pool(poolAddress);
    ( , , thePoolPrice, ) = pool.getData();
    totalTokens = pool.totalSupply();
  }

  /// @dev Returns two arrays of prices and total supply
  /// @return Array of addressed of the active pools
  /// @return Array of the prices of the active pools
  /// @return Array of the number of tokens of each pool
  function getPoolPrices()
    public
    constant
    returns (
      address[] pools,
      uint[] poolPrices,
      uint[] totalTokens)
  {
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    uint length = registry.dragoCount();
    for (uint i = 0; i < length; ++i) {
      bool active = isActive(i);
      if (!active) {
        continue;
      }
      address fund;
      address group;
      (fund, group) = addressFromId(i);
      pools[i] = fund;
      Pool pool = Pool(fund);
      uint thePoolPrice;
      ( , , thePoolPrice, ) = pool.getData();
      poolPrices[i] = thePoolPrice;
      totalTokens[i] = pool.totalSupply();
    }
  }

  /// @dev Returns the address and the group of a pool from its id
  /// @param _ofPool Id of the pool
  /// @return Address of the target pool
  /// @return Address of the pool's group
  function calcPoolValue(uint256 _ofPool)
    public
    constant
    returns (
      uint256 aum,
      bool success)
  {
    uint price;
    uint supply;
    (price,supply) = getPoolPrice(_ofPool);
    return (aum = price * supply / 1000000, true); //1000000 is the base (decimals)
  }

  /// @dev Returns the value of the assets in the rigoblock network
  /// @return Value of the rigoblock network in wei
  /// @return Number of active funds
  function calcNetworkValue()
    public
    constant
    returns (
      uint networkValue,
      uint numberOfFunds)
  {
    DragoRegistry registry = DragoRegistry(dragoRegistry);
    uint length = registry.dragoCount();
    for (uint i = 0; i < length; ++i) {
      bool active = isActive(i);
      if (!active) {
        continue;
      }
      uint poolValue;
      (poolValue, ) = calcPoolValue(i);
      networkValue += poolValue;
    }
    return (networkValue, length);
  }

  /// @dev Returns the reward factor for a pool
  /// @param _ofPool Id of the pool
  /// @return Value of the reward factor
  function getEpochReward(uint _ofPool) public constant returns (uint) {
    Inflation inflate = Inflation(inflation);
    address fund;
    address group;
    (fund,group) = addressFromId(_ofPool);
    return inflate.getInflationFactor(group);
  }

  /// @dev Returns the split ratio of asset and performance reward
  /// @param _ofPool Id of the pool
  /// @return Value of the ratio from 1 to 100
  function getRatio(uint _ofPool) public constant returns (uint) {
    address fund;
    address group;
    (fund,group) = addressFromId(_ofPool);
    return groups[group].rewardRatio;
  }

  /// @dev Returns the proof of performance reward for a pool
  /// @param _ofPool Id of the pool
  /// @return Value of the reward in Rigo tokens
  /// @notice epoch reward should be big enough that it
  /// @notice can be decreased if number of funds increases
  /// @notice should be at least 10^6 (just as pool base) to start with
  /// @notice rigo token has 10^18 decimals
  function proofOfPerformance(uint _ofPool) public constant returns (uint256) {
    uint highwatermark;
    if (poolPrice[_ofPool].highwatermark == 0) {
      highwatermark = 1 ether;
    } else {
      highwatermark = poolPrice[_ofPool].highwatermark;
    }
    uint poolValue;
    (poolValue, ) = calcPoolValue(_ofPool);
    require(poolValue != 0);
    uint newPrice;
    uint tokenSupply;
    (newPrice, tokenSupply) = getPoolPrice(_ofPool);
    require (newPrice >= highwatermark);
    uint epochReward = getEpochReward(_ofPool);
    uint rewardRatio = getRatio(_ofPool);
    uint prevPrice = highwatermark;
    uint priceDiff = safeSub(newPrice, prevPrice);
    uint performanceReward = priceDiff * tokenSupply * epochReward * rewardRatio / 10000 ether;
    uint assetsReward = poolValue * epochReward * (10000 - rewardRatio) / 10000 ether;
    return performanceReward + assetsReward;
  }

  /// @dev Returns the highwatermark of a pool
  /// @param _ofPool Id of the pool
  /// @return Value of the all-time-high pool nav
  function getHwm(uint _ofPool) public constant returns (uint) {
    return poolPrice[_ofPool].highwatermark;
  }
}
