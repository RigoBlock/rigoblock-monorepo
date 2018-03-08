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
contract VaultFace {

    // CORE FUNCTIONS

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
    //function setOwner(address _new) public {}
    function() external payable {}


    //function balanceOf(address _who) public view returns (uint) {}
    function getEventful() public view returns (address) {}
    function getData() public view returns (string name, string symbol, uint sellPrice, uint buyPrice) {}
    function getAdminData() public view returns (address feeCollector, address vaultDao, uint ratio, uint transactionFee, uint32 minPeriod) {}
    //function getOwner() public view returns (address) {}
    //function totalSupply() public view returns (uint256) {}
    function getCasper() public view returns (address) {}
    function getCasperDeposit() public view returns (uint128) {}
    function getNav() public view returns (uint) {}
    function getVersion() public view returns (string) {}
}
