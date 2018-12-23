pragma solidity ^0.4.2;

contract ERC20Generic {
    string  public name;
    string  public symbol;
    uint256 public totalSupply;
    uint8 public decimals;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;


    constructor(string memory _name, string memory _symbol, uint8 _decimals)
      public
    {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = 1000000 * 10**uint(_decimals);
        balanceOf[msg.sender] = totalSupply;               // Give the creator all tokens                     
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Balance must be > value");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from] , "Balance must be > value");
        require(_value <= allowance[_from][msg.sender], "Allowance must be > value");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}