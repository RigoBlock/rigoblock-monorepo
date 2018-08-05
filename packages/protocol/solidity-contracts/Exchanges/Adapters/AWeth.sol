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
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../Exchanges/ExchangesAuthority/ExchangesAuthorityFace.sol";
import { WETH9 } from "../../utils/tokens/WETH9/WETH9.sol";

/// @title Weth adapter - A helper to wrap eth to the 0x wrapper token.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract AWeth {
    
    string public constant NAME = 'WETH_ADAPTER';

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

    constructor(
        address _authority)
        public
    {
        admin.authority = _authority;
    }

    /// @dev allows a manager to deposit eth to an approved exchange/wrap eth
    /// @param _wrapper Address of the target exchange
    /// @param _amount Value of the Eth in wei
    function wrapEth(address _wrapper, uint256 _amount)
        internal
        whenApprovedWrapper(_wrapper)
    {
        WETH9(_wrapper).deposit.value(_amount);
    }

    /// @dev allows a manager to withdraw ETH from an approved exchange/unwrap eth
    /// @param _wrapper Address of the target exchange
    /// @param _amount Value of the Eth in wei
    function unwrapEth(address _wrapper, uint256 _amount)
        internal
        whenApprovedWrapper(_wrapper)
    {
        WETH9(_wrapper).withdraw(_amount);
    }
}
