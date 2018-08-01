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

pragma solidity ^0.4.24;
pragma experimental "v0.5.0";

import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { DragoEventfulFace as DragoEventful } from "../DragoEventful/DragoEventfulFace.sol";
import { ERC20Face as Token } from "../utils/tokens/ERC20/ERC20Face.sol";
import { KycFace as Kyc } from "../Kyc/KycFace.sol";

import { DragoFace } from "./DragoFace.sol";
import { OwnedUninitialized as Owned } from "../utils/Owned/OwnedUninitialized.sol";
import { SafeMathLight as SafeMath } from "../utils/SafeMath/SafeMathLight.sol";
import { DragoExchangeExtension } from "./DragoExchangeExtension/DragoExchangeExtension.sol";
import { ExchangeAdapterFace as ExchangeAdapter } from '../ExchangeAdapters/ExchangeAdapterFace.sol';

/// @title Drago - A set of rules for a drago.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Drago is Owned, SafeMath, DragoFace {
    // TODO: implement separate authority for exchanges, as it needs to be upgraded
    // TODO: if effective, create 3 arrays of approved addresses: wrappers, exchanges and tokentransferproxies

    using DragoExchangeExtension for *;
    DragoExchangeExtension.Admin libraryAdmin;

    string constant VERSION = 'HF 0.4.2';
    uint256 constant BASE = 1000000; // tokens are divisible by 1 million

    mapping (address => Account) accounts;

    DragoData data;
    Admin admin;

    struct Receipt {
        uint256 units;
        uint32 activation;
    }

    struct Account {
        uint256 balance;
        Receipt receipt;
        mapping(address => address[]) approvedAccount;
    }

    struct DragoData {
        string name;
        string symbol;
        uint256 dragoId;
        uint256 totalSupply;
        uint256 sellPrice;
        uint256 buyPrice;
        uint256 transactionFee; // in basis points 1 = 0.01%
        uint32 minPeriod;
    }

    struct Admin {
        address authority;
        address dragoDao;
        address feeCollector;
        address kycProvider;
        bool kycEnforced;
        uint256 minOrder; // minimum stake to avoid dust clogging things up
        uint256 ratio; // ratio is 80%
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

    modifier returnUnapprovedExchange {
        Authority auth = Authority(admin.authority);
        if (!auth.isWhitelistedExchange(msg.sender)) return;
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

    modifier minimumStake(uint256 amount) {
        require (amount >= admin.minOrder);
        _;
    }

    modifier hasEnough(uint256 _amount) {
        require(accounts[msg.sender].balance >= _amount);
        _;
    }

    modifier positiveAmount(uint256 _amount) {
        require(accounts[msg.sender].balance + _amount > accounts[msg.sender].balance);
        _;
    }

    modifier minimumPeriodPast {
        require(block.timestamp >= accounts[msg.sender].receipt.activation);
        _;
    }

    modifier buyPriceHigherOrEqual(uint256 _sellPrice, uint256 _buyPrice) {
        require(_sellPrice <= _buyPrice);
        _;
    }

    modifier notPriceError(uint256 _sellPrice, uint256 _buyPrice) {
        if (_sellPrice <= data.sellPrice / 10 || _buyPrice >= data.buyPrice * 10) return;
        _;
    }

    constructor(
        string _dragoName,
        string _dragoSymbol,
        uint256 _dragoId,
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

    /// @dev Allows an exchange contract to send Ether back
    /// @dev or to send a raw transaction with data
    function()
        external
        payable
        returnUnapprovedExchange
    {
        /*
        // the call uses delegatecall, should use call
        // it is highly unlikely exchanges will want to send raw calls
        // commented for debugging
        // if (msg.value == 0) {
        if (msg.data != 0) {
            DragoExchangeExtension.operateOnExchange(libraryAdmin, msg.sender, msg.data);
        }
        */
    }

    /// @dev Allows a user to buy into a drago
    /// @return Bool the function executed correctly
    function buyDrago()
        external
        payable
        minimumStake(msg.value)
        returns (bool success)
    {
        require(buyDragoInternal(msg.sender));
        return true;
    }

    /// @dev Allows a user to buy into a drago on behalf of an address
    /// @param _hodler Address of the target user
    /// @return Bool the function executed correctly
    function buyDragoOnBehalf(address _hodler)
        external
        payable
        minimumStake(msg.value)
        returns (bool success)
    {
        require(buyDragoInternal(_hodler));
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
        uint256 feeDrago;
        uint256 feeDragoDao;
        uint256 netAmount;
        uint256 netRevenue;
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
    function setPrices(uint256 _newSellPrice, uint256 _newBuyPrice)
        external
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
    function changeRatio(uint256 _ratio)
        external
        onlyDragoDao
    {
        DragoEventful events = DragoEventful(getDragoEventful());
        require(events.changeRatio(msg.sender, this, _ratio));
        admin.ratio = _ratio;
    }

    /// @dev Allows drago owner to set the transaction fee
    /// @param _transactionFee Value of the transaction fee in basis points
    function setTransactionFee(uint256 _transactionFee)
        external
        onlyOwner
    {
        require(_transactionFee <= 100); //fee cannot be higher than 1%
        DragoEventful events = DragoEventful(getDragoEventful());
        require(events.setTransactionFee(msg.sender, this, _transactionFee));
        data.transactionFee = _transactionFee;
    }

    /// @dev Allows owner to decide where to receive the fee
    /// @param _feeCollector Address of the fee receiver
    function changeFeeCollector(address _feeCollector)
        external
        onlyOwner
    {
        DragoEventful events = DragoEventful(getDragoEventful());
        events.changeFeeCollector(msg.sender, this, _feeCollector);
        admin.feeCollector = _feeCollector;
    }

    /// @dev Allows drago dao/factory to upgrade its address
    /// @param _dragoDao Address of the new drago dao
    function changeDragoDao(address _dragoDao)
        external
        onlyDragoDao
    {
        DragoEventful events = DragoEventful(getDragoEventful());
        require(events.changeDragoDao(msg.sender, this, _dragoDao));
        admin.dragoDao = _dragoDao;
    }

    /// @dev Allows drago dao/factory to change the minimum holding period
    /// @param _minPeriod Number of blocks
    function changeMinPeriod(uint32 _minPeriod)
        external
        onlyDragoDao
    {
        data.minPeriod = _minPeriod;
    }

/*
    /// @dev allows a manager to deposit eth to an approved exchange/wrap eth
    /// @param _exchange Address of the target exchange
    /// @param _amount Value of the Eth in wei
    function depositToExchange(address _exchange, uint256 _amount)
        external
        onlyOwner
        whenApprovedExchange(_exchange)
    {
        ExchangeAdapter(getExchangeAdapter(_exchange))
        .deposit
        .value(_amount)();
    }
*/

    /// @notice this function is aimed at working with the efx wrappers
    /// @notice we have to decide whether to abstract or not
    function wrapToEfx(
        address _token,
        address _wrapper,
        address _tokenTransferProxy,
        uint256 _amount,
        uint256 _duration)
        external
        onlyOwner
        whenApprovedExchange(_wrapper)
        whenApprovedExchange(_tokenTransferProxy)
    {
        //TODO: get automatically token address by wrapper address
        if (_token == address(0)) {
            // TODO: Token(_wrapper) / TokenWrapper(_token)
            require(
                ExchangeAdapter(_wrapper)
                .deposit
                .value(_amount)(_amount, _duration)
            );
        } else {
            require(setInfiniteAllowanceInternal(_tokenTransferProxy, _token));
            require(
                ExchangeAdapter(_wrapper)
                .deposit(_amount, _duration)
            );
        }
    }

    /// @dev allows a manager to withdraw ETH from an approved exchange/unwrap eth
    /// @param _exchange Address of the target exchange
    /// @param _amount Value of the Eth in wei
    function withdrawFromExchange(address _exchange, uint256 _amount)
        external
        onlyOwner
        whenApprovedExchange(_exchange)
    {
        ExchangeAdapter(getExchangeAdapter(_exchange))
        .withdraw(_amount);
    }

    /// @dev Allows owner to set an infinite allowance to an approved exchange
    /// @param _tokenTransferProxy Address of the tokentargetproxy to be approved
    /// @param _token Address of the token to receive allowance for
    /// @notice WE MIGHT WANT TO SEPARATE THE APPROVED TRANSFERPROXIES AND EXCHANGES
    function setInfiniteAllowance(
        address _tokenTransferProxy,
        address _token)
        external //external + internal
        onlyOwner
        whenApprovedExchange(_tokenTransferProxy)
    {
        require(setInfiniteAllowanceInternal(_tokenTransferProxy, _token));
    }

    /// @dev Allows owner to set allowances to multiple approved tokens with one call
    function SetMultipleAllowances(
        address _tokenTransferProxy,
        address[] _token)
        external
    {
        for (uint256 i = 0; i < _token.length; i++)
            if (!setInfiniteAllowanceInternal(_tokenTransferProxy, _token[i])) continue;
    }

    /// @dev Allows approved exchange to send a transaction to exchange
    /// @dev With data of signed/unsigned transaction
    /// @param _exchange Address of the exchange
    /// @param _assembledTransaction Bytes of the parameters of the call
    function operateOnExchange(address _exchange, bytes _assembledTransaction)
        external
        whenApprovedExchange(msg.sender)
    {
        require(_exchange.call(_assembledTransaction));
    }

    /// this function is used for debugging, direct operations on excange is for
    /// approved exchanges only
    function operateOnExchangeDirectly(address _exchange, bytes _assembledTransaction)
        external
        ownerOrApprovedExchange()
        whenApprovedExchange(_exchange)
    {
        bytes memory _data = _assembledTransaction;
        address _target = getExchangeAdapter(_exchange);
        bytes memory response;
        bool failed;
        assembly {
            let succeeded := call(sub(gas, 10000), _target, 0, add(_data, 0x20), mload(_data), 0, 32)
            response := mload(0)      // load delegatecall output
            failed := iszero(succeeded)
        }
        require(!failed);
    }

    /// @dev Allows owner or approved exchange to send a transaction to exchange
    /// @dev With data of signed/unsigned transaction
    /// @param _exchange Address of the exchange
    /// @notice check whether we have to enforce prevent selfdestruct method
    /// @notice this function allows to send money to the exchange through the proxy
    function operateOnExchangeThroughAdapter(
        address _exchange,
        bytes _assembledTransaction)
        external
        ownerOrApprovedExchange()
        whenApprovedExchange(_exchange)
    {
        bytes memory _data = _assembledTransaction;
        address _target = getExchangeAdapter(_exchange);
        bytes memory response;
        bool failed;
        assembly {
            let succeeded := delegatecall(sub(gas, 10000), _target, add(_data, 0x20), mload(_data), 0, 32)
            response := mload(0)      // load delegatecall output
            failed := iszero(succeeded)
        }
        require(!failed);
    }

    function enforceKyc(
        bool _enforced,
        address _kycProvider)
        external
        onlyOwner
    {
        admin.kycEnforced = _enforced;
        admin.kycProvider = _kycProvider;
    }

    // PUBLIC CONSTANT FUNCTIONS

    /// @dev Calculates how many shares a user holds
    /// @param _who Address of the target account
    /// @return Number of shares
    function balanceOf(address _who)
        external view
        returns (uint256)
    {
        return accounts[_who].balance;
    }

    /// @dev Gets the address of the logger contract
    /// @return Address of the logger contrac
    function getEventful()
        external view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        return auth.getDragoEventful();
    }

    /// @dev Finds details of a drago pool
    /// @return String name of a drago
    /// @return String symbol of a drago
    /// @return Value of the share price in wei
    /// @return Value of the share price in wei
    function getData()
        external view
        returns (
            string name,
            string symbol,
            uint256 sellPrice,
            uint256 buyPrice
        )
    {
        name = data.name;
        symbol = data.symbol;
        sellPrice = data.sellPrice;
        buyPrice = data.buyPrice;
    }

    /// @dev Returns the price of a pool
    /// @return Value of the share price in wei
    function calcSharePrice()
        external view
        returns (uint256)
    {
        return data.sellPrice;
    }

    /// @dev Finds the administrative data of the pool
    /// @return Address of the account where a user collects fees
    /// @return Address of the drago dao/factory
    /// @return Number of the fee split ratio
    /// @return Value of the transaction fee in basis points
    /// @return Number of the minimum holding period for shares
    function getAdminData()
        external view
        returns (
            address, //owner
            address feeCollector,
            address dragoDao,
            uint256 ratio,
            uint256 transactionFee,
            uint32 minPeriod
        )
    {
        return (
            owner,
            admin.feeCollector,
            admin.dragoDao,
            admin.ratio,
            data.transactionFee,
            data.minPeriod
        );
    }

    function getKycProvider()
        external view
        returns (address)
    {
        if(admin.kycEnforced) {
            return admin.kycProvider;
        }
    }

    /// @dev Returns the version of the type of vault
    /// @return String of the version
    function getVersion()
        external view
        returns (string)
    {
        return VERSION;
    }

    /// @dev Returns the total amount of issued tokens for this drago
    /// @return Number of shares
    function totalSupply() external view returns (uint256) {
        return data.totalSupply;
    }

    // INTERNAL FUNCTIONS

    /// @dev Executes the pool purchase
    /// @param _hodler Address of the target user
    /// @return Bool the function executed correctly
    function buyDragoInternal(address _hodler)
        internal
        returns (bool success)
    {
        if (admin.kycProvider != 0x0) {
            require(Kyc(admin.kycProvider).isWhitelistedUser(_hodler));
        }
        uint256 grossAmount;
        uint256 feeDrago;
        uint256 feeDragoDao;
        uint256 amount;
        (grossAmount, feeDrago, feeDragoDao, amount) = getPurchaseAmounts();
        addPurchaseLog(amount);
        allocatePurchaseTokens(_hodler, amount, feeDrago, feeDragoDao);
        data.totalSupply = safeAdd(data.totalSupply, grossAmount);
        return true;
    }

    /// @dev Allocates tokens to buyer, splits fee in tokens to wizard and dao
    /// @param _hodler Address of the buyer
    /// @param _amount Value of issued tokens
    /// @param _feeDrago Number of shares as fee
    /// @param _feeDragoDao Number of shares as fee to dao
    function allocatePurchaseTokens(
        address _hodler,
        uint256 _amount,
        uint256 _feeDrago,
        uint256 _feeDragoDao)
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
        uint256 _amount,
        uint256 _feeDrago,
        uint256 _feeDragoDao)
        internal
    {
        accounts[_hodler].balance = safeSub(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _feeDrago);
        accounts[admin.dragoDao].balance = safeAdd(accounts[admin.dragoDao].balance, _feeDragoDao);
    }

    /// @dev Sends a buy log to the eventful contract
    /// @param _amount Number of purchased shares
    function addPurchaseLog(uint256 _amount)
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
    function addSaleLog(uint256 _amount, uint256 _netRevenue)
        internal
    {
        bytes memory name = bytes(data.name);
        bytes memory symbol = bytes(data.symbol);
        Authority auth = Authority(admin.authority);
        DragoEventful events = DragoEventful(auth.getDragoEventful());
        require(events.sellDrago(msg.sender, this, _amount, _netRevenue, name, symbol));
    }

    /// @dev Allows owner to set an infinite allowance to an approved exchange
    /// @param _tokenTransferProxy Address of the tokentargetproxy to be approved
    /// @param _token Address of the token to receive allowance for
    function setInfiniteAllowanceInternal(
        address _tokenTransferProxy,
        address _token)
        internal
        returns (bool)
    {
        Token(_token)
            .approve(_tokenTransferProxy, 2**256 - 1);
        return true;
    }

    /// @dev Calculates the correct purchase amounts
    /// @return Number of new shares
    /// @return Value of fee in shares
    /// @return Value of fee in shares to dao
    /// @return Value of net purchased shares
    function getPurchaseAmounts()
        internal view
        returns (
            uint256 grossAmount,
            uint256 feeDrago,
            uint256 feeDragoDao,
            uint256 amount
        )
    {
        grossAmount = safeDiv(msg.value * BASE, data.buyPrice);
        uint256 fee = safeMul(grossAmount, data.transactionFee) / 10000; //fee is in basis points
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
    function getSaleAmounts(uint256 _amount)
        internal view
        returns (
            uint256 feeDrago,
            uint256 feeDragoDao,
            uint256 netAmount,
            uint256 netRevenue
        )
    {
        uint256 fee = safeMul(_amount, data.transactionFee) / 10000; //fee is in basis points
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
        internal view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        return auth.getExchangeAdapter(_exchange);
    }

    /// @dev Gets the address of the logger contract
    /// @return Address of the logger contrac
    function getDragoEventful()
        internal view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        return auth.getDragoEventful();
    }
}
