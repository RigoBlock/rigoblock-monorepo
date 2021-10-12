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
    
    address payable immutable private UNISWAP_V3_SWAP_ROUTER_ADDRESS;
    
    constructor() {
        uint256 chainId = block.chainid;
        address payable uniswapV3RouterAddress;
        if (chainId == 1) { // Mainnet
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 3) { // Ropsten
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 4) { // Rinkeby
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 10) { // Optimism
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 42) { // Kovan
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 137) { // Polygon
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 1337) { // Ganache
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 42161) { // Arbitrum
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 43114) { // Avalanche
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        } else if (chainId == 80001) { // PolygonMumbai
            uniswapV3RouterAddress = payable(address(0xE592427A0AEce92De3Edee1F18E0157C05861564));
        }
        UNISWAP_V3_SWAP_ROUTER_ADDRESS = uniswapV3RouterAddress;
            
    }
    
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
    
    /// @notice Swaps `amountIn` of one token for as much as possible of another along the specified path
    /// @param params The parameters necessary for the multi-hop swap, encoded as `ExactInputParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInput(ISwapRouter.ExactInputParams calldata params)
        external
        payable
        returns (uint256 amountOut)
    {
        amountOut = ISwapRouter(UNISWAP_V3_SWAP_ROUTER_ADDRESS).exactInput(params);
    }
    
    /// @notice Swaps as little as possible of one token for `amountOut` of another token
    /// @param params The parameters necessary for the swap, encoded as `ExactOutputSingleParams` in calldata
    /// @return amountIn The amount of the input token
    function exactOutputSingle(ISwapRouter.ExactOutputSingleParams calldata params)
        external
        payable
        returns (uint256 amountIn)
    {
        amountIn = ISwapRouter(UNISWAP_V3_SWAP_ROUTER_ADDRESS).exactOutputSingle(params);
    }
    
    /// @notice Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)
    /// @param params The parameters necessary for the multi-hop swap, encoded as `ExactOutputParams` in calldata
    /// @return amountIn The amount of the input token
    function exactOutput(ISwapRouter.ExactOutputParams calldata params)
        external
        payable
        returns (uint256 amountIn)
    {
        amountIn = ISwapRouter(UNISWAP_V3_SWAP_ROUTER_ADDRESS).exactOutput(params);
    }
    
    /// @notice Unwraps the contract's WETH9 balance and sends it to recipient as ETH.
    /// @dev The amountMinimum parameter prevents malicious contracts from stealing WETH9 from users.
    /// @param amountMinimum The minimum amount of WETH9 to unwrap
    /// @param recipient The address receiving ETH
    function unwrapWETH9(uint256 amountMinimum, address recipient)
        external
        payable
    {
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).unwrapWETH9(
            amountMinimum,
            recipient
        );
    }

    /// @notice Refunds any ETH balance held by this contract to the `msg.sender`
    /// @dev Useful for bundling with mint or increase liquidity that uses ether, or exact output swaps
    /// that use ether for the input amount
    function refundETH()
        external
        payable
    {
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).refundETH();
    }

    /// @notice Transfers the full amount of a token held by this contract to recipient
    /// @dev The amountMinimum parameter prevents malicious contracts from stealing the token from users
    /// @param token The contract address of the token which will be transferred to `recipient`
    /// @param amountMinimum The minimum amount of token required for a transfer
    /// @param recipient The destination address of the token
    function sweepToken(
        address token,
        uint256 amountMinimum,
        address recipient
    )
        external
        payable
    {
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).sweepToken(
            token,
            amountMinimum,
            recipient
        );
    }
    
    /// @notice Unwraps the contract's WETH9 balance and sends it to recipient as ETH, with a percentage between
    /// 0 (exclusive), and 1 (inclusive) going to feeRecipient
    /// @dev The amountMinimum parameter prevents malicious contracts from stealing WETH9 from users.
    function unwrapWETH9WithFee(
        uint256 amountMinimum,
        address recipient,
        uint256 feeBips,
        address feeRecipient
    )
        external
        payable
    {
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).unwrapWETH9WithFee(
            amountMinimum,
            recipient,
            feeBips,
            feeRecipient
        );
    }

    /// @notice Transfers the full amount of a token held by this contract to recipient, with a percentage between
    /// 0 (exclusive) and 1 (inclusive) going to feeRecipient
    /// @dev The amountMinimum parameter prevents malicious contracts from stealing the token from users
    function sweepTokenWithFee(
        address token,
        uint256 amountMinimum,
        address recipient,
        uint256 feeBips,
        address feeRecipient
    )
        external
        payable
    {
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).sweepTokenWithFee(
            token,
            amountMinimum,
            recipient,
            feeBips,
            feeRecipient
        );
    }
    
    /// @notice Call multiple functions in the current contract and return the data from all of them if they all succeed
    /// @dev The `msg.value` should not be trusted for any method callable from multicall.
    /// @param data The encoded function data for each of the calls to make to this contract
    /// @return results The results from each of the calls passed in via data
    function multicall(bytes[] calldata data)
        external
        payable
        returns (bytes[] memory results)
    {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);

            if (!success) {
                // Next 5 lines from https://ethereum.stackexchange.com/a/83577
                if (result.length < 68) revert();
                assembly {
                    result := add(result, 0x04)
                }
                revert(abi.decode(result, (string)));
            }

            results[i] = result;
        }
    }
}
