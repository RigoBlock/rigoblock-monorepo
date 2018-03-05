pragma solidity ^0.4.19;

contract Owned {

    address public owner;

    event NewOwner(address indexed old, address indexed current);

    modifier only_owner { require(msg.sender == owner); _; }

    function Owned() public {
        owner = msg.sender;
    }

    function setOwner(address _new) public only_owner {
        owner = _new;
        NewOwner(owner, _new);
    }

    function getOwner() public constant returns (address) {
        return owner;
    }
}
