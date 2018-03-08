/*

 Copyright 2017-2018 RigoBlock, Rigo Investment Sagl.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

*/

pragma solidity ^0.4.20;

/// @title Drago Interface - Allows interaction with the Drago contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoFace {

    // CORE FUNCTIONS

    function buyDrago() external payable returns (bool success) {}
    function buyDragoOnBehalf(address _hodler) public payable returns (bool success) {}
    function sellDrago(uint _amount) external returns (bool success) {}
    function setPrices(uint _newSellPrice, uint _newBuyPrice)  public {}
    function changeMinPeriod(uint32 _minPeriod) public {}
    function changeRatio(uint _ratio) public {}
    function setTransactionFee(uint _transactionFee) public {}
    function changeFeeCollector(address _feeCollector) public {}
    function changeDragoDao(address _dragoDao) public {}
    function depositToExchange(address _exchange, uint _amount) public {}
    function operateOnExchange(address _exchange) external {}
    //function setOwner(address _new) public {}
    function() external payable {}

    // PUBLIC CONSTANT FUNCTIONS

    //function balanceOf(address _who) public view returns (uint) {}
    function getDragoEventful() public view returns (address) {}
    function getData() public view returns (string name, string symbol, uint sellPrice, uint buyPrice) {}
    function getAdminData() public view returns (address feeCollector, address dragoDao, uint ratio, uint transactionFee, uint32 minPeriod) {}
    //function getOwner() public view returns (address) {}
    //function totalSupply() public view returns (uint256) {}
}
