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

<<<<<<< HEAD
pragma solidity ^0.4.24;
=======
pragma solidity 0.4.23;
>>>>>>> 796df49aabf4f8ff31cb7a3e97947638f1f0d1f0
pragma experimental "v0.5.0";

/// @title Vault Factory Interface - Allows external interaction with Vault Factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface VaultFactoryFace {

    event VaultCreated(string name, string symbol, address indexed vault, address indexed owner, uint256 vaultId);

    function createVault(string _name, string _symbol) external payable returns (bool success);
    function setTargetVaultDao(address _targetVault, address _vaultDao) external;
    function changeVaultDao(address _newVaultDao) external;
    function setRegistry(address _newRegistry) external;
    function setBeneficiary(address _vaultDao) external;
    function setFee(uint256 _fee) external;
    function drain() external;

    function getRegistry() external view returns (address);
    function getStorage() external view returns (address vaultDao, string version, uint256 nextVaultId);
    function getEventful() external view returns (address);
    function getVaultsByAddress(address _owner) external view returns (address[]);
}
