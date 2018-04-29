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

pragma solidity ^0.4.23;
pragma experimental "v0.5.0";

/// @title Drago Eventful Interface contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface DragoEventfulFace {

    // EVENTS

    event BuyDrago(address indexed drago, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event SellDrago(address indexed drago, address indexed from, address indexed to, uint256 amount, uint256 revenue, bytes name, bytes symbol);
    event NewRatio(address indexed drago, address indexed from, uint newRatio);
    event NewNAV(address indexed drago, address indexed from, address indexed to, uint sellPrice, uint buyPrice);
    event NewFee(address indexed targetDrago, address indexed group, address indexed who, uint transactionFee);
    event NewCollector( address indexed targetDrago, address indexed group, address indexed who, address feeCollector);
    event DragoDao(address indexed drago, address indexed from, address indexed to, address dragoDao);
    event DepositExchange(address indexed drago, address indexed exchange, address indexed token, uint value, uint256 amount);
    event WithdrawExchange(address indexed drago, address indexed exchange, address indexed token, uint value, uint256 amount);
    event OrderExchange(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint revenue);
    event TradeExchange(address indexed drago, address indexed exchange, address tokenGet, address tokenGive, uint amountGet, uint amountGive, address get, address give);
    event CancelOrder(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint id);
    event DealFinalized(address indexed drago, address indexed exchange, address indexed cfd, uint value, uint id);
    event DragoCreated(address indexed drago, address indexed group, address indexed owner, uint dragoId, string name, string symbol);

    // CORE FUNCTIONS

    function buyDrago(address _who, address _targetDrago, uint _value, uint _amount, bytes _name, bytes _symbol) external returns (bool success);
    function sellDrago(address _who, address _targetDrago, uint _amount, uint _revenue, bytes _name, bytes _symbol) external returns(bool success);
    function changeRatio(address _who, address _targetDrago, uint256 _ratio) external returns(bool success);
    function changeFeeCollector(address _who, address _targetDrago, address _feeCollector) external returns(bool success);
    function changeDragoDao(address _who, address _targetDrago, address _dragoDao) external returns(bool success);
    function setDragoPrice(address _who, address _targetDrago, uint _sellPrice, uint _buyPrice) external returns(bool success);
    function setTransactionFee(address _who, address _targetDrago, uint _transactionFee) external returns(bool success);
    function depositToExchange(address _who, address _targetDrago, address _exchange, address _token, uint256 _value) external returns(bool success);
    function withdrawFromExchange(address _who, address _targetDrago, address _exchange, address _token, uint256 _value) external returns(bool success);
    function placeOrderExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires) external returns(bool success);
    function placeOrderCFDExchange(address _who, address _targetDrago, address _cfdExchange, address _cfd, bool _is_stable, uint32 _adjustment, uint128 _stake) external returns(bool success);
    function placeTradeExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires, address _user, uint _amount) external returns(bool success);
    function cancelOrderExchange(address _who, address _targetDrago, address _exchange, address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive, uint _expires) external returns(bool success);
    function cancelOrderCFDExchange(address _who, address _targetDrago, address _cfdExchange, address _cfd, uint32 _id) external returns(bool success);
    //function finalizedDealCFDExchange(address _who, address _targetDrago, address _exchange, address _cfd, uint24 _id) external returns(bool success);
    function createDrago(address _who, address _newDrago, string _name, string _symbol, uint _dragoId) external returns(bool success);
}
