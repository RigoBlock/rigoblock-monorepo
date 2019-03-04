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

pragma solidity 0.4.25;
pragma experimental "v0.5.0";

import { WrapperLock as TokenWrapper } from "../../../tokens/WrapperLock/WrapperLock.sol";
import { WrapperLockEth as EthWrapper } from "../../../tokens/WrapperLockEth/WrapperLockEth.sol";
import { ERC20Face as Token } from "../../../tokens/ERC20/ERC20Face.sol";
import { ERC20Old as TokenOld } from "../../../tokens/ERC20Old/ERC20Old.sol";

import { Drago } from "../../Drago/Drago.sol";
import { AuthorityFace as Authority } from "../../authorities/Authority/AuthorityFace.sol";
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../authorities/ExchangesAuthority/ExchangesAuthorityFace.sol";

/// @title Ethfinex adapter - A helper contract for the Ethfinex exchange.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract AEthfinex {

    /// @dev wraps eth or tokens to the ethfinex wrappers.
    /// @param token Address of the base token.
    /// @param wrapper Address of the token wrapper.
    /// @param amount Number of tokens.
    /// @param forTime Number of hours for lockup.
    /// @param erc20Old Bool is an old ERC20.
    function wrapToEfx(
        address token,
        address wrapper,
        uint256 amount,
        uint256 forTime,
        bool erc20Old)
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
            .canWrapTokenOnWrapper(token, wrapper)
        );

        if (token == address(0)) {
            require(
                EthWrapper(wrapper)
                .deposit
                .value(amount)(amount, forTime)
            );
        } else {
            // solhint-disable-next-line
            require(setAllowances(wrapper, token, 2**256 -1, erc20Old));
            require(
                TokenWrapper(wrapper)
                .deposit(amount, forTime)
            );
            require(setAllowances(wrapper, token, 0, erc20Old));
        }
    }

    /// @dev unwraps eth or tokens from the ethfinex wrappers.
    /// @param token Address of the base token.
    /// @param wrapper Address of the token wrapper.
    /// @param value Number of tokens to withdraw.
    /// @param v ECDSA signature parameter v.
    /// @param r ECDSA signature parameters r.
    /// @param s ECDSA signature parameters s.
    /// @param signatureValidUntilBlock Signature for withdrawing before lockup.
    function unwrap(
        address token,
        address wrapper,
        uint256 value,
        uint8 v,
        bytes32 r,
        bytes32 s,
        uint256 signatureValidUntilBlock)
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
            .canWrapTokenOnWrapper(token, wrapper)
        );

        require(
            TokenWrapper(wrapper)
            .withdraw(value, v, r, s, signatureValidUntilBlock)
        );
    }

    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev Allows owner to set an infinite allowance to an approved exchange.
    /// @param wrapper Address of the proxy to be approved.
    /// @param token Address of the token to receive allowance for.
    function setAllowances(
        address wrapper,
        address token,
        uint256 amount,
        bool erc20Old)
        internal
        returns (bool success)
    {
        success = false;

        if (erc20Old) {
            TokenOld(token)
            .approve(wrapper, amount);

        } else {
            require(
                Token(token)
                .approve(wrapper, amount)
            );
        }

        return (success = true);
    }
}
