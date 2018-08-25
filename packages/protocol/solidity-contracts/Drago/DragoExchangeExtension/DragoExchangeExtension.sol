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

import { Authority } from "../../Authority/Authority.sol";
import { ExchangesAuthorityFace as ExchangesAuthority } from "../../exchanges/ExchangesAuthority/ExchangesAuthorityFace.sol";

/// @title Drago Exchange Extention - library to extend drago to exchange adapters.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library DragoExchangeExtension {

    struct Admin {
        address authority;
        bytes transactionData;
    }

    /// @dev Sends a transaction to the adapter of an exchange
    /// @param _exchange Address of the exchange
    /// @param _assembledTransaction ABI encoded transaction
    /// @return Bool the transaction was successful
    function operateOnExchangeInternal(
        Admin memory admin,
        address _exchange,
        bytes _assembledTransaction)
        internal
        returns (bool success)
    {
        bytes memory _data = _assembledTransaction;
        address _target = getExchangeAdapter(admin, _exchange);
        bytes4 method;
        
        // find the bytes4(keccak256('functionABI')) of trhe function
        assembly {
            method := mload(0x00)
        }

        require(
            methodAllowedOnExchange(
                admin,
                method,
                _target
            )
        );
        bytes memory response;
        bool failed;

        assembly {
            let succeeded := delegatecall(sub(gas, 10000), _target, add(_data, 0x20), mload(_data), 0, 0x20)
            response := mload(0)      // load delegatecall output
            failed := iszero(succeeded)
        }

        require(!failed);
        return (success == true);
    }

    /// @dev Sends a transaction to the adapter of an exchange
    /// @param _exchange Address of the exchange
    /// @param assembledData ABI encoded transaction
    /// @return Bool the transaction was successful
    /// @notice A generalized way to decode the data
    function operateOnExchange(
        Admin memory admin,
        address _exchange,
        bytes assembledData)
        internal
    {
        admin.transactionData = assembledData;
        assembleCall(_exchange, assembledData.length);
    }

    /// @dev Allows caller to delegate any call to the adapter
    /// @param _exchange Address of the target exchange
    /// @param _callData size of the data of the call
    function assembleCall(address _exchange, uint256 _callData)
        internal
    {

        uint256 size = _callData;
        bytes32 m_data = _malloc(size);

        assembly {
            calldatacopy(m_data, 0x0, size)
        }

        bytes32 m_result = _call(m_data, size, _exchange);

        assembly {
            return(m_result, 0x20)
        }
    }

    /// @dev Builds the bytes from the call data
    /// @param size Given size of the call
    /// @return Bytes32 of the pointer
    function _malloc(uint256 size) internal pure returns(bytes32) {

        bytes32 m_data;

        assembly {
            /// @notice Get free memory pointer and update it
            m_data := mload(0x40)
            mstore(0x40, add(m_data, size))
        }

        return m_data;
    }

    /// @dev Checks whether a call returns something and executes if positive
    /// @param m_data Bytes32 of the call data
    /// @param size Given size of the call
    /// @param adapter Address of the exchange adapter which receives a delegatecall
    /// @return A pointer to memory which contain the 32 first bytes of the delegatecall output
    function _call(bytes32 m_data, uint256 size, address adapter) internal returns(bytes32) {
        address target = adapter;
        bytes32 m_result = _malloc(32);
        bool failed;

        assembly {
            failed := iszero(delegatecall(sub(gas, 10000), target, m_data, size, m_result, 0x20))
        }

        require(!failed);
        return m_result;
    }

    /// @dev Returns the address of the exchange adapter
    /// @param _exchange Address of the target exchange
    /// @return Address of the exchange adapter
    function getExchangeAdapter(Admin memory admin, address _exchange)
        internal view
        returns (address)
    {
        return ExchangesAuthority(
            Authority(admin.authority)
            .getExchangesAuthority())
            .getExchangeAdapter(_exchange);
    }

    /// @dev Finds if a method is allowed on an exchange
    /// @param _exchange Address of the target exchange
    /// @return Bool the method is allowed
    function methodAllowedOnExchange(
        Admin memory admin,
        bytes4 _method,
        address _exchange)
        internal view
        returns (bool)
    {
        return ExchangesAuthority(
            Authority(admin.authority)
            .getExchangesAuthority())
            .isMethodAllowed(_method, _exchange);
    }
}
