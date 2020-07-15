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

/// @title Vault Interface - Allows interaction with the Vault contracts.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
interface VaultFace {

    /*
     * CORE FUNCTIONS
     */
    function buyVault() external payable returns (bool success);
    function buyVaultOnBehalf(address _hodler) external payable returns (bool success);
    function sellVault(uint256 amount) external returns (bool success);
    function changeRatio(uint256 _ratio) external;
    function setTransactionFee(uint256 _transactionFee) external;
    function changeFeeCollector(address _feeCollector) external;
    function changeVaultDao(address _vaultDao) external;
    function updatePrice() external;
    function changeMinPeriod(uint32 _minPeriod) external;
    function depositToken(address _token, uint256 _value, uint8 _forTime) external returns (bool success);
    function depositTokenOnBehalf(address _token, address _hodler, uint256 _value, uint8 _forTime) external returns (bool success);
    function withdrawToken(address _token, uint256 _value) external returns (bool success);

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    function balanceOf(address _who) external view returns (uint256);
    function tokenBalanceOf(address _token, address _owner) external view returns (uint256);
    function timeToUnlock(address _token, address _user) external view returns (uint256);
    function tokensInVault(address _token) external view returns (uint256);
    function getEventful() external view returns (address);
    function getData() external view returns (string memory name, string memory symbol, uint256 sellPrice, uint256 buyPrice);
    function calcSharePrice() external view returns (uint256);
    function getAdminData() external view returns (address, address feeCollector, address vaultDao, uint256 ratio, uint256 transactionFee, uint32 minPeriod);
    function totalSupply() external view returns (uint256);
}
