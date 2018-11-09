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

pragma solidity 0.4.25;
pragma experimental "v0.5.0";

/// @title Vault Eventful Interface - Logs all vaults transactions.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface VaultEventfulFace {

    /*
     * EVENTS
     */
    event BuyVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event SellVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event NewRatio(address indexed vault, address indexed from, uint256 newRatio);
    event NewFee(address indexed vault, address indexed from, address indexed to, uint256 fee);
    event NewCollector(address indexed vault, address indexed from, address indexed to, address collector);
    event VaultDao(address indexed vault, address indexed from, address indexed to, address vaultDao);
    event VaultCreated(address indexed vault, address indexed group, address indexed owner, uint256 vaultId, string name, string symbol);

    /*
     * CORE FUNCTIONS
     */
    function buyVault(address _who, address _targetVault, uint256 _value, uint256 _amount, bytes _name, bytes _symbol) external returns (bool success);
    function sellVault(address _who, address _targetVault, uint256 _amount, uint256 _revenue, bytes _name, bytes _symbol) external returns(bool success);
    function changeRatio(address _who, address _targetVault, uint256 _ratio) external returns(bool success);
    function setTransactionFee(address _who, address _targetVault, uint256 _transactionFee) external returns(bool success);
    function changeFeeCollector(address _who, address _targetVault, address _feeCollector) external returns(bool success);
    function changeVaultDao(address _who, address _targetVault, address _vaultDao) external returns(bool success);
    function createVault(address _who, address _newVault, string _name, string _symbol, uint256 _vaultId) external returns(bool success);
}
