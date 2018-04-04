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

/// @title Pool Interface - Interface of pool generic view functions.
/// @author Gabriele Rigo - <gab@rigoblock.com>
/// @notice only public view functions are used
interface PoolFace {

    // CONSTANT PUBLIC FUNCTIONS

    function balanceOf(address _who) external view returns (uint256);
    function totalSupply() external view returns (uint256 totaSupply);
    function getEventful() external view returns (address);
    function getData() external view returns (string name, string symbol, uint sellPrice, uint buyPrice);
    function getAdminData() external view returns (address, address feeCollector, address dragodAO, uint ratio, uint transactionFee, uint32 minPeriod);
}
