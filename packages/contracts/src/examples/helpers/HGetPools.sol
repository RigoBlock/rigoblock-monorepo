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
pragma experimental ABIEncoderV2;

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line

import { DragoRegistryFace as Registry } from "../../protocol/DragoRegistry/DragoRegistryFace.sol";

/// @title Multiple Balances Helper - Allows to receive a list of pools for a specific group.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract HGetPools {

    function queryPools(
        address _registry,
        address _group)
        external
        view
        returns (
            address[] dragos,
            string[] names,
            string[] symbols,
            uint256[] dragoIds,
            address[] owners
        )
    {
        Registry registry = Registry(_registry);
        uint256 length = registry.dragoCount();
        for (uint256 i = 0; i < length; i++) {
            (address drago, string memory name, string memory symbol, uint256 dragoId, address owner, address group) = registry.fromId(i);
            if (group != _group) continue;
            dragos[i] = drago;
            names[i] = name;
            symbols[i] = symbol;
            dragoIds[i] = dragoId;
            owners[i] = owner;
        }
    }
}