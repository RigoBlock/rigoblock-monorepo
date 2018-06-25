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

import { ERC20Face as ERC20 } from "../utils/tokens/ERC20/ERC20Face.sol";

/// @title Exchange Adapter - Allows interaction with decentralized exchanges.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface ExchangeAdapterFace {

    // CORE FUNCTIONS
    
    function() external payable;
    function deposit() external payable;
    function withdraw(uint256 wad) external;

    function depositToken(
        address _exchange,
        address _token,
        uint256 _value)
        external
        payable;

    function withdrawToken(
        address _exchange,
        address _token,
        uint256 _value)
        external;

    function placeOrderExchange(
        address _exchange,
        address[5] orderAddresses,
        uint256[6] orderValues,
        uint256 fillTakerTokenAmount,
        bool stableOrSufficient,
        uint8 v,
        bytes32[2] signature)
        external;

    function placeTradeExchange(
        address _exchange,
        address[5] orderAddresses,
        uint256[6] orderValues,
        uint256 fillTakerTokenAmount,
        bool stableOrSufficient,
        uint8 v,
        bytes32[2] signature)
        external;

    function cancelOrderExchange(
        address _exchange,
        address[5] orderAddresses,
        uint256[6] orderValues,
        uint256 cancelTakerTokenAmount)
        external;

    function finalizeDeal(
        address _exchange,
        address[5] orderAddresses,
        uint256[6] orderValues,
        uint256 cancelTakerTokenAmount)
        external;

    // CONSTANT PUBLIC FUNCTIONS

    /// @notice the below functions have to be checked
    /// @notice they are read functions from the exchange, could be queried directly
    function balanceOf(address token, address user) external view returns (uint256);
    function balanceOf(address _who) external view returns (uint256);
    function marginOf(address _who) external view returns (uint256);
    function availableVolume(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, address user) external view returns(uint256);
    function amountFilled(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, address user) external view returns(uint256);
    function getLastOrderId() external view returns (uint256);
    function isActive(uint256 id) external view returns (bool);
    function getOwner(uint256 id) external view returns (address);
    function getOrder(uint256 id) external view returns (uint256, ERC20, uint256, ERC20);
}
