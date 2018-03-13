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

import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";
import { VaultEventfulFace as VaultEventful } from "../VaultEventful/VaultEventfulFace.sol";
import { CasperFace as Casper } from "../Casper/CasperFace.sol";

import { VaultFace } from "./VaultFace.sol";
import { OwnedUninitialized as Owned } from "../utils/Owned/OwnedUninitialized.sol";
import { SafeMathLight as SafeMath } from "../utils/SafeMath/SafeMathLight.sol";

/// @title Vault - contract for creating a vault type of pool.
/// @author Gabriele Rigo - <gab@rigoblock.com>
/// @dev includes pooled proof-of-stake mining
contract Vault is Owned, SafeMath, VaultFace {

    string constant VERSION = 'VC 0.5.1';
    uint constant BASE = 1000000; //tokens are divisible by 1 million

    VaultData data;
    Admin admin;

    mapping (address => Account) accounts;

    struct Receipt {
        uint32 activation;
    }

    struct Account {
        uint balance;
        Receipt receipt;
    }

    struct VaultData {
        string name;
        string symbol;
        uint vaultId;
        uint totalSupply;
        uint price;
        uint transactionFee; //fee is in basis points (1 bps = 0.01%)
        uint32 minPeriod;
        uint128 validatorIndex;
    }

    struct Admin {
        address authority;
        address vaultDao;
        address feeCollector;
        uint minOrder; // minimum stake to avoid dust clogging things up
        uint ratio; //ratio is 80%
    }

    modifier onlyVaultDao {
        require(msg.sender == admin.vaultDao);
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier casperContractOnly {
        Authority auth = Authority(admin.authority);
        require(msg.sender == auth.getCasper());
        _;
    }

    modifier minimumStake(uint _amount) {
        require(_amount >= admin.minOrder);
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
        require(now >= accounts[msg.sender].receipt.activation);
        _;
    }

    function Vault(
        string _vaultName,
        string _vaultSymbol,
        uint _vaultId,
        address _owner,
        address _authority)
        public
    {
        data.name = _vaultName;
        data.symbol = _vaultSymbol;
        data.vaultId = _vaultId;
        data.price = 1 ether; //initial price is 1 Ether
        owner = _owner;
        admin.authority = _authority;
        admin.vaultDao = msg.sender;
        admin.minOrder = 1 finney;
        admin.feeCollector = _owner;
        admin.ratio = 80;
    }

    // CORE FUNCTIONS

    /// @dev Allows a casper contract to send Ether back
    function()
        external
        payable
        casperContractOnly
    {}

    /// @dev Allows a user to buy into a vault
    /// @return Bool the function executed correctly
    function buyVault()
        external
        payable
        minimumStake(msg.value)
        returns (bool success)
    {
        require(buyVaultInternal(msg.sender, msg.value));
        return true;
    }

    /// @dev Allows a user to buy into a vault on behalf of an address
    /// @param _hodler Address of the target user
    /// @return Bool the function executed correctly
    function buyVaultOnBehalf(address _hodler)
        external
        payable
        minimumStake(msg.value)
        returns (bool success)
    {
        require(buyVaultInternal(_hodler, msg.value));
        return true;
    }

    /// @dev Allows a user to sell from a vault
    /// @param _amount Number of shares to sell
    /// @return Bool the function executed correctly
    function sellVault(uint256 _amount)
        external
        hasEnough(_amount)
        positiveAmount(_amount)
        minimumPeriodPast
        returns (bool success)
    {
        updatePriceInternal();
        uint feeVault;
        uint feeVaultDao;
        uint netAmount;
        uint netRevenue;
        (feeVault, feeVaultDao, netAmount, netRevenue) = getSaleAmounts(_amount);
        addSaleLog(_amount, netRevenue);
        allocateSaleTokens(msg.sender, _amount, feeVault, feeVaultDao);
        data.totalSupply = safeSub(data.totalSupply, netAmount);
        msg.sender.transfer(netRevenue);
        return true;
    }

    /// @dev Allows to deposit from vault to casper contract for pooled PoS mining
    /// @dev _withdrawal address must be == this
    /// @param _validation Address of the casper miner
    /// @param _withdrawal Address where to withdraw
    /// @param _amount Value of deposit in wei
    /// @return Bool the function executed correctly
    function depositCasper(address _validation, address _withdrawal, uint _amount)
        external
        onlyOwner
        minimumStake(_amount)
        returns (bool success)
    {
        require(_withdrawal == address(this));
        Authority auth = Authority(admin.authority);
        Casper casper = Casper(auth.getCasper());
        data.validatorIndex = casper.get_nextValidatorIndex();
        casper.deposit.value(_amount)(_validation, _withdrawal);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.depositToCasper(msg.sender, this, auth.getCasper(), _validation, _withdrawal, _amount));
        return true;
    }

    /// @dev Allows vault owner to withdraw from casper to vault contract
    function withdrawCasper()
        external
        onlyOwner
    {
        Authority auth = Authority(admin.authority);
        Casper casper = Casper(auth.getCasper());
        casper.withdraw(data.validatorIndex);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.withdrawFromCasper(msg.sender, this, auth.getCasper(), data.validatorIndex));
    }

    /// @dev Allows vault dao/factory to change fee split ratio
    /// @param _ratio Number of ratio for wizard, from 0 to 100
    function changeRatio(uint256 _ratio)
        external
        onlyVaultDao
    {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeRatio(msg.sender, this, _ratio));
        admin.ratio = _ratio;
    }

    /// @dev Allows vault owner to set the transaction fee
    /// @param _transactionFee Value of the transaction fee in basis points
    function setTransactionFee(uint _transactionFee)
        external
        onlyOwner
    {
        require(_transactionFee <= 100); //fee cannot be higher than 1%
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.setTransactionFee(msg.sender, this, _transactionFee));
        data.transactionFee = _transactionFee;
    }

    /// @dev Allows owner to decide where to receive the fee
    /// @param _feeCollector Address of the fee receiver
    function changeFeeCollector(address _feeCollector)
        external
        onlyOwner
    {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeFeeCollector(msg.sender, this, _feeCollector));
        admin.feeCollector = _feeCollector;
    }

    /// @dev Allows vault dao/factory to upgrade its address
    /// @param _vaultDao Address of the new vault dao
    function changeVaultDao(address _vaultDao)
        external
        onlyVaultDao
    {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeVaultDao(msg.sender, this, _vaultDao));
        admin.vaultDao = _vaultDao;
    }

    /// @dev Allows anyone to pay and update the price
    /// @dev This function allows to write the new nav
    /// @dev NAV is provided by view functions
    function updatePrice()
        external
    {
        updatePriceInternal();
    }

    /// @dev Allows vault dao/factory to change the minimum holding period
    /// @param _minPeriod Number of blocks
    function changeMinPeriod(uint32 _minPeriod)
        external
        onlyVaultDao
    {
        data.minPeriod = _minPeriod;
    }

    // CONSTANT FUNCTIONS

    /// @dev Calculates how many shares a user holds
    /// @param _from Address of the target account
    /// @return Number of shares
    function balanceOf(address _from)
        external view
        returns (uint256)
    {
        return accounts[_from].balance;
    }

    /// @dev Gets the address of the logger contract
    /// @return Address of the logger contrac
    function getEventful()
        external view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        return auth.getVaultEventful();
    }

    /// @dev Finds details of a vault pool
    /// @return String name of a vault
    /// @return String symbol of a vault
    /// @return Value of the share price in wei
    /// @return Value of the share price in wei
    function getData()
        external view
        returns (
            string name,
            string symbol,
            uint sellPrice,
            uint buyPrice
        )
    {
        return(
            name = data.name,
            symbol = data.symbol,
            sellPrice = getNav(),
            buyPrice = getNav()
        );
    }

    /// @dev Finds the administrative data of the pool
    /// @return Address of the account where a user collects fees
    /// @return Address of the vault dao/factory
    /// @return Number of the fee split ratio
    /// @return Value of the transaction fee in basis points
    /// @return Number of the minimum holding period for shares
    function getAdminData()
        external view
        returns (
            address,
            address feeCollector,
            address vaultDao,
            uint ratio,
            uint transactionFee,
            uint32 minPeriod
        )
    {
        return (
            owner,
            admin.feeCollector,
            admin.vaultDao,
            admin.ratio,
            data.transactionFee,
            data.minPeriod
        );
    }

    /// @dev Finds the value of the deposit of this vault at the casper contract
    /// @return Value of the deposit at casper in wei
    function getCasperDeposit() external view returns (uint128) {
        return getCasperDepositInternal();
    }

    /// @dev Returns the version of the type of vault
    /// @return String of the version
    function getVersion()
        external view
        returns (string)
    {
        return VERSION;
    }

    /// @dev Returns the total amount of issued tokens for this vault
    /// @return Number of shares
    function totalSupply()
        external view
        returns (uint256)
    {
        return data.totalSupply;
    }

    // INTERNAL FUNCTIONS

    /// @dev Executes purchase function
    /// @param _hodler Address of the target user
    /// @return Bool the function executed correctly
    function buyVaultInternal(address _hodler, uint _totalEth)
        internal
        returns (bool success)
    {
        uint grossAmount;
        uint feeVault;
        uint feeVaultDao;
        uint amount;
        (grossAmount, feeVault, feeVaultDao, amount) = getPurchaseAmounts(_totalEth);
        addPurchaseLog(amount);
        allocatePurchaseTokens(_hodler, amount, feeVault, feeVaultDao);
        data.totalSupply = safeAdd(data.totalSupply, grossAmount);
        return true;
    }

    /// @dev Updates the price
    function updatePriceInternal()
        internal
    {
        if (address(this).balance > 0) {
            data.price = getNav();
        }
    }

    /// @dev Allocates tokens to buyer, splits fee in tokens to wizard and dao
    /// @param _hodler Address of the buyer
    /// @param _amount Value of issued tokens
    /// @param _feeVault Number of shares as fee
    /// @param _feeVaultDao Number of shares as fee to dao
    function allocatePurchaseTokens(
        address _hodler,
        uint _amount,
        uint _feeVault,
        uint _feeVaultDao)
        internal
    {
        accounts[_hodler].balance = safeAdd(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _feeVault);
        accounts[admin.vaultDao].balance = safeAdd(accounts[admin.vaultDao].balance, _feeVaultDao);
        accounts[_hodler].receipt.activation = uint32(now) + data.minPeriod;
    }

    /// @dev Destroys tokens from buyer, splits fee in tokens to wizard and dao
    /// @param _hodler Address of the seller
    /// @param _amount Value of burnt tokens
    /// @param _feeVault Number of shares as fee
    /// @param _feeVaultDao Number of shares as fee to dao
    function allocateSaleTokens(
        address _hodler,
        uint _amount,
        uint _feeVault,
        uint _feeVaultDao)
        internal
    {
        accounts[_hodler].balance = safeSub(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _feeVault);
        accounts[admin.vaultDao].balance = safeAdd(accounts[admin.vaultDao].balance, _feeVaultDao);
    }

    /// @dev Sends a buy log to the eventful contract
    /// @param _amount Number of purchased shares
    function addPurchaseLog(uint _amount)
        internal
    {
        bytes memory name = bytes(data.name);
        bytes memory symbol = bytes(data.symbol);
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.buyVault(msg.sender, this, msg.value, _amount, name, symbol));
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
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.sellVault(msg.sender, this, _amount, _netRevenue, name, symbol));
    }

    /// @dev Calculates the correct purchase amounts
    /// @return Number of new shares
    /// @return Value of fee in shares
    /// @return Value of fee in shares to dao
    /// @return Value of net purchased shares
    function getPurchaseAmounts(uint _totalEth)
        internal view
        returns (
            uint grossAmount,
            uint feeVault,
            uint feeVaultDao,
            uint amount
        )
    {
        grossAmount = safeDiv(_totalEth * BASE, getNav());
        uint fee = safeMul(grossAmount, data.transactionFee) / 10000; //fee is in basis points
        return (
            grossAmount,
            feeVault = safeMul(fee , admin.ratio) / 100,
            feeVaultDao = safeSub(fee, feeVault),
            amount = safeSub(grossAmount, fee)
        );
    }

    /// @dev Calculates the correct sale amounts
    /// @return Value of fee in shares
    /// @return Value of fee in shares to dao
    /// @return Value of net sold shares
    /// @return Value of sale amount for hodler
    function getSaleAmounts(uint _amount)
        internal view
        returns (
            uint feeVault,
            uint feeVaultDao,
            uint netAmount,
            uint netRevenue
        )
    {
        uint fee = safeMul(_amount, data.transactionFee) / 10000; //fee is in basis points
        return (
            feeVault = safeMul(fee, admin.ratio) / 100,
            feeVaultDao = safeSub(fee, feeVaultDao),
            netAmount = safeSub(_amount, fee),
            netRevenue = (safeMul(netAmount, data.price) / BASE)
        );
    }

    /// @dev Queries the addres of the inizialized casper
    /// @return Address of the casper address
    function getCasper()
        internal view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        if (casperInitialized()) {
            return auth.getCasper();
        }
    }

    /// @dev Checkes whether casper has been inizialized by the Authority
    /// @return Bool the casper contract has been initialized
    function casperInitialized()
        internal view
        returns (bool)
    {
        Authority auth = Authority(admin.authority);
        return auth.isCasperInitialized();
    }

    /// @dev Finds the value of the deposit of this vault at the casper contract
    /// @return Value of the deposit at casper in wei
    function getCasperDepositInternal() internal view returns (uint128) {
        if (casperInitialized()) {
            Casper casper = Casper(getCasper());
            return casper.get_deposit_size(data.validatorIndex);
        } else {
            return 0;
        }
    }

    /// @dev Calculates the value of the shares
    /// @return Value of the shares in wei
    function getNav() internal view returns (uint) {
        uint casperDeposit = (casperInitialized() ? getCasperDepositInternal() : 0);
        uint aum = safeAdd(address(this).balance, casperDeposit);
        return (data.totalSupply == 0 ? data.price : safeDiv(aum * BASE, data.totalSupply));
    }
}
