/*

 Copyright 2019 RigoBlock, Gabriele Rigo.

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

pragma solidity 0.5.4;

import { SafeMath } from '../../../utils/SafeMath/SafeMath.sol';

contract Drago {

    address public owner;
}

interface Token {

    function transfer(address _to, uint256 _value) external returns (bool success);

    function balanceOf(address _who) external view returns (uint256);
}

interface DragoEventful {

    function customDragoLog(bytes4 _methodHash, bytes calldata _encodedParams) external returns (bool success);
}

interface Authority {

    function getDragoEventful() external view returns (address);
}

/// @title Self Custody adapter - A helper contract for self custody.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract ASelfCustody is SafeMath {

    Admin admin;

    uint256 pi = 3141592;
    uint256 pi_base = 6;
    uint256 rational_base = 36;
    uint256 ether_base = 18;

    address RIGOTOKENADDRESS;

    struct Admin {
        address authority;
    }

    constructor(address rigoTokenAddress)
        public
    {
        RIGOTOKENADDRESS = rigoTokenAddress;
    }

    /// @dev transfers ETH or tokens to self custody.
    /// @param selfCustodyAccount Address of the target account.
    /// @param token Address of the target token.
    /// @param amount Number of tokens.
    /// @return Bool the transaction was successful.
    /// @return Number of GRG pool operator shortfall.
    /// @notice Transfeer of tokens excluded from GRG requirement for now.
    function transferToSelfCustody(
        address payable selfCustodyAccount,
        address token,
        uint256 amount)
        external
        returns (bool, uint256)
    {
        require(
            Drago(
                address(this)
            )
            .owner() == msg.sender
        );
        require(amount != uint256(0));
        (bool satisfied, uint256 shortfall) = operatorGRGminimumSatisfied(token, amount);
        if (satisfied == true) {
            require(
                transferToSelfCustodyInternal(selfCustodyAccount, token, amount),
                "TRANSFER_FAIL_GRG_REQ_SATISFIED_ERROR"
                );
            require(
                logTransferToSelfCustody(selfCustodyAccount, token, amount),
                "LOG_FAIL_GRG_REQ_SATISFIED_ERROR"
                );
            return (true, shortfall);
        } else {
            return (false, shortfall);
        }
    }

    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev checks if minimum pool operator GRG amount requirement satisfied.
    /// @param token Address of the token to be transferred.
    /// @param amount Number of tokens to be transferred.
    /// @return Bool the transaction was successful.
    /// @return Number of GRG pool operator shortfall.
    /// @notice built around powers of pi number.
    function operatorGRGminimumSatisfied(address token, uint256 amount)
        internal
        view
        returns (bool satisfied, uint256 shortfall)
    {
        satisfied = token != address(0) ? true : false;
        uint256 rationalized_amount_base36 = safeMul(amount, 10 ** (rational_base - ether_base));
        uint256 operator_rationalized_GRG_balance_base36 = Token(RIGOTOKENADDRESS).balanceOf(msg.sender) * (10 ** (rational_base - ether_base));

        if (rationalized_amount_base36 < findPi()) {
            return (satisfied == true, shortfall = uint256(0));

        } else if (rationalized_amount_base36 < findPi2()) {
            if (operator_rationalized_GRG_balance_base36 < findPi4()) {
                satisfied = false;
                shortfall = safeDiv(findPi4() - operator_rationalized_GRG_balance_base36, (10 ** (rational_base - ether_base)));
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else if (rationalized_amount_base36 < findPi3()) {
            if (operator_rationalized_GRG_balance_base36 < findPi5()) {
                satisfied = false;
                shortfall = safeDiv(findPi5() - operator_rationalized_GRG_balance_base36, (10 ** (rational_base - ether_base)));
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else if (rationalized_amount_base36 >= findPi3()) {
            if (operator_rationalized_GRG_balance_base36 < findPi6()) {
                satisfied = false;
                shortfall = safeDiv(findPi6() - operator_rationalized_GRG_balance_base36, (10 ** (rational_base - ether_base)));
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else {
            revert("UNKNOWN_GRG_MINIMUM_ERROR");
        }

        return (satisfied, shortfall);
    }

    /// @dev returns the base 36 value of pi number.
    /// @return pi1 Value of pi.
    function findPi() internal view returns (uint256 pi1) {
        uint8 power = 1;
        pi1 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev returns the base 36 value of pi^2 number.
    /// @return pi2 Value of pi^2.
    function findPi2() internal view returns (uint256 pi2) {
        uint8 power = 2;
        pi2 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev returns the base 36 value of pi^3 number.
    /// @return pi3 Value of pi^3.
    function findPi3() internal view returns (uint256 pi3) {
        uint8 power = 3;
        pi3 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev returns the base 36 value of pi^4 number.
    /// @return pi4 Value of pi^4.
    function findPi4() internal view returns (uint256 pi4) {
        uint8 power = 4;
        pi4 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev returns the base 36 value of pi^5 number.
    /// @return pi5 Value of pi^5.
    function findPi5() internal view returns (uint256 pi5) {
        uint8 power = 5;
        pi5 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev returns the base 36 value of pi^6 number.
    /// @return pi6 Value of pi^6.
    function findPi6() internal view returns (uint256 pi6) {
        uint8 power = 6;
        pi6 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    /// @dev prints a custom log of the transfer.
    /// @param selfCustodyAccount Address of the self custody account.
    /// @param token Address of the token transferred.
    /// @param amount Number of tokens.
    /// @return Bool the log is printed correctly.
    function logTransferToSelfCustody(
        address selfCustodyAccount,
        address token,
        uint256 amount)
        internal
        returns (bool)
    {
        DragoEventful events = DragoEventful(getDragoEventful());
        bytes4 methodHash = bytes4(keccak256("transferToSelfCustody(address,address,uint256)"));
        bytes memory encodedParams = abi.encode(
            address(this),
            selfCustodyAccount,
            token,
            amount
            );
        require(
            events.customDragoLog(methodHash, encodedParams),
            "ISSUE_IN_EVENTFUL"
            );
        return true;
    }

    /// @dev executes the ETH or token transfer.
    /// @param selfCustodyAccount Address of the self custody account.
    /// @param token Address of the target token.
    /// @param amount Number of tokens to be transferred.
    /// @return success Bool the transfer executed correctly.
    function transferToSelfCustodyInternal(
        address payable selfCustodyAccount,
        address token,
        uint256 amount)
        internal
        returns (bool success)
    {
        if (token == address(0)) {
            selfCustodyAccount.transfer(amount);
            success = true;
        } else {
            Token(token).transfer(selfCustodyAccount, amount);
            success = true;
        }
        return success;
    }

    /// @dev Gets the address of the logger contract.
    /// @return Address of the logger contrac.
    function getDragoEventful()
        internal
        view
        returns (address)
    {
        Authority auth = Authority(admin.authority);
        return auth.getDragoEventful();
    }
}
