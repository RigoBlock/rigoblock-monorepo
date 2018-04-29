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

pragma solidity ^0.4.23;
pragma experimental "v0.5.0";

/// @title Vault Interface - Allows interaction with the Vault contracts.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface VaultFace {

    // CORE FUNCTIONS

    function() external payable;
    function buyVault() external payable returns (bool success);
    function buyVaultOnBehalf(address _hodler) external payable returns (bool success);
    function sellVault(uint256 amount) external returns (bool success);
    function depositCasper(address _validation, address _withdrawal, uint _amount) external returns (bool success);
    function withdrawCasper() external;
    function changeRatio(uint256 _ratio) external;
    function setTransactionFee(uint _transactionFee) external;
    function changeFeeCollector(address _feeCollector) external;
    function changeVaultDao(address _vaultDao) external;
    function updatePrice() external;
    function changeMinPeriod(uint32 _minPeriod) external;

    // CONSTANT PUBLIC FUNCTIONS

    function balanceOf(address _who) external view returns (uint);
    function getEventful() external view returns (address);
    function getData() external view returns (string name, string symbol, uint sellPrice, uint buyPrice);
    function getAdminData() external view returns (address, address feeCollector, address vaultDao, uint ratio, uint transactionFee, uint32 minPeriod);
    function totalSupply() external view returns (uint256);
    function getVersion() external view returns (string);
    function getCasperDeposit() external view returns (uint);
}
