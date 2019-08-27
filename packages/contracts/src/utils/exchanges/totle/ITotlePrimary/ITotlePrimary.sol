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

interface Partner {

    function payout(
        address[] calldata tokens,
        uint256[] calldata amounts
    )
    external;

    function getTotalFeePercentage() external view returns (uint256);

    function() external payable;
}

/// @title The primary interface for Totle - Allows interaction with the Totle primary contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface ITotlePrimary {

    // Structs
    struct Order {
        address payable exchangeHandler;
        bytes encodedPayload;
    }

    struct Trade {
        address sourceToken;
        address destinationToken;
        uint256 amount;
        bool isSourceAmount; //true if amount is sourceToken, false if it's destinationToken
        Order[] orders;
    }

    struct Swap {
        Trade[] trades;
        uint256 minimumExchangeRate;
        uint256 minimumDestinationAmount;
        uint256 sourceAmount;
        uint256 tradeToTakeFeeFrom;
        bool takeFeeFromSource; //Takes the fee before the trade if true, takes it after if false
        address payable redirectAddress;
        bool required;
    }

    struct SwapCollection {
        Swap[] swaps;
        address payable partnerContract;
        uint256 expirationBlock;
        bytes32 id;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct TokenBalance {
        address tokenAddress;
        uint256 balance;
    }

    struct FeeVariables {
        uint256 feePercentage;
        Partner partner;
        uint256 totalFee;
    }

    struct AmountsSpentReceived{
        uint256 spent;
        uint256 received;
    }

    /*
    *   Public functions
    */
    /// @notice Performs the requested set of swaps
    /// @param swaps The struct that defines the collection of swaps to perform
    function performSwapCollection(
        SwapCollection calldata swaps
    )
        external
        payable;
    function addSigner(address newSigner) external;
    function removeSigner(address signer) external;
    function() external payable;
    function log(string calldata a, uint256 b, bytes32 c) external;
}
