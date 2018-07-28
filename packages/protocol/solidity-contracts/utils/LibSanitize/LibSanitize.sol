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

pragma solidity ^0.4.24;
pragma experimental "v0.5.0";

/// @title Lib Sanitize - Sanitize strings in smart contracts.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library LibSanitize {

    function isValidCheck(string _str)
        internal
        pure
        returns (bool)
    {
        uint length =  bytes(_str).length;
        require(length >= 4 && length <= 50);
        for (uint i =0; i< length; i++) {
            bytes1 c = bytes(_str)[i];
            require ((c >= 48 &&  c <= 122 && (c <= 57 || c >= 65) && (c <= 90 || c >= 97 )) || (c == 95));
            require(
                keccak256(abi.encodePacked(c)) != keccak256(abi.encodePacked(""))
            );
        }
        return true;
    }

    function isLowercase(string _str)
        internal
        pure
        returns (bool)
    {
        uint length =  bytes(_str).length;
        require(length >= 4 && length <= 50);
        for (uint i = 0; i < length; i++) {
            bytes1 d = bytes(_str)[i];
            require (d[i] <65 || d[i] > 90); // exclude uppercase characters
        }
        return true;
    }
}
