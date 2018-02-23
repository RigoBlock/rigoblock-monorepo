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

/// @title Vault Eventful Interface - Logs all vaults transactions.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultEventfulFace {

  // EVENTS

  event BuyVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue);
  event SellVault(address indexed vault, address indexed from, address indexed to, uint256 amount, uint256 revenue);
  event NewFee(address indexed vault, address indexed from, address indexed to, uint fee);
  event NewCollector(address indexed vault, address indexed from, address indexed to, address collector);
  event VaultDao(address indexed vault, address indexed from, address indexed to, address vaultDao);
  event DepositCasper(address indexed vault, address indexed validator, address indexed casper, address withdrawal, uint amount);
  event WithdrawCasper(address indexed vault, address indexed validator, address indexed casper, uint validatorIndex);
  event VaultCreated(address indexed vault, address indexed group, address indexed owner, uint vaultId, string name, string symbol);

  // CORE FUNCTIONS

  function buyVault(address _who, address _targetVault, uint _value, uint _amount) returns (bool success) {}
  function sellVault(address _who, address _targetVault, uint _amount, uint _revenue) returns(bool success) {}
  function changeRatio(address _who, address _targetVault, uint256 _ratio) returns(bool success) {}
  function setTransactionFee(address _who, address _targetVault, uint _transactionFee) returns(bool success) {}
  function changeFeeCollector(address _who, address _targetVault, address _feeCollector) returns(bool success) {}
  function changeVaultDao(address _who, address _targetVault, address _vaultDao) returns(bool success) {}
  function depositToCasper(address _who, address _targetVault, address _casper, address _validation, address _withdrawal, uint _amount) returns(bool success) {}
  function withdrawFromCasper(address _who, address _targetVault, address _casper, uint _validatorIndex) returns(bool success) {}
  function createVault(address _who, address _vaultFactory, address _newVault, string _name, string _symbol, uint _vaultId, address _owner) returns(bool success) {}
}
