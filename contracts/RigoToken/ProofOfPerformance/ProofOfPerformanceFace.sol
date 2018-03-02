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

/// @title Proof of Performance Interface - Allows interaction with the PoP contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract ProofOfPerformanceFace {

  // CORE FUNCTIONS

  function claimPop(uint _ofPool) public {}
  function setRegistry(address _dragoRegistry) external {}
  function setRigoblockDao(address _rigoblockDao) external {}
  function setRatio(address _ofGroup, uint _ratio) public {}
  function setMinimumRigo(uint256 _amount) external {}

  // CONSTANT PUBLIC FUNCTIONS

  function isActive(uint _ofPool) public constant returns (bool) {}
  function addressFromId(uint _ofPool) public constant returns (address pool, address group) {}
  function getPoolPrice(uint _ofPool) public constant returns (uint thePoolPrice, uint totalTokens) {}
  function getPoolPrices() public constant returns (address[] pools, uint[] poolPrices, uint[] totalTokens) {}
  function calcPoolValue(uint256 _ofPool) public /*internal*/ constant returns (uint256 aum, bool success) {}
  function calcNetworkValue() public constant returns (uint networkValue, uint numberOfFunds) {}
  function getEpochReward(uint _ofPool) public constant returns (uint) {}
  function getRatio(uint _ofPool) public constant returns (uint) {}
  function proofOfPerformance(uint _ofPool) public constant returns (uint256) {}
  function getHwm(uint _ofPool) public constant returns (uint) {}
}
