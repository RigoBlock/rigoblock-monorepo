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

/// @title Exchange Adapter - Allows interaction with decentralized exchanges.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract ExchangeAdapter {

  // CORE FUNCTIONS

  function depositToExchange(
    address _exchange,
    address _token,
    uint _value)
    external {}

  function withdrawFromExchange(
    address _exchange,
    address _token,
    uint _value)
    external {}

  function placeOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    external {}

  function placeTradeExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    external {}

  function cancelOrderExchange(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    external {}

  function finalizeDeal(
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    external {}

  // CONSTANT PUBLIC FUNCTIONS

  /// @notice the below functions have to be checked
  /// @notice they are read functions from the exchange, could be queried directly
  function balanceOf(address token, address user) public constant returns (uint) {}
  function balanceOf(address _who) public constant returns (uint) {}
  function marginOf(address _who) public constant returns (uint) {}
  function availableVolume(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, address user) public constant returns(uint) {}
  function amountFilled(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, address user) public constant returns(uint) {}
  function getLastOrderId() public constant returns (uint) {}
  function isActive(uint id) public constant returns (bool) {}
  function getOwner(uint id) public constant returns (address) {}
  function getOrder(uint id) public constant returns (uint, ERC20Face, uint, ERC20Face) {}
}
