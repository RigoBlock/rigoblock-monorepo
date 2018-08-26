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

import { AuthorityFace as Authority } from "../../Authority/AuthorityFace.sol";
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../exchanges/ExchangesAuthority/ExchangesAuthorityFace.sol";
import { WrapperLock as TokenWrapper } from "../../utils/tokens/WrapperLock/WrapperLock.sol";
import { WrapperLockEth as EthWrapper } from "../../utils/tokens/WrapperLockEth/WrapperLockEth.sol";
import { ERC20Face as Token } from "../../utils/tokens/ERC20/ERC20Face.sol";

/// @title Ethfinex adapter - A helper contract for the Ethfinex exchange.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract AEthfinex {

    string public constant NAME = 'ETHFINEX_ADAPTER';

    Admin admin;

    struct Admin {
        address authority;
    }

    modifier whenApprovedWrapper(address _wrapper) {
        Authority auth = Authority(admin.authority);
        bool approved = ExchangesAuthority(auth.getExchangesAuthority())
            .isWhitelistedWrapper(_wrapper);
        require(approved);
        _;
    }

    modifier whenApprovedTokenOnWrapper(address _token, address _wrapper) {
        if (address(_token) != address(0)) {
            require(ExchangesAuthority(
                Authority(admin.authority)
                .getExchangesAuthority())
                .canTradeTokenOnExchange(_token, _wrapper));
        }
        _;
    }

    constructor(
        address _authority)
        public
    {
        admin.authority = _authority;
    }

    /// @dev wraps eth or tokens to the ethfinex wrappers
    /// @param _token Address of the base token
    /// @param _wrapper Address of the token wrapper
    /// @param _token TransferProxy Address of the transfer proxy
    /// @param _amount Number of tokens
    /// @param _forTime Number of hours for lockup
    function wrapToEfx(
        address _token,
        address _wrapper,
        uint256 _amount,
        uint256 _forTime)
        public //internal
        payable
        whenApprovedWrapper(_wrapper)
        whenApprovedTokenOnWrapper(_token, _wrapper)
    {
        if (_token == address(0)) {
            require(
                EthWrapper(_wrapper)
                .deposit
                .value(_amount)(_amount, _forTime)
            );
        } else {
            require(setAllowances(_wrapper, _token, 2**256 -1));
            require(
                TokenWrapper(_wrapper)
                .deposit(_amount, _forTime)
            );
            require(setAllowances(_wrapper, _token, 0));
        }
    }

    /// @dev unwraps eth or tokens from the ethfinex wrappers
    /// @param _token Address of the base token
    /// @param _wrapper Address of the token wrapper
    /// @param _value Number of tokens to withdraw
    /// @param _signatureValidUntilBlock Signature for withdrawing before lockup
    function unwrap(
        address _token,
        address _wrapper,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint _value,
        uint _signatureValidUntilBlock)
        internal
        whenApprovedWrapper(_wrapper)
        whenApprovedTokenOnWrapper(_token, _wrapper)
    {
        require(TokenWrapper(_wrapper)
            .withdraw(_v, _r, _s, _value, _signatureValidUntilBlock));
    }

    /// @dev Allows owner to set an infinite allowance to an approved exchange
    /// @param _wrapper Address of the proxy to be approved
    /// @param _token Address of the token to receive allowance for
    function setAllowances(
        address _wrapper,
        address _token,
        uint256 _amount)
        internal
        returns (bool)
    {
        require(Token(_token)
            .approve(_wrapper, _amount));
        return true;
    }
}
