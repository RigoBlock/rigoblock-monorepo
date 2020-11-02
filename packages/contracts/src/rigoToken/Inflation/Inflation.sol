/*

 Copyright 2017-2019 RigoBlock, Rigo Investment Sagl.

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

pragma solidity 0.5.4;
pragma experimental ABIEncoderV2;

import { Owned } from "../../utils/Owned/Owned.sol";
import { AuthorityFace as Authority } from "../../protocol/authorities/Authority/AuthorityFace.sol";
import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { InflationFace } from "./InflationFace.sol";
import { RigoTokenFace } from "../RigoToken/RigoTokenFace.sol";


interface IStructs {
    /// @dev Encapsulates a balance for the current and next epochs.
    /// Note that these balances may be stale if the current epoch
    /// is greater than `currentEpoch`.
    /// @param currentEpoch The current epoch
    /// @param currentEpochBalance Balance in the current epoch.
    /// @param nextEpochBalance Balance in `currentEpoch+1`.
    struct StoredBalance {
        uint64 currentEpoch;
        uint96 currentEpochBalance;
        uint96 nextEpochBalance;
    }
}

interface Staking {

    /// @dev Returns the total stake delegated to a specific staking pool,
    ///      across all members.
    /// @param poolId Unique Id of pool.
    /// @return balance Total stake delegated to pool.
    function getTotalStakeDelegatedToPool(bytes32 poolId)
        external
        view
        returns (IStructs.StoredBalance memory balance);
}

interface GrgVault {
    function stakingProxyAddress() external view returns (address);
}

/// @title Inflation - Allows ProofOfPerformance to mint tokens.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract Inflation is
    SafeMath,
    InflationFace
{
    address public RIGOTOKENADDRESS;
    address public GRG_VAULT_ADDRESS;

    uint256 public period = 14 days;
    uint256 public minimumGRG = 100 * 10**18;
    uint256 public slot;
    address public proofOfPerformance;
    address public authority;
    address public rigoblockDao; // TODO: check if make this private

    mapping(bytes32 => Performer) performers;
    mapping(address => Group) groups;

    struct Performer {
        uint256 highWaterMark;
        uint256 claimedTokens;
        mapping(uint256 => bool) claim;
        uint256 startTime;
        uint256 endTime;
    }

    struct Group {
        uint256 epochReward;
    }

    modifier onlyRigoblockDao {
        require(
            msg.sender == rigoblockDao,
            "ONLY_RIGOBLOCK_DAO"
        );
        _;
    }

    modifier onlyProofOfPerformance {
        require(
            msg.sender == proofOfPerformance,
            "ONLY_PROOF_OF_PERFORMANCE"
        );
        _;
    }

    modifier isApprovedFactory(address _factory) {
        Authority auth = Authority(authority);
        require(
            auth.isWhitelistedFactory(_factory),
            "NOT_APPROVED_AUTHORITY"
        );
        _;
    }

    modifier timeAtLeast(bytes32 stakingPoolId) {
        require(
            block.timestamp >= performers[stakingPoolId].endTime,
            "TIME_NOT_ENOUGH"
        );
        _;
    }

    constructor(
        address _rigoTokenAddress,
        address _grgVaultAddress,
        address _proofOfPerformance,
        address _authority
    )
        public
    {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        GRG_VAULT_ADDRESS = _grgVaultAddress;
        rigoblockDao = msg.sender;
        proofOfPerformance = _proofOfPerformance;
        authority = _authority;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows ProofOfPerformance to mint rewards.
    /// @param stakingPoolId String of the staking pool.
    /// @param reward Number of reward in Rigo tokens.
    /// @return Bool the transaction executed correctly.
    function mintInflation(bytes32 stakingPoolId, uint256 reward)
        external
        onlyProofOfPerformance
        timeAtLeast(stakingPoolId)
        returns (bool)
    {
        //TODO: test
        uint256 totalGrgDelegatedToPool = _getTotalGrgDelegatedToPool(stakingPoolId);
        
        _assertMinimumGrgContraintSatisfied(totalGrgDelegatedToPool);
        _assertRewardNotAboveMaxEpochReward(reward, totalGrgDelegatedToPool);

        performers[stakingPoolId].startTime = block.timestamp;
        performers[stakingPoolId].endTime = block.timestamp + period;
        ++slot;
        uint256 rigoblockDaoReward = reward * 5 / 100; //5% royalty to rigoblock dao
        RigoTokenFace rigoToken = RigoTokenFace(RIGOTOKENADDRESS);
        // TODO: test
        rigoToken.mintToken(rigoblockDao, rigoblockDaoReward);
        rigoToken.mintToken(
            GrgVault(GRG_VAULT_ADDRESS).stakingProxyAddress(), // TODO: check whether mint to this address and later transferFrom
            reward //safeSub(reward, rigoblockDaoReward) // TODO: we must transfer full reward to staking proxy for correct accounting
        );
        return true;
    }

    /// @dev Allows rigoblock dao to set the inflation factor for a group.
    /// @param groupAddress Address of the group/factory.
    /// @param inflationFactor Value of the reward factor.
    function setInflationFactor(address groupAddress, uint256 inflationFactor)
        external
        onlyRigoblockDao
        isApprovedFactory(groupAddress)
    {
        groups[groupAddress].epochReward = inflationFactor;
    }

    /// @dev Allows rigoblock dao to set the minimum number of required tokens.
    /// @param minimum Number of minimum tokens.
    function setMinimumRigo(uint256 minimum)
        external
        onlyRigoblockDao
    {
        require(
            minimum >= 100 * 10**18,
            "MINIMUM_GRG_BELOW_100_ERROR"
        );
        minimumGRG = minimum;
    }

    /// @dev Allows rigoblock dao to upgrade its address.
    /// @param newRigoblockDaoAddress Address of the new rigoblock dao.
    function setRigoblock(address newRigoblockDaoAddress)
        external
        onlyRigoblockDao
    {
        rigoblockDao = newRigoblockDaoAddress;
    }

    /// @dev Allows rigoblock dao to update the authority.
    /// @param authorityAddress Address of the authority.
    function setAuthority(address authorityAddress)
        external
        onlyRigoblockDao
    {
        authority = authorityAddress;
    }

    /// @dev Allows rigoblock dao to update proof of performance.
    /// @param popAddress Address of the Proof of Performance contract.
    function setProofOfPerformance(address popAddress)
        external
        onlyRigoblockDao
    {
        proofOfPerformance = popAddress;
    }

    /// @dev Allows rigoblock dao to set the minimum time between reward collection.
    /// @param newPeriod Number of seconds between 2 rewards.
    /// @notice set period on shorter subsets of time for testing.
    function setPeriod(uint256 newPeriod)
        external
        onlyRigoblockDao
    {
        require(
            newPeriod >= 1 days && newPeriod <= 365 days,
            "PERIOD_TOO_LONG_OR_TOO_SHORT_ERROR"
        );
        period = newPeriod;
    }
    
    /// @dev Returns the high-water mark of a pool.
    /// @param poolPrice Current price of the pool.
    /// @param stakingPoolId Id of the pool.
    function updateHwmIfPositivePerformance(uint256 poolPrice, bytes32 stakingPoolId)
        external
        onlyProofOfPerformance
    {
        if (poolPrice > performers[stakingPoolId].highWaterMark) {
            performers[stakingPoolId].highWaterMark = poolPrice;
        }
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Returns whether a staking pool's reward can be claimed.
    /// @param stakingPoolId Address of the target pool.
    /// @return Bool the wizard can claim.
    function canWithdraw(bytes32 stakingPoolId)
        external
        view
        returns (bool)
    {
        if (block.timestamp >= performers[stakingPoolId].endTime) {
            return true;
        }
    }

    /// @dev Returns how much time needed until next claim.
    /// @param stakingPoolId Address of the target pool.
    /// @return Number in seconds.
    function timeUntilClaim(bytes32 stakingPoolId)
        external
        view
        returns (uint256)
    {
        if (block.timestamp < performers[stakingPoolId].endTime) {
            return (performers[stakingPoolId].endTime);
        }
    }

    /// @dev Return the reward factor for a group.
    /// @param groupAddress Address of the group.
    /// @return Value of the reward factor.
    function getInflationFactor(address groupAddress)
        external
        view
        returns (uint256)
    {
        return groups[groupAddress].epochReward;
    }
    
    /// @dev Returns the high-water mark of a pool.
    /// @param stakingPoolId Id of the pool.
    /// @return Value of the all-time-high pool nav.
    function getHwm(bytes32 stakingPoolId)
        external
        view
        returns (uint256)
    {
        if (performers[stakingPoolId].highWaterMark == 0) {
            return (1 ether);

        } else {
            return performers[stakingPoolId].highWaterMark;
        }
    }
    
    /// @dev Returns the max epoch reward of a pool.
    /// @param totalGrgDelegatedToPool Total amount of GRG delegated to the pool.
    /// @return Value of the maximum pool reward.
    function getMaxEpochReward(uint256 totalGrgDelegatedToPool) public view returns (uint256) {
        return safeDiv(
            totalGrgDelegatedToPool * period,
            _getDisinflationaryDivisor() * 365 days // multiply in order not to dividing in previous line
        );
    }
    
    /*
     * INTERNAL METHODS
     */
    /// @dev Returns the amount of GRG staked to a pool.
    /// @param stakingPoolId ID of the staking pool.
    /// @return Amount of GRG staked.
    function _getTotalGrgDelegatedToPool(bytes32 stakingPoolId) internal view returns (uint256) {
        address stakingProxyAddress = GrgVault(GRG_VAULT_ADDRESS).stakingProxyAddress();
        return uint256(
            Staking(stakingProxyAddress)
            .getTotalStakeDelegatedToPool(stakingPoolId)
            .currentEpochBalance
        );
    }
    
    /// @dev Asserts that the minimum GRG amount is staked.
    /// @param totalGrgDelegatedToPool GRG amount staked to pool.
    function _assertMinimumGrgContraintSatisfied(uint256 totalGrgDelegatedToPool)
        internal
        view
    {
        if (totalGrgDelegatedToPool < minimumGRG) {
            revert("STAKED_GRG_AMOUNT_BELOW_MINIMUM_ERROR");
        }
    }
    
    /// @dev Asserts that the reward is below the maximum allowed.
    /// @param reward Reward to be sent.
    /// @param totalGrgDelegatedToPool GRG amount staked to pool.
    function _assertRewardNotAboveMaxEpochReward(
        uint256 reward,
        uint256 totalGrgDelegatedToPool
    )
        internal
        view
    {
        if (reward > getMaxEpochReward(totalGrgDelegatedToPool)) {
            revert("REWARD_ABOVE_MAX_EPOCH_REWARD_ERROR");
        }
    }
    
    /// @dev Returns the value of the disinflationary divisor.
    /// @return Value of the divisor.
    function _getDisinflationaryDivisor() internal view returns (uint256) {
        uint256 firstHalving = uint256(1636581600); // 10 Nov 2021 10:00pm UTC
        if (block.timestamp < firstHalving) {
            return uint256(1);
        } else if (block.timestamp < firstHalving + 52 weeks) {
            return uint256(2);
        } else return uint256(4);
    }
}
