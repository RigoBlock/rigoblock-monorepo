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

//im port '@uniswap/v2-periphery/contracts/UniswapV2Router';

interface Token {

    function approve(address _spender, uint256 _value) external returns (bool success);

    function allowance(address _owner, address _spender) external view returns (uint256);
}

interface DragoEventful {

    function customDragoLog(bytes4 _methodHash, bytes _encodedParams) external returns (bool success);
}

contract Drago {

    address public owner;

    function getExchangesAuth() external view returns (address);

    function getEventful() external view returns (address);
}

contract AUniswapV2 {

    // **** ADD LIQUIDITY ****
    function addLiquidity(
        address uniswapV2RouterAddress,
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
        virtual
        override
        returns (uint amountA, uint amountB, uint liquidity)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(tokenA).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_A_APPROVE_ERROR"
        );
        require(
            Token(tokenB).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_B_APPROVE_ERROR"
        );
        (amountA, amountB, liquidity) = UniswapV2Router(uniswapV2RouterAddress).addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            address(this), // can only transfer to this drago
            deadline
        );
        if (Token(tokenA).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(tokenA).approve(uniswapV2RouterAddress, uint256(0));
        }
        if (Token(tokenB).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(tokenB).approve(uniswapV2RouterAddress, uint256(0));
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
        address uniswapV2RouterAddress,
        address token,
        uint sendETHAmount,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        returns (uint amountToken, uint amountETH, uint liquidity)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(token).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        (amountToken, amountETH, liquidity) = UniswapV2Router(uniswapV2RouterAddress)
        .addLiquidityETH{value: sendETHAmount}(
            token,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            address(this), // can only transfer to this drago
            deadline
        ); //.value(amountETHMin);
        if (Token(tokenA).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(tokenA).approve(uniswapV2RouterAddress, uint256(0));
        }
        if (Token(tokenB).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(tokenB).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address uniswapV2RouterAddress,
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        public
        virtual
        override
        returns (uint amountA, uint amountB)
    {
        (amountA, amountB) = UniswapV2Router(uniswapV2RouterAddress).removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            address(this), // cannot remove liquidity to any other than Drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function removeLiquidityETH(
        address uniswapV2RouterAddress,
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        public
        virtual
        override
        returns (uint amountToken, uint amountETH)
    {
        (amountToken, amountETH) = UniswapV2Router(uniswapV2RouterAddress).removeLiquidityETH(
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address uniswapV2RouterAddress,
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        public
        virtual
        override
        returns (uint amountETH)
    {
        (, amountETH) = UniswapV2Router(uniswapV2RouterAddress).removeLiquidityETHSupportingFeeOnTransferTokens(
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** SWAP ****
    function swapExactTokensForTokens(
        address uniswapV2RouterAddress,
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = UniswapV2Router(uniswapV2RouterAddress).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapTokensForExactTokens(
        address uniswapV2RouterAddress,
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = UniswapV2Router(uniswapV2RouterAddress).swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactETHForTokens(
        address uniswapV2RouterAddress,
        uint256 exactETHAmount,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        amounts = UniswapV2Router(uniswapV2RouterAddress)
        .swapExactETHForTokens{value: exactETHAmount}(
            amountOutMin,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function swapTokensForExactETH(
        address uniswapV2RouterAddress,
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = UniswapV2Router(uniswapV2RouterAddress).swapTokensForExactETH(
            amountOut,
            amountInMax,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactTokensForETH(
        address uniswapV2RouterAddress,
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = UniswapV2Router(uniswapV2RouterAddress).swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapETHForExactTokens(
        address uniswapV2RouterAddress,
        uint256 sendETHAmount,
        uint amountOut,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        returns (uint[] memory amounts)
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        amounts = UniswapV2Router(uniswapV2RouterAddress)
        .swapETHForExactTokens{value: sendETHAmount}(
            amountOut,
            path,
            address(this), // can only transfer to this drago
            deadline
        );
        // TODO: check whether logging in eventful
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        address uniswapV2RouterAddress,
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        amounts = UniswapV2Router(uniswapV2RouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        address uniswapV2RouterAddress,
        uint256 exactETHAmount,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        amounts = UniswapV2Router(uniswapV2RouterAddress)
        .swapExactETHForTokensSupportingFeeOnTransferTokens{value: exactETHAmount}(
            amountOutMin,
            path,
            address(this),
            deadline
        );
        // TODO: check whether logging in eventful
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        address uniswapV2RouterAddress,
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
    {
        // TODO: restrict to whitelisted token on wrapper (uniswap router)
        require(
            Token(path[0]).approve(uniswapV2RouterAddress, 2**256 -1),
            "UNISWAP_TOKEN_APPROVE_ERROR"
        );
        UniswapV2Router(uniswapV2RouterAddress).swapExactTokensForETHSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );
        if (Token(path[0]).allowance(Drago(address(this)), uniswapV2RouterAddress) > uint256(0)) {
            Token(path[0]).approve(uniswapV2RouterAddress, uint256(0));
        }
        // TODO: check whether logging in eventful
    }

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
}
