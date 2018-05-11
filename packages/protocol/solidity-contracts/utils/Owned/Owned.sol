pragma solidity ^0.4.23;
pragma experimental "v0.5.0";


contract Owned {

    address public owner;

    event NewOwner(address indexed old, address indexed current);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setOwner(address _new)
        public
        onlyOwner
    {
        require(_new != address(0));
        owner = _new;
        emit NewOwner(owner, _new);
    }
}
