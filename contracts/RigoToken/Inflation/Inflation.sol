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

  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeDiv(uint a, uint b) internal returns (uint) {
    assert(b > 0);
    uint c = a / b;
    assert(a == b * c + a % b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function max64(uint64 a, uint64 b) internal constant returns (uint64) {
    return a >= b ? a : b;
  }

  function min64(uint64 a, uint64 b) internal constant returns (uint64) {
    return a < b ? a : b;
  }

  function max256(uint256 a, uint256 b) internal constant returns (uint256) {
    return a >= b ? a : b;
  }

  function min256(uint256 a, uint256 b) internal constant returns (uint256) {
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

contract ERC20 {

  // EVENTS

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  // CORE FUNCTIONS

  function transfer(address _to, uint256 _value) returns (bool success) {}
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}
  function approve(address _spender, uint256 _value) returns (bool success) {}

  // CONSTANT PUBLIC FUNCTIONS

  function totalSupply() constant returns (uint256 totalSupply) {}
  function balanceOf(address _who) constant returns (uint256 balance) {}
  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}
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

/// @title Authority Interface - Allows interaction with the Authority contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Authority {

  // EVENTS

  event SetAuthority (address indexed authority);
  event SetWhitelister (address indexed whitelister);
  event WhitelistedUser(address indexed target, bool approved);
  event WhitelistedAsset(address indexed asset, bool approved);
  event WhitelistedExchange(address indexed exchange, bool approved);
  event WhitelistedRegistry(address indexed registry, bool approved);
  event WhitelistedFactory(address indexed factory, bool approved);
  event WhitelistedVault(address indexed vault, bool approved);
  event WhitelistedDrago(address indexed drago, bool isWhitelisted);
  event NewDragoEventful(address indexed dragoEventful);
  event NewVaultEventful(address indexed exchangeEventful);
  event NewExchangeEventful(address indexed vaultEventful);
  event NewCasper(address indexed casper);

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
  function setDragoEventful(address _dragoEventful) public {}
  function setVaultEventful(address _vaultEventful) public {}
  function setExchangeEventful(address _exchangeEventful) public {}
  function setExchangeAdapter(address _exchange, address _adapter) public {}
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
  function getDragoEventful() public constant returns (address) {}
  function getVaultEventful() public constant returns (address) {}
  function getExchangeEventful() public constant returns (address) {}
  function getCasper() public constant returns (address) {}
  function getOwner() public constant returns (address) {}
  function getExchangeAdapter(address _exchange) public constant returns (address) {}
  function getListsByGroups(string _group) public constant returns (address[]) {}
}

/// @title Inflation Interface - Allows interaction with the Inflation contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract InflationFace {

  // CORE FUNCTIONS

  function mintInflation(address _thePool, uint _reward) external returns (bool) {}
  function setInflationFactor(address _group, uint _inflationFactor) public {}
  function setMinimumRigo(uint _minimum) public {}
  function setRigoblock(address _newRigoblock) public {}
  function setAuthority(address _authority) public {}
  function setProofOfPerformance(address _pop) public {}
  function setPeriod(uint _newPeriod) public {}

  // CONSTANT PUBLIC FUNCTIONS

  function canWithdraw(address _thePool) public constant returns (bool) {}
  function getInflationFactor(address _group) public constant returns (uint) {}
}

/// @title Inflation - Allows ProofOfPerformance to mint tokens.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Inflation is SafeMath {

  address public RIGOTOKENADDRESS;

  uint public period = 12 weeks; //inflation tokens can be minted every 3 months
  uint minimumRigo;
  address public proofOfPerformance;
  address public authority;
  address public rigoblockDao;

  mapping(address => Performer) performers;
  mapping(address => Group) groups;

  struct Performer {
    uint claimedTokens;
    mapping(uint => bool) claim;
    uint startTime;
    uint endTime;
    uint epoch;
  }

  struct Group {
    uint epochReward;
  }

  /// @notice in order to qualify for PoP user has to told minimum rigo token
  modifier minimum_rigoblock(address _ofPool) {
    RigoToken rigoToken = RigoToken(RIGOTOKENADDRESS);
    Pool pool = Pool(_ofPool);
    require(rigoToken.balanceOf(pool.getOwner()) >= minimumRigo);
    _;
  }

  modifier only_rigoblock_dao {
    require(msg.sender == rigoblockDao);
    _;
  }

  modifier only_proof_of_performance {
    require(msg.sender == proofOfPerformance);
    _;
  }

  modifier is_approved_factory(address _factory) {
    Authority auth = Authority(authority);
    require(auth.isWhitelistedFactory(_factory));
    _;
  }

  modifier time_at_least(address _thePool) {
    require(now >= performers[_thePool].endTime); _;
  }

  function Inflation(
    address _rigoTokenAddress,
    address _proofOfPerformance,
    address _authority)
    public
    only_rigoblock_dao
  {
    RIGOTOKENADDRESS = _rigoTokenAddress;
    rigoblockDao = msg.sender;
    proofOfPerformance = _proofOfPerformance;
    authority = _authority;
  }

  // CORE FUNCTIONS

  /// @dev Allows ProofOfPerformance to mint rewards
  /// @param _thePool Address of the target pool
  /// @param _reward Number of reward in Rigo tokens
  /// @return Bool the transaction executed correctly
  function mintInflation(address _thePool, uint _reward)
    external
    only_proof_of_performance
    minimum_rigoblock(_thePool)
    time_at_least(_thePool)
    returns (bool)
  {
    performers[_thePool].startTime = now;
    performers[_thePool].endTime = now + period;
    ++performers[_thePool].epoch;
    uint reward = _reward * 95 / 100; //5% royalty to rigoblock
    uint rigoblockReward = safeSub(_reward, reward);
    Pool pool = Pool(_thePool);
    address poolOwner = pool.getOwner();
    RigoToken rigoToken = RigoToken(RIGOTOKENADDRESS);
    rigoToken.mintToken(poolOwner, reward);
    rigoToken.mintToken(rigoblockDao, rigoblockReward);
    return true;
  }

  /// @dev Allows rigoblock dao to set the inflation factor for a group
  /// @param _group Address of the group/factory
  /// @param _inflationFactor Value of the reward factor
  function setInflationFactor(address _group, uint _inflationFactor)
    public
    only_rigoblock_dao
    is_approved_factory(_group)
  {
    groups[_group].epochReward = _inflationFactor;
  }

  /// @dev Allows rigoblock dao to set the minimum number of required tokens
  /// @param _minimum Number of minimum tokens
  function setMinimumRigo(uint _minimum) public only_rigoblock_dao {
    minimumRigo = _minimum;
  }

  /// @dev Allows rigoblock dao to upgrade its address
  /// @param _newRigoblock Address of the new rigoblock dao
  function setRigoblock(address _newRigoblock) public only_rigoblock_dao {
    rigoblockDao = _newRigoblock;
  }

  /// @dev Allows rigoblock dao to update the authority
  /// @param _authority Address of the authority
  function setAuthority(address _authority) public only_rigoblock_dao {
    authority = _authority;
  }

  /// @dev Allows rigoblock dao to update proof of performance
  /// @param _pop Address of the Proof of Performance contract
  function setProofOfPerformance(address _pop) public only_rigoblock_dao {
    proofOfPerformance = _pop;
  }

  /// @dev Allows rigoblock dao to set the minimum time between reward collection
  /// @param _newPeriod Number of blocks from 2 rewards
  /// @notice set period on shorter subsets of time for testing
  function setPeriod(uint _newPeriod) public only_rigoblock_dao {
    period = _newPeriod;
  }

  // CONSTANT PUBLIC FUNCTIONS

  /// @dev Returns whether a wizard can claim reward tokens
  /// @param _thePool Address of the target pool
  /// @return Bool the wizard can claim
  function canWithdraw(address _thePool) public constant returns (bool) {
    return (now >= performers[_thePool].endTime ? true : false);
  }

  /// @dev Return the reward factor for a group
  /// @param _group Address of the group
  /// @return Value of the reward factor
  function getInflationFactor(address _group) public constant returns (uint) {
    return groups[_group].epochReward;
  }
}
