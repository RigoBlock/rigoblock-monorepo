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

/// @dev no setting of owner as msg.sender at deploy
/// @dev otherwise cannot set owner from factory
contract Owned {

    address public owner;

    modifier only_owner { require(msg.sender == owner); _; }

    event NewOwner(address indexed old, address indexed current);

    function setOwner(address _new) public only_owner {
        owner = _new;
        NewOwner(owner, _new);
    }

    function getOwner() public constant returns (address) {
        return owner;
    }
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

/// @title Vault Eventful Interface - Logs all vaults transactions.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultEventful {

    // EVENTS

    event BuyVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event SellVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event NewFee(address indexed vault, address indexed from, address indexed to, uint fee);
    event NewCollector(address indexed vault, address indexed from, address indexed to, address collector);
    event VaultDao(address indexed vault, address indexed from, address indexed to, address vaultDao);
    event DepositCasper(address indexed vault, address indexed validator, address indexed casper, address withdrawal, uint amount);
    event WithdrawCasper(address indexed vault, address indexed validator, address indexed casper, uint validatorIndex);
    event VaultCreated(address indexed vault, address indexed group, address indexed owner, uint vaultId, string name, string symbol);

    // CORE FUNCTIONS

    function buyVault(address _who, address _targetVault, uint _value, uint _amount, bytes _name, bytes _symbol) external returns (bool success) {}
    function sellVault(address _who, address _targetVault, uint _amount, uint _revenue, bytes _name, bytes _symbol) external returns(bool success) {}
    function changeRatio(address _who, address _targetVault, uint256 _ratio) external returns(bool success) {}
    function setTransactionFee(address _who, address _targetVault, uint _transactionFee) external returns(bool success) {}
    function changeFeeCollector(address _who, address _targetVault, address _feeCollector) external returns(bool success) {}
    function changeVaultDao(address _who, address _targetVault, address _vaultDao) external returns(bool success) {}
    function depositToCasper(address _who, address _targetVault, address _casper, address _validation, address _withdrawal, uint _amount) external returns(bool success) {}
    function withdrawFromCasper(address _who, address _targetVault, address _casper, uint _validatorIndex) external returns(bool success) {}
    function createVault(address _who, address _vaultFactory, address _newVault, string _name, string _symbol, uint _vaultId, address _owner) external returns(bool success) {}
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

/// @title Casper Interface - Allows interaction with the Casoper contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Casper {

    function deposit(address _validation, address _withdrawal) public payable {}
    function withdraw(uint128 _validatorIndex) public {}

    function get_deposit_size(uint128 _validatorIndex) public constant returns (uint128) {}
    function get_nextValidatorIndex() public constant returns (uint128) {}
}

/// @title Vault Interface - Allows interaction with the Vault contracts.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultFace {

    // CORE FUNCTIONS

    function() external payable {}
    function buyVault() external payable returns (bool success) {}
    function buyVaultOnBehalf(address _hodler) public payable returns (bool success) {}
    function sellVault(uint256 amount) external returns (bool success) {}
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

/// @title Vault - contract for creating a vault type of pool.
/// @author Gabriele Rigo - <gab@rigoblock.com>
/// @dev includes pooled proof-of-stake mining
contract Vault is Owned, ERC20Face, SafeMath, VaultFace {

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

    modifier only_vaultDao {
        require(msg.sender == admin.vaultDao);
        _;
    }

    modifier only_owner {
        require(msg.sender == owner);
        _;
    }

    modifier casper_contract_only {
        Authority auth = Authority(admin.authority);
        require(msg.sender == auth.getCasper());
        _;
    }

    modifier minimum_stake(uint _amount) {
        require(_amount >= admin.minOrder);
        _;
    }

    modifier has_enough(uint _amount) {
        require(accounts[msg.sender].balance >= _amount);
        _;
    }

    modifier positive_amount(uint _amount) {
        require(accounts[msg.sender].balance + _amount > accounts[msg.sender].balance);
        _;
    }

    modifier minimum_period_past {
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

    // CORE CORE FUNCTIONS

    /// @dev Allows a casper contract to send Ether back
    function() external payable casper_contract_only {}

    /// @dev Allows a user to buy into a vault
    /// @return Bool the function executed correctly
    function buyVault()
        public
        payable
        returns (bool success)
    {
        require(buyVaultOnBehalf(msg.sender));
        return true;
    }

    /// @dev Allows a user to buy into a vault on behalf of an address
    /// @param _hodler Address of the target user
    /// @return Bool the function executed correctly
    function buyVaultOnBehalf(address _hodler)
        public
        payable
        minimum_stake(msg.value)
        returns (bool success)
    {
        uint grossAmount;
        uint feeVault;
        uint feeVaultDao;
        uint amount;
        (grossAmount, feeVault, feeVaultDao, amount) = getPurchaseAmounts();
        addPurchaseLog(amount);
        allocateTokens(_hodler, amount, feeVault, feeVaultDao);
        data.totalSupply = safeAdd(data.totalSupply, grossAmount);
        return true;
    }

    /// @dev Allows a user to sell from a vault
    /// @param _amount Number of shares to sell
    /// @return Bool the function executed correctly
    function sellVault(uint256 _amount)
        public
        has_enough(_amount)
        positive_amount(_amount)
        minimum_period_past
        returns (bool success)
    {
        uint feeVault;
        uint feeVaultDao;
        uint netAmount;
        uint netRevenue;
        (feeVault, feeVaultDao, netAmount, netRevenue) = getSaleAmounts(_amount);
        addSaleLog(_amount, netRevenue);
        allocateTokens(msg.sender, _amount, feeVault, feeVaultDao);
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
        public
        only_owner
        minimum_stake(_amount)
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
    function withdrawCasper() public only_owner {
        Authority auth = Authority(admin.authority);
        Casper casper = Casper(auth.getCasper());
        casper.withdraw(data.validatorIndex);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.withdrawFromCasper(msg.sender, this, auth.getCasper(), data.validatorIndex));
    }

    /// @dev Allows vault dao/factory to change fee split ratio
    /// @param _ratio Number of ratio for wizard, from 0 to 100
    function changeRatio(uint256 _ratio) public only_vaultDao {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeRatio(msg.sender, this, _ratio));
        admin.ratio = _ratio;
    }

    /// @dev Allows vault owner to set the transaction fee
    /// @param _transactionFee Value of the transaction fee in basis points
    function setTransactionFee(uint _transactionFee) public only_owner {
        require(_transactionFee <= 100); //fee cannot be higher than 1%
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.setTransactionFee(msg.sender, this, _transactionFee));
        data.transactionFee = _transactionFee;
    }

    /// @dev Allows owner to decide where to receive the fee
    /// @param _feeCollector Address of the fee receiver
    function changeFeeCollector(address _feeCollector) public only_owner {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeFeeCollector(msg.sender, this, _feeCollector));
        admin.feeCollector = _feeCollector;
    }

    /// @dev Allows vault dao/factory to upgrade its address
    /// @param _vaultDao Address of the new vault dao
    function changeVaultDao(address _vaultDao) public only_vaultDao {
        Authority auth = Authority(admin.authority);
        VaultEventful events = VaultEventful(auth.getVaultEventful());
        require(events.changeVaultDao(msg.sender, this, _vaultDao));
        admin.vaultDao = _vaultDao;
    }

    /// @dev Allows anyone to pay and update the price
    /// @dev This function allows to write the new nav
    /// @dev NAV is provided by view functions
    function updatePrice() public {
        data.price = getNav();
    }

    /// @dev Allows vault dao/factory to change the minimum holding period
    /// @param _minPeriod Number of blocks
    function changeMinPeriod(uint32 _minPeriod) public only_vaultDao {
        data.minPeriod = _minPeriod;
    }

    // CONSTANT FUNCTIONS

    /// @dev Calculates how many shares a user holds
    /// @param _from Address of the target account
    /// @return Number of shares
    function balanceOf(address _from) public view returns (uint256) {
        return accounts[_from].balance;
    }

    /// @dev Gets the address of the logger contract
    /// @return Address of the logger contrac
    function getEventful() public view returns (address) {
        Authority auth = Authority(admin.authority);
        return auth.getVaultEventful();
    }

    /// @dev Finds details of a vault pool
    /// @return String name of a vault
    /// @return String symbol of a vault
    /// @return Value of the share price in wei
    /// @return Value of the share price in wei
    function getData()
        public
        constant
        returns (
            string name,
            string symbol,
            uint sellPrice,
            uint buyPrice
        )
    {
        sellPrice = buyPrice = getNav();
        return(
            name = data.name,
            symbol = data.symbol,
            sellPrice,
            buyPrice
        );
    }

    /// @dev Finds the administrative data of the pool
    /// @return Address of the account where a user collects fees
    /// @return Address of the vault dao/factory
    /// @return Number of the fee split ratio
    /// @return Value of the transaction fee in basis points
    /// @return Number of the minimum holding period for shares
    function getAdminData()
        public
        constant
        returns (
            address feeCollector,
            address vaultDao,
            uint ratio,
            uint transactionFee,
            uint32 minPeriod
        )
    {
        return (
            admin.feeCollector,
            admin.vaultDao,
            admin.ratio,
            data.transactionFee,
            data.minPeriod
        );
    }

    /// @dev Queries the address of the casper contract from the authority
    /// @return Address of the casper contract
    function getCasper() public view returns (address) {
        Authority auth = Authority(admin.authority);
        return auth.getCasper();
    }

    /// @dev Finds the value of the deposit of this vault at the casper contract
    /// @return Value of the deposit at casper in wei
    function getCasperDeposit() public view returns (uint128) {
        Casper casper = Casper(getCasper());
        return casper.get_deposit_size(data.validatorIndex);
    }

    /// @dev Calculates the value of the shares
    /// @return Value of the shares in wei
    function getNav() public constant returns (uint) {
        uint casperDeposit = uint(getCasperDeposit());
        uint aum = safeAdd(this.balance, casperDeposit);
        return safeDiv(aum * BASE, data.totalSupply);
    }

    /// @dev Returns the version of the type of vault
    /// @return String of the version
    function getVersion() public view returns (string) {
        return VERSION;
    }

    /// @dev Returns the total amount of issued tokens for this vault
    /// @return Number of shares
    function totalSupply() public view returns (uint256) {
        return data.totalSupply;
    }

    // INTERNAL FUNCTIONS

    /// @dev Allocates tokens to buyer, splits fee in tokens to wizard and dao
    /// @param _hodler Address of the buyer
    /// @param _amount Value of tokens issued
    /// @param _fee_vault Number of shares as fee
    /// @param _fee_vaultDao Number of shares as fee to dao
    function allocateTokens(
        address _hodler,
        uint _amount,
        uint _fee_vault,
        uint _fee_vaultDao)
        internal
    {
        accounts[_hodler].balance = safeAdd(accounts[_hodler].balance, _amount);
        accounts[admin.feeCollector].balance = safeAdd(accounts[admin.feeCollector].balance, _fee_vault);
        accounts[admin.vaultDao].balance = safeAdd(accounts[admin.vaultDao].balance, _fee_vaultDao);
        accounts[_hodler].receipt.activation = uint32(now) + data.minPeriod;
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
    function getPurchaseAmounts()
        internal
        constant
        returns (
            uint grossAmount,
            uint feeVault,
            uint feeVaultDao,
            uint amount
        )
    {
        grossAmount = safeDiv(msg.value * BASE, getNav());
        uint fee = safeMul(grossAmount, data.transactionFee) / 10000; //fee is in basis points
        return ({
            grossAmount = safeDiv(msg.value * BASE, getNav()),
            feeVault = safeMul(fee , admin.ratio) / 100,
            feeVaultDao = safeSub(fee, feeVault),
            amount = safeSub(grossAmount, fee)
        });
    }

    /// @dev Calculates the correct sale amounts
    /// @return Value of fee in shares
    /// @return Value of fee in shares to dao
    /// @return Value of net sold shares
    /// @return Value of sale amount for hodler
    function getSaleAmounts(uint _amount)
        internal
        constant
        returns (
            uint feeVault,
            uint feeVaultDao,
            uint netAmount,
            uint netRevenue
        )
    {
        uint fee = safeMul(_amount, data.transactionFee) / 10000; //fee is in basis points
        return ({
            feeVault = safeMul(fee, admin.ratio) / 100,
            feeVaultDao = safeSub(fee, feeVaultDao),
            netAmount = safeSub(_amount, fee),
            netRevenue = (safeMul(netAmount, getNav()) / BASE)
        });
    }
}
