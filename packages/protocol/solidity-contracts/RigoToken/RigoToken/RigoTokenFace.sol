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

/// @title Rigo Token Interface - Allows interaction with the Rigo token.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface RigoTokenFace {

    // EVENTS

    event TokenMinted(address indexed recipient, uint256 amount);

    // CORE FUNCTIONS

    function mintToken(address _recipient, uint256 _amount) external;
    function changeMintingAddress(address _newAddress) external;
    function changeRigoblockAddress(address _newAddress) external;

    // CONSTANT PUBLIC FUNCTIONS

    function getName() external view returns (string);
    function getSymbol() external view returns (string);
    function getDecimals() external view returns (uint256);
    function getMinter() external view returns (address);
    function getRigoblock() external view returns (address);
    function getInflationFactor(address _group) external view returns (uint256);
}
