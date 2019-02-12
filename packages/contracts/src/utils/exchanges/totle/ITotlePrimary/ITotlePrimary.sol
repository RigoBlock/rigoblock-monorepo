/*

 Copyright 2019 RigoBlock, Rigo Investment Sagl.

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

pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

/// @title The primary interface for Totle - Allows interaction with the Totle primary contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface ITotlePrimary {

    struct Trade {
        bool isSell;
        address tokenAddress;
        uint256 tokenAmount;
        bool optionalTrade;
        uint256 minimumExchangeRate;
        uint256 minimumAcceptableTokenAmount;
        Order[] orders;
    }

    struct Order {
        address exchangeHandler;
        bytes genericPayload;
    }

     struct TradeFlag {
        bool ignoreTrade;
        bool[] ignoreOrder;
    }

    /*
    *   Public functions
    */
    /// @notice Performs the requested portfolio rebalance
    /// @param trades A dynamic array of trade structs
    function performRebalance(
        Trade[] calldata trades,
        bytes32 id
    )
        external
        payable;

    /// @notice Performs static checks on the rebalance payload before execution
    /// @dev This function is public so a rebalance can be checked before performing a rebalance
    /// @param trades A dynamic array of trade structs
    /// @param tradeFlags A dynamic array of flags indicating trade and order status
    function staticChecks(
        Trade[] calldata trades,
        TradeFlag[] calldata tradeFlags
    )
        external
        view;
}
