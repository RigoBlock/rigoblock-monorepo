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

/// @title Authority Interface - Allows interaction with the Authority contract.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract AuthorityFace {

    // EVENTS

    event SetAuthority (address indexed authority);
    event SetWhitelister (address indexed whitelister);
    event WhitelistedUser(address indexed target, bool approved);
    event WhitelistedAsset(address indexed asset, bool approved);
    event WhitelistedExchange(address indexed exchange, bool approved);
    event WhitelistedRegistry(address indexed registry, bool approved);
    event WhitelistedFactory(address indexed factory, bool approved);
    event WhitelistedVault(address indexed vault, bool approved);
    event WhitelistedDrago(address indexed drago, bool isWhitelisted);
    event NewDragoEventful(address indexed dragoEventful);
    event NewVaultEventful(address indexed vaultEventful);
    event NewExchangeEventful(address indexed exchangeEventful);
    event NewCasper(address indexed casper);

    // CORE FUNCTIONS

    function setAuthority(address _authority, bool _isWhitelisted) public {}
    function setWhitelister(address _whitelister, bool _isWhitelisted) public {}
    function whitelistUser(address _target, bool _isWhitelisted) public {}
    function whitelistAsset(address _asset, bool _isWhitelisted) public {}
    function whitelistExchange(address _exchange, bool _isWhitelisted) public {}
    function whitelistDrago(address _drago, bool _isWhitelisted) public {}
    function whitelistVault(address _vault, bool _isWhitelisted) public {}
    function whitelistRegistry(address _registry, bool _isWhitelisted) public {}
    function whitelistFactory(address _factory, bool _isWhitelisted) public {}
    function setDragoEventful(address _dragoEventful) public {}
    function setVaultEventful(address _vaultEventful) public {}
    function setExchangeEventful(address _exchangeEventful) public {}
    function setExchangeAdapter(address _exchange, address _adapter) public {}
    function setCasper(address _casper) public {}

    function isWhitelistedUser(address _target) public view returns (bool) {}
    function isWhitelister(address _whitelister) public view returns (bool) {}
    function isAuthority(address _authority) public view returns (bool) {}
    function isWhitelistedAsset(address _asset) public view returns (bool) {}
    function isWhitelistedExchange(address _exchange) public view returns (bool) {}
    function isWhitelistedRegistry(address _registry) public view returns (bool) {}
    function isWhitelistedDrago(address _drago) public view returns (bool) {}
    function isWhitelistedVault(address _vault) public view returns (bool) {}
    function isWhitelistedFactory(address _factory) public view returns (bool) {}
    function getDragoEventful() public view returns (address) {}
    function getVaultEventful() public view returns (address) {}
    function getExchangeEventful() public view returns (address) {}
    function isCasperInitialized() public view returns (bool) {}
    function getCasper() public view returns (address) {}
    function getOwner() public view returns (address) {}
    function getExchangeAdapter(address _exchange) public view returns (address) {}
    function getListsByGroups(string _group) public view returns (address[]) {}
}
