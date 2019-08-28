pragma solidity 0.5.3;
pragma experimental ABIEncoderV2;

import "../lib/Withdrawable.sol";
import "../lib/Pausable.sol";
/* import "../lib/Logger.sol"; */

/// @title Interface for all exchange handler contracts
contract ExchangeHandler is Withdrawable, Pausable {

    /*
    *   State Variables
    */

    /* Logger public logger; */
    /*
    *   Modifiers
    */

    function performOrder(
        bytes memory genericPayload,
        uint256 availableToSpend,
        uint256 targetAmount,
        bool targetAmountIsSource
    )
        public
        payable
        returns (uint256 amountSpentOnOrder, uint256 amountReceivedFromOrder);

}
