/*

 Copyright 2018 RigoBlock, Rigo Investment Sagl.

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

import { WrapperLock as TokenWrapper } from "../../utils/tokens/WrapperLock/WrapperLock.sol";
import { WrapperLockEth as EthWrapper } from "../../utils/tokens/WrapperLockEth/WrapperLockEth.sol";
import { ERC20Face as Token } from "../../utils/tokens/ERC20/ERC20Face.sol";

import { Drago } from "../../Drago/Drago.sol";
import { AuthorityFace as Authority } from "../../Authority/AuthorityFace.sol";
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../exchanges/ExchangesAuthority/ExchangesAuthorityFace.sol";

/// @title Ethfinex adapter - A helper contract for the Ethfinex exchange.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract AEthfinex {

    /// @dev wraps eth or tokens to the ethfinex wrappers
    /// @param token Address of the base token
    /// @param wrapper Address of the token wrapper
    /// @param amount Number of tokens
    /// @param forTime Number of hours for lockup
    function wrapToEfx(
        address token,
        address wrapper,
        uint256 amount,
        uint256 forTime)
        external
    {
        require(
            Drago(
                address(this)
            )
            .owner() == msg.sender
        );
        require(
            ExchangesAuthority(
                Drago(
                    address(this)
                )
                .getExchangesAuth()
            )
            .isWhitelistedWrapper(wrapper)
        );
        require(
            ExchangesAuthority(
                Drago(
                    address(this)
                )
                .getExchangesAuth()
            )
            .canTradeTokenOnExchange(token, wrapper)
        );

        if (token == address(0)) {
            require(
                EthWrapper(wrapper)
                .deposit
                .value(amount)(amount, forTime)
            );
        } else {
            require(setAllowances(wrapper, token, 2**256 -1));
            require(
                TokenWrapper(wrapper)
                .deposit(amount, forTime)
            );
            require(setAllowances(wrapper, token, 0));
        }
    }

    /// @dev unwraps eth or tokens from the ethfinex wrappers
    /// @param token Address of the base token
    /// @param wrapper Address of the token wrapper
    /// @param value Number of tokens to withdraw
    /// @param signatureValidUntilBlock Signature for withdrawing before lockup
    function unwrap(
        address token,
        address wrapper,
        uint8 v,
        bytes32 r,
        bytes32 s,
        uint value,
        uint signatureValidUntilBlock)
        external
    {
        require(
            Drago(
                address(this)
            )
            .owner() == msg.sender
        );
        require(
            ExchangesAuthority(
                Drago(
                    address(this)
                )
                .getExchangesAuth()
            )
            .isWhitelistedWrapper(wrapper)
        );
        require(
            ExchangesAuthority(
                Drago(
                    address(this)
                )
                .getExchangesAuth()
            )
            .canTradeTokenOnExchange(token, wrapper)
        );

        require(
            TokenWrapper(wrapper)
            .withdraw(v, r, s, value, signatureValidUntilBlock)
        );
    }

    // INTERNAL FUNCTIONS

    /// @dev Allows owner to set an infinite allowance to an approved exchange
    /// @param wrapper Address of the proxy to be approved
    /// @param token Address of the token to receive allowance for
    function setAllowances(
        address wrapper,
        address token,
        uint256 amount)
        internal
        returns (bool)
    {
        require(
            Token(token)
            .approve(wrapper, amount)
        ); return true;
    }
}
