pragma solidity 0.5.3;
pragma experimental ABIEncoderV2;

import "../lib/SafeMath.sol";
import "../lib/Math.sol";
import "../lib/Utils.sol";
import "../lib/AllowanceSetter.sol";
import "./ExchangeHandler.sol";
import "./interfaces/zeroex/IExchangeCore.sol";

interface WETH {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
}


/// @title ZeroExExchangeHandler
/// @notice Handles the all ZeroExExchange trades for the primary contract
contract ZeroExExchangeHandler is ExchangeHandler, AllowanceSetter  {

    /*
    *   State Variables
    */

    IExchangeCore public exchange;
    /// @dev note that this is dependent on the deployment of 0xV2. This is the ERC20 asset proxy + the mainnet address of the ZRX token
    bytes constant ZRX_ASSET_DATA = "\xf4\x72\x61\xb0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe4\x1d\x24\x89\x57\x1d\x32\x21\x89\x24\x6d\xaf\xa5\xeb\xde\x1f\x46\x99\xf4\x98";
    address ERC20_ASSET_PROXY;
    WETH weth;

    /*
    *   Types
    */

    /// @notice Constructor
    /// @param _exchange Address of the IExchangeCore exchange
    constructor(
        address _exchange,
        address _weth
    )
        public
    {
        exchange = IExchangeCore(_exchange);
        ERC20_ASSET_PROXY = exchange.getAssetProxy(toBytes4(ZRX_ASSET_DATA, 0));
        weth = WETH(_weth);
    }


    struct OrderData {
        address makerAddress;           // Address that created the order.
        address takerAddress;           // Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.
        address feeRecipientAddress;    // Address that will recieve fees when order is filled.
        address senderAddress;          // Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.
        uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker. Must be greater than 0.
        uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker. Must be greater than 0.
        uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.
        uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.
        uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.
        uint256 salt;                   // Arbitrary number to facilitate uniqueness of the order's hash.
        bytes makerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring makerAsset. The last byte references the id of this proxy.
        bytes takerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring takerAsset. The last byte references the id of this proxy.
        bytes signature;
    }

    /*
    *   Public functions
    */



    /*
    *   Internal functions
    */

    /// @notice Gets the amount that Totle needs to give for this order
    /// @param data LibOrder.Order struct containing order values
    /// @return amountToGive amount taker needs to give in order to fill the order
    function getAmountToGive_(
        OrderData memory data
    )
      internal
      view
      returns (uint256 amountToGive)
    {
        LibOrder.OrderInfo memory orderInfo = exchange.getOrderInfo(
            getZeroExOrder(data)
        );
        uint makerAssetAvailable = getAssetDataAvailable(data.makerAssetData, data.makerAddress);
        uint feeAssetAvailable = getAssetDataAvailable(ZRX_ASSET_DATA, data.makerAddress);

        uint maxFromMakerFee = data.makerFee == 0 ? Utils.max_uint() : getPartialAmount(feeAssetAvailable, data.makerFee, data.takerAssetAmount);
        amountToGive = Math.min(Math.min(
            getPartialAmount(makerAssetAvailable, data.makerAssetAmount, data.takerAssetAmount),
            maxFromMakerFee),
            SafeMath.sub(data.takerAssetAmount, orderInfo.orderTakerAssetFilledAmount)
        );
        //TODO add in taker fee shit - both in calculating this and actually buying the ZRX
        /* logger.log("Getting amountToGive from ZeroEx arg2: amountToGive", amountToGive); */
    }

    function getAssetDataAvailable(bytes memory assetData, address account) internal view returns (uint){
        address tokenAddress = toAddress(assetData, 16);
        ERC20 token = ERC20(tokenAddress);
        return Math.min(token.balanceOf(account), token.allowance(account, ERC20_ASSET_PROXY));
    }

    function getZeroExOrder(OrderData memory data) internal pure returns (LibOrder.Order memory) {
        return LibOrder.Order({
            makerAddress: data.makerAddress,
            takerAddress: data.takerAddress,
            feeRecipientAddress: data.feeRecipientAddress,
            senderAddress: data.senderAddress,
            makerAssetAmount: data.makerAssetAmount,
            takerAssetAmount: data.takerAssetAmount,
            makerFee: data.makerFee,
            takerFee: data.takerFee,
            expirationTimeSeconds: data.expirationTimeSeconds,
            salt: data.salt,
            makerAssetData: data.makerAssetData,
            takerAssetData: data.takerAssetData
        });
    }

    /// @notice Perform exchange-specific checks on the given order
    /// @dev This should be called to check for payload errors
    /// @param data LibOrder.Order struct containing order values
    /// @return checksPassed value representing pass or fail
    function staticExchangeChecks(
        OrderData memory data
    )
        internal
        view
        returns (bool checksPassed)
    {

        // Make sure that:
        //  The order is not expired
        //  Both the maker and taker assets are ERC20 tokens
        //  The taker does not have to pay a fee (we don't support fees yet)
        //  We are permitted to take this order
        //  We are permitted to send this order
        // TODO: Should we check signatures here?
        return (block.timestamp <= data.expirationTimeSeconds &&
                toBytes4(data.takerAssetData, 0) == bytes4(0xf47261b0) &&
                toBytes4(data.makerAssetData, 0) == bytes4(0xf47261b0) &&
                data.takerFee == 0 &&
                (data.takerAddress == address(0x0) || data.takerAddress == address(this)) &&
                (data.senderAddress == address(0x0) || data.senderAddress == address(this))
        );
    }

    function performOrder(
        bytes memory genericPayload,
        uint256 availableToSpend,
        uint256 targetAmount,
        bool targetAmountIsSource
    )
        public
        payable
        returns (uint256 amountSpentOnOrder, uint256 amountReceivedFromOrder)
    {
        OrderData memory data = abi.decode(genericPayload, (OrderData));
        address sourceAddress = toAddress(data.takerAssetData, 16);
        if(!staticExchangeChecks(data)){
            if(sourceAddress == address(weth)){
                msg.sender.transfer(availableToSpend);
            } else {
                ERC20SafeTransfer.safeTransfer(sourceAddress, msg.sender, availableToSpend); 
            }
            return (0,0);

        }
        if(sourceAddress == address(weth)){
            weth.deposit.value(availableToSpend);
        }
        approveAddress(ERC20_ASSET_PROXY, sourceAddress);

        LibFillResults.FillResults memory results = exchange.fillOrder(
            getZeroExOrder(data),
            Math.min(targetAmount, availableToSpend),
            data.signature
        );

        amountSpentOnOrder = results.takerAssetFilledAmount;
        amountReceivedFromOrder = results.makerAssetFilledAmount;

        if(amountSpentOnOrder < availableToSpend){
            if(sourceAddress == address(weth)){
                weth.withdraw(availableToSpend - amountSpentOnOrder);
                msg.sender.transfer(amountSpentOnOrder);
            } else {
                ERC20SafeTransfer.safeTransfer(sourceAddress, msg.sender, availableToSpend - amountSpentOnOrder);
            }
        }

        address destinationAddress = toAddress(data.makerAssetData, 16);

        if(destinationAddress == address(weth)){
            weth.withdraw(amountReceivedFromOrder);
            msg.sender.transfer(amountReceivedFromOrder);
        } else {
            ERC20SafeTransfer.safeTransfer(destinationAddress, msg.sender, amountReceivedFromOrder);
        }


    }

    /// @notice Calculate the result of ((numerator * target) / denominator)
    /// @param numerator the numerator in the equation
    /// @param denominator the denominator in the equation
    /// @param target the target for the equations
    /// @return partialAmount the resultant value
    function getPartialAmount(
        uint256 numerator,
        uint256 denominator,
        uint256 target
    )
        internal
        pure
        returns (uint256)
    {
        return SafeMath.div(SafeMath.mul(numerator, target), denominator);
    }

    // @notice Extract an address from a string of bytes
    // @param _bytes a string of at least 20 bytes
    // @param _start the offset of the address within the byte stream
    // @return tempAddress the address encoded in the bytestring beginning at _start
    function toAddress(bytes memory _bytes, uint _start) internal  pure returns (address) {
        require(_bytes.length >= (_start + 20));
        address tempAddress;

        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), _start)), 0x1000000000000000000000000)
        }

        return tempAddress;
    }

    function toBytes4(bytes memory _bytes, uint _start) internal pure returns (bytes4) {
        require(_bytes.length >= (_start + 4));
        bytes4 tempBytes4;

        assembly {
            tempBytes4 := mload(add(add(_bytes, 0x20), _start))
        }
        return tempBytes4;
    }

    // @notice Extract a uint256 from a string of bytes
    // @param _bytes a string of at least 32 bytes
    // @param _start the offset of the uint256 within the byte stream
    // @return tempUint the uint encoded in the bytestring beginning at _start
    function toUint(bytes memory _bytes, uint _start) internal  pure returns (uint256) {
        require(_bytes.length >= (_start + 32));
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }

        return tempUint;
    }

    /*
    *   Payable fallback function
    */

    /// @notice payable fallback to allow the exchange to return ether directly to this contract
    /// @dev note that only the exchange should be able to send ether to this contract
    function() external payable {
        require(msg.sender == address(weth));
    }
}
