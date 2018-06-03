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

import { AuthorityFace as Authority } from "../../Authority/AuthorityFace.sol";

import { Drago } from "../../Drago/Drago.sol";

/// @title Drago Factory library - Reduces size of drago factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library DragoFactoryLibrary {

    struct NewDrago {
        string name;
        string symbol;
        uint256 dragoId;
        address owner;
        address newAddress;
    }

    /// @dev Allows an approved factory to create new dragos
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @param _dragoId Number of Id of the drago from the registry
    /// @param _authority Address of the respective authority
    /// @return Bool the function executed
    function createDrago(
        NewDrago storage self,
        string _name,
        string _symbol,
        address _owner,
        uint _dragoId,
        address _authority)
        internal
        returns (bool success)
    {
        Drago drago = new Drago(
            self.name = _name,
            self.symbol = _symbol,
            self.dragoId = _dragoId,
            self.owner = _owner,
            _authority
        );
        self.newAddress = address(drago);
        return true;
    }
}
