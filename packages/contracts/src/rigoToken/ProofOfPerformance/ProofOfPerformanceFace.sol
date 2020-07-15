/*

 Copyright 2017-2019 RigoBlock, Rigo Investment Sagl, 2020 Rigo Intl.

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

pragma solidity >=0.4.22 <0.6.0;

/// @title Proof of Performance Interface - Allows interaction with the PoP contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface ProofOfPerformanceFace {

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows anyone to allocate the pop reward to pool wizards.
    /// @param poolId Number of pool id in registry.
    function claimPop(uint256 poolId) external;

    /// @dev Allows RigoBlock Dao to update the pools registry.
    /// @param _dragoRegistry Address of new registry.
    function setRegistry(address _dragoRegistry) external;

    /// @dev Allows RigoBlock Dao to update its address.
    /// @param _rigoblockDao Address of new dao.
    function setRigoblockDao(address _rigoblockDao) external;

    /// @dev Allows RigoBlock Dao to set the ratio between assets and performance reward for a group.
    /// @param _ofGroup Id of the pool.
    /// @param _ratio Id of the pool.
    /// @notice onlyRigoblockDao can set ratio.
    function setRatio(address _ofGroup, uint256 _ratio) external;

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Gets data of a pool.
    /// @param poolId Id of the pool.
    /// @return active Bool the pool is active.
    /// @return thePoolAddress address of the pool.
    /// @return thePoolGroup address of the pool factory.
    /// @return thePoolPrice price of the pool in wei.
    /// @return thePoolSupply total supply of the pool in units.
    /// @return poolValue total value of the pool in wei.
    /// @return epochReward value of the reward factor or said pool.
    /// @return ratio of assets/performance reward (from 0 to 10000).
    /// @return pop value of the pop reward to be claimed in GRGs.
    function getPoolData(uint256 poolId)
        external
        view
        returns (
            bool active,
            address thePoolAddress,
            address thePoolGroup,
            uint256 thePoolPrice,
            uint256 thePoolSupply,
            uint256 poolValue,
            uint256 epochReward,
            uint256 ratio,
            uint256 pop
        );

    /// @dev Returns the highwatermark of a pool.
    /// @param poolId Id of the pool.
    /// @return Value of the all-time-high pool nav.
    function getHwm(uint256 poolId) external view returns (uint256);

    /// @dev Returns the reward factor for a pool.
    /// @param poolId Id of the pool.
    /// @return Value of the reward factor.
    function getEpochReward(uint256 poolId)
        external
        view
        returns (uint256);

    /// @dev Returns the split ratio of asset and performance reward.
    /// @param poolId Id of the pool.
    /// @return Value of the ratio from 1 to 100.
    function getRatio(uint256 poolId)
        external
        view
        returns (uint256);

    /// @dev Returns the proof of performance reward for a pool.
    /// @param poolId Id of the pool.
    /// @return popReward Value of the pop reward in Rigo tokens.
    /// @return performanceReward Split of the performance reward in Rigo tokens.
    /// @notice epoch reward should be big enough that it.
    /// @notice can be decreased if number of funds increases.
    /// @notice should be at least 10^6 (just as pool base) to start with.
    /// @notice rigo token has 10^18 decimals.
    function proofOfPerformance(uint256 poolId)
        external
        view
        returns (uint256 popReward, uint256 performanceReward);

    /// @dev Checks whether a pool is registered and active.
    /// @param poolId Id of the pool.
    /// @return Bool the pool is active.
    function isActive(uint256 poolId)
        external
        view
        returns (bool);

    /// @dev Returns the address and the group of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return pool Address of the target pool.
    /// @return group Address of the pool's group.
    function addressFromId(uint256 poolId)
        external
        view
        returns (
            address pool,
            address group
        );

    /// @dev Returns the price a pool from its id.
    /// @param poolId Id of the pool.
    /// @return thePoolPrice Price of the pool in wei.
    /// @return totalTokens Number of tokens of a pool (totalSupply).
    function getPoolPrice(uint256 poolId)
        external
        view
        returns (
            uint256 thePoolPrice,
            uint256 totalTokens
        );

    /// @dev Returns the value of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return aum Total value of the pool in ETH.
    function calcPoolValue(uint256 poolId)
        external
        view
        returns (
            uint256 aum
        );
}
