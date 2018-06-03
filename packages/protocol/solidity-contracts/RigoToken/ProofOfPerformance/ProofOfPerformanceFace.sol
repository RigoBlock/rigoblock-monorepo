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

pragma solidity ^0.4.23;
pragma experimental "v0.5.0";

/// @title Proof of Performance Interface - Allows interaction with the PoP contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface ProofOfPerformanceFace {

    // CORE FUNCTIONS

    function claimPop(uint _ofPool) external;
    function setRegistry(address _dragoRegistry) external;
    function setRigoblockDao(address _rigoblockDao) external;
    function setRatio(address _ofGroup, uint _ratio) external;
    function setMinimumRigo(uint256 _amount) external;

    // CONSTANT PUBLIC FUNCTIONS
    
    function getPoolData(uint _ofPool)
        external view
        returns (
            bool active,
            address thePoolAddress,
            address thePoolGroup,
            uint thePoolPrice,
            uint thePoolSupply,
            uint poolValue,
            uint epochReward,
            uint ratio,
            uint pop
        );

    function getHwm(uint _ofPool) external view returns (uint);
    function getPoolPrices() external view returns (address[] pools, uint[] poolPrices, uint[] totalTokens);
    function calcNetworkValue() external view returns (uint networkValue, uint numberOfFunds);
}
