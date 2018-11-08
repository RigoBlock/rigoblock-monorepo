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

import { ERC20Face as Token } from "../../tokens/ERC20/ERC20.sol";

/// @title Multiple Balances Helper - Allows to receive a list of pools for a specific group.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract HGetMultipleBalances {
    
    mapping (uint256 => address) private inLine;
    
    function numberToAddress(
        uint256 _number,
        address _token)
        external
    {
        require (inLine[_number] == address(0));
        inLine[_number] = _token;
    }

    function getAddressFromNumber(
        uint256 _number)
        internal
        view
        returns (address)
    {
        return(inLine[_number]);
    }
        

    function getBalance(address _token, address _who)
        external
        view
        returns (uint256 amount)
    {
        amount = Token(_token).balanceOf(_who);
    }

    function getMultiBalances(uint[] _tokenNumbers, address _who)
        external
        view
        returns (uint256[] balances)
    {
        uint256 length = _tokenNumbers.length;
        for (uint256 i = 0; i < length; i++) {
            address targetToken = getAddressFromNumber(i);
            Token token = Token(targetToken);
            uint256 amount = token.balanceOf(_who);
            if (amount == 0) continue;
            balances[i] = amount;
        }
    }
}