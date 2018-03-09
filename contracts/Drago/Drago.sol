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

import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { DragoEventfulFace as DragoEventful } from "../DragoEventful/DragoEventfulFace.sol";

import { DragoFace } from "./DragoFace.sol";
import { ERC20Face } from "../utils/tokens/ERC20/ERC20Face.sol";
import { OwnedUninitialized as Owned } from "../utils/Owned/OwnedUninitialized.sol";
import { SafeMathLight as SafeMath } from "../utils/SafeMath/SafeMathLight.sol";
import { DragoExchangeExtension } from "./DragoExchangeExtension/DragoExchangeExtension.sol";

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

    modifier ownerOrApprovedExchange() {
        Authority auth = Authority(admin.authority);
        require(auth.isWhitelistedExchange(msg.sender) || msg.sender == owner);
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
        admin.minOrder = 1 finney;
        admin.feeCollector = _owner;
        admin.ratio = 80;
    }

    // CORE FUNCTIONS

    /// @dev Allows a user to buy into a drago
    /// @return Bool the function executed correctly
    function buyDrago()
        external
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
        uint grossAmount;
        uint feeDrago;
        uint feeDragoDao;
        uint amount;
        (grossAmount, feeDrago, feeDragoDao, amount) = getPurchaseAmounts();
        addPurchaseLog(amount);
        allocatePurchaseTokens(_hodler, amount, feeDrago, feeDragoDao);
        data.totalSupply = safeAdd(data.totalSupply, grossAmount);
        return true;
    }

    /// @dev Allows a user to sell from a drago
    /// @param _amount Number of shares to sell
    /// @return Bool the function executed correctly
    function sellDrago(uint256 _amount)
        external
        hasEnough(_amount)
        positiveAmount(_amount)
        minimumPeriodPast
        returns (bool success)
    {
        uint feeDrago;
        uint feeDragoDao;
        uint netAmount;
        uint netRevenue;
        (feeDrago, feeDragoDao, netAmount, netRevenue) = getSaleAmounts(_amount);
        addSaleLog(_amount, netRevenue);
        allocateSaleTokens(msg.sender, _amount, feeDrago, feeDragoDao);
        data.totalSupply = safeSub(data.totalSupply, netAmount);
        msg.sender.transfer(netRevenue);
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

    function depositToExchange(address _exchange, uint _amount)
        public
        onlyOwner
        whenApprovedExchange(_exchange)
    {
        _exchange.transfer(_amount);
    }

    /// @dev Allows owner or approved exchange to send a transaction to exchange
    /// @dev With data of signed/unsigned transaction
    /// @param _exchange Address of the exchange
    function operateOnExchange(address _exchange)
        external
        ownerOrApprovedExchange()
    {
        DragoExchangeExtension.operateOnExchange(libraryAdmin, _exchange);
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
            address dragoDao,
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
    function getVersion() public pure returns (string) {
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
    /// @param _amount Value of issued tokens
    /// @param _feeDrago Number of shares as fee
    /// @param _feeDragoDao Number of shares as fee to dao
    function allocatePurchaseTokens(
        address _hodler,
        uint _amount,
        uint _feeDrago,
        uint _feeDragoDao)
        internal
    {
        accounts[_hodler].balance = safeAdd(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _feeDrago);
        accounts[admin.dragoDao].balance = safeAdd(accounts[admin.dragoDao].balance, _feeDragoDao);
        accounts[_hodler].receipt.activation = uint32(now) + data.minPeriod;
    }

    /// @dev Destroys tokens of seller, splits fee in tokens to wizard and dao
    /// @param _hodler Address of the seller
    /// @param _amount Value of burnt tokens
    /// @param _feeDrago Number of shares as fee
    /// @param _feeDragoDao Number of shares as fee to dao
    function allocateSaleTokens(
        address _hodler,
        uint _amount,
        uint _feeDrago,
        uint _feeDragoDao)
        internal
    {
        accounts[_hodler].balance = safeSub(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _feeDrago);
        accounts[admin.dragoDao].balance = safeAdd(accounts[admin.dragoDao].balance, _feeDragoDao);
    }

    /// @dev Sends a buy log to the eventful contract
    /// @param _amount Number of purchased shares
    function addPurchaseLog(uint _amount)
        internal
    {
        bytes memory name = bytes(data.name);
        bytes memory symbol = bytes(data.symbol);
        Authority auth = Authority(admin.authority);
        DragoEventful events = DragoEventful(auth.getDragoEventful());
        require(events.buyDrago(msg.sender, this, msg.value, _amount, name, symbol));
    }

    /// @dev Sends a sell log to the eventful contract
    /// @param _amount Number of sold shares
    /// @param _netRevenue Value of sale for hodler
    function addSaleLog(uint _amount, uint _netRevenue)
        internal
    {
        bytes memory name = bytes(data.name);
        bytes memory symbol = bytes(data.symbol);
        Authority auth = Authority(admin.authority);
        DragoEventful events = DragoEventful(auth.getDragoEventful());
        require(events.sellDrago(msg.sender, this, _amount, _netRevenue, name, symbol));
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
            netRevenue = (safeMul(netAmount, data.sellPrice) / BASE)
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
