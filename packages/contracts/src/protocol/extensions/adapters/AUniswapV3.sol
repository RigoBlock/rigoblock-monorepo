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
pragma solidity 0.7.6;
pragma abicoder v2; // in 0.8 solc this is default behaviour

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IPeripheryPaymentsWithFee.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IPeripheryImmutableState.sol";
import "@uniswap/v3-periphery/contracts/libraries/Path.sol";

interface Token {

    function approve(address _spender, uint256 _value) external returns (bool success);

    function allowance(address _owner, address _spender) external view returns (uint256);
    function balanceOf(address _who) external view returns (uint256);
}

/// @title Interface for WETH9
interface IWETH9 {
    /// @notice Deposit ether to get wrapped ether
    function deposit() external payable;

    /// @notice Withdraw wrapped ether to get ether
    function withdraw(uint256) external;
}

contract AUniswapV3 {
    
    using Path for bytes;
    
    address payable immutable private UNISWAP_V3_SWAP_ROUTER_ADDRESS;
    bytes4 immutable private SELECTOR;
    
    constructor() {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
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
        SELECTOR = bytes4(keccak256(bytes("approve(address,uint256)")));
    }
    
    /// @notice Swaps `amountIn` of one token for as much as possible of another token
    /// @param params The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInputSingle(ISwapRouter.ExactInputSingleParams memory params) 
        external
        payable
        returns (uint256 amountOut)
    {
        // first me must wrap ETH when necessary
        address WETH9 = IPeripheryImmutableState(UNISWAP_V3_SWAP_ROUTER_ADDRESS).WETH9();
        if (params.tokenIn == WETH9 && Token(WETH9).balanceOf(address(this)) < params.amountIn) {
            // we wrap the full amount, which can always manually unwrap later
            IWETH9(WETH9).deposit{value: params.amountIn}();
        }
        
        // once we have the token balance, we set the allowance to the uniswap router
        if (Token(params.tokenIn).allowance(address(this), UNISWAP_V3_SWAP_ROUTER_ADDRESS) < params.amountIn) {
            safeApproveInternal(params.tokenIn, UNISWAP_V3_SWAP_ROUTER_ADDRESS, type(uint).max);
        }
        
        // we make sure this drago is always the recipient
        params.recipient != address(this) ? address(this) : address(this);
        
        // finally, we swap the tokens
        // TODO: check if overwritten correctly or if we must overwrite
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
        (address tokenIn, , ) = params.path.decodeFirstPool();
        
        // first me must wrap ETH when necessary
        address WETH9 = IPeripheryImmutableState(UNISWAP_V3_SWAP_ROUTER_ADDRESS).WETH9();
        if (tokenIn == WETH9 && Token(WETH9).balanceOf(address(this)) < params.amountIn) {
            // we wrap the full amount, which can always manually unwrap later
            IWETH9(WETH9).deposit{value: params.amountIn}();
        }
        
        // once we have the token balance, we set the allowance to the uniswap router
        if (Token(tokenIn).allowance(address(this), UNISWAP_V3_SWAP_ROUTER_ADDRESS) < params.amountIn) {
            safeApproveInternal(tokenIn, UNISWAP_V3_SWAP_ROUTER_ADDRESS, type(uint).max);
        }

        // we make sure this drago is always the recipient
        params.recipient != address(this) ? address(this) : address(this);
        
        // finally, we swap the tokens
        // TODO: check if overwritten correctly or if we must overwrite
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
        // first me must wrap ETH when necessary
        address WETH9 = IPeripheryImmutableState(UNISWAP_V3_SWAP_ROUTER_ADDRESS).WETH9();
        if (params.tokenIn == WETH9 && Token(WETH9).balanceOf(address(this)) < params.amountInMaximum) {
            // we wrap the full amount, which can always manually unwrap later
            IWETH9(WETH9).deposit{value: params.amountInMaximum}();
        }
        
        // once we have the token balance, we set the allowance to the uniswap router
        if (Token(params.tokenIn).allowance(address(this), UNISWAP_V3_SWAP_ROUTER_ADDRESS) < params.amountInMaximum) {
            safeApproveInternal(params.tokenIn, UNISWAP_V3_SWAP_ROUTER_ADDRESS, type(uint).max);
        }
        
        // we make sure this drago is always the recipient
        params.recipient != address(this) ? address(this) : address(this);
        
        // finally, we swap the tokens
        // TODO: check if overwritten correctly or if we must overwrite
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
        (address tokenIn, , ) = params.path.decodeFirstPool();
        
        // first me must wrap ETH when necessary
        address WETH9 = IPeripheryImmutableState(UNISWAP_V3_SWAP_ROUTER_ADDRESS).WETH9();
        if (tokenIn == WETH9 && Token(WETH9).balanceOf(address(this)) < params.amountInMaximum) {
            // we wrap the full amount, which can always manually unwrap later
            IWETH9(WETH9).deposit{value: params.amountInMaximum}();
        }
        
        // once we have the token balance, we set the allowance to the uniswap router
        if (Token(tokenIn).allowance(address(this), UNISWAP_V3_SWAP_ROUTER_ADDRESS) < params.amountInMaximum) {
            safeApproveInternal(tokenIn, UNISWAP_V3_SWAP_ROUTER_ADDRESS, type(uint).max);
        }
        
        // we make sure this drago is always the recipient
        params.recipient != address(this) ? address(this) : address(this);
        
        // finally, we swap the tokens
        // TODO: check if overwritten correctly or if we must overwrite
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
        // we make sure this drago is always the recipient
        recipient != address(this) ? address(this) : address(this);
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
        // we make sure this drago is always the recipient
        recipient != address(this) ? address(this) : address(this);
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
        // we make sure this drago is always the recipient
        recipient != address(this) ? address(this) : address(this);
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
        // we make sure this drago is always the recipient
        recipient != address(this) ? address(this) : address(this);
        IPeripheryPaymentsWithFee(UNISWAP_V3_SWAP_ROUTER_ADDRESS).sweepTokenWithFee(
            token,
            amountMinimum,
            recipient,
            feeBips,
            feeRecipient
        );
    }
    
    function safeApproveInternal(
        address token,
        address spender,
        uint256 value
    )
        internal
    {
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, spender, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "RIGOBLOCK_APPROVE_FAILED"
        );
    }
}
