// SPDX-License-Identifier: Apache 2.0

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

// solhint-disable-next-line
pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;

import { AuthorityFace as Authority } from "../../protocol/authorities/Authority/AuthorityFace.sol";
import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { InflationFace } from "./InflationFace.sol";
import { RigoTokenFace } from "../RigoToken/RigoTokenFace.sol";
import { IStaking } from "../../staking/interfaces/IStaking.sol";


/// @title Inflation - Allows ProofOfPerformance to mint tokens.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract Inflation is
    SafeMath,
    InflationFace
{
    /* solhint-disable */
    // TODO: check
    uint256 public immutable INFLATIONRATE = 200; // in bps, 200 = 2%
    address public immutable RIGOTOKENADDRESS;
    address public immutable STAKINGPROXYADDRESS;
    /* solhint-disable */

    uint256 public slot;
    uint256 public epochLength = 14 days;
    uint256 epochEndTime;
    address public authorityAddress;
    address public rigoblockDaoAddress;

    mapping (address => Group) public groupByAddress;

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
    ) {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        STAKINGPROXYADDRESS = _stakingProxyAddress;
        rigoblockDaoAddress = msg.sender;
        authorityAddress = _authorityAddress;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows staking proxy to mint rewards.
    /// @return mintedReward Number of allocated reward.
    function mintInflation()
        external
        override
        onlyStakingProxy
        returns (uint256 mintedReward)
    {
        //TODO: test
        // solhint-disable-next-line not-rely-on-time
        if (block.timestamp < epochEndTime) {
            revert("NOT_ENOUGH_TIME_ERROR");
        }

        (uint256 epochDurationInSeconds, , , , ) = IStaking(STAKINGPROXYADDRESS).getParams();

        // sanity check for epoch length queried from staking
        if (epochLength != epochDurationInSeconds) {
            if (epochDurationInSeconds < 5 days || epochDurationInSeconds > 90 days) {
                revert("STAKING_EPOCH_TIME_ANOMALY_DETECTED_ERROR");
            } else {
                epochLength = epochDurationInSeconds;
            }
        }

        //TODO: test
        uint256 epochTotalReward = getEpochReward();

        /* solhint-disable not-rely-on-time */
        //performers[stakingPoolId].startTime = block.timestamp;
        epochEndTime = block.timestamp + epochLength;
        /* solhint-disable not-rely-on-time */

        ++slot;

        // TODO: test
        // mint rewards
        RigoTokenFace(RIGOTOKENADDRESS).mintToken(
            STAKINGPROXYADDRESS,
            epochTotalReward
        );
        return (mintedReward = epochTotalReward);
    }

    /// @dev Allows rigoblock dao to set the inflation factor for a group.
    /// @param groupAddress Address of the group/factory.
    /// @param inflationFactor Value of the reward factor.
    function setInflationFactor(address groupAddress, uint256 inflationFactor)
        external
        override
        onlyRigoblockDao
        isApprovedFactory(groupAddress)
    {
        groupByAddress[groupAddress].epochReward = inflationFactor;
    }

    /// @dev Allows rigoblock dao to upgrade its address.
    /// @param newRigoblockDaoAddress Address of the new rigoblock dao.
    function setRigoblock(address newRigoblockDaoAddress)
        external
        override
        onlyRigoblockDao
    {
        rigoblockDaoAddress = newRigoblockDaoAddress;
    }

    /// @dev Allows rigoblock dao to update the authority.
    /// @param newAuthorityAddress Address of the authority.
    function setAuthority(address newAuthorityAddress)
        external
        override
        onlyRigoblockDao
    {
        authorityAddress = newAuthorityAddress;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Returns whether an epoch has ended.
    /// @return Bool the wizard can claim.
    function epochEnded()
        external
        override
        view
        returns (bool)
    {
        // solhint-disable-next-line not-rely-on-time
        if (block.timestamp >= epochEndTime) {
            return true;
        } else return false;
    }

    /// @dev Returns how much time needed until next claim.
    /// @return Number in seconds.
    function timeUntilNextClaim()
        external
        view
        override
        returns (uint256)
    {
        /* solhint-disable not-rely-on-time */
        if (block.timestamp < epochEndTime) {
            return (epochEndTime - block.timestamp);
        } else return (uint256(0));
        /* solhint-disable not-rely-on-time */
    }

    /// @dev Return the reward factor for a group.
    /// @param groupAddress Address of the group.
    /// @return Value of the reward factor.
    function getInflationFactor(address groupAddress)
        external
        view
        override
        returns (uint256)
    {
        return groupByAddress[groupAddress].epochReward;
    }

    /// @dev Returns the max epoch reward of a pool.
    /// @return Value of the maximum pool reward.
    function getEpochReward()
        public
        view
        override
        returns (uint256)
    {
        // TODO: test
        return safeDiv(
            safeMul(
                RigoTokenFace(RIGOTOKENADDRESS).totalSupply(),
                INFLATIONRATE * epochLength
            ),
            (10000 * 365 days)
        );
    }

    /*
     * INTERNAL METHODS
     */

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
}
