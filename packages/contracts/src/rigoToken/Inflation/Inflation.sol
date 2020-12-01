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
    
    function minimumPoolStake()
        external
        view
        returns (uint256);
    
    function epochDurationInSeconds()
        external
        view
        returns (uint256);
}

/// @title Inflation - Allows ProofOfPerformance to mint tokens.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract Inflation is
    SafeMath,
    InflationFace
{
    address public RIGOTOKENADDRESS;
    address public STAKINGPROXYADDRESS;

    uint256 public slot;
    address public authorityAddress;
    address public rigoblockDaoAddress;

    mapping(bytes32 => Performer) performers;
    mapping(address => Group) groups;

    struct Performer {
        uint256 claimedTokens;
        mapping(uint256 => bool) claim;
        uint256 startTime;
        uint256 endTime;
    }

    struct Group {
        uint256 epochReward;
    }

    modifier onlyRigoblockDao {
        _assertCallerIsRigoblockDao();
        _;
    }

    modifier onlyStakingProxy {
        _assertCallerIsStakingProxy();
        _;
    }

    modifier isApprovedFactory(address _factory) {
        _assertIsApprovedFactory(_factory);
        _;
    }

    constructor(
        address _rigoTokenAddress,
        address _stakingProxyAddress,
        address _authorityAddress
    )
        public
    {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        STAKINGPROXYADDRESS = _stakingProxyAddress;
        rigoblockDaoAddress = msg.sender;
        authorityAddress = _authorityAddress;
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
        onlyStakingProxy
        returns (uint256)
    {
        //TODO: test
        // in case of staking parameters upgrade, the following conditions may be met
        // parameters should be updated towards end of an epoch to prevent invalidating rewards
        if (block.timestamp < performers[stakingPoolId].endTime) {
            return uint256(0);
        }
        
        //TODO: test
        uint256 totalGrgDelegatedToPool = _getTotalGrgDelegatedToPool(stakingPoolId);
        
        if (reward > getMaxEpochReward(totalGrgDelegatedToPool)) {
            return uint256(0);
        }
        
        performers[stakingPoolId].startTime = block.timestamp;
        performers[stakingPoolId].endTime = block.timestamp + Staking(STAKINGPROXYADDRESS).epochDurationInSeconds();
        ++slot;
        uint256 rigoblockDaoReward = reward * 5 / 100; //5% royalty to rigoblock dao
        RigoTokenFace rigoToken = RigoTokenFace(RIGOTOKENADDRESS);
        // TODO: test
        rigoToken.mintToken(rigoblockDaoAddress, rigoblockDaoReward);
        rigoToken.mintToken(
            STAKINGPROXYADDRESS,
            reward
        );
        return reward;
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

    /// @dev Allows rigoblock dao to upgrade its address.
    /// @param newRigoblockDaoAddress Address of the new rigoblock dao.
    function setRigoblock(address newRigoblockDaoAddress)
        external
        onlyRigoblockDao
    {
        rigoblockDaoAddress = newRigoblockDaoAddress;
    }

    /// @dev Allows rigoblock dao to update the authority.
    /// @param newAuthorityAddress Address of the authority.
    function setAuthority(address newAuthorityAddress)
        external
        onlyRigoblockDao
    {
        authorityAddress = newAuthorityAddress;
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
            return (performers[stakingPoolId].endTime - block.timestamp);
        } else return (uint256(0));
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
    
    /// @dev Returns the max epoch reward of a pool.
    /// @param totalGrgDelegatedToPool Total amount of GRG delegated to the pool.
    /// @return Value of the maximum pool reward.
    function getMaxEpochReward(uint256 totalGrgDelegatedToPool) public view returns (uint256) {
        return safeDiv(
            totalGrgDelegatedToPool * Staking(STAKINGPROXYADDRESS).epochDurationInSeconds(),
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
        return uint256(
            Staking(STAKINGPROXYADDRESS)
            .getTotalStakeDelegatedToPool(stakingPoolId)
            .currentEpochBalance
        );
    }
    
    /// @dev Asserts that the caller is the RigoBlock Dao.
    function _assertCallerIsRigoblockDao()
        internal
        view
    {
        if (msg.sender != rigoblockDaoAddress) {
            revert("CALLER_NOT_RIGOBLOCK_DAO_ERROR");
        }
    }
    
    /// @dev Asserts that the caller is the Staking Proxy.
    function _assertCallerIsStakingProxy()
        internal
        view
    {
        if (msg.sender != STAKINGPROXYADDRESS) {
            revert("CALLER_NOT_STAKING_PROXY_ERROR");
        }
    }
    
    /// @dev Asserts that an address is an approved factory.
    /// @param _factory Address of the target factory.
    function _assertIsApprovedFactory(address _factory)
        internal
        view
    {
        if (!Authority(authorityAddress).isWhitelistedFactory(_factory)) 
        {
            revert("NOT_APPROVED_AUTHORITY_ERROR");
        }
    }
    
    /// @dev Returns the value of the disinflationary divisor.
    /// @return Value of the divisor.
    function _getDisinflationaryDivisor() internal view returns (uint256) {
        uint256 firstHalving = uint256(1639130400); // 10 Dec 2021 10:00pm UTC
        if (block.timestamp < firstHalving) {
            return uint256(1);
        } else if (block.timestamp < firstHalving + 52 weeks) {
            return uint256(2);
        } else return uint256(4);
    }
}
