/*

  Original work Copyright 2019 ZeroEx Intl.
  Modified work Copyright 2020 Rigo Intl.

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

pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "../../utils/0xUtils/LibRichErrors.sol";
import "../../utils/0xUtils/LibSafeMath.sol";
import "../libs/LibStakingRichErrors.sol";
import "../interfaces/IStructs.sol";
import "../sys/MixinAbstract.sol";
import "./MixinStakingPoolRewards.sol";


interface DragoRegistry {
    function fromAddress(address _drago) external view returns (uint256 id, string memory name, string memory symbol, uint256 dragoId, address owner, address group);
}

contract MixinStakingPool is
    MixinAbstract,
    MixinStakingPoolRewards
{
    using LibSafeMath for uint256;
    using LibSafeDowncast for uint256;

    /// @dev Asserts that the sender is the operator of the input pool.
    /// @param poolId Pool sender must be operator of.
    modifier onlyStakingPoolOperator(bytes32 poolId) {
        _assertSenderIsPoolOperator(poolId);
        _;
    }

    /// @dev Create a new staking pool. The sender will be the operator of this pool.
    /// Note that an operator must be payable.
    /// @param operatorShare Portion of rewards owned by the operator, in ppm.
    /// @param rigoblockPoolAddress Adds rigoblock pool to the created staking pool for convenience if non-null.
    /// @return poolId The unique pool id generated for this pool.
    function createStakingPool(uint32 operatorShare, address rigoblockPoolAddress)
        external
        returns (bytes32 poolId)
    {
        // note that an operator must be payable
        address operator = msg.sender;

        // compute unique id for this pool
        poolId = lastPoolId = bytes32(uint256(lastPoolId).safeAdd(1));

        // sanity check on operator share
        _assertNewOperatorShare(
            poolId,
            PPM_DENOMINATOR,    // max operator share
            operatorShare
        );

        // create and store pool
        IStructs.Pool memory pool = IStructs.Pool({
            operator: operator,
            operatorShare: operatorShare
        });
        _poolById[poolId] = pool;

        // Staking pool has been created
        emit StakingPoolCreated(poolId, operator, operatorShare);

        if (rigoblockPoolAddress != address(0)) {
            joinStakingPoolAsRbPool(poolId, rigoblockPoolAddress);
        }

        return poolId;
    }

    /// @dev Decreases the operator share for the given pool (i.e. increases pool rewards for members).
    /// @param poolId Unique Id of pool.
    /// @param newOperatorShare The newly decreased percentage of any rewards owned by the operator.
    function decreaseStakingPoolOperatorShare(bytes32 poolId, uint32 newOperatorShare)
        external
        onlyStakingPoolOperator(poolId)
    {
        // load pool and assert that we can decrease
        uint32 currentOperatorShare = _poolById[poolId].operatorShare;
        _assertNewOperatorShare(
            poolId,
            currentOperatorShare,
            newOperatorShare
        );

        // decrease operator share
        _poolById[poolId].operatorShare = newOperatorShare;
        emit OperatorShareDecreased(
            poolId,
            currentOperatorShare,
            newOperatorShare
        );
    }

    /// @dev Allows caller to join a staking pool as a rigoblock pool.
    /// @param poolId Unique id of pool.
    function joinStakingPoolAsRbPool(bytes32 poolId, address rigoblockPoolAddress)
        public
    {
        //TODO: test
        // delete rigoblock pool from existing staking pool
        // TODO: either add registry or pop address as public constant
        (uint256 rbPoolId, , , , address rbPoolOwner, ) = DragoRegistry(address(0)).fromAddress(rigoblockPoolAddress);
        require(
            rbPoolId != uint256(0) && rbPoolOwner == msg.sender,
            "ONLY_POOL_OWNER_CAN_ATTACH_REGISTERED_RB_POOL"
        );
        bytes32 existingPoolId = poolIdByRbPool[rigoblockPoolAddress];
        uint256 existingArrayLength = rigoblockOperatorPools[existingPoolId].length;
        
        if (existingArrayLength >= uint256(100)) {
            revert("POOLS_ARRAY_TOO_BIG_ERROR");
        }
        
        //bool alreadyAttachedPool = poolIdByRbPool[rigoblockPoolAddress] != bytes32(0);
        if (existingPoolId != bytes32(0)) {
            uint256 poolPositionToBeSwitched;
            address[] memory exitistingPoolsList = rigoblockOperatorPools[poolIdByRbPool[rigoblockPoolAddress]];
            // check whether address associated with any other pool array
            for (uint i=0; i < existingArrayLength; i++) {
                if (exitistingPoolsList[i] != rigoblockPoolAddress) continue;
                poolPositionToBeSwitched = i;
            }
            // overwrite last list element to switched pool position and pop from array
            rigoblockOperatorPools[existingPoolId][poolPositionToBeSwitched] = exitistingPoolsList[exitistingPoolsList.length-1];
            rigoblockOperatorPools[existingPoolId].pop();
        }
        poolIdByRbPool[rigoblockPoolAddress] = poolId;
        rigoblockOperatorPools[poolId].push(rigoblockPoolAddress);
        emit RbPoolStakingPoolSet(
            rigoblockPoolAddress,
            poolId
        );
    }

    /// @dev Returns a staking pool
    /// @param poolId Unique id of pool.
    function getStakingPool(bytes32 poolId)
        public
        view
        returns (IStructs.Pool memory)
    {
        return _poolById[poolId];
    }

    /// @dev Reverts iff a staking pool does not exist.
    /// @param poolId Unique id of pool.
    function _assertStakingPoolExists(bytes32 poolId)
        internal
        view
    {
        if (_poolById[poolId].operator == NIL_ADDRESS) {
            // we use the pool's operator as a proxy for its existence
            LibRichErrors.rrevert(
                LibStakingRichErrors.PoolExistenceError(
                    poolId,
                    false
                )
            );
        }
    }

    /// @dev Reverts iff the new operator share is invalid.
    /// @param poolId Unique id of pool.
    /// @param currentOperatorShare Current operator share.
    /// @param newOperatorShare New operator share.
    function _assertNewOperatorShare(
        bytes32 poolId,
        uint32 currentOperatorShare,
        uint32 newOperatorShare
    )
        private
        pure
    {
        // sanity checks
        if (newOperatorShare > PPM_DENOMINATOR) {
            // operator share must be a valid fraction
            LibRichErrors.rrevert(LibStakingRichErrors.OperatorShareError(
                LibStakingRichErrors.OperatorShareErrorCodes.OperatorShareTooLarge,
                poolId,
                newOperatorShare
            ));
        } else if (newOperatorShare > currentOperatorShare) {
            // new share must be less than or equal to the current share
            LibRichErrors.rrevert(LibStakingRichErrors.OperatorShareError(
                LibStakingRichErrors.OperatorShareErrorCodes.CanOnlyDecreaseOperatorShare,
                poolId,
                newOperatorShare
            ));
        }
    }

    /// @dev Asserts that the sender is the operator of the input pool.
    /// @param poolId Pool sender must be operator of.
    function _assertSenderIsPoolOperator(bytes32 poolId)
        private
        view
    {
        address operator = _poolById[poolId].operator;
        if (msg.sender != operator) {
            LibRichErrors.rrevert(
                LibStakingRichErrors.OnlyCallableByPoolOperatorError(
                    msg.sender,
                    poolId
                )
            );
        }
    }
}
