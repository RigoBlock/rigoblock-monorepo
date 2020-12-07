/*

 Copyright 2018-2019 RigoBlock, Rigo Investment Sagl, 2020 Rigo Intl.

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

pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;

/// @title Drago Registry Interface - Allows external interaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface DragoRegistryFace {

    /*
     * CORE FUNCTIONS
     */
    function register(address _drago, string calldata _name, string calldata _symbol, uint256 _dragoId, address _owner) external payable returns (bool);
    function unregister(uint256 _id) external;
    function setMeta(uint256 _id, bytes32 _key, bytes32 _value) external;
    function addGroup(address _group) external;
    function setFee(uint256 _fee) external;
    function updateOwner(uint256 _id) external;
    function updateOwners(uint256[] calldata _id) external;
    function upgrade(address _newAddress) external payable; //payable as there is a transfer of value, otherwise opcode might throw an error
    function setUpgraded(uint256 _version) external;
    function drain() external;

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    function dragoCount() external view returns (uint256);
    function fromId(uint256 _id) external view returns (address drago, string memory name, string memory symbol, uint256 dragoId, address owner, address group);
    function fromAddress(address _drago) external view returns (uint256 id, string memory name, string memory symbol, uint256 dragoId, address owner, address group);
    function fromName(string calldata _name) external view returns (uint256 id, address drago, string memory symbol, uint256 dragoId, address owner, address group);
    function getNameFromAddress(address _pool) external view returns (string memory);
    function getSymbolFromAddress(address _pool) external view returns (string memory);
    function meta(uint256 _id, bytes32 _key) external view returns (bytes32);
    function getGroups() external view returns (address[] memory);
    function getFee() external view returns (uint256);
}

/// @title Multiple Balances Helper - Allows to receive a list of pools for a specific group.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract HGetPools {
    
    struct PoolBaseData {
        address poolAddress;
        string name;
        string symbol;
        uint256 poolId;
        address owner;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Returns structs of infos on a list of dragos for a group.
    /// @param _dragoRegistry Address of the pools registry.
    /// @param _group Number of the target drago group.
    /// @return Arrays of structs of data and related address of a pool.
    function queryAllPoolsByGroup(
        address _dragoRegistry,
        address _group)
        external
        view
        returns (
            PoolBaseData[] memory
        )
    {
        DragoRegistryFace dragoRegistryInstance = DragoRegistryFace(_dragoRegistry);
        uint256 length = dragoRegistryInstance.dragoCount();
        PoolBaseData[] memory poolBaseData = new PoolBaseData[](length);
        address[] memory groups = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            ( , , , , , groups[i]) = dragoRegistryInstance.fromId(i);
            if (groups[i] != _group) continue;
            (
                poolBaseData[i].poolAddress,
                poolBaseData[i].name,
                poolBaseData[i].symbol,
                poolBaseData[i].poolId,
                poolBaseData[i].owner,
                
            ) = dragoRegistryInstance.fromId(i);
        }
        return (poolBaseData);
    }

    /// @dev Returns structs of infos on a list of dragos for a group.
    /// @param _dragoRegistry Address of the pools registry.
    /// @param _group Number of the target drago group.
    /// @return Arrays of structs of data and related address of a pool.
    function queryAllPoolsByCaller(
        address _dragoRegistry,
        address _group)
        external
        view
        returns (
            PoolBaseData[] memory
        )
    {
        DragoRegistryFace dragoRegistryInstance = DragoRegistryFace(_dragoRegistry);
        uint256 length = dragoRegistryInstance.dragoCount();
        PoolBaseData[] memory poolBaseData = new PoolBaseData[](length);
        address[] memory groups = new address[](length);
        address[] memory owners = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            ( , , , , owners[i], groups[i]) = dragoRegistryInstance.fromId(i);
            if (groups[i] != _group || owners[i] != address(msg.sender)) continue;
            (
                poolBaseData[i].poolAddress,
                poolBaseData[i].name,
                poolBaseData[i].symbol,
                poolBaseData[i].poolId,
                poolBaseData[i].owner,

            ) = dragoRegistryInstance.fromId(i);
        }
        return (poolBaseData);
    }
}