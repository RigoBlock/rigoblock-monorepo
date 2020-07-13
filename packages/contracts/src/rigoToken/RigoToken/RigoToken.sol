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

pragma solidity 0.5.0;

import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { UnlimitedAllowanceToken } from "../../tokens/UnlimitedAllowanceToken/UnlimitedAllowanceToken.sol";

/// @title Rigo Token - Rules of the Rigo token.
/// @author Gabriele Rigo - <gab@rigoblock.com>
/// @notice UnlimitedAllowanceToken is ERC20
contract RigoToken is UnlimitedAllowanceToken, SafeMath {

    string constant public name = "Rigo Token";
    string constant public symbol = "GRG";
    uint8 constant public decimals = 18;

    uint256 public totalSupply = 10**25; // 10 million tokens, 18 decimal places
    address public minter;
    address public rigoblock;

    /*
     * EVENTS
     */
    event TokenMinted(address indexed recipient, uint256 amount);

    /*
     * MODIFIERS
     */
    modifier onlyMinter {
        require(msg.sender == minter);
        _;
    }

    modifier onlyRigoblock {
        require(msg.sender == rigoblock);
        _;
    }

    constructor(address _setMinter, address _setRigoblock) public {
        minter = _setMinter;
        rigoblock = _setRigoblock;
        balances[msg.sender] = totalSupply;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows minter to create new tokens
    /// @param _recipient Address of who receives new tokens
    /// @param _amount Number of new tokens
    function mintToken(
        address _recipient,
        uint256 _amount)
        external
        onlyMinter
    {
        balances[_recipient] = safeAdd(balances[_recipient], _amount);
        totalSupply = safeAdd(totalSupply, _amount);
        emit TokenMinted(_recipient, _amount);
    }

    /// @dev Allows rigoblock dao to change minter
    /// @param _newAddress Address of the new minter
    function changeMintingAddress(address _newAddress)
        external
        onlyRigoblock
    {
        minter = _newAddress;
    }

    /// @dev Allows rigoblock dao to upgrade dao
    /// @param _newAddress Address of the new rigoblock dao
    function changeRigoblockAddress(address _newAddress)
        external
        onlyRigoblock
    {
        rigoblock = _newAddress;
    }
}
