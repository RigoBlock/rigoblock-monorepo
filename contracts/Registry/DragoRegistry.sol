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

import { Owned } from "../utils/Owned/Owned.sol";
import { DragoRegistryFace } from "../Registry/DragoRegistryFace.sol";
import { AuthorityFace as Authority } from "../Authority/AuthorityFace.sol";

/// @title Drago Registry - Allows registration of pools.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistry is DragoRegistryFace, Owned {

    address public AUTHORITY;
    uint public VERSION;

    uint public fee = 0;

    address[] groups;

    Drago[] dragos;

    mapping (bytes32 => address) mapFromKey;
    mapping (address => uint) mapFromAddress;
    mapping (string => uint) mapFromName;
    mapping (string => uint) mapFromSymbol;

    struct Drago {
        address drago;
        string name;
        string symbol;
        uint dragoId;
        address owner;
        address group;
        mapping (bytes32 => bytes32) meta;
    }

    // EVENTS

    event Registered(string name, string symbol, uint id, address indexed drago, address indexed owner, address indexed group);
    event Unregistered(string indexed name, string indexed symbol, uint indexed id);
    event MetaChanged(uint indexed id, bytes32 indexed key, bytes32 value);

    // MODIFIERS

    modifier when_fee_paid {
        require(msg.value >= fee);
        _;
    }

    modifier when_address_free(address _drago) {
        require(mapFromAddress[_drago] == 0);
        _;
    }

    modifier when_is_symbol(string _symbol) {
        require(bytes(_symbol).length == 3);
        _;
    }

    modifier when_has_symbol(string _symbol) {
        require(mapFromSymbol[_symbol] != 0);
        _;
    }

    modifier only_drago_owner(uint _id) {
        require(dragos[_id].owner == msg.sender);
        _;
    }

    modifier when_name_free(string _name) {
        require(mapFromName[_name] == 0);
        _;
    }

    modifier when_has_name(string _name) {
        require(mapFromName[_name] != 0);
        _;
    }

    modifier only_authority {
        Authority auth = Authority(AUTHORITY);
        require(auth.isAuthority(msg.sender) == true);
        _;
    }

    function DragoRegistry(address _authority) public {
        AUTHORITY = _authority;
    }

    // CORE CORE FUNCTIONS

    /// @dev Allows a factory which is an authority to register a pool
    /// @param _drago Address of the pool
    /// @param _name Name of the pool
    /// @param _symbol Symbol of the pool
    /// @param _dragoId Id number of the pool
    /// @param _owner Address of the pool owner
    function register(
        address _drago,
        string _name,
        string _symbol,
        uint _dragoId,
        address _owner)
        public
        payable
        only_authority
        when_fee_paid
        when_address_free(_drago)
        when_name_free(_name)
        when_is_symbol(_symbol)
        returns (bool)
    {
        return registerAs(_drago, _name, _symbol, _dragoId, _owner, msg.sender);
    }

    /// @dev Allows owner to unregister a pool
    /// @param _id Number of the pool
    function unregister(uint _id) public only_owner {
        Unregistered(dragos[_id].name, dragos[_id].symbol, _id);
        delete mapFromAddress[dragos[_id].drago];
        delete mapFromName[dragos[_id].name];
        delete mapFromSymbol[dragos[_id].symbol];
        delete dragos[_id];
    }

    /// @dev Allows pool owner to set metadata for a pool
    /// @param _id Number corresponding to pool id
    /// @param _key Bytes32 of the key
    /// @param _value Bytes32 of the value
    function setMeta(uint _id, bytes32 _key, bytes32 _value)
        public
        only_drago_owner(_id)
    {
        dragos[_id].meta[_key] = _value;
        MetaChanged(_id, _key, _value);
    }

    /// @dev Allows owner to add a group of pools (a factory)
    /// @param _group Address of the new group
    function addGroup(address _group)
        public
        only_owner
    {
        groups.push(_group);
    }

    /// @dev Allows owner to set a fee to register pools
    /// @param _fee Value of the fee in wei
    function setFee(uint _fee) public only_owner {
        fee = _fee;
    }

    /// @dev Allows owner to create a new registry.
    /// @dev When the registry gets upgraded, a migration of all funds is required
    /// @param _newAddress Address of new registry.
    function upgrade(address _newAddress) public payable only_owner {
        DragoRegistry registry = DragoRegistry(_newAddress);
        ++VERSION;
        registry.setUpgraded(VERSION);
        address(registry).transfer(this.balance);
    }

    /// @dev Allows owner to update version on registry upgrade
    /// @param _version Number of the new version
    function setUpgraded(uint _version) external only_owner {
        VERSION = _version;
    }

    /// @dev Allows owner to collect fees by draining the balance
    function drain() public only_owner {
        msg.sender.transfer(this.balance);
    }

    // CONSTANT CORE FUNCTIONS

    /// @dev Provides the total number of registered pools
    /// @return Number of pools
    function dragoCount() public constant returns (uint) {
        return dragos.length;
    }

    /// @dev Provides a pool's struct data
    /// @param _id Registration number of the pool
    /// @return Pool struct data
    function fromId(uint _id)
        public
        constant
        returns (
            address drago,
            string name,
            string symbol,
            uint dragoId,
            address owner,
            address group
        )
    {
        Drago memory pool = dragos[_id];
        return (
            drago = pool.drago,
            name = pool.name,
            symbol = pool.symbol,
            dragoId = pool.dragoId,
            owner = pool.owner,
            group = pool.group
        );
    }

    /// @dev Provides a pool's struct data
    /// @param _drago Address of the pool
    /// @return Pool struct data
    function fromAddress(address _drago)
        public
        constant
        returns (
            uint id,
            string name,
            string symbol,
            uint dragoId,
            address owner,
            address group
        )
    {
        id = mapFromAddress[_drago] - 1;
        Drago memory pool = dragos[id];
        return (
            id,
            name = pool.name,
            symbol = pool.symbol,
            dragoId = pool.dragoId,
            owner = pool.owner,
            group = pool.group
        );
    }

    /// @dev Provides a pool's struct data
    /// @param _symbol Symbol of the pool
    /// @return Pool struct data
    function fromSymbol(string _symbol)
        public
        constant
        returns (
            uint id,
            address drago,
            string name,
            uint dragoId,
            address owner,
            address group
        )
    {
        id = mapFromSymbol[_symbol] - 1;
        Drago memory pool = dragos[id];
        return (
            id,
            drago = pool.drago,
            name = pool.name,
            dragoId = pool.dragoId,
            owner = pool.owner,
            group = pool.group
        );
    }

    /// @dev Provides a pool's struct data
    /// @param _name Name of the pool
    /// @return Pool struct data
    function fromName(string _name)
        public
        constant
        returns (
            uint id,
            address drago,
            string symbol,
            uint dragoId,
            address owner,
            address group
        )
    {
        id = mapFromName[_name] - 1;
        Drago memory pool = dragos[id];
        return (
            id,
            drago = pool.drago,
            symbol = pool.symbol,
            dragoId = pool.dragoId,
            owner = pool.owner,
            group = pool.group
        );
    }

    /// @dev Provides a pool's struct data
    /// @param _name Name of the pool
    /// @param _symbol Symbol of the pool
    /// @return Pool struct data
    function fromNameSymbol(string _name, string _symbol)
        public
        constant
        returns (address)
    {
        uint id = mapFromName[_name] - 1;
        uint idCheck = mapFromSymbol[_symbol] - 1;
        Drago memory pool = dragos[id];
        require(id == idCheck);
        address drago = pool.drago;
        return drago;
    }

    /// @dev Provides a pool's name from its address
    /// @param _pool Address of the pool
    /// @return Name of the pool
    function getNameFromAddress(address _pool)
        external
        constant
        returns (bytes32)
    {
        uint id = mapFromAddress[_pool] - 1;
        Drago memory pool = dragos[id];
        return keccak256(pool.name);
    }

    /// @dev Provides a pool's symbol from its address
    /// @param _pool Address of the pool
    /// @return Symbol of the pool
    function getSymbolFromAddress(address _pool)
        external
        constant
        returns (bytes32)
    {
        uint id = mapFromAddress[_pool] - 1;
        Drago memory pool = dragos[id];
        return keccak256(pool.symbol);
    }

    /// @dev Provides a pool's metadata
    /// @param _id Id number of the pool
    /// @param _key Bytes32 key
    /// @return Pool metadata
    function meta(uint _id, bytes32 _key)
        public
        constant
        returns (bytes32)
    {
        return dragos[_id].meta[_key];
    }

    /// @dev Provides the addresses of the groups/factories
    /// @return Array of addresses of the groups
    function getGroups()
        public
        constant
        returns (address[])
    {
        return groups;
    }

    /// @dev Provides the fee required to register a pool
    /// @return Number of the fee in wei
    function getFee() public constant returns (uint) {
        return fee;
    }

    // INTERNAL CORE FUNCTIONS

    /// @dev Allows authority to register a pool for a certain group
    /// @param _drago Address of the pool
    /// @param _name Name of the pool
    /// @param _symbol Symbol of the pool
    /// @param _dragoId Id number of the pool
    /// @param _owner Address of the pool owner
    /// @param _group Address of the group/factory
    function registerAs(
        address _drago,
        string _name,
        string _symbol,
        uint _dragoId,
        address _owner,
        address _group)
        internal
        returns (bool)
    {
        dragos.push(Drago(_drago, _name, _symbol, _dragoId, _owner, _group));
        mapFromAddress[_drago] = dragos.length;
        mapFromName[_name] = dragos.length;
        mapFromSymbol[_symbol] = dragos.length;
        Registered(_name, _symbol, dragos.length - 1, _drago, _owner, _group);
        return true;
    }
}
