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

/// @title Vault Factory Interface - Allows external interaction with Vault Factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract VaultFactoryFace {

    event VaultCreated(string name, string symbol, address indexed vault, address indexed owner, uint vaultId);

    function createVault(string _name, string _symbol) public returns (bool success) {}
    function setTargetVaultDao(address _targetVault, address _vaultDao) public {}
    function changeVaultDao(address _newVaultDao) public {}
    function setRegistry(address _newRegistry) public {}
    function setBeneficiary(address _vaultDao) public {}
    function setFee(uint _fee) public {}
    function drain() public {}

    function getRegistry() public constant returns (address) {}
    function getStorage() public constant returns (address vaultDao, uint nextVaultId) {}
    function getNextId() public constant returns (uint nextVaultId) {}
    function getEventful() public constant returns (address) {}
    function getVaultDao() public constant returns (address vaultDao) {}
    function getVersion() public constant returns (string) {}
    function getVaultsByAddress(address _owner) public constant returns (address[]) {}
}
