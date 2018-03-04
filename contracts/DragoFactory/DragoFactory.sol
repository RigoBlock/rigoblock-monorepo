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

    /*
    * import the drago contract code first
    */

/// @title Drago Factory library - Reduces size of drago factory.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library DragoFactoryLibrary {

    struct NewDrago {
        string name;
        string symbol;
        uint256 dragoId;
        address owner;
        address newAddress;
    }

    modifier whitelisted_factory(address _authority) {
        Authority auth = Authority(_authority);
        if (auth.isWhitelistedFactory(this)) _;
    }

    /// @dev Allows an approved factory to create new dragos
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @param _owner Address of the owner
    /// @param _dragoId Number of Id of the drago from the registry
    /// @param _authority Address of the respective authority
    /// @return Bool the function executed
    function createDrago(
        NewDrago storage self,
        string _name,
        string _symbol,
        address _owner,
        uint _dragoId,
        address _authority)
        internal
        whitelisted_factory(_authority)
        returns (bool success)
    {
        Drago drago = new Drago(_name, _symbol, _dragoId, _owner, _authority);
        self.name = _name;
        self.symbol = _symbol;
        self.dragoId = _dragoId;
        self.newAddress = address(drago);
        self.owner = _owner;
        return true;
    }
}

/// @title Drago Registry Interface - Allows external intaction with Drago Registry.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoRegistry {

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
    function setUpgraded(uint _version) public {}
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
    function setOwner(address _new) {}

    function getRegistry() public constant returns (address) {}
    function getStorage() public constant returns (address dragoDao, uint nextDragoId) {}
    function getNextId() public constant returns (uint nextDragoId) {}
    function getEventful() public constant returns (address) {}
    function getDragoDao() public constant returns (address dragoDao) {}
    function getVersion() public constant returns (string) {}
    function getDragosByAddress(address _owner) public constant returns (address[]) {}
    function getOwner() constant returns (address) {}
}

/// @title Drago Factory contract - allows creation of new dragos.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract DragoFactory is Owned, DragoFactoryFace {

    DragoFactoryLibrary.NewDrago libraryData;

    string public constant VERSION = 'VF 0.4.1';

    Data data;

    struct Data {
        uint fee;
        address dragoRegistry;
        address dragoDao;
        address authority;
        mapping(address => address[]) dragos;
    }

    event DragoCreated(
        string name,
        string symbol,
        address indexed drago,
        address indexed owner,
        uint dragoId
    );

    modifier whitelisted_factory(address _authority) {
        Authority auth = Authority(_authority);
        if (auth.isWhitelistedFactory(this)) _;
    }

    modifier when_fee_paid { require(msg.value >= data.fee); _; }
    modifier only_owner { require(msg.sender == owner); _; }
    modifier only_drago_dao { require(msg.sender == data.dragoDao); _; }

    function DragoFactory(
        address _registry,
        address _dragoDao,
        address _authority)
        public
    {
        data.dragoRegistry = _registry;
        data.dragoDao = _dragoDao;
        data.authority = _authority;
        owner = msg.sender;
    }

    // CORE FUNCTIONS

    /// @dev allows creation of a new drago
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @return Bool the transaction executed correctly
    function createDrago(string _name, string _symbol)
        public
        returns (bool success)
    {
        DragoRegistry registry = DragoRegistry(data.dragoRegistry);
        uint regFee = registry.getFee();
        uint dragoId = registry.dragoCount();
        require(createDragoInternal(_name, _symbol, msg.sender, dragoId));
        assert(registry.register.value(regFee)(
            libraryData.newAddress,
            _name,
            _symbol,
            dragoId,
            msg.sender)
        );
        return true;
    }

    /// @dev Allows factory owner to update the address of the dao/factory
    /// @dev Enables manual update of dao for single dragos
    /// @param _targetDrago Address of the target drago
    /// @param _dragoDao Address of the new drago dao
    function setTargetDragoDao(address _targetDrago, address _dragoDao)
        public
        only_owner
    {
        Drago drago = Drago(_targetDrago);
        drago.changeDragoDao(_dragoDao);
    }

    /// @dev Allows drago dao/factory to update its address
    /// @dev Creates internal record
    /// @param _newDragoDao Address of the drago dao
    function changeDragoDao(address _newDragoDao) public only_drago_dao {
        data.dragoDao = _newDragoDao;
    }

    /// @dev Allows owner to update the registry
    /// @param _newRegistry Address of the new registry
    function setRegistry(address _newRegistry) public only_owner {
        data.dragoRegistry = _newRegistry;
    }

    /// @dev Allows owner to set the address which can collect creation fees
    /// @param _dragoDao Address of the new drago dao/factory
    function setBeneficiary(address _dragoDao) public only_owner {
        data.dragoDao = _dragoDao;
    }

    /// @dev Allows owner to set the drago creation fee
    /// @param _fee Value of the fee in wei
    function setFee(uint _fee) public only_owner {
        data.fee = _fee;
    }

    /// @dev Allows owner to collect fees
    function drain() public only_owner {
        data.dragoDao.transfer(this.balance);
    }

    // CONSTANT PUBLIC FUNCTIONS

    /// @dev Returns the address of the pool registry
    /// @return Address of the registry
    function getRegistry() public constant returns (address) {
        return (data.dragoRegistry);
    }

    /// @dev Returns administrative data for this factory
    /// @return Address of the drago dao
    /// @return String of the version
    /// @return Number of the next drago from the registry
    function getStorage()
        public
        constant
        returns (
            address dragoDao,
            uint nextDragoId
        )
    {
        return (data.dragoDao, nextDragoId);
    }

    /// @dev Returns the next Id for a drago
    /// @return Number of the next Id from the registry
    function getNextId() public constant returns (uint nextDragoId) {
        DragoRegistry registry = DragoRegistry(data.dragoRegistry);
        nextDragoId = registry.dragoCount();
    }

    /// @dev Returns the address of the logger contract
    /// @dev Queries from authority contract
    /// @return Address of the eventful contract
    function getEventful() public constant returns (address) {
        Authority auth = Authority(data.authority);
        return auth.getDragoEventful();
    }

    /// @dev Returns the address of the drago dao
    /// @return Address of the drago dao
    function getDragoDao() public constant returns (address) {
        return data.dragoDao;
    }

    /// @dev Returns the version of this factory
    /// @return Address of the factory
    function getVersion() public constant returns (string) {
        return VERSION;
    }

    /// @dev Returns an array of dragos the owner has created
    /// @param _owner Address of the queried owner
    /// @return Array of drago addresses
    function getDragosByAddress(address _owner)
        public
        constant
        returns (address[])
    {
        return data.dragos[_owner];
    }

    // INTERNAL FUNCTIONS

    /// @dev Creates a drago and routes to eventful
    /// @param _name String of the name
    /// @param _symbol String of the symbol
    /// @param _owner Address of the owner
    /// @param _dragoId Number of the new drago Id
    /// @return Bool the transaction executed correctly
    function createDragoInternal(
        string _name,
        string _symbol,
        address _owner,
        uint _dragoId)
        internal
        when_fee_paid
        returns (bool success)
    {
        Authority auth = Authority(data.authority);
        require(DragoFactoryLibrary.createDrago(
            libraryData,
            _name,
            _symbol,
            _owner,
            _dragoId,
            data.authority)
        );
        data.dragos[msg.sender].push(libraryData.newAddress);
        DragoEventful events = DragoEventful(auth.getDragoEventful());
        require(events.createDrago(
            msg.sender,
            this,
            libraryData.newAddress,
            _name,
            _symbol,
            _dragoId,
            _owner)
        );
        auth.whitelistDrago(libraryData.newAddress, true);
        auth.whitelistUser(msg.sender, true);
        DragoCreated(_name, _symbol, libraryData.newAddress, _owner, _dragoId);
        return true;
    }
}
