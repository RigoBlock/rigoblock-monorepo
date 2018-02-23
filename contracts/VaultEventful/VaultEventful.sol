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

/// @title Vault Interface - Allows interaction with the Vault contracts.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Vault {

  // EVENTS

  event Buy(address indexed from, address indexed to, uint256 indexed amount, uint256 revenue);
  event Sell(address indexed from, address indexed to, uint256 indexed amount,uint256 revenue);
  event DepositCasper(uint amount, address indexed who, address indexed validation, address indexed withdrawal);
  event WithdrawCasper(uint deposit, address indexed who, address casper);

  // CORE FUNCTIONS

  function() external payable {}
  function buyVault() public payable returns (bool success) {}
  function buyVaultOnBehalf(address _hodler) public payable returns (bool success) {}
  function sellVault(uint256 amount) public returns (bool success) {}
  function depositCasper(address _validation, address _withdrawal, uint _amount) public returns (bool success) {}
  function withdrawCasper(uint128 _validatorIndex) public {}
  function changeRatio(uint256 _ratio) public {}
  function setTransactionFee(uint _transactionFee) public {}
  function changeFeeCollector(address _feeCollector) public {}
  function changeVaultDao(address _vaultDao) public {}
  function updatePrice() public {}
  function changeMinPeriod(uint32 _minPeriod) public {}

  function balanceOf(address _who) public view returns (uint) {}
  function getEventful() public view returns (address) {}
  function getData() public view returns (string name, string symbol, uint sellPrice, uint buyPrice) {}
  function getAdminData() public view returns (address feeCollector, address vaultDao, uint ratio, uint transactionFee, uint32 minPeriod) {}
  function getOwner() public view returns (address) {}
  function totalSupply() public view returns (uint256) {}
  function getCasper() public view returns (address) {}
  function getCasperDeposit() public view returns (uint128) {}
  function getNav() public view returns (uint) {}
  function getVersion() public view returns (string) {}
}

/// @title Authority Interface - Allows interaction with the Authority contract.
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

contract VaultEventfulFace {

  // EVENTS

  event BuyVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue);
  event SellVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue);
  event NewFee(address indexed vault, address indexed from, address indexed to, uint fee);
  event NewCollector(address indexed vault, address indexed from, address indexed to, address collector);
  event VaultDao(address indexed vault, address indexed from, address indexed to, address vaultDao);
  event DepositCasper(address indexed vault, address indexed validator, address indexed casper, address withdrawal, uint amount);
  event WithdrawCasper(address indexed vault, address indexed validator, address indexed casper, uint validatorIndex);
  event VaultCreated(address indexed vault, address indexed group, address indexed owner, uint vaultId, string name, string symbol);

  // CORE FUNCTIONS

  function buyVault(address _who, address _targetVault, uint _value, uint _amount) returns (bool success) {}
  function sellVault(address _who, address _targetVault, uint _amount, uint _revenue) returns(bool success) {}
  function changeRatio(address _who, address _targetVault, uint256 _ratio) returns(bool success) {}
  function setTransactionFee(address _who, address _targetVault, uint _transactionFee) returns(bool success) {}
  function changeFeeCollector(address _who, address _targetVault, address _feeCollector) returns(bool success) {}
  function changeVaultDao(address _who, address _targetVault, address _vaultDao) returns(bool success) {}
  function depositToCasper(address _who, address _targetVault, address _casper, address _validation, address _withdrawal, uint _amount) returns(bool success) {}
  function withdrawFromCasper(address _who, address _targetVault, address _casper, uint _validatorIndex) returns(bool success) {}
  function createVault(address _who, address _vaultFactory, address _newVault, string _name, string _symbol, uint _vaultId, address _owner) returns(bool success) {}
}

contract VaultEventful is VaultEventfulFace {

  address public AUTHORITY;
  string constant public version = 'DH 0.4.1';

  event BuyVault(
    address indexed vault,
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 revenue
  );

  event SellVault(
    address indexed vault,
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 revenue
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

  function VaultEventful(address _authority) {
    AUTHORITY = _authority;
  }

  function buyVault(
    address _who,
    address _targetVault,
    uint _value,
    uint _amount)
    approved_vault_only(_targetVault)
    returns (bool success)
  {
		require(msg.sender == _targetVault);
		BuyVault(_targetVault, _who, msg.sender, _value, _amount);
		return true;
	}

	function sellVault(
    address _who,
    address _targetVault,
    uint _amount,
    uint _revenue)
    approved_vault_only(_targetVault)
    returns(bool success)
  {
		require(_amount > 0);
    require(msg.sender == _targetVault);
		SellVault(_targetVault, _who, msg.sender, _amount, _revenue);
		return true;
	}

	function setTransactionFee(
    address _who,
    address _targetVault,
    uint _transactionFee)
    approved_vault_only(_targetVault)
    approved_user_only(_who)
    returns(bool success)
  {
		require(msg.sender == _targetVault);
		NewFee(_targetVault, msg.sender, _who, _transactionFee);
		return true;
	}

	function changeFeeCollector(
    address _who,
    address _targetVault,
    address _feeCollector)
    approved_vault_only(_targetVault)
    approved_user_only(_who)
    returns(bool success)
  {
		require(msg.sender == _targetVault);
		NewCollector(_targetVault, msg.sender, _who, _feeCollector);
		return true;
	}

	function changeVaultDao(
    address _who,
    address _targetVault,
    address _vaultDao)
    approved_vault_only(_targetVault)
    approved_user_only(_who)
    returns(bool success)
  {
    require(msg.sender == _targetVault);
    VaultDao(_targetVault, msg.sender, _who, _vaultDao);
    return true;
  }

  function depositToCasper(
    address _who,
    address _targetVault,
    address _casper,
    address _validation,
    address _withdrawal,
    uint _amount)
    approved_vault_only(_targetVault)
    approved_user_only(_who)
    returns(bool success)
  {
    require(msg.sender == _targetVault);
    DepositCasper(_targetVault, _validation, _casper, _withdrawal, _amount);
    return true;
  }

  function withdrawFromCasper(
    address _who,
    address _targetVault,
    address _casper,
    uint _validatorIndex)
    approved_vault_only(_targetVault)
    approved_user_only(_who)
    returns(bool success)
  {
    require(msg.sender == _targetVault);
    WithdrawCasper(_targetVault, _who, _casper, _validatorIndex);
    return true;
  }

  function createVault(
    address _who,
    address _vaultFactory,
    address _newVault,
    string _name,
    string _symbol,
    uint _vaultId,
    address _owner)
    approved_factory_only(_vaultFactory)
    returns(bool success)
  {
    require(msg.sender == _vaultFactory);
    VaultCreated(_newVault, _vaultFactory, _owner, _vaultId, _name, _symbol);
    return true;
  }
}
