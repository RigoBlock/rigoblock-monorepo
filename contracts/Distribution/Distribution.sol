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
}

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

/// @title Distribution Interface - Allows to interact with the distribution.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DistributionFace {

    event Subscription(address indexed buyer, address indexed distributor, uint amount);

    function subscribe(address _pool, address _distributor, address _buyer) public payable {}
    function setFee(uint _fee, address _distributor) public {}
    function getFee(address _distributor) public constant returns (uint) {}
}

/// @title Distribution - Allows to collect subscription fees on vaults.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Distribution is SafeMath {

    event Subscription(address indexed buyer, address indexed distributor, uint amount);

    mapping (address => Distributor) distributor;

    struct Distributor {
        uint fee;
    }

    modifier address_free(address _distributor) {
        require(distributor[_distributor].fee == 0);
        _;
    }

    modifier non_zero_address(address _target) {
        require(_target != 0);
        _;
    }

    function subscribe(address _pool, address _distributor, address _buyer)
        public
        payable
    {
        Vault vault = Vault(_pool);
        vault.buyVaultOnBehalf(_buyer);
        uint feeAmount = safeDiv(safeMul(msg.value, distributor[_distributor].fee), 10000); //fee is in basis points
        uint netAmount = safeSub(msg.value, feeAmount);
        _pool.transfer(netAmount);
        _distributor.transfer(feeAmount);
    }

    function setFee(uint _fee, address _distributor)
        public
        address_free(_distributor)
        non_zero_address(_distributor)
    {
        distributor[_distributor].fee = _fee;
    }

    function getFee(address _distributor) public constant returns (uint) {
        return distributor[_distributor].fee;
    }
}
