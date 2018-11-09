pragma solidity 0.4.25;
pragma experimental "v0.5.0";

contract OwnedUninitialized {

    address public owner;

    event NewOwner(address indexed old, address indexed current);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setOwner(address _new) public onlyOwner {
        require(_new != address(0));
        owner = _new;
        emit  NewOwner(owner, _new);
    }
}
