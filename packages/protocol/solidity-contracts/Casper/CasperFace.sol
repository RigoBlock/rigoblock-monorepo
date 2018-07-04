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

/// @title Casper Interface - Allows interaction with the Casoper contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface CasperFace {

    function deposit(address validation_addr, address withdrawal_addr) external payable;
    function withdraw(uint128 _validator_index) external;

    function deposit_size(uint128 _validator_index) external view returns (uint128);
    function nextValidatorIndex() external view returns (uint128);
}
