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

import { DragoFace } from "../../protocol/Drago/DragoFace.sol";

/// @title Drago Data Helper - Allows to query multiple data of a drago at once.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract HGetDragoData {

    function queryData(
        address _drago)
        external
        view
        returns (
            string name,
            string symbol,
            uint256 sellPrice,
            uint256 buyPrice,
            address owner,
            address feeCollector,
            address dragoDao,
            uint256 transactionFee,
            uint32 minPeriod,
            uint256 totalSupply,
            uint256 ethBalance
        )
    {
        DragoFace dragoInstance = DragoFace(_drago);
        (name, symbol, sellPrice, buyPrice) = dragoInstance.getData();
        (owner, feeCollector, dragoDao, , transactionFee, minPeriod) = dragoInstance.getAdminData();
        totalSupply = dragoInstance.totalSupply();
        ethBalance = address(this).balance;
    }
}
