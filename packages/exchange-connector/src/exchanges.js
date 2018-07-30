// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { SupportedExchanges } from './const'

export const getTickers = {
  ERCdEX: (network = 1) => {
    const options = {
      method: 'GET',
      url: `${SupportedExchanges.ERCdEX.http}/reports/ticker?networkId=${network}`,
      qs: {},
      json: true
    }
    return options
  },
  Ethfinex: () => {
    const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
    const options = {
      method: 'GET',
      url: `${SupportedExchanges.Ethfinex.http}/tickers?symbols=${symbols}`,
      qs: {},
      json: true
    }
    return options
  }
}

export const getAggregatedOrders = {
  ERCdEX: (networkId, baseTokenAddress, quoteTokenAddress) => {
    const options = {
      method: 'GET',
      uri: `${SupportedExchanges.ERCdEX.http}/aggregated_orders`,
      qs: {
        networkId: networkId,
        baseTokenAddress: baseTokenAddress,
        quoteTokenAddress: quoteTokenAddress
      },
      json: true 
    };
    return options
  },
  // Ethfinex: () => {
  //   const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
  //   const options = {
  //     method: 'GET',
  //     url: `${SupportedExchanges.Ethfinex.http}/tickers?symbols=${symbols}`,
  //     qs: {},
  //     json: true
  //   }
  //   return options
  // }
}