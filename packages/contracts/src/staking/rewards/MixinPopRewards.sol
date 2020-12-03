// SPDX-License-Identifier: Apache 2.0

/*

  Original work Copyright 2019 ZeroEx Intl.
  Modified work Copyright 2020 Rigo Intl.

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

pragma solidity >=0.5.9 <0.8.0;
pragma experimental ABIEncoderV2;

import "../../utils/0xUtils/LibMath.sol";
import "../../utils/0xUtils/LibRichErrors.sol";
import "../../utils/0xUtils/LibSafeMath.sol";
import "../libs/LibStakingRichErrors.sol";
import "../interfaces/IStructs.sol";
import "../sys/MixinFinalizer.sol";
import "../staking_pools/MixinStakingPool.sol";
import "./MixinPopManager.sol";


contract MixinPopRewards is
    MixinPopManager,
    MixinStakingPool,
    MixinFinalizer
{
    using LibSafeMath for uint256;

    /// @dev Credits the value of a pool's pop reward.
    ///      Only a known RigoBlock pop can call this method. See
    ///      (MixinPopManager).
    /// @param poolAccount The address of the rigoblock pool account.
    /// @param popReward The pop reward.
    function creditPopReward(
        address poolAccount,
        uint256 popReward
    )
        external
        payable
        onlyPop
    {
        // Get the pool id of the maker address.
        bytes32 poolId = poolIdByRbPoolAccount[poolAccount];

        // Only attribute the pop reward to a pool if the pool account is
        // registered to a pool.
        if (poolId == NIL_POOL_ID) {
            return;
        }

        uint256 poolStake = getTotalStakeDelegatedToPool(poolId).currentEpochBalance;
        // Ignore pools with dust stake.
        if (poolStake < minimumPoolStake) {
            return;
        }

        // Look up the pool stats and aggregated stats for this epoch.
        uint256 currentEpoch_ = currentEpoch;
        IStructs.PoolStats storage poolStatsPtr = poolStatsByEpoch[poolId][currentEpoch_];
        IStructs.AggregatedStats storage aggregatedStatsPtr = aggregatedStatsByEpoch[currentEpoch_];

        // Perform some initialization if this is the pool's first protocol fee in this epoch.
        uint256 feesCollectedByPool = poolStatsPtr.feesCollected;
        if (feesCollectedByPool == 0) {
            // Compute member and total weighted stake.
            (uint256 membersStakeInPool, uint256 weightedStakeInPool) = _computeMembersAndWeightedStake(poolId, poolStake);
            poolStatsPtr.membersStake = membersStakeInPool;
            poolStatsPtr.weightedStake = weightedStakeInPool;

            // Increase the total weighted stake.
            aggregatedStatsPtr.totalWeightedStake = aggregatedStatsPtr.totalWeightedStake.safeAdd(weightedStakeInPool);

            // Increase the number of pools to finalize.
            aggregatedStatsPtr.numPoolsToFinalize = aggregatedStatsPtr.numPoolsToFinalize.safeAdd(1);

            // Emit an event so keepers know what pools earned rewards this epoch.
            emit StakingPoolEarnedRewardsInEpoch(currentEpoch_, poolId);
        }

        // Cap reward to max epoch reward
        uint256 maxEpochReward = getMaxEpochReward(poolStatsPtr.weightedStake);

        // cap reward at 100% of stake annually
        if (popReward > maxEpochReward) {
            popReward = maxEpochReward;
        }

        if (popReward > feesCollectedByPool) {
            // Credit the fees to the pool.
            poolStatsPtr.feesCollected = popReward;

            // Increase the total fees collected this epoch.
            aggregatedStatsPtr.totalFeesCollected = aggregatedStatsPtr
                .totalFeesCollected
                .safeAdd(popReward)
                .safeSub(feesCollectedByPool);
        }
    }

    /// @dev Get stats on a staking pool in this epoch.
    /// @param poolId Pool Id to query.
    /// @return PoolStats struct for pool id.
    function getStakingPoolStatsThisEpoch(bytes32 poolId)
        external
        view
        returns (IStructs.PoolStats memory)
    {
        return poolStatsByEpoch[poolId][currentEpoch];
    }

    /// @dev Computes the members and weighted stake for a pool at the current
    ///      epoch.
    /// @param poolId ID of the pool.
    /// @param totalStake Total (unweighted) stake in the pool.
    /// @return membersStake Non-operator stake in the pool.
    /// @return weightedStake Weighted stake of the pool.
    function _computeMembersAndWeightedStake(
        bytes32 poolId,
        uint256 totalStake
    )
        private
        view
        returns (uint256 membersStake, uint256 weightedStake)
    {
        uint256 operatorStake = getStakeDelegatedToPoolByOwner(
            _poolById[poolId].operator,
            poolId
        ).currentEpochBalance;

        membersStake = totalStake.safeSub(operatorStake);
        weightedStake = operatorStake.safeAdd(
            LibMath.getPartialAmountFloor(
                rewardDelegatedStakeWeight,
                PPM_DENOMINATOR,
                membersStake
            )
        );
        return (membersStake, weightedStake);
    }

    /// @dev Computes the reward owed to a pool during finalization.
    ///      Does nothing if the pool is already finalized.
    /// @param poolId The pool's ID.
    /// @return totalReward The total reward owed to a pool.
    /// @return membersStake The total stake for all non-operator members in
    ///         this pool.
    function _getUnfinalizedPoolRewards(bytes32 poolId)
        internal
        view
        virtual
        override(MixinFinalizer, MixinStakingPool)
        returns (
            uint256 totalReward,
            uint256 membersStake)
    {
        (totalReward, membersStake) = MixinFinalizer._getUnfinalizedPoolRewards(poolId);
    }

    /// @dev Asserts that a pool has been finalized last epoch.
    /// @param poolId The id of the pool that should have been finalized.
    function _assertPoolFinalizedLastEpoch(bytes32 poolId)
        internal
        view
        virtual
        override(MixinFinalizer, MixinStakingPool)
    {
        return MixinFinalizer._assertPoolFinalizedLastEpoch(poolId);
    }
}
