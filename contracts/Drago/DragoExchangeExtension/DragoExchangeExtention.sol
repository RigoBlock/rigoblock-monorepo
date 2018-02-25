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

/// @title Drago Exchange Extention - library to extend drago to exchange adapters.
/// @author Gabriele Rigo - <gab@rigoblock.com>
library DragoExchangeExtension {

  struct Admin {
    address authority;
    address dragoDao;
    address feeCollector;
    uint minOrder; // minimum stake to avoid dust clogging things up
    uint ratio; //ratio is 80%
  }

  function depositToExchange(Admin memory admin, address _exchange, address _token, uint _value)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.depositToExchange(_exchange, _token, _value);
  }

  function withdrawFromExchange(Admin memory admin, address _exchange, address _token, uint _value)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.withdrawFromExchange(_exchange, _token, _value);
  }

  function placeOrderExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.placeOrderExchange(_exchange, orderAddresses, orderValues, fillTakerTokenAmount, stableOrSufficient, v, signature);
  }

  function placeTradeExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool stableOrSufficient,
    uint8 v,
    bytes32[2] signature)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.placeTradeExchange(_exchange, orderAddresses, orderValues, fillTakerTokenAmount, stableOrSufficient, v, signature);
  }

  function cancelOrderExchange(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.cancelOrderExchange(_exchange, orderAddresses, orderValues, cancelTakerTokenAmount);
  }

  function finalizeDeal(
    Admin memory admin,
    address _exchange,
    address[5] orderAddresses,
    uint[6] orderValues,
    uint cancelTakerTokenAmount)
    internal
  {
    ExchangeAdapter adapter = ExchangeAdapter(getExchangeAdapter(admin, _exchange));
    adapter.finalizeDeal(_exchange, orderAddresses, orderValues, cancelTakerTokenAmount);
  }

  function getExchangeAdapter(Admin memory admin, address _exchange)
    internal
    view
    returns (address)
  {
    Authority auth = Authority(admin.authority);
    return auth.getExchangeAdapter(_exchange);
  }

  function getDragoEventful(Admin memory admin) internal view returns (address) {
    Authority auth = Authority(admin.authority);
    return auth.getDragoEventful();
  }
}
