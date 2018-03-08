pragma solidity ^0.4.20;


contract Owned {

    address public owner;

    event NewOwner(address indexed old, address indexed current);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Owned() public {
        owner = msg.sender;
    }

    function setOwner(address _new) public onlyOwner {
        owner = _new;
        NewOwner(owner, _new);
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
