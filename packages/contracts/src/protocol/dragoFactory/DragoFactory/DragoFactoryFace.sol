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

pragma solidity 0.5.0;

/// @title Drago Factory Interface - Allows external interaction with Drago Factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface DragoFactoryFace {

    event DragoCreated(string name, string symbol, address indexed drago, address indexed owner, uint256 dragoId);

    function createDrago(string calldata _name, string calldata _symbol) external payable returns (bool success);
    function setTargetDragoDao(address payable _targetDrago, address _dragoDao) external;
    function changeDragoDao(address payable _newDragoDao) external;
    function setRegistry(address _newRegistry) external;
    function setBeneficiary(address payable _dragoDao) external;
    function setFee(uint256 _fee) external;
    function drain() external;

    function getRegistry() external view returns (address);
    function getStorage() external view returns (address dragoDao, string memory version, uint256 nextDragoId);
    function getEventful() external view returns (address);
    function getDragosByAddress(address _owner) external view returns (address[] memory);
}
