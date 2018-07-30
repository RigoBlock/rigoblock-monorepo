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
  ERCdEX: (networkId = 1, baseTokenAddress, quoteTokenAddress) => {
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
  Ethfinex: (networkId = 1, baseToken, quoteToken) => {
    if (baseToken.length > 4) {
      throw new Error('baseToken has to be a shorter than 4 characters')
    }
    if (quoteToken.length > 4) {
      throw new Error('quoteToken has to be a shorter than 4 characters')
    }
    const options = {
      method: 'GET',
      url: `${SupportedExchanges.Ethfinex.http}/book/t${baseToken}${quoteToken}/P0`,
      qs: {},
      json: true
    }
    return options
  }
}