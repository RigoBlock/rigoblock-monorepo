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

/// @title Vault Eventful Interface - Allows interaction with the Vault Eventful contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultEventfulFace {

  // EVENTS

  event BuyVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes32 name, bytes32 symbol);
  event SellVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes32 name, bytes32 symbol);
  event NewFee(address indexed vault, address indexed from, address indexed to, uint fee);
  event NewCollector(address indexed vault, address indexed from, address indexed to, address collector);
  event VaultDao(address indexed vault, address indexed from, address indexed to, address vaultDao);
  event DepositCasper(address indexed vault, address indexed validator, address indexed casper, address withdrawal, uint amount);
  event WithdrawCasper(address indexed vault, address indexed validator, address indexed casper, uint validatorIndex);
  event VaultCreated(address indexed vault, address indexed group, address indexed owner, uint vaultId, string name, string symbol);

  // CORE FUNCTIONS

  function buyVault(address _who, address _targetVault, uint _value, uint _amount) external returns (bool success) {}
  function sellVault(address _who, address _targetVault, uint _amount, uint _revenue) external returns(bool success) {}
  function changeRatio(address _who, address _targetVault, uint256 _ratio) external returns(bool success) {}
  function setTransactionFee(address _who, address _targetVault, uint _transactionFee) external returns(bool success) {}
  function changeFeeCollector(address _who, address _targetVault, address _feeCollector) external returns(bool success) {}
  function changeVaultDao(address _who, address _targetVault, address _vaultDao) external returns(bool success) {}
  function depositToCasper(address _who, address _targetVault, address _casper, address _validation, address _withdrawal, uint _amount) external returns(bool success) {}
  function withdrawFromCasper(address _who, address _targetVault, address _casper, uint _validatorIndex) external returns(bool success) {}
  function createVault(address _who, address _vaultFactory, address _newVault, string _name, string _symbol, uint _vaultId, address _owner) external returns(bool success) {}
}

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
    bytes32 name,
    bytes32 symbol
  );

  event SellVault(
    address indexed vault,
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 revenue,
    bytes32 name,
    bytes32 symbol
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
    uint _amount)
    external
    approved_vault_only(_targetVault)
    returns (bool success)
  {
		require(msg.sender == _targetVault);
    DragoRegistry registry = DragoRegistry(REGISTRY);
    bytes32 vaultName = registry.getNameFromAddress(_targetVault);
    bytes32 vaultSymbol = registry.getSymbolFromAddress(_targetVault);
    BuyVault(_targetVault, _who, msg.sender, _value, _amount, vaultName, vaultSymbol);
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
    uint _revenue)
    external
    approved_vault_only(_targetVault)
    returns(bool success)
  {
		require(_amount > 0);
    require(msg.sender == _targetVault);
    DragoRegistry registry = DragoRegistry(REGISTRY);
    bytes32 vaultName = registry.getNameFromAddress(_targetVault);
    bytes32 vaultSymbol = registry.getSymbolFromAddress(_targetVault);
    SellVault(_targetVault, _who, msg.sender, _amount, _revenue, vaultName, vaultSymbol);
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
  /// @param _owner Address of the vault wizard
  /// @return Bool the transaction executed successfully
  function createVault(
    address _who,
    address _vaultFactory,
    address _newVault,
    string _name,
    string _symbol,
    uint _vaultId,
    address _owner)
    external
    approved_factory_only(_vaultFactory)
    //approved_user_only(_who) //anyone can create a vault
    returns(bool success)
  {
    require(msg.sender == _vaultFactory);
    VaultCreated(_newVault, _vaultFactory, _owner, _vaultId, _name, _symbol);
    return true;
  }
}
