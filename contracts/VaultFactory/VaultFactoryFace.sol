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

pragma solidity ^0.4.19;

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
    //function setOwner(address _new) public {}

    function getRegistry() public view returns (address) {}
    function getStorage() public view returns (address vaultDao, string version, uint nextVaultId) {}
    function getNextId() public view returns (uint nextVaultId) {}
    function getEventful() public view returns (address) {}
    function getVaultsByAddress(address _owner) public view returns (address[]) {}
    //function getOwner() public view returns (address) {}
}
