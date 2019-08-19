pragma solidity >=0.4.22 <0.6.0;

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

contract ASelfCustody {

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

    function transferToSelfCustody(
        address payable selfCustodyAccount,
        address token,
        uint256 amount)
        public
        returns (bool, uint256)
    {
        (bool satisfied, uint256 shortfall) = operatorGRGminimumSatisfied(amount);
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

    function operatorGRGminimumSatisfied(uint256 amount)
        public
        view
        returns (bool satisfied, uint256 shortfall)
    { // will have to be internal
        uint256 rationalized_amount_base36 = amount * 10 ** (rational_base - ether_base);
        uint256 operator_rationalized_GRG_balance_base36 = Token(RIGOTOKENADDRESS).balanceOf(msg.sender) * (10 ** (rational_base - ether_base));

        if (rationalized_amount_base36 < findPi()) {
            return (true, uint256(0));

        } else if (rationalized_amount_base36 < findPi2()) {
            if (operator_rationalized_GRG_balance_base36 < findPi4()) {
                satisfied = false;
                shortfall = (findPi4() - operator_rationalized_GRG_balance_base36) / (10 ** (rational_base - ether_base)); // odd division
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else if (rationalized_amount_base36 < findPi3()) {
            if (operator_rationalized_GRG_balance_base36 < findPi5()) {
                satisfied = false;
                shortfall = (findPi5() - operator_rationalized_GRG_balance_base36) / (10 ** (rational_base - ether_base)); // odd division
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else if (rationalized_amount_base36 >= findPi3()) {
            if (operator_rationalized_GRG_balance_base36 < findPi6()) {
                satisfied = false;
                shortfall = (findPi6() - operator_rationalized_GRG_balance_base36) / (10 ** (rational_base - ether_base)); // odd division
            } else {
                satisfied = true;
                shortfall = uint256(0);
            }

        } else {
            revert("UNKNOWN_GRG_MINIMUM_ERROR");
        }

        return (satisfied, shortfall);
    }

    function findPi() public view returns (uint256 pi1) {
        uint8 power = 1;
        pi1 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    function findPi2() public view returns (uint256 pi2) {
        uint8 power = 2;
        pi2 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    function findPi3() public view returns (uint256 pi3) {
        uint8 power = 3;
        pi3 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    function findPi4() public view returns (uint256 pi4) {
        uint8 power = 4;
        pi4 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    function findPi5() public view returns (uint256 pi5) {
        uint8 power = 5;
        pi5 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

    function findPi6() public view returns (uint256 pi6) {
        uint8 power = 6;
        pi6 = pi ** power * 10 ** (rational_base - pi_base * power);
    }

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
}
