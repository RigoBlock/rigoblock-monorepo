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

import { VaultFace as Vault } from "../Vault/Vault.sol";

import { DistributionFace } from "./DistributionFace.sol";
import { SafeMathLight as SafeMath } from "../utils/SafeMath/SafeMathLight.sol";

/// @title Distribution - Allows to collect subscription fees on vaults.
/// @author Gabriele Rigo - <gab@rigoblock.com>
contract Distribution is SafeMath {

    event Subscription(address indexed buyer, address indexed distributor, uint amount);

    mapping (address => Distributor) distributor;

    struct Distributor {
        uint fee;
    }

    modifier addressFree(address _distributor) {
        require(distributor[_distributor].fee == 0);
        _;
    }

    modifier nonZeroAddress(address _target) {
        require(_target != 0);
        _;
    }

    function subscribe(address _pool, address _distributor, address _buyer)
        public
        payable
    {
        Vault vault = Vault(_pool);
        vault.buyVaultOnBehalf(_buyer);
        uint feeAmount = safeDiv(safeMul(msg.value, distributor[_distributor].fee), 10000); //fee is in basis points
        uint netAmount = safeSub(msg.value, feeAmount);
        _pool.transfer(netAmount);
        _distributor.transfer(feeAmount);
    }

    function setFee(uint _fee, address _distributor)
        public
        addressFree(_distributor)
        nonZeroAddress(_distributor)
    {
        distributor[_distributor].fee = _fee;
    }

    function getFee(address _distributor) public view returns (uint) {
        return distributor[_distributor].fee;
    }
}
