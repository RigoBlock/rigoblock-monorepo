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

pragma solidity ^0.4.21;
pragma experimental "v0.5.0";

/// @dev no setting of owner as msg.sender at deploy
/// @dev otherwise cannot set owner from factory
contract Owned {

  modifier onlyOwner { require(msg.sender == owner); _; }

  event NewOwner(address indexed old, address indexed current);

  function setOwner(address _new) public onlyOwner {
    owner = _new;
    NewOwner(owner, _new);
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  address public owner;
}

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
}

contract ERC20Face {

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  function transfer(address _to, uint256 _value) public returns (bool success) {}
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {}
  function approve(address _spender, uint256 _value) public returns (bool success) {}

  function totalSupply() public view returns (uint256 total) {}
  function balanceOf(address _who) public view returns (uint256 balance) {}
  function allowance(address _owner, address _spender) public view returns (uint256 remaining) {}
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

  function isWhitelistedUser(address _target) public view returns (bool) {}
  function isWhitelister(address _whitelister) public view returns (bool) {}
  function isAuthority(address _authority) public view returns (bool) {}
  function isWhitelistedAsset(address _asset) public view returns (bool) {}
  function isWhitelistedExchange(address _exchange) public view returns (bool) {}
  function isWhitelistedRegistry(address _registry) public view returns (bool) {}
  function isWhitelistedDrago(address _drago) public view returns (bool) {}
  function isWhitelistedVault(address _vault) public view returns (bool) {}
  function isWhitelistedFactory(address _factory) public view returns (bool) {}
  function getDragoEventful() public view returns (address) {}
  function getVaultEventful() public view returns (address) {}
  function getExchangeEventful() public view returns (address) {}
  function getCasper() public view returns (address) {}
  function getOwner() public view returns (address) {}
  function getExchangeAdapter(address _exchange) public view returns (address) {}
  function getListsByGroups(string _group) public view returns (address[]) {}
}

/// @title Drago Eventful Interface contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoEventful {

  // EVENTS

  event BuyDrago(address indexed drago, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes32 name, bytes32 symbol);
  event SellDrago(address indexed drago, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes32 name, bytes32 symbol);
  event NewNAV(address indexed drago, address indexed from, address indexed to, uint sellPrice, uint buyPrice);
  event DepositExchange(address indexed drago, address indexed exchange, address indexed token, uint value, uint256 amount);
  event WithdrawExchange(address indexed drago, address indexed exchange, address indexed token, uint value, uint256 amount);
  event OrderExchange(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint revenue);
  event TradeExchange(address indexed drago, address indexed exchange, address tokenGet, address tokenGive, uint amountGet, uint amountGive, address get, address give);
  event CancelOrder(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint id);
  event FinalizeDeal(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint id);
  event DragoCreated(address indexed drago, address indexed group, address indexed owner, uint dragoId, string name, string symbol);

  // CORE FUNCTIONS

  function buyDrago(address _who, address _targetDrago, uint _value, uint _amount) external returns (bool success) {}
  function sellDrago(address _who, address _targetDrago, uint _amount, uint _revenue) external returns(bool success) {}
  function setDragoPrice(address _who, address _targetDrago, uint _sellPrice, uint _buyPrice) external returns(bool success) {}
  function changeRatio(address _who, address _targetDrago, uint256 _ratio) external returns(bool success) {}
  function setTransactionFee(address _who, address _targetDrago, uint _transactionFee) external returns(bool success) {}
  function changeFeeCollector(address _who, address _targetDrago, address _feeCollector) external returns(bool success) {}
  function changeDragoDao(address _who, address _targetDrago, address _dragoDao) external returns(bool success) {}
  function depositToExchange(address _who, address _targetDrago, address _exchange, address _token, uint256 _value) external returns(bool success) {}
  function withdrawFromExchange(address _who, address _targetDrago, address _exchange, address _token, uint256 _value) external returns(bool success) {}
  function placeOrderExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires) external returns(bool success) {}
  function placeTradeExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires, address _user, uint _amount) external returns(bool success) {}
  function placeOrderCFDExchange(address _who, address _targetDrago, address _cfdExchange, address _cfd, bool _is_stable, uint32 _adjustment, uint128 _stake) external returns(bool success) {}
  function cancelOrderExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires) external returns(bool success) {}
  function cancelOrderCFDExchange(address _who, address _targetDrago, address _cfdExchange, address _cfd, uint32 _id) external returns(bool success) {}
  function finalizedDealExchange(address _who, address _targetDrago, address _exchange, address _cfd, uint24 _id) external returns(bool success) {}
  function createDrago(address _who, address _dragoFactory, address _newDrago, string _name, string _symbol, uint _dragoId, address _owner) external returns(bool success) {}
}

/// @title Exchange Adapter - Allows interaction with decentralized exchanges.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract ExchangeAdapter {

  // CORE FUNCTIONS

  function depositToExchange(
    address _exchange,
    address _token,
    uint _value)
    external {}

  function withdrawFromExchange(
    address _exchange,
    address _token,
    uint _value)
    external {}

  function placeOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    external {}

  function placeTradeExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    external {}

  function cancelOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    external {}

  function finalizeDeal(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    external {}

  // CONSTANT PUBLIC FUNCTIONS

  /// @notice the below functions have to be checked
  /// @notice they are read functions from the exchange, could be queried directly
  function balanceOf(address token, address user) public view returns (uint) {}
  function balanceOf(address _who) public view returns (uint) {}
  function marginOf(address _who) public view returns (uint) {}
  function availableVolume(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, address user) public view returns(uint) {}
  function amountFilled(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, address user) public view returns(uint) {}
  function getLastOrderId() public view returns (uint) {}
  function isActive(uint id) public view returns (bool) {}
  function getOwner(uint id) public view returns (address) {}
  function getOrder(uint id) public view returns (uint, ERC20Face, uint, ERC20Face) {}
}

/// @title Drago Exchange Extention - library to extend drago to exchange adapters.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library DragoExchangeExtension {

  struct Admin {
    address authority;
    address dragoDao;
    address feeCollector;
    uint minOrder; // minimum stake to avoid dust clogging things up
    uint ratio; //ratio is 80%
  }

  function depositToExchange(Admin memory admin, address _exchange, address _token, uint _value)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.depositToExchange(_exchange, _token, _value);
  }

  function withdrawFromExchange(Admin memory admin, address _exchange, address _token, uint _value)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.withdrawFromExchange(_exchange, _token, _value);
  }

  function placeOrderExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.placeOrderExchange(_exchange, orderAddresses, orderValues, fillTakerTokenAmount, stableOrSufficient, v, signature);
  }

  function placeTradeExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.placeTradeExchange(_exchange, orderAddresses, orderValues, fillTakerTokenAmount, stableOrSufficient, v, signature);
  }

  function cancelOrderExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.cancelOrderExchange(_exchange, orderAddresses, orderValues, cancelTakerTokenAmount);
  }

  function finalizeDeal(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.finalizeDeal(_exchange, orderAddresses, orderValues, cancelTakerTokenAmount);
  }

  function getExchangeAdapter(Admin memory admin, address _exchange)
    internal
    view
    returns (address)
  {
    Authority auth = Authority(admin.authority);
    return auth.getExchangeAdapter(_exchange);
  }

  function getDragoEventful(Admin memory admin) internal view returns (address) {
    Authority auth = Authority(admin.authority);
    return auth.getDragoEventful();
  }
}

/// @title Drago Interface - Allows interaction with the Drago contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoFace {

  // CORE FUNCTIONS

  function buyDrago() public payable returns (bool success) {}
  function sellDrago(uint _amount) public returns (bool success) {}
  function setPrices(uint _newSellPrice, uint _newBuyPrice)  public {}
  function changeMinPeriod(uint32 _minPeriod) public {}
  function changeRatio(uint _ratio) public {}
  function setTransactionFee(uint _transactionFee) public {}
  function changeFeeCollector(address _feeCollector) public {}
  function changeDragoDao(address _dragoDao) public {}
  function depositToExchange(address _exchange, address _token, uint _value) public {}
  function withdrawFromExchange(address _exchange, address _token, uint _value) public {}

  function placeOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    public {}

  function placeTradeExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    public {}

  function cancelOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    public {}

  function finalizeDeal(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    public {}

  function setOwner(address _new) public {}
  function() external payable {}

  // PUBLIC CONSTANT FUNCTIONS

  function balanceOf(address _who) public view returns (uint) {}
  function getDragoEventful() public view returns (address) {}
  function getData() public view returns (string name, string symbol, uint sellPrice, uint buyPrice) {}
  function getAdminData() public view returns (address feeCollector, address dragodAO, uint ratio, uint transactionFee, uint32 minPeriod) {}
  function getOwner() public view returns (address) {}
  function totalSupply() public view returns (uint256) {}
}

/// @title Drago - A set of rules for a drago.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Drago is Owned, ERC20Face, SafeMath, DragoFace {

  using DragoExchangeExtension for *;
  DragoExchangeExtension.Admin libraryAdmin;

  string constant VERSION = 'HF 0.4.1';
  uint constant BASE = 1000000; // tokens are divisible by 1 million

  mapping (address => Account) accounts;

  DragoData data;
  Admin admin;

  struct Receipt {
    uint units;
    uint32 activation;
  }

  struct Account {
    uint balance;
    Receipt receipt;
    mapping(address => address[]) approvedAccount;
  }

  struct DragoData {
    string name;
    string symbol;
    uint dragoId;
    uint totalSupply;
    uint sellPrice;
    uint buyPrice;
    uint transactionFee; //in basis points 1 = 0.01%
    uint32 minPeriod;
  }

  struct Admin {
    address authority;
    address dragoDao;
    address feeCollector;
    uint minOrder; // minimum stake to avoid dust clogging things up
    uint ratio; //ratio is 80%
  }

  modifier onlyDragoDao {
    require(msg.sender == admin.dragoDao);
    _;
  }

  modifier onlyOwnerOrAuthority {
    Authority auth = Authority(admin.authority);
    require(auth.isAuthority(msg.sender) || msg.sender == owner);
    _;
  }

  modifier whenApprovedExchange(address _exchange) {
    Authority auth = Authority(admin.authority);
    require(auth.isWhitelistedExchange(_exchange));
    _;
  }

  modifier minimumStake(uint amount) {
    require (amount >= admin.minOrder);
    _;
  }

  modifier hasEnough(uint _amount) {
    require(accounts[msg.sender].balance >= _amount);
    _;
  }

  modifier positiveAmount(uint _amount) {
    require(accounts[msg.sender].balance + _amount > accounts[msg.sender].balance);
    _;
  }

  modifier minimumPeriodPast {
    require(block.timestamp >= accounts[msg.sender].receipt.activation);
    _;
  }

  modifier buyPriceHigherOrEqual(uint _sellPrice, uint _buyPrice) {
    require(_sellPrice <= _buyPrice);
    _;
  }

  modifier notPriceError(uint _sellPrice, uint _buyPrice) {
    if (_sellPrice <= data.sellPrice / 10 || _buyPrice >= data.buyPrice * 10) return;
    _;
  }

  event Buy(
    address indexed from,
    address indexed to,
    uint indexed _amount,
    uint _revenue
  );

  event Sell(
    address indexed from,
    address indexed to,
    uint indexed _amount,
    uint _revenue
  );

  function Drago(
    string _dragoName,
    string _dragoSymbol,
    uint _dragoId,
    address _owner,
    address _authority)
    public
  {
    data.name = _dragoName;
    data.symbol = _dragoSymbol;
    data.dragoId = _dragoId;
    data.sellPrice = 1 ether;
    data.buyPrice = 1 ether;
    owner = _owner;
    admin.authority = _authority;
    admin.dragoDao = msg.sender;
    admin.minOrder = 100 finney;
    admin.feeCollector = _owner;
    admin.ratio = 80;
  }

  // CORE FUNCTIONS

  /// @dev Allows a user to buy into a drago
  /// @return Bool the function executed correctly
  function buyDrago()
    public
    payable
    returns (bool success)
  {
    require(buyDragoOnBehalf(msg.sender));
    return true;
  }

  /// @dev Allows a user to buy into a drago on behalf of an address
  /// @param _hodler Address of the target user
  /// @return Bool the function executed correctly
  function buyDragoOnBehalf(address _hodler)
    public
    payable
    minimumStake(msg.value)
    returns (bool success)
  {
    var (grossAmount, feeDrago, feeDragoDao, amount) = getPurchaseAmounts();
    addPurchaseLog(amount);
    allocateTokens(_hodler, amount, feeDrago, feeDragoDao);
    data.totalSupply = safeAdd(data.totalSupply, grossAmount);
    Buy(msg.sender, this, msg.value, amount);
    return true;
  }

  /// @dev Allows a user to sell from a drago
  /// @param _amount Number of shares to sell
  /// @return Bool the function executed correctly
  function sellDrago(uint256 _amount)
    public
    hasEnough(_amount)
    positiveAmount(_amount)
    minimumPeriodPast
    returns (bool success)
  {
    var(fee_drago, fee_dragoDao, net_amount, net_revenue) = getSaleAmounts(_amount);
    addSaleLog(_amount, net_revenue);
    allocateTokens(msg.sender, _amount, fee_drago, fee_dragoDao);
    data.totalSupply = safeSub(data.totalSupply, net_amount);
    msg.sender.transfer(net_revenue);
    Sell(this, msg.sender, _amount, net_revenue);
    return true;
  }

  /// @dev Allows drago owner or authority to set the price for a drago
  /// @param _newSellPrice Price in wei
  /// @param _newBuyPrice Price in wei
  function setPrices(uint _newSellPrice, uint _newBuyPrice)
    public
    onlyOwnerOrAuthority
    buyPriceHigherOrEqual(_newSellPrice, _newBuyPrice)
    notPriceError(_newSellPrice, _newBuyPrice)
  {
    DragoEventful events = DragoEventful(getDragoEventful());
    require(events.setDragoPrice(msg.sender, this, _newSellPrice, _newBuyPrice));
    data.sellPrice = _newSellPrice;
    data.buyPrice = _newBuyPrice;
  }

  /// @dev Allows drago dao/factory to change fee split ratio
  /// @param _ratio Number of ratio for wizard, from 0 to 100
  function changeRatio(uint _ratio) public onlyDragoDao {
    DragoEventful events = DragoEventful(getDragoEventful());
    require(events.changeRatio(msg.sender, this, _ratio));
    admin.ratio = _ratio;
  }

  /// @dev Allows drago owner to set the transaction fee
  /// @param _transactionFee Value of the transaction fee in basis points
  function setTransactionFee(uint _transactionFee) public onlyOwner {
    require(_transactionFee <= 100); //fee cannot be higher than 1%
    DragoEventful events = DragoEventful(getDragoEventful());
    require(events.setTransactionFee(msg.sender, this, _transactionFee));
    data.transactionFee = _transactionFee;
  }

  /// @dev Allows owner to decide where to receive the fee
  /// @param _feeCollector Address of the fee receiver
  function changeFeeCollector(address _feeCollector) public onlyOwner {
    DragoEventful events = DragoEventful(getDragoEventful());
    events.changeFeeCollector(msg.sender, this, _feeCollector);
    admin.feeCollector = _feeCollector;
  }

  /// @dev Allows drago dao/factory to upgrade its address
  /// @param _dragoDao Address of the new drago dao
  function changeDragoDao(address _dragoDao) public onlyDragoDao {
    DragoEventful events = DragoEventful(getDragoEventful());
    require(events.changeDragoDao(msg.sender, this, _dragoDao));
    admin.dragoDao = _dragoDao;
  }

  /// @dev Allows drago dao/factory to change the minimum holding period
  /// @param _minPeriod Number of blocks
  function changeMinPeriod(uint32 _minPeriod) public onlyDragoDao {
    data.minPeriod = _minPeriod;
  }

  /// @dev Allows drago owner to deposit to an exchange
  /// @param _exchange Address of the exchange
  /// @param _token Address of the deposited token (null for eth)
  /// @param _value Number of tokens deposited (0 for eth)
  function depositToExchange(address _exchange, address _token, uint _value)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.depositToExchange(
        libraryAdmin,
        _exchange,
        _token,
        _value
    );
  }

  /// @dev Allows drago owner to withdraw from an exchange
  /// @param _exchange Address of the exchange
  /// @param _token Address of the withdrawn token (null for eth)
  /// @param _value Number of tokens deposited (0 for eth)
  function withdrawFromExchange(address _exchange, address _token, uint _value)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.withdrawFromExchange(
        libraryAdmin,
        _exchange,
        _token,
        _value
    );
  }

  /// @dev Allows drago owner to place an order on an exchange
  /// @param _exchange Address of the exchange
  /// @param orderAddresses Array of order's maker, taker, makerToken, takerToken, and feeRecipient.
  /// @param orderValues Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt.
  /// @param fillTakerTokenAmount Desired amount of takerToken to fill.
  /// @param stableOrSufficient Test if transfer will fail before attempting.
  /// @param v ECDSA signature parameter v.
  /// @param signature Array of ECDSA signature parameters r, s.
  function placeOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.placeOrderExchange(
        libraryAdmin,
        _exchange,
        orderAddresses,
        orderValues,
        fillTakerTokenAmount,
        stableOrSufficient,
        v,
        signature
    );
  }

  /// @dev Allows drago owner to execute a trade on an exchange
  /// @param _exchange Address of the exchange
  /// @param orderAddresses Array of order's maker, taker, makerToken, takerToken, and feeRecipient.
  /// @param orderValues Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt.
  /// @param fillTakerTokenAmount Desired amount of takerToken to fill.
  /// @param stableOrSufficient Test if transfer will fail before attempting.
  /// @param v ECDSA signature parameter v.
  /// @param signature Array of ECDSA signature parameters r, s.
  function placeTradeExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.placeTradeExchange(
        libraryAdmin,
        _exchange,
        orderAddresses,
        orderValues,
        fillTakerTokenAmount,
        stableOrSufficient,
        v,
        signature
    );
  }

  /// @dev Allows drago owner to cancel an order on an exchange
  /// @param _exchange Address of the exchange
  /// @param orderAddresses Array of order's maker, taker, makerToken, takerToken, and feeRecipient.
  /// @param orderValues Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt.
  /// @param cancelTakerTokenAmount Desired amount of takerToken to cancel in order.
  function cancelOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.cancelOrderExchange(
        libraryAdmin,
        _exchange,
        orderAddresses,
        orderValues,
        cancelTakerTokenAmount
    );
  }

  /// @dev Allows drago owner to settle a deal on an exchange
  /// @param _exchange Address of the exchange
  /// @param orderAddresses Array of order's maker, taker, makerToken, takerToken, and feeRecipient.
  /// @param orderValues Array of order's makerTokenAmount, takerTokenAmount, makerFee, takerFee, expirationTimestampInSec, and salt.
  /// @param cancelTakerTokenAmount Amount of takerToken to settle in deal.
  function finalizeDeal(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    public
    onlyOwner
    whenApprovedExchange(_exchange)
  {
    DragoExchangeExtension.finalizeDeal(
        libraryAdmin,
        _exchange,
        orderAddresses,
        orderValues,
        cancelTakerTokenAmount
    );
  }

  /// @dev Allows an exchange contract to send Ether back
  function() external payable whenApprovedExchange(msg.sender) {}

  // PUBLIC CONSTANT FUNCTIONS

  /// @dev Calculates how many shares a user holds
  /// @param _who Address of the target account
  /// @return Number of shares
  function balanceOf(address _who) public view returns (uint256) {
    return accounts[_who].balance;
  }

  /// @dev Gets the address of the logger contract
  /// @return Address of the logger contrac
  function getDragoEventful() public view returns (address) {
    Authority auth = Authority(admin.authority);
    return auth.getDragoEventful();
  }

  /// @dev Finds details of a drago pool
  /// @return String name of a drago
  /// @return String symbol of a drago
  /// @return Value of the share price in wei
  /// @return Value of the share price in wei
  function getData()
    public
    view
    returns (
      string name,
      string symbol,
      uint sellPrice,
      uint buyPrice
    )
  {
    name = data.name;
    symbol = data.symbol;
    sellPrice = data.sellPrice;
    buyPrice = data.buyPrice;
  }

  /// @dev Finds the administrative data of the pool
  /// @return Address of the account where a user collects fees
  /// @return Address of the drago dao/factory
  /// @return Number of the fee split ratio
  /// @return Value of the transaction fee in basis points
  /// @return Number of the minimum holding period for shares
  function getAdminData()
    public
    view
    returns (
      address feeCollector,
      address dragodAO,
      uint ratio,
      uint transactionFee,
      uint32 minPeriod
    )
  {
    return (
      admin.feeCollector,
      admin.dragoDao,
      admin.ratio,
      data.transactionFee,
      data.minPeriod
    );
  }

  /// @dev Returns the version of the type of drago
  /// @return String of the version
  function getVersion() public view returns (string) {
    return VERSION;
  }

  /// @dev Returns the total amount of issued tokens for this drago
  /// @return Number of shares
  function totalSupply() public view returns (uint256) {
    return data.totalSupply;
  }

	// INTERNAL FUNCTIONS

  /// @dev Allocates tokens to buyer, splits fee in tokens to wizard and dao
  /// @param _hodler Address of the buyer
  /// @param _amount Value of tokens issued
  /// @param _fee_drago Number of shares as fee
  /// @param _fee_dragoDao Number of shares as fee to dao
  function allocateTokens(
    address _hodler,
    uint _amount,
    uint _fee_drago,
    uint _fee_dragoDao)
    internal
  {
    accounts[_hodler].balance = safeAdd(accounts[_hodler].balance, _amount);
    accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _fee_drago);
    accounts[admin.dragoDao].balance = safeAdd(accounts[admin.dragoDao].balance, _fee_dragoDao);
    accounts[_hodler].receipt.activation = uint32(now) + data.minPeriod;
  }

  /// @dev Sends a buy log to the eventful contract
  /// @param _amount Number of purchased shares
  function addPurchaseLog(uint _amount)
    internal
  {
    Authority auth = Authority(admin.authority);
    DragoEventful events = DragoEventful(auth.getDragoEventful());
    require(events.buyDrago(msg.sender, this, msg.value, _amount));
  }

  /// @dev Sends a sell log to the eventful contract
  /// @param _amount Number of sold shares
  /// @param _netRevenue Value of sale for hodler
  function addSaleLog(uint _amount, uint _netRevenue)
    internal
  {
    Authority auth = Authority(admin.authority);
    DragoEventful events = DragoEventful(auth.getDragoEventful());
    require(events.sellDrago(msg.sender, this, _amount, _netRevenue));
  }

  /// @dev Calculates the correct purchase amounts
  /// @return Number of new shares
  /// @return Value of fee in shares
  /// @return Value of fee in shares to dao
  /// @return Value of net purchased shares
  function getPurchaseAmounts()
    internal
    view
    returns (
      uint grossAmount,
      uint feeDrago,
      uint feeDragoDao,
      uint amount
    )
  {
    grossAmount = safeDiv(msg.value * BASE, data.buyPrice);
    uint fee = safeMul(grossAmount, data.transactionFee) / 10000; //fee is in basis points
    return (
      grossAmount = safeDiv(msg.value * BASE, data.buyPrice),
      feeDrago = safeMul(fee , admin.ratio) / 100,
      feeDragoDao = safeSub(fee, feeDrago),
      amount = safeSub(grossAmount, fee)
    );
  }

  /// @dev Calculates the correct sale amounts
  /// @return Value of fee in shares
  /// @return Value of fee in shares to dao
  /// @return Value of net sold shares
  /// @return Value of sale amount for hodler
  function getSaleAmounts(uint _amount)
    internal
    view
    returns (
      uint feeDrago,
      uint feeDragoDao,
      uint netAmount,
      uint netRevenue
    )
  {
    uint fee = safeMul(_amount, data.transactionFee) / 10000; //fee is in basis points
    return (
      feeDrago = safeMul(fee, admin.ratio) / 100,
      feeDragoDao = safeSub(fee, feeDragoDao),
      netAmount = safeSub(_amount, fee),
      netRevenue = safeMul(netAmount, data.sellPrice) / BASE
    );
  }

  /// @dev Returns the address of the exchange adapter
  /// @param _exchange Address of the target exchange
  /// @return Address of the exchange adapter
  function getExchangeAdapter(address _exchange)
    internal
    view
    returns (address)
  {
    Authority auth = Authority(admin.authority);
    return auth.getExchangeAdapter(_exchange);
  }
}
