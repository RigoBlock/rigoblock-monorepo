pragma solidity ^0.4.24;

/**
 * @title Faucet v0.0.1
 * Faucet smart contract for RigoBlock protocol
 * allows users to receive erc20Basic tokens
 * Inspired by https://github.com/AvocadoNetwork
 * @author David Fava - <https://github.com/wnz99>
 */

import { ERC20Face as Token } from "../utils/tokens/ERC20/ERC20Face.sol";
import { Owned as Owned } from "../utils/Owned/Owned.sol";

contract Faucet is Owned {

    /*
    * Events
    */
    event Deposit(address indexed sender, uint256 value);
    event OneTokenSent(address indexed receiver);
    event FaucetOn(bool status);
    event FaucetOff(bool status);

    /*
    * Constants
    */
    uint256 constant oneToken = 1000000000000000000;
    uint256 constant twentyFourHours = 24 hours;

    /*
    * Storage
    */
    string public faucetName;
    Token public tokenInstance;
    bool public faucetStatus;
    mapping(address => uint256) status;

    /*
    * Modifiers
    */
    modifier faucetOn() {
        require(faucetStatus,"Faucet has to be on");
        _;
    }

    modifier faucetOff() {
        require(!faucetStatus, "Faucet has to be off");
        _;
    }

    /*
     * Public functions
     */
    /// @dev Contract constructor
    /// @param _tokenInstance address of ERC20Basic token
    /// @param _faucetName sets the name for the faucet
    constructor(address _tokenInstance, string _faucetName)
      public
    {
        tokenInstance = Token(_tokenInstance);
        faucetName = _faucetName;
        faucetStatus = true;

        emit FaucetOn(faucetStatus);
    }

    /// @dev Fallback function allows to deposit ether.
    // function()
    //   external
    //   payable
    // {
    //     if (msg.value > 0) {
    //         emit Deposit(msg.sender, msg.value);
    //     }
    // }

    /// @dev send 1000 Token with a minimum time lock of 1 hour
    /// @return bool on success
    function drip1Token()
      external
      faucetOn()
      returns (bool success)
    {
        require(!checkStatus(msg.sender),"Required too early.");
        updateStatus(msg.sender, twentyFourHours);
        tokenInstance.transfer(msg.sender, oneToken);
        emit OneTokenSent(msg.sender);
        return true;
    }

    /// @dev turn faucet on
    /// @return bool on success
    function turnFaucetOn()
      external
      onlyOwner
      faucetOff()
      returns (bool success)
    {
        faucetStatus = true;
        emit FaucetOn(faucetStatus);
        return true;
    }

    /// @dev turn faucet off
    /// @return bool on success
    function turnFaucetOff()
      external
      onlyOwner
      faucetOn()
      returns (bool success)
    {
        faucetStatus = false;
        emit FaucetOff(faucetStatus);
        return true;
    }

    /*
    * Internal functions
    */
    /// @dev locks and unlocks account based on time range
    /// @param _address of msg.sender
    /// @return bool of current lock status of address
    function checkStatus(address _address)
      internal
      view
      returns (bool)
    {
        //check if first time address is requesting
        if(status[_address] == 0) {
            return false;
        }
        //if not first time check the timeLock
        else {
            // solium-disable-next-line security/no-block-members
            if(block.timestamp >= status[_address]) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    /// @dev updates timeLock for account
    /// @param _address of msg.sender
    /// @param _timelock of sender address
    /// @return bool on success
    function updateStatus(address _address, uint256 _timelock)
      internal
      returns (bool)
    {   // solium-disable-next-line security/no-block-members
        status[_address] = block.timestamp + _timelock;
        return true;
    }

}
 
