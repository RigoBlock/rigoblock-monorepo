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

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistryFace {

    //EVENTS

    event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
    event Unregistered(string indexed symbol, uint indexed id);
    event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

    // CORE FUNCTIONS

    function register(address _drago, string _name, string _symbol, uint _dragoId, address _owner) public payable returns (bool) {}
    function unregister(uint _id) public {}
    function setMeta(uint _id, bytes32 _key, bytes32 _value) public {}
    function addGroup(address _group) public {}
    function setFee(uint _fee) public {}
    function upgrade(address _newAddress) public payable {} //payable as there is a transfer of value, otherwise opcode might throw an error
    function setUpgraded(uint _version) external {}
    function drain() public {}

    function dragoCount() public constant returns (uint) {}
    function fromId(uint _id) public constant returns (address drago, string name, string symbol, uint dragoId, address owner, address group) {}
    function fromAddress(address _drago) public constant returns (uint id, string name, string symbol, uint dragoId, address owner, address group) {}
    function fromSymbol(string _symbol) public constant returns (uint id, address drago, string name, uint dragoId, address owner, address group) {}
    function fromName(string _name) public constant returns (uint id, address drago, string symbol, uint dragoId, address owner, address group) {}
    function fromNameSymbol(string _name, string _symbol) public constant returns (address) {}
    function getNameFromAddress(address _pool) external constant returns (bytes32) {}
    function getSymbolFromAddress(address _pool) external constant returns (bytes32) {}
    function meta(uint _id, bytes32 _key) public constant returns (bytes32) {}
    function getGroups() public constant returns (address[]) {}
    function getFee() public constant returns (uint) {}
}
