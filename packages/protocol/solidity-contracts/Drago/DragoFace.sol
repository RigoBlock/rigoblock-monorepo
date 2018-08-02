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

pragma solidity ^0.4.24;
pragma experimental "v0.5.0";

/// @title Drago Interface - Allows interaction with the Drago contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
interface DragoFace {

    // CORE FUNCTIONS

    function() external payable;
    function buyDrago() external payable returns (bool success);
    function buyDragoOnBehalf(address _hodler) external payable returns (bool success);
    function sellDrago(uint256 _amount) external returns (bool success);
    function setPrices(uint256 _newSellPrice, uint256 _newBuyPrice)  external;
    function changeMinPeriod(uint32 _minPeriod) external;
    function changeRatio(uint256 _ratio) external;
    function setTransactionFee(uint256 _transactionFee) external;
    function changeFeeCollector(address _feeCollector) external;
    function changeDragoDao(address _dragoDao) external;
    //function depositToExchange(address _exchange, uint256 _amount) external;
    function wrapToEfx(address _token, address _wrapper, address _tokenTransferProxy, uint256 _amount, uint256 _duration) external;
    function withdrawFromExchange(address _exchange, uint256 _amount) external;
    function setInfiniteAllowance(address _tokenTransferProxy, address _token) external;
    function SetMultipleAllowances(address _tokenTransferProxy, address[] _token) external;
    function operateOnExchange(address _exchange, bytes _assembledTransaction) external;
    function operateOnExchangeDirectly(address _exchange, bytes _assembledTransaction) external;
    function operateOnExchangeThroughAdapter(address _exchange, bytes _assembledTransaction) external;
    function enforceKyc(bool _enforced, address _kycProvider) external;

    // PUBLIC CONSTANT FUNCTIONS

    function balanceOf(address _who) external view returns (uint256);
    function getEventful() external view returns (address);
    function getData() external view returns (string name, string symbol, uint256 sellPrice, uint256 buyPrice);
    function calcSharePrice() external view returns (uint256);
    function getAdminData() external view returns (address, address feeCollector, address dragoDao, uint256 ratio, uint256 transactionFee, uint32 minPeriod);
    function totalSupply() external view returns (uint256);
    function getKycProvider() external view returns (address);
    function getVersion() external view returns (string);
}
