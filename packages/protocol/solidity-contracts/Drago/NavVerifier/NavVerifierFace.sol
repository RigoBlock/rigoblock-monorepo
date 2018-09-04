/*

 Copyright 2018 ZeroEx Intl.

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


interface NavVerifierFace {

    /// @dev Verifies that a signature is valid.
    /// @param sellPrice Price in wei
    /// @param buyPrice Price in wei
    /// @param signaturevaliduntilBlock Number of blocks till price expiry
    /// @param hash Message hash that is signed.
    /// @param signedData Proof of nav validity.
    /// @notice mock function which returns true
    function isValidNav(
        uint256 sellPrice,
        uint256 buyPrice,
        uint256 signaturevaliduntilBlock,
        bytes32 hash,
        bytes signedData)
        external
        view
        returns (bool isValid);
}        
