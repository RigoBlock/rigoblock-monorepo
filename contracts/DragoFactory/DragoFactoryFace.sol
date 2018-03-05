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

pragma solidity ^0.4.19;

/// @title Drago Factory Interface - Allows external interaction with Drago Factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoFactoryFace {

    event DragoCreated(string name, string symbol, address indexed drago, address indexed owner, uint dragoId);

    function createDrago(string _name, string _symbol) public returns (bool success) {}
    function setTargetDragoDao(address _targetDrago, address _dragoDao) public {}
    function changeDragoDao(address _newDragoDao) public {}
    function setRegistry(address _newRegistry) public {}
    function setBeneficiary(address _dragoDao) public {}
    function setFee(uint _fee) public {}
    function drain() public {}
    //function setOwner(address _new) public {}

    function getRegistry() public view returns (address) {}
    function getStorage() public view returns (address dragoDao, string version, uint nextDragoId) {}
    function getNextId() public view returns (uint nextDragoId) {}
    function getEventful() public view returns (address) {}
    function getDragosByAddress(address _owner) public view returns (address[]) {}
    //function getOwner() public view returns (address) {}
}
