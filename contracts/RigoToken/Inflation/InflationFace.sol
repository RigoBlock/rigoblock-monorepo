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

pragma solidity ^0.4.21;
pragma experimental "v0.5.0";

/// @title Inflation Interface - Allows interaction with the Inflation contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface InflationFace {

    // CORE FUNCTIONS

    function mintInflation(address _thePool, uint _reward) external returns (bool);
    function setInflationFactor(address _group, uint _inflationFactor) external;
    function setMinimumRigo(uint _minimum) external;
    function setRigoblock(address _newRigoblock) external;
    function setAuthority(address _authority) external;
    function setPeriod(uint _newPeriod) external;

    // CONSTANT PUBLIC FUNCTIONS

    function canWithdraw(address _thePool) external view returns (bool);
    function getInflationFactor(address _group) external view returns (uint);
}
