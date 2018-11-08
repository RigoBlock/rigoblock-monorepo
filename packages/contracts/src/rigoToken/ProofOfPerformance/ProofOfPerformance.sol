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

pragma solidity 0.4.25;
pragma experimental "v0.5.0";

import { PoolFace as Pool } from "../../utils/Pool/PoolFace.sol";
import { RigoToken } from "../RigoToken/RigoToken.sol";
import { DragoRegistryFace as DragoRegistry } from "../../protocol/DragoRegistry/DragoRegistry.sol";
import { InflationFace as Inflation } from "../Inflation/InflationFace.sol";
import { ReentrancyGuard } from "../../utils/ReentrancyGuard//ReentrancyGuard.sol";
import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { ProofOfPerformanceFace } from "./ProofOfPerformanceFace.sol";

/// @title Proof of Performance - Controls parameters of inflation.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract ProofOfPerformance is SafeMath, ReentrancyGuard, ProofOfPerformanceFace {

    address public RIGOTOKENADDRESS;

    address public dragoRegistry;
    address public rigoblockDao;

    mapping (uint256 => PoolPrice) poolPrice;
    mapping (address => Group) groups;

    struct PoolPrice {
        uint256 highwatermark;
    }

    struct Group {
        uint256 rewardRatio;
    }

    modifier onlyRigoblockDao() {
        require(msg.sender == rigoblockDao);
        _;
    }

    constructor(
        address _rigoTokenAddress,
        address _rigoblockDao,
        address _dragoRegistry)
        public
    {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        rigoblockDao = _rigoblockDao;
        dragoRegistry = _dragoRegistry;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows anyone to allocate the pop reward to pool wizards.
    /// @param _ofPool Number of pool id in registry.
    function claimPop(uint256 _ofPool)
        external
        nonReentrant
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        address poolAddress;
        (poolAddress, , , , , ) = registry.fromId(_ofPool);
        uint256 pop = proofOfPerformance(_ofPool);
        (uint256 price, ) = getPoolPrice(_ofPool);
        poolPrice[_ofPool].highwatermark = price;
        require(Inflation(getMinter()).mintInflation(poolAddress, pop));
    }

    /// @dev Allows RigoBlock Dao to update the pools registry.
    /// @param _dragoRegistry Address of new registry.
    function setRegistry(address _dragoRegistry)
        external
        onlyRigoblockDao
    {
        dragoRegistry = _dragoRegistry;
    }

    /// @dev Allows RigoBlock Dao to update its address.
    /// @param _rigoblockDao Address of new dao.
    function setRigoblockDao(address _rigoblockDao)
        external
        onlyRigoblockDao
    {
        rigoblockDao = _rigoblockDao;
    }

    /// @dev Allows RigoBlock Dao to set the ratio between assets and performance reward for a group.
    /// @param _ofGroup Id of the pool.
    /// @param _ratio Id of the pool.
    /// @notice onlyRigoblockDao can set ratio.
    function setRatio(
        address _ofGroup,
        uint256 _ratio)
        external
        onlyRigoblockDao
    {
        require(_ratio <= 10000); //(from 0 to 10000)
        groups[_ofGroup].rewardRatio = _ratio;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Gets data of a pool.
    /// @param _ofPool Id of the pool.
    /// @return Bool the pool is active.
    /// @return address of the pool.
    /// @return address of the pool factory.
    /// @return price of the pool in wei.
    /// @return total supply of the pool in units.
    /// @return total value of the pool in wei.
    /// @return value of the reward factor or said pool.
    /// @return ratio of assets/performance reward (from 0 to 10000).
    /// @return value of the pop reward to be claimed in GRGs.
    function getPoolData(uint _ofPool)
        external view
        returns (
            bool active,
            address thePoolAddress,
            address thePoolGroup,
            uint256 thePoolPrice,
            uint256 thePoolSupply,
            uint256 poolValue,
            uint256 epochReward,
            uint256 ratio,
            uint256 pop
        )
    {
        active = isActive(_ofPool);
        (thePoolAddress, thePoolGroup) = addressFromId(_ofPool);
        (thePoolPrice, thePoolSupply) = getPoolPrice(_ofPool);
        ( poolValue, ) = calcPoolValue(_ofPool);
        epochReward = getEpochReward(_ofPool);
        ratio = getRatio(_ofPool);
        pop = proofOfPerformance(_ofPool);
        return(
            active,
            thePoolAddress,
            thePoolGroup,
            thePoolPrice,
            thePoolSupply,
            poolValue,
            epochReward,
            ratio,
            pop
        );
    }

    /// @dev Returns the highwatermark of a pool.
    /// @param _ofPool Id of the pool.
    /// @return Value of the all-time-high pool nav.
    function getHwm(uint256 _ofPool)
        external view
        returns (uint256)
    {
        return poolPrice[_ofPool].highwatermark;
    }

    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev Returns the reward factor for a pool.
    /// @param _ofPool Id of the pool.
    /// @return Value of the reward factor.
    function getEpochReward(uint256 _ofPool)
        internal view
        returns (uint256)
    {
        ( , address group) = addressFromId(_ofPool);
        return Inflation(getMinter()).getInflationFactor(group);
    }

    /// @dev Returns the split ratio of asset and performance reward.
    /// @param _ofPool Id of the pool.
    /// @return Value of the ratio from 1 to 100.
    function getRatio(uint256 _ofPool)
        internal view
        returns (uint256)
    {
        ( , address group) = addressFromId(_ofPool);
        return groups[group].rewardRatio;
    }

    /// @dev Returns the address of the Inflation contract.
    /// @return Address of the minter/inflation.
    function getMinter()
        internal view
        returns (address)
    {
        RigoToken token = RigoToken(RIGOTOKENADDRESS);
        return token.minter();
    }

    /// @dev Returns the proof of performance reward for a pool.
    /// @param _ofPool Id of the pool.
    /// @return Value of the reward in Rigo tokens.
    /// @notice epoch reward should be big enough that it.
    /// @notice can be decreased if number of funds increases.
    /// @notice should be at least 10^6 (just as pool base) to start with.
    /// @notice rigo token has 10^18 decimals.
    function proofOfPerformance(uint256 _ofPool)
        internal view
        returns (uint256)
    {
        uint256 highwatermark = 1000 ether; //initialize variable with arbitrarity high value
        if (poolPrice[_ofPool].highwatermark == 0) {
            highwatermark = 1 ether;
        } else {
            highwatermark = poolPrice[_ofPool].highwatermark;
        }
        (uint256 poolValue, ) = calcPoolValue(_ofPool);
        require(poolValue != 0);
        (uint256 newPrice, uint256 tokenSupply) = getPoolPrice(_ofPool);
        require (newPrice >= highwatermark);
        uint256 epochReward = getEpochReward(_ofPool);
        uint256 rewardRatio = getRatio(_ofPool);
        uint256 prevPrice = highwatermark;
        uint256 priceDiff = safeSub(newPrice, prevPrice);
        uint256 performanceReward = priceDiff * tokenSupply * epochReward * rewardRatio / 10000 ether;
        uint256 assetsReward = poolValue * epochReward * (10000 - rewardRatio) / 10000 ether;
        return (performanceReward + assetsReward);
    }

    /// @dev Checks whether a pool is registered and active.
    /// @param _ofPool Id of the pool.
    /// @return Bool the pool is active.
    function isActive(uint256 _ofPool)
        internal view
        returns (bool)
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        (address thePool, , , , , ) = registry.fromId(_ofPool);
        if (thePool != address(0)) {
            return true;
        }
    }

    /// @dev Returns the address and the group of a pool from its id.
    /// @param _ofPool Id of the pool.
    /// @return Address of the target pool.
    /// @return Address of the pool's group.
    function addressFromId(uint256 _ofPool)
        internal view
        returns (
            address pool,
            address group
        )
    {
        DragoRegistry registry = DragoRegistry(dragoRegistry);
        (pool, , , , , group) = registry.fromId(_ofPool);
        return (pool, group);
    }

    /// @dev Returns the price a pool from its id.
    /// @param _ofPool Id of the pool.
    /// @return Price of the pool in wei.
    /// @return Number of tokens of a pool (totalSupply).
    function getPoolPrice(uint256 _ofPool)
        internal view
        returns (
            uint256 thePoolPrice,
            uint256 totalTokens
        )
    {
        (address poolAddress, ) = addressFromId(_ofPool);
        Pool pool = Pool(poolAddress);
        thePoolPrice = pool.calcSharePrice();
        totalTokens = pool.totalSupply();
    }

    /// @dev Returns the address and the group of a pool from its id.
    /// @param _ofPool Id of the pool.
    /// @return Address of the target pool.
    /// @return Address of the pool's group.
    function calcPoolValue(uint256 _ofPool)
        internal view
        returns (
            uint256 aum,
            bool success
        )
    {
        (uint256 price, uint256 supply) = getPoolPrice(_ofPool);
        return ((aum = (price * supply / 1000000)), true); //1000000 is the base (decimals)
    }
}
