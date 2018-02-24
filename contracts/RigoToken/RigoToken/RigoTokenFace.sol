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

pragma solidity ^0.4.20;

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

  //function balanceOf(address _owner) constant returns (uint256 balance) {}
  //function totalSupply() constant returns (uint256 totalSupply) {}
  function getName() public constant returns (string) {}
  function getSymbol() public constant returns (string) {}
  function getDecimals() public constant returns (uint) {}
  function getMinter() public constant returns (address) {}
  function getRigoblock() public constant returns (address) {}
  function getInflationFactor(address _group) public constant returns (uint) {}
}
