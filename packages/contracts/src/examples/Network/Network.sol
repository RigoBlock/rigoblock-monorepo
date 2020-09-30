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

pragma solidity 0.5.0;

import { PoolFace as Pool } from "../../utils/Pool/PoolFace.sol";
import { DragoRegistryFace as DragoRegistry } from "../../protocol/DragoRegistry/DragoRegistry.sol";

/// @title Network - Returns data of active pools and network value.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Network {

    address public DRAGOREGISTRYADDRESS;

    constructor(
        address dragoRegistryAddress)
        public
    {
        DRAGOREGISTRYADDRESS = dragoRegistryAddress;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Returns two arrays of prices and total supply
    /// @return Array of addressed of the active pools
    /// @return Array of the prices of the active pools
    /// @return Array of the number of tokens of each pool
    function getPoolsPrices()
        external view
        returns (
            address[] memory poolAddresses,
            uint256[] memory poolPrices,
            uint256[] memory totalTokens
        )
    {
        uint256 length = DragoRegistry(DRAGOREGISTRYADDRESS).dragoCount();
        for (uint256 i = 0; i < length; ++i) {
            bool active = isActive(i);
            if (!active) {
                continue;
            }
            (address poolAddress, ) = addressFromId(i);
            poolAddresses[i] = poolAddress;
            Pool poolInstance = Pool(poolAddress);
            uint256 poolPrice = poolInstance.calcSharePrice();
            poolPrices[i] = poolPrice;
            totalTokens[i] = poolInstance.totalSupply();
        }
    }

    /// @dev Returns the value of the assets in the rigoblock network
    /// @return Value of the rigoblock network in wei
    /// @return Number of active funds
    function calcNetworkValue()
        external view
        returns (
            uint256 networkValue,
            uint256 numberOfPools
        )
    {
        numberOfPools = DragoRegistry(DRAGOREGISTRYADDRESS).dragoCount();
        for (uint256 i = 0; i < numberOfPools; ++i) {
            bool active = isActive(i);
            if (!active) {
                continue;
            }
            (uint256 poolValue, ) = calcPoolValue(i);
            networkValue += poolValue;
        }
    }
    
    /// @dev Returns the value of the assets in the rigoblock network given a mock input
    /// @param mockInput Random number, must be 1 for querying data
    /// @return Value of the rigoblock network in wei
    /// @return Number of active funds
    function calcNetworkValueDuneAnalytics(uint256 mockInput)
        external view
        returns (
            uint256 networkValue,
            uint256 numberOfPools
        )
    {
        if(mockInput > uint256(1)) {
            return (uint256(0), uint256(0));
        }
        numberOfPools = DragoRegistry(DRAGOREGISTRYADDRESS).dragoCount();
        for (uint256 i = 0; i < numberOfPools; ++i) {
            bool active = isActive(i);
            if (!active) {
                continue;
            }
            (uint256 poolValue, ) = calcPoolValue(i);
            networkValue += poolValue;
        }
    }


    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev Checks whether a pool is registered and active
    /// @param poolId Id of the pool
    /// @return Bool the pool is active
    function isActive(uint256 poolId)
        internal view
        returns (bool)
    {
        (address poolAddress, , , , , ) = DragoRegistry(DRAGOREGISTRYADDRESS).fromId(poolId);
        if (poolAddress != address(0)) {
            return true;
        }
    }

    /// @dev Returns the address and the group of a pool from its id
    /// @param poolId Id of the pool
    /// @return Address of the target pool
    /// @return Address of the pool's group
    function addressFromId(uint256 poolId)
        internal view
        returns (
            address poolAddress,
            address groupAddress
        )
    {
        (poolAddress, , , , , groupAddress) = DragoRegistry(DRAGOREGISTRYADDRESS).fromId(poolId);
    }

    /// @dev Returns the price a pool from its id
    /// @param poolId Id of the pool
    /// @return Price of the pool in wei
    /// @return Number of tokens of a pool (totalSupply)
    function getPoolPrice(uint256 poolId)
        internal view
        returns (
            uint256 poolPrice,
            uint256 totalTokens
        )
    {
        (address poolAddress, ) = addressFromId(poolId);
        Pool poolInstance = Pool(poolAddress);
        poolPrice = poolInstance.calcSharePrice();
        totalTokens = poolInstance.totalSupply();
    }

    /// @dev Returns the address and the group of a pool from its id
    /// @param poolId Id of the pool
    /// @return Address of the target pool
    /// @return Address of the pool's group
    function calcPoolValue(uint256 poolId)
        internal view
        returns (
            uint256 aum,
            bool success
        )
    {
        (uint256 price, uint256 supply) = getPoolPrice(poolId);
        return ((aum = (price * supply / 1000000)), true); //1000000 is the base (decimals)
    }
}
