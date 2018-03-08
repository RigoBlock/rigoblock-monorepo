pragma solidity ^0.4.20;

contract ERC20Face {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function transfer(address _to, uint256 _value) public returns (bool success) {}
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {}
    function approve(address _spender, uint256 _value) public returns (bool success) {}

    function balanceOf(address _who) public view returns (uint256) {}
    function allowance(address _owner, address _spender) public view returns (uint256) {}
}
