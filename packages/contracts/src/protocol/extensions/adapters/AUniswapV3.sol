// SPDX-License-Identifier: Apache-2.0-or-later
/*

 Copyright 2021 Rigo Intl.

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

// solhint-disable-next-line
pragma solidity 0.8.7;
//pragma abicoder v2; // in 0.8 solc this is default behaviour

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IPeripheryPaymentsWithFee.sol";

contract AUniswapV3 {
    
    address payable constant private UNISWAP_V3_SWAP_ROUTER_ADDRESS = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
    
    /// @notice Swaps `amountIn` of one token for as much as possible of another token
    /// @param params The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInputSingle(ISwapRouter.ExactInputSingleParams memory params) 
        external
        payable
        returns (uint256 amountOut)
    {
        amountOut = ISwapRouter(UNISWAP_V3_SWAP_ROUTER_ADDRESS).exactInputSingle(params);
    }
}
