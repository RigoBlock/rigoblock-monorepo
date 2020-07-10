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

pragma solidity 0.6.11;

import { Owned } from "../../utils/Owned/Owned.sol";
import { AuthorityFace as Authority } from "../../protocol/authorities/Authority/AuthorityFace.sol";
import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { InflationFace } from "./InflationFace.sol";

interface RigoToken {

    function mintToken(address _recipient, uint256 _amount) external;
    function changeMintingAddress(address _newAddress) external;
    function changeRigoblockAddress(address _newAddress) external;

    function balanceOf(address _who) external view returns (uint256);
}

/// @title Inflation - Allows ProofOfPerformance to mint tokens.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract Inflation is
    SafeMath,
    InflationFace
{
    address public RIGOTOKENADDRESS;

    uint256 public period = 1 days;
    uint256 public minimumGRG = 10**18;
    address public proofOfPerformance;
    address public authority;
    address public rigoblockDao;

    mapping(address => Performer) performers;
    mapping(address => Group) groups;

    struct Performer {
        uint256 claimedTokens;
        mapping(uint256 => bool) claim;
        uint256 startTime;
        uint256 endTime;
        uint256 epoch;
    }

    struct Group {
        uint256 epochReward;
    }

    /// @notice in order to qualify for PoP user has to hold minimum rigo token
    modifier minimumRigo(address _ofPool) {
        RigoToken rigoToken = RigoToken(RIGOTOKENADDRESS);
        require(
            rigoToken.balanceOf(getPoolOwner(_ofPool)) >= minimumGRG,
            "BELOW_MINIMUM_GRG"
        );
        _;
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
            "ONLY_POP_CONTRACT"
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

    modifier timeAtLeast(address _thePool) {
        require(
            block.timestamp >= performers[_thePool].endTime,
            "TIME_NOT_ENOUGH"
        );
        _;
    }

    constructor(
        address _rigoTokenAddress,
        address _proofOfPerformance,
        address _authority)
        public
    {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        rigoblockDao = msg.sender;
        proofOfPerformance = _proofOfPerformance;
        authority = _authority;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows ProofOfPerformance to mint rewards
    /// @param _thePool Address of the target pool
    /// @param _reward Number of reward in Rigo tokens
    /// @return Bool the transaction executed correctly
    function mintInflation(address _thePool, uint256 _reward)
        external
        override
        onlyProofOfPerformance
        minimumRigo(_thePool)
        timeAtLeast(_thePool)
        returns (bool)
    {
        performers[_thePool].startTime = block.timestamp;
        performers[_thePool].endTime = block.timestamp + period;
        ++performers[_thePool].epoch;
        uint256 reward = _reward * 95 / 100; //5% royalty to rigoblock dao
        uint256 rigoblockReward = safeSub(_reward, reward);
        RigoToken rigoToken = RigoToken(RIGOTOKENADDRESS);
        rigoToken.mintToken(getPoolOwner(_thePool), reward);
        rigoToken.mintToken(rigoblockDao, rigoblockReward);
        return true;
    }

    /// @dev Allows rigoblock dao to set the inflation factor for a group
    /// @param _group Address of the group/factory
    /// @param _inflationFactor Value of the reward factor
    function setInflationFactor(address _group, uint256 _inflationFactor)
        external
        override
        onlyRigoblockDao
        isApprovedFactory(_group)
    {
        groups[_group].epochReward = _inflationFactor;
    }

    /// @dev Allows rigoblock dao to set the minimum number of required tokens
    /// @param _minimum Number of minimum tokens
    function setMinimumRigo(uint256 _minimum)
        external
        override
        onlyRigoblockDao
    {
        minimumGRG = _minimum;
    }

    /// @dev Allows rigoblock dao to upgrade its address
    /// @param _newRigoblock Address of the new rigoblock dao
    function setRigoblock(address _newRigoblock)
        external
        override
        onlyRigoblockDao
    {
        rigoblockDao = _newRigoblock;
    }

    /// @dev Allows rigoblock dao to update the authority
    /// @param _authority Address of the authority
    function setAuthority(address _authority)
        external
        override
        onlyRigoblockDao
    {
        authority = _authority;
    }

    /// @dev Allows rigoblock dao to update proof of performance
    /// @param _pop Address of the Proof of Performance contract
    function setProofOfPerformance(address _pop)
        external
        override
        onlyRigoblockDao
    {
        proofOfPerformance = _pop;
    }

    /// @dev Allows rigoblock dao to set the minimum time between reward collection
    /// @param _newPeriod Number of seconds between 2 rewards
    /// @notice set period on shorter subsets of time for testing
    function setPeriod(uint256 _newPeriod)
        external
        override
        onlyRigoblockDao
    {
        period = _newPeriod;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Returns whether a wizard can claim reward tokens
    /// @param _thePool Address of the target pool
    /// @return Bool the wizard can claim
    function canWithdraw(address _thePool)
        external
        override
        view
        returns (bool)
    {
        if (block.timestamp >= performers[_thePool].endTime) {
            return true;
        }
    }

    /// @dev Returns how much time needed until next claim
    /// @param _thePool Address of the target pool
    /// @return Number in seconds
    function timeUntilClaim(address _thePool)
        external
        override
        view
        returns (uint256)
    {
        if (block.timestamp < performers[_thePool].endTime) {
            return (performers[_thePool].endTime);
        }
    }

    /// @dev Return the reward factor for a group
    /// @param _group Address of the group
    /// @return Value of the reward factor
    function getInflationFactor(address _group)
        external
        override
        view
        returns (uint256)
    {
        return groups[_group].epochReward;
    }

    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev Returns the address of the pool owner
    /// @param _ofPool Number of the registered pool
    /// @return Address of the pool owner
    function getPoolOwner(address _ofPool)
        internal
        view
        returns (address)
    {
        return Owned(_ofPool).owner();
    }
}
