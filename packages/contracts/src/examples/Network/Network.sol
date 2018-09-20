/*

 Copyright 2018 RigoBlock, Rigo Investment Sagl.

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

pragma solidity ^0.4.24;
pragma experimental "v0.5.0";

import { PoolFace as Pool } from "../utils/Pool/PoolFace.sol";
import { DragoRegistryFace as DragoRegistry } from "../Registry/DragoRegistry.sol";

/// @title Network - Returns data of active funds and network value.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Network {

    address public dragoRegistry;

    constructor(
        address _dragoRegistry)
        public
    {
        dragoRegistry = _dragoRegistry;
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
            address[] pools,
            uint256[] poolPrices,
            uint256[] totalTokens
        )
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        uint256 length = registry.dragoCount();
        for (uint256 i = 0; i < length; ++i) {
            bool active = isActive(i);
            if (!active) {
                continue;
            }
            (address fund, ) = addressFromId(i);
            pools[i] = fund;
            Pool pool = Pool(fund);
            uint256 thePoolPrice = pool.calcSharePrice();
            poolPrices[i] = thePoolPrice;
            totalTokens[i] = pool.totalSupply();
        }
    }

    /// @dev Returns the value of the assets in the rigoblock network
    /// @return Value of the rigoblock network in wei
    /// @return Number of active funds
    function calcNetworkValue()
        external view
        returns (
            uint256 networkValue,
            uint256 numberOfFunds
        )
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        uint256 length = registry.dragoCount();
        for (uint256 i = 0; i < length; ++i) {
            bool active = isActive(i);
            if (!active) {
                continue;
            }
            (uint256 poolValue, ) = calcPoolValue(i);
            networkValue += poolValue;
        }
        return (networkValue, length);
    }


    /*
    * INTERNAL FUNCTIONS
    */

    /// @dev Checks whether a pool is registered and active
    /// @param _ofPool Id of the pool
    /// @return Bool the pool is active
    function isActive(uint256 _ofPool)
        internal view
        returns (bool)
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        (address thePool, , , , , ) = registry.fromId(_ofPool);
        if (thePool != address(0)) {
            return true;
        }
    }

    /// @dev Returns the address and the group of a pool from its id
    /// @param _ofPool Id of the pool
    /// @return Address of the target pool
    /// @return Address of the pool's group
    function addressFromId(uint256 _ofPool)
        internal view
        returns (
            address pool,
            address group
        )
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        (pool, , , , , group) = registry.fromId(_ofPool);
        return (pool, group);
    }

    /// @dev Returns the price a pool from its id
    /// @param _ofPool Id of the pool
    /// @return Price of the pool in wei
    /// @return Number of tokens of a pool (totalSupply)
    function getPoolPrice(uint256 _ofPool)
        internal view
        returns (
            uint256 thePoolPrice,
            uint256 totalTokens
        )
    {
        (address poolAddress, ) = addressFromId(_ofPool);
        Pool pool = Pool(poolAddress);
        thePoolPrice = pool.calcSharePrice();
        totalTokens = pool.totalSupply();
    }

    /// @dev Returns the address and the group of a pool from its id
    /// @param _ofPool Id of the pool
    /// @return Address of the target pool
    /// @return Address of the pool's group
    function calcPoolValue(uint256 _ofPool)
        internal view
        returns (
            uint256 aum,
            bool success
        )
    {
        (uint256 price, uint256 supply) = getPoolPrice(_ofPool);
        return ((aum = (price * supply / 1000000)), true); //1000000 is the base (decimals)
    }
}
