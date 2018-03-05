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

pragma solidity ^0.4.19;

/// @title Rigo Token Interface - Allows interaction with the Rigo token.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract RigoTokenFace {

    // EVENTS

    event TokenMinted(address indexed recipient, uint amount);

    // CORE FUNCTIONS

    function mintToken(address _recipient, uint _amount) external {}
    //function transfer(address _recipient, uint _amount) public returns (bool success) {}
    //function transferFrom(address _sender, address _recipient, uint _amount) public returns (bool success) {}
    function changeMintingAddress(address _newAddress) public {}
    function changeRigoblockAddress(address _newAddress) public {}

    // CONSTANT PUBLIC FUNCTIONS

    //function balanceOf(address _owner) view returns (uint256 balance) {}
    //function totalSupply() view returns (uint256 totalSupply) {}
    function getName() public view returns (string) {}
    function getSymbol() public view returns (string) {}
    function getDecimals() public view returns (uint) {}
    function getMinter() public view returns (address) {}
    function getRigoblock() public view returns (address) {}
    function getInflationFactor(address _group) public view returns (uint) {}
}
