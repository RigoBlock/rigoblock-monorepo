/*

 Copyright 2017-2019 RigoBlock, Rigo Investment Sagl, 2020 Rigo Intl.

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

pragma solidity 0.5.4;

import { Pool } from "../../utils/Pool/Pool.sol";
import { ReentrancyGuard } from "../../utils/ReentrancyGuard/ReentrancyGuard.sol";
import { SafeMath } from "../../utils/SafeMath/SafeMath.sol";
import { ProofOfPerformanceFace } from "./ProofOfPerformanceFace.sol";


contract Inflation {

    uint256 public period;
    uint256 public minimumGRG;

    /*
     * CORE FUNCTIONS
     */
    function mintInflation(bytes32 stakingPoolId, uint256 reward) external returns (bool);
    function setInflationFactor(address groupAddress, uint256 inflationFactor) external;
    function setMinimumRigo(uint256 minimum) external;
    function setRigoblock(address newRigoblockDaoAddress) external;
    function setAuthority(address authorityAddress) external;
    function setProofOfPerformance(address popAddress) external;
    function setPeriod(uint256 newPeriod) external;

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    function canWithdraw(bytes32 stakingPoolId) external view returns (bool);
    function timeUntilClaim(bytes32 stakingPoolId) external view returns (uint256);
    function getInflationFactor(address groupAddress) external view returns (uint256);
}

contract RigoToken {
    address public minter;
    uint256 public totalSupply;

    function balanceOf(address _who) external view returns (uint256);
}

interface DragoRegistry {

    /*
     * CORE FUNCTIONS
     */
    function register(address _drago, string calldata _name, string calldata _symbol, uint256 _dragoId, address _owner) external payable returns (bool);
    function unregister(uint256 _id) external;
    function setMeta(uint256 _id, bytes32 _key, bytes32 _value) external;
    function addGroup(address _group) external;
    function setFee(uint256 _fee) external;
    function updateOwner(uint256 _id) external;
    function updateOwners(uint256[] calldata _id) external;
    function upgrade(address _newAddress) external payable; //payable as there is a transfer of value, otherwise opcode might throw an error
    function setUpgraded(uint256 _version) external;
    function drain() external;

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    function dragoCount() external view returns (uint256);
    function fromId(uint256 _id) external view returns (address drago, string memory name, string memory symbol, uint256 dragoId, address owner, address group);
    function fromAddress(address _drago) external view returns (uint256 id, string memory name, string memory symbol, uint256 dragoId, address owner, address group);
    function fromName(string calldata _name) external view returns (uint256 id, address drago, string memory symbol, uint256 dragoId, address owner, address group);
    function getNameFromAddress(address _pool) external view returns (string memory);
    function getSymbolFromAddress(address _pool) external view returns (string memory);
    function meta(uint256 _id, bytes32 _key) external view returns (bytes32);
    function getGroups() external view returns (address[] memory);
    function getFee() external view returns (uint256);
}

/// @title Proof of Performance - Controls parameters of inflation.
/// @author Gabriele Rigo - <gab@rigoblock.com>
// solhint-disable-next-line
contract ProofOfPerformance is
    SafeMath,
    ReentrancyGuard,
    ProofOfPerformanceFace
{
    address public RIGOTOKENADDRESS;
    address public STAKING_PROXY_ADDRESS;

    address public dragoRegistryAddress;
    address public rigoblockDaoAddress;

    mapping (uint256 => PoolPrice) poolPriceById;
    mapping (address => Group) groups;

    struct PoolPrice {
        uint256 highwatermark;
    }

    struct Group {
        uint256 rewardRatio;
    }

    modifier onlyRigoblockDao() {
        require(
            msg.sender == rigoblockDaoAddress,
            "ONLY_RIGOBLOCK_DAO"
        );
        _;
    }

    modifier onlyStakingProxy() {
        require(
            msg.sender == STAKING_PROXY_ADDRESS,
            "ONLY_STAKING_PROXY"
        );
        _;
    }

    constructor(
        address _rigoTokenAddress,
        address _rigoblockDao,
        address _dragoRegistry,
        address _stakingProxyAddress)
        public
    {
        RIGOTOKENADDRESS = _rigoTokenAddress;
        rigoblockDaoAddress = _rigoblockDao;
        dragoRegistryAddress = _dragoRegistry;
        STAKING_PROXY_ADDRESS = _stakingProxyAddress;
    }

    /*
     * CORE FUNCTIONS
     */
    /// @dev Allows staking proxy to allocate the pop reward to staking pool.
    /// @param stakingPoolId Hex-encoded staking pool id.
    function claimPop(bytes32 stakingPoolId)
        external
        nonReentrant
        onlyStakingProxy
        returns (uint256 popReward)
    {
        uint256 poolId = uint256(stakingPoolId);
        (address poolAddress, , , , , ) = DragoRegistry(dragoRegistryAddress).fromId(poolId);
        uint256 poolPrice = Pool(poolAddress).calcSharePrice();
        
        // pop assets component is always positive, therefore we must update the hwm if positive performance
        if (poolPrice > poolPriceById[poolId].highwatermark) {
            poolPriceById[poolId].highwatermark = poolPrice;
        }
        
        // TODO: either receive reward as input or call arrow-pratt transformation here
        (popReward, ) = proofOfPerformanceInternal(poolId);
        require(
            Inflation(getMinter()).mintInflation(stakingPoolId, popReward),
            "MINT_INFLATION_ERROR"
        );
    }

    /// @dev Allows RigoBlock Dao to update the pools registry.
    /// @param _dragoRegistry Address of new registry.
    function setRegistry(address _dragoRegistry)
        external
        onlyRigoblockDao
    {
        dragoRegistryAddress = _dragoRegistry;
    }

    /// @dev Allows RigoBlock Dao to update its address.
    /// @param _rigoblockDao Address of new dao.
    function setRigoblockDao(address _rigoblockDao)
        external
        onlyRigoblockDao
    {
        rigoblockDaoAddress = _rigoblockDao;
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
        require(
            _ratio <= 10000,
            "RATIO_BIGGER_THAN_10000"
        ); //(from 0 to 10000)
        groups[_ofGroup].rewardRatio = _ratio;
    }

    /*
     * CONSTANT PUBLIC FUNCTIONS
     */
    /// @dev Gets data of a pool.
    /// @param poolId Id of the pool.
    /// @return active Bool the pool is active.
    /// @return poolAddress address of the pool.
    /// @return poolGroup address of the pool factory.
    /// @return poolPrice price of the pool in wei.
    /// @return poolSupply total supply of the pool in units.
    /// @return poolValue total value of the pool in wei.
    /// @return epochReward value of the reward factor or said pool.
    /// @return ratio of assets/performance reward (from 0 to 10000).
    /// @return pop value of the pop reward to be claimed in GRGs.
    function getPoolData(uint256 poolId)
        external
        view
        returns (
            bool active,
            address poolAddress,
            address poolGroup,
            uint256 poolPrice,
            uint256 poolSupply,
            uint256 poolValue,
            uint256 epochReward,
            uint256 ratio,
            uint256 pop
        )
    {
        active = isActiveInternal(poolId);
        (poolAddress, poolGroup) = addressFromIdInternal(poolId);
        (poolPrice, poolSupply, poolValue) = getPoolPriceAndValueInternal(poolId);
        (epochReward, , ratio) = getInflationParameters(poolId);
        (pop, ) = proofOfPerformanceInternal(poolId);
        return(
            active,
            poolAddress,
            poolGroup,
            poolPrice,
            poolSupply,
            poolValue,
            epochReward,
            ratio,
            pop
        );
    }

    /// @dev Returns the highwatermark of a pool.
    /// @param poolId Id of the pool.
    /// @return Value of the all-time-high pool nav.
    function getHwm(uint256 poolId)
        external
        view
        returns (uint256)
    {
        return (getHwmInternal(poolId));
    }

    /// @dev Returns the reward factor for a pool.
    /// @param poolId Id of the pool.
    /// @return Value of the reward factor.
    function getEpochReward(uint256 poolId)
        external
        view
        returns (uint256)
    {
        (uint256 epochReward, , ) = getInflationParameters(poolId);
        return epochReward;
    }

    /// @dev Returns the split ratio of asset and performance reward.
    /// @param poolId Id of the pool.
    /// @return Value of the ratio from 1 to 100.
    function getRatio(uint256 poolId)
        external
        view
        returns (uint256)
    {
        ( , , uint256 ratio) = getInflationParameters(poolId);
        return ratio;
    }

    /// @dev Returns the proof of performance reward for a pool.
    /// @param poolId Id of the pool.
    /// @return popReward Value of the pop reward in Rigo tokens.
    /// @return performanceReward Split of the performance reward in Rigo tokens.
    /// @notice epoch reward should be big enough that it.
    /// @notice can be decreased if number of funds increases.
    /// @notice should be at least 10^6 (just as pool base) to start with.
    /// @notice rigo token has 10^18 decimals.
    function proofOfPerformance(uint256 poolId)
        external
        view
        returns (uint256 popReward, uint256 performanceReward)
    {
        return proofOfPerformanceInternal(poolId);
    }

    /// @dev Checks whether a pool is registered and active.
    /// @param poolId Id of the pool.
    /// @return Bool the pool is active.
    function isActive(uint256 poolId)
        external
        view
        returns (bool)
    {
        return isActiveInternal(poolId);
    }

    /// @dev Returns the address and the group of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return pool Address of the target pool.
    /// @return group Address of the pool's group.
    function addressFromId(uint256 poolId)
        external
        view
        returns (
            address pool,
            address group
        )
    {
        return (addressFromIdInternal(poolId));
    }

    /// @dev Returns the price a pool from its id.
    /// @param poolId Id of the pool.
    /// @return thePoolPrice Price of the pool in wei.
    /// @return totalTokens Number of tokens of a pool (totalSupply).
    function getPoolPrice(uint256 poolId)
        external
        view
        returns (
            uint256 thePoolPrice,
            uint256 totalTokens
        )
    {
        (thePoolPrice, totalTokens, ) = getPoolPriceAndValueInternal(poolId);
    }

    /// @dev Returns the value of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return aum Total value of the pool in ETH.
    function calcPoolValue(uint256 poolId)
        external
        view
        returns (
            uint256 aum
        )
    {
        ( , , aum) = getPoolPriceAndValueInternal(poolId);
    }

    /// @dev Returns the aggregated reward of all rigoblock pools belonging to a staking pool.
    /// @param stakingPoolId Hex-encoded staking pool id.
    /// @return popReward Value of the aggregated reward.
    function getPop(bytes32 stakingPoolId)
        external
        view
        returns (uint256 popReward)
    {
        (popReward, ) = proofOfPerformanceInternal(uint256(stakingPoolId));
    }

    /*
     * INTERNAL FUNCTIONS
     */
    /// @dev Returns the split ratio of asset and performance reward.
    /// @param poolId Id of the pool.
    /// @return epochReward Value of the reward factor.
    /// @return epochTime Value of epoch time.
    /// @return ratio Value of the ratio from 1 to 100.
    function getInflationParameters(uint256 poolId)
        internal
        view
        returns (
            uint256 epochReward,
            uint256 epochTime,
            uint256 ratio
        )
    {
        ( , address groupAddress) = addressFromIdInternal(poolId);
        epochReward = Inflation(getMinter()).getInflationFactor(groupAddress);
        epochTime = Inflation(getMinter()).period();
        ratio = groups[groupAddress].rewardRatio;
    }

    /// @dev Returns the address of the Inflation contract.
    /// @return Address of the minter/inflation.

    function getMinter()
        internal
        view
        returns (address)
    {
        RigoToken token = RigoToken(RIGOTOKENADDRESS);
        return token.minter();
    }

    /// @dev Returns the proof of performance reward for a pool.
    /// @param poolId Id of the pool.
    /// @return popReward Value of the pop reward in Rigo tokens.
    /// @return performanceReward Split of the performance reward in Rigo tokens.
    /// @notice epoch reward should be big enough that it  can be decreased when number of funds increases
    /// @notice should be at least 10^6 (just as pool base) to start with.
    function proofOfPerformanceInternal(uint256 poolId)
        internal
        view
        returns (uint256 popReward, uint256 performanceReward)
    {
        uint256 highwatermark= getHwmInternal(poolId);
        (uint256 newPrice, uint256 tokenSupply, uint256 poolValue) = getPoolPriceAndValueInternal(poolId);
        (address thePoolAddress, ) = addressFromIdInternal(poolId);
        (uint256 epochReward, uint256 epochTime, uint256 rewardRatio) = getInflationParameters(poolId);
        uint256 assetsComponent = 0;
        uint256 performanceComponent = 0;

        assetsComponent = safeMul(
            poolValue,
            epochReward
        ) * epochTime / 1 days; // proportional to epoch time

        // TODO: test new logic of only performance component null if price below high watermark
        performanceComponent = newPrice < highwatermark ? 0 : safeMul(
            safeMul(
                (newPrice - highwatermark),
                tokenSupply
            ) / 1000000, // Pool(thePoolAddress).BASE(),
            epochReward
        ) * 365 days / 1 days;

        uint256 assetsReward = (
            safeMul(
                assetsComponent,
                safeSub(10000, rewardRatio) // 10000 = 100%
            ) / 10000 ether
        ) * ethBalanceAdjustmentInternal(thePoolAddress, poolValue) / 1 ether; // reward inversely proportional to Eth in pool

        performanceReward = safeDiv(
            safeMul(performanceComponent, rewardRatio),
            10000 ether
        ) * ethBalanceAdjustmentInternal(thePoolAddress, poolValue) / 1 ether;

        // TODO: return pop before GRG slashing and move GRG rebasing to staking proxy
        // note: popClaim must include GRG slashing, therefore must be moved to staking proxy as well
        //popReward = grgBalanceRewardSlashInternal(poolId, epochTime, safeAdd(performanceReward, assetsReward));
        popReward = safeAdd(performanceReward, assetsReward);
    }

    /// @dev Returns the high-watermark of the pool.
    /// @param poolId Number of the pool in registry.
    /// @return Number high-watermark.
    function getHwmInternal(uint256 poolId)
        internal
        view
        returns (uint256)
    {
        if (poolPriceById[poolId].highwatermark == 0) {
            return (1 ether);

        } else {
            return poolPriceById[poolId].highwatermark;
        }
    }

    /// @dev Returns the non-linear rewards adjustment by eth.
    /// @param thePoolAddress Address of the pool.
    /// @param poolValue Number of value of the pool in wei.
    /// @return Number non-linear adjustment.

    function ethBalanceAdjustmentInternal(
        address thePoolAddress,
        uint256 poolValue)
        internal
        view
        returns (uint256)
    {
        uint256 poolEthBalance = address(Pool(thePoolAddress)).balance;
        // prevent dust from small pools
        if (
            poolEthBalance > poolValue ||
            poolEthBalance < 1 finney ||
            poolValue < 10 finney
          ) {
            revert('ETH_ABOVE_AUM_OR_DUST_ERROR');
        }

        // logistic function progression g(x)=e^x/(1+e^x).
        // rebased on {(poolEthBalance / poolValue)} ∈ [0.025:0.6], x ∈ [-1.9:2.8].
        if (1 ether * poolEthBalance / poolValue >= 800 finney) {
            return (1 ether);

        } else if (1 ether * poolEthBalance / poolValue >= 600 finney) {
            return (1 ether * 943 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 500 finney) {
            return (1 ether * 881 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 400 finney) {
            return (1 ether * 769 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 300 finney) {
            return (1 ether * 599 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 200 finney) {
            return (1 ether * 401 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 100 finney) {
            return (1 ether * 231 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 75 finney) {
            return (1 ether * 198 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 50 finney) {
            return (1 ether * 168 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 38 finney) {
            return (1 ether * 155 / 1000);

        } else if (1 ether * poolEthBalance / poolValue >= 25 finney) {
            return (1 ether * 142 / 1000);

        } else { // reward is 0 for any pool not backed by at least 2.5% eth
            revert('ETH_BELOW_2.5_PERCENT_AUM_ERROR');
        }
    }

    /// @dev Returns the non-linear rewards adjustment by grg operator balance.
    /// @param poolId Id of the pool.
    /// @param epochTime Length of an epoch in seconds.
    /// @param pop Number of preliminary reward.
    /// @return Number non-linear adjustment.
    /*
    function grgBalanceRewardSlashInternal(
        uint256 poolId,
        uint256 epochTime,
        uint256 pop)
        internal
        view
        returns (uint256)
    {
        // TODO: fix code
        //previous code
        //uint256 operatorGrgBalance = RigoToken(RIGOTOKENADDRESS).balanceOf(Pool(thePoolAddress).owner());
        //uint256 grgTotalSupply = RigoToken(RIGOTOKENADDRESS).totalSupply();

        //mock variable definition
        (address poolAddress, , , , , ) = DragoRegistry(dragoRegistryAddress).fromId(poolId);
        uint256 stakedGrgRebasedOnEpoch = RigoToken(RIGOTOKENADDRESS).balanceOf(Pool(poolAddress).owner()) * epochTime / 365 days;

        // TODO: getTotalStakeDelegatedToPool should be called from staking contract
        //next code
        //uint256 stakedGrgRebasedOnEpoch = IStaking(STAKINGCONTRACTADDRESS).getTotalStakeDelegatedToPool(bytes32(poolId)).currentEpochBalance * epochTime / 365 days;
        // ignore pools with dust stake
        if (stakedGrgRebasedOnEpoch < Inflation(getMinter()).minimumGRG()) {
            revert('STAKED_GRG_BELOW_MINIMUM');
        }

        // half-exponential progression with slashing factor = (pop/stakedGrgRebasedOnEpoch)^(2/3).
        if (pop >= stakedGrgRebasedOnEpoch) {
            return stakedGrgRebasedOnEpoch; // max single reward = stake / period, max 100% of staked GRG per year.

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 800 finney) {
            return (stakedGrgRebasedOnEpoch * 862 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 600 finney) {
            return (stakedGrgRebasedOnEpoch * 711 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 300 finney) {
            return (stakedGrgRebasedOnEpoch * 448 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 200 finney) {
            return (stakedGrgRebasedOnEpoch * 342 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 100 finney) {
            return (stakedGrgRebasedOnEpoch * 215 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 10 finney) {
            return (stakedGrgRebasedOnEpoch * 46 / 1000);

        } else if (1 ether * pop / stakedGrgRebasedOnEpoch >= 5 finney) {
            return (stakedGrgRebasedOnEpoch * 29 / 1000);

        } else if (10 ether * pop / stakedGrgRebasedOnEpoch >= 5 finney) {
            return (stakedGrgRebasedOnEpoch * 6 / 1000);

        // all remaining values are overstaked
        } else {
            return pop;
        }
    }*/

    /// @dev Checks whether a pool is registered and active.
    /// @param poolId Id of the pool.
    /// @return Bool the pool is active.
    function isActiveInternal(uint256 poolId)
        internal view
        returns (bool)
    {
        (address thePool, , , , , ) = DragoRegistry(dragoRegistryAddress).fromId(poolId);
        if (thePool != address(0)) {
            return true;
        }
    }

    /// @dev Returns the address and the group of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return pool Address of the target pool.
    /// @return group Address of the pool's group.
    function addressFromIdInternal(uint256 poolId)
        internal
        view
        returns (
            address pool,
            address group
        )
    {
        (pool, , , , , group) = DragoRegistry(dragoRegistryAddress).fromId(poolId);
        return (pool, group);
    }

    /// @dev Returns price, supply, aum of a pool from its id.
    /// @param poolId Id of the pool.
    /// @return thePoolPrice Price of the pool in wei.
    /// @return totalTokens Number of tokens of a pool (totalSupply).
    /// @return aum Address of the target pool.
    function getPoolPriceAndValueInternal(uint256 poolId)
        internal
        view
        returns (
            uint256 poolPrice,
            uint256 totalTokens,
            uint256 aum
        )
    {
        (address poolAddress, ) = addressFromIdInternal(poolId);
        Pool pool = Pool(poolAddress);
        poolPrice = pool.calcSharePrice();
        totalTokens = pool.totalSupply();
        if (poolPrice == uint256(0) || totalTokens == uint256(0)) {
            revert("POOL_PRICE_OR_TOTAL_SUPPLY_NULL_ERROR");
        }
        aum = safeMul(poolPrice, totalTokens) / 1000000; // pool.BASE();
    }
}
