/*

 Copyright 2020 Rigo Intl.

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

pragma solidity 0.6.6;

import "../../../utils/exchanges/uniswap/IUniswapV2Router02/IUniswapV2Router02.sol";
import "../../../utils/exchanges/uniswap/IUniswapV2Factory/IUniswapV2Factory.sol";
import "../../../utils/exchanges/uniswap/IUniswapV2Pair/IUniswapV2Pair.sol";

interface Token {

    function approve(address _spender, uint256 _value) external returns (bool success);

    function allowance(address _owner, address _spender) external view returns (uint256);
}

interface DragoEventful {

    function customDragoLog(bytes4 _methodHash, bytes calldata _encodedParams) external returns (bool success);
}

abstract contract Drago {

    address public owner;

    function getExchangesAuth() external virtual view returns (address);

    function getEventful() external virtual view returns (address);
}

abstract contract ExchangesAuthority {
    function canTradeTokenOnExchange(address _token, address _exchange) external virtual view returns (bool);
}

contract AUniswapV2 {

    address payable immutable public UNISWAPV2ROUTERADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    // **** ADD LIQUIDITY ****
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        external
        returns (uint amountA, uint amountB, uint liquidity)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, tokenA);
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, tokenB);
        require(
            Token(tokenA).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_A_APPROVE_ERROR"
        );
        require(
            Token(tokenB).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_B_APPROVE_ERROR"
        );
        (amountA, amountB, liquidity) = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(tokenA).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(tokenA).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        if (Token(tokenB).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(tokenB).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        /*
        DragoEventful events = DragoEventful(getDragoEventful());
        bytes4 methodHash = bytes4(keccak256("addLiquidity(address[3],uint256[4],address,uint256)"));
        bytes memory encodedParams = abi.encode(
            address(this),
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
        require(
            events.customDragoLog(methodHash, encodedParams),
            "UNISWAP_ADD_LIQUIDITY_LOG_ERROR"
        );
        */
    }

    function addLiquidityETH(
        address token,
        uint sendETHAmount,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint amountToken, uint amountETH, uint liquidity)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, token);
        require(
            Token(token).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        (amountToken, amountETH, liquidity) = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS)
        .addLiquidityETH{value: sendETHAmount}(
            token,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(token).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(token).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        public
        returns (uint amountA, uint amountB)
    {
        //callerIsDragoOwner();
        IUniswapV2Pair(
            address(IUniswapV2Factory(
                IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).factory()
            ))
        ).approve(UNISWAPV2ROUTERADDRESS, liquidity);
        (amountA, amountB) = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to != address(this) ? address(this) : address(this), // cannot remove liquidity to any other than Drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        public
        returns (uint amountToken, uint amountETH)
    {
        //callerIsDragoOwner();
        IUniswapV2Pair(
            address(IUniswapV2Factory(
                IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).factory()
            ))
        ).approve(UNISWAPV2ROUTERADDRESS, liquidity);
        (amountToken, amountETH) = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).removeLiquidityETH(
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        public
        returns (uint amountETH)
    {
        //callerIsDragoOwner();
        amountETH = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).removeLiquidityETHSupportingFeeOnTransferTokens(
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** SWAP ****
    // TODO: check for attack vectors in complex path in all functions
    // TODO: potentially restrict to known/preapproved paths or max path.length = 2
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactETHForTokens(
        uint256 exactETHAmount,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS)
        .swapExactETHForTokens{value: exactETHAmount}(
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function swapTokensForExactETH(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapTokensForExactETH(
            amountOut,
            amountInMax,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapETHForExactTokens(
        uint256 sendETHAmount,
        uint amountOut,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint[] memory amounts)
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        amounts = IUniswapV2Router02(UNISWAPV2ROUTERADDRESS)
        .swapETHForExactTokens{value: sendETHAmount}(
            amountOut,
            path,
            to != address(this) ? address(this) : address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this),
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 exactETHAmount,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[(path.length -1)]);
        IUniswapV2Router02(UNISWAPV2ROUTERADDRESS)
        .swapExactETHForTokensSupportingFeeOnTransferTokens{value: exactETHAmount}(
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this),
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
    {
        //callerIsDragoOwner();
        //canTradeTokenOnExchange(UNISWAPV2ROUTERADDRESS, path[0]);
        require(
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        IUniswapV2Router02(UNISWAPV2ROUTERADDRESS).swapExactTokensForETHSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            to != address(this) ? address(this) : address(this),
            deadline
        );
        if (Token(path[0]).allowance(address(this), UNISWAPV2ROUTERADDRESS) > uint256(0)) {
            Token(path[0]).approve(UNISWAPV2ROUTERADDRESS, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    // **** INTERNAL ****
    /// @dev Gets the address of the logger contract.
    /// @return Address of the logger contrac.
    function getDragoEventful()
        internal
        view
        returns (address)
    {
        address dragoEvenfulAddress =
            Drago(
                address(this)
            ).getEventful();
        return dragoEvenfulAddress;
    }

    function callerIsDragoOwner()
        internal
        view
    {
        if (
            Drago(
                address(this)
            ).owner() != msg.sender
        ) { revert("FAIL_OWNER_CHECK_ERROR"); }
    }

    function canTradeTokenOnExchange(
        address payable uniswapV2RouterAddress,
        address token
        )
        internal
        view
    {
        if (!ExchangesAuthority(
                Drago(
                    address(uint160(address(this)))
                )
                .getExchangesAuth()
            )
            .canTradeTokenOnExchange(token, uniswapV2RouterAddress)) {
                revert("UNISWAP_TOKEN_ON_EXCHANGE_ERROR");
            }
    }
}
