pragma solidity ^0.4.19;

contract OwnedUninitialized {

    address public owner;

    event NewOwner(address indexed old, address indexed current);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setOwner(address _new) public onlyOwner {
        owner = _new;
        NewOwner(owner, _new);
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
