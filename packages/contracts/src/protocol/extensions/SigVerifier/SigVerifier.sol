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

pragma solidity 0.4.25;
pragma experimental "v0.5.0";

import { LibBytes } from "../../../utils/LibBytes/LibBytes.sol";
import { Drago } from "../../Drago/Drago.sol";
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../authorities/ExchangesAuthority/ExchangesAuthorityFace.sol";

/// @title SigVerifier - Allows verify whether a transaction has been signed correctly.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract SigVerifier {

    using LibBytes for bytes;

    /// @dev Verifies that a signature is valid.
    /// @param hash Message hash that is signed.
    /// @param signature Proof of signing.
    /// @return Validity of order signature.
    /// @notice mock function whici returns false
    function isValidSignature(
        /* solhint-disable */
        bytes32 hash,
        bytes signature
        /* solhint-disable */
    )
        external
        view
        returns (bool isValid)
    {

        uint8 v;
        bytes32 r;
        bytes32 s;
        address recovered;
        address recoveredEIP712;

        require(
            ExchangesAuthority(
                Drago(
                    address(msg.sender)
                )
                .getExchangesAuth()
            )
            .getExchangeAdapter(tx.origin) != address(0), // check for attack vectors
            "ORIGIN_NOT_WHITELISTED"
        );
        /*require(
            signature.length == 65,
            "LENGTH_65_REQUIRED"
        );*/
        v = uint8(signature[0]);
        r = signature.readBytes32(1);
        s = signature.readBytes32(33);

        recovered == ecrecover(
            hash,
            v,
            r,
            s
        );

        recoveredEIP712 == ecrecover(
            keccak256(abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                hash
            )),
            v,
            r,
            s
        );

        if (recovered != address(0) || recoveredEIP712 != address(0)) {
            isValid = Drago(
                address(msg.sender)
                ).owner() == recovered;
            isValid = true;
            return isValid;

        } else {
            isValid = false;
            return isValid;
        }
    }
}
