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

pragma solidity >=0.4.22 <0.8.0;

/// @title Inflation Interface - Allows interaction with the Inflation contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface InflationFace {

    function proofOfPerformance() external view returns (address);
    function period() external view returns (uint256);

    /*
     * CORE FUNCTIONS
     */
    function mintInflation(bytes32 stakingPoolId, uint256 reward) external returns (bool);
    function setInflationFactor(address groupAddress, uint256 inflationFactor) external;
    function setMinimumRigo(uint256 minimum) external;
    function setRigoblock(address newRigoblockDaoAddress) external;
    function setAuthority(address authorityAddress) external;
    function setProofOfPerformance(address popAddress) external;
    function setPeriod(uint256 newPeriod) external;

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    function canWithdraw(bytes32 stakingPoolId) external view returns (bool);
    function timeUntilClaim(bytes32 stakingPoolId) external view returns (uint256);
    function getInflationFactor(address groupAddress) external view returns (uint256);
    function getMaxEpochReward(uint256 totalGrgDelegatedToPool) external view returns (uint256);
}
