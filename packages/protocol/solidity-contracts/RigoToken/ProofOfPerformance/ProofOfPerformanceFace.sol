/*

 Copyright 2017-2018 RigoBlock, Rigo Investment Sagl.

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

/// @title Proof of Performance Interface - Allows interaction with the PoP contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface ProofOfPerformanceFace {

    // CORE FUNCTIONS

    function claimPop(uint256 _ofPool) external;
    function setRegistry(address _dragoRegistry) external;
    function setRigoblockDao(address _rigoblockDao) external;
    function setRatio(address _ofGroup, uint256 _ratio) external;
    function setMinimumRigo(uint256 _amount) external;

    // CONSTANT PUBLIC FUNCTIONS

    function getPoolData(uint256 _ofPool)
        external view
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

    function getHwm(uint256 _ofPool) external view returns (uint256);
    function getPoolPrices() external view returns (address[] pools, uint256[] poolPrices, uint256[] totalTokens);
    function calcNetworkValue() external view returns (uint256 networkValue, uint256 numberOfFunds);
}
