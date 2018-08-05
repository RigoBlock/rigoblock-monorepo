// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { NETWORKS_ID, SupportedExchanges } from './const'

// Get a list of orders aggregated by price levels
export const getAggregatedOrders = {
  ERCdEX: (networkId = 1, baseTokenAddress, quoteTokenAddress) => {
    const options = {
      method: 'GET',
      uri: `${
        SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
      }/aggregated_orders`,
      qs: {
        networkId: networkId,
        baseTokenAddress: baseTokenAddress,
        quoteTokenAddress: quoteTokenAddress
      },
      json: true
    }
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
      url: `${
        SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]
      }/book/t${baseToken}${quoteToken}/P0`,
      qs: {},
      json: true
    }
    return options
  }
}

// Get a list of orders
export const getOrders = {
  ERCdEX: (networkId = 1, baseTokenAddress, quoteTokenAddress) => {
    const options = {
      method: 'GET',
      uri: `${
        SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
      }/standard/${networkId}/v0/orderbook`,
      qs: {
        baseTokenAddress: baseTokenAddress,
        quoteTokenAddress: quoteTokenAddress
      },
      json: true
    }
    return options
  }
  // Ethfinex: (networkId = 1, baseToken, quoteToken) => {
  //   if (baseToken.length > 4) {
  //     throw new Error('baseToken has to be a shorter than 4 characters')
  //   }
  //   if (quoteToken.length > 4) {
  //     throw new Error('quoteToken has to be a shorter than 4 characters')
  //   }
  //   const options = {
  //     method: 'GET',
  //     url: `${SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]}/book/t${baseToken}${quoteToken}/P0`,
  //     qs: {},
  //     json: true
  //   }
  //   return options
  // }
}

// Get historical prices data for a given period of time
export const getHistoricalPricesData = {
  ERCdEX: (networkId = 1, baseTokenAddress, quoteTokenAddress, startDate) => {
    const options = {
      method: 'POST',
      uri: `${
        SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
      }/reports/historical`,
      body: {
        networkId: networkId,
        baseTokenAddress: baseTokenAddress,
        quoteTokenAddress: quoteTokenAddress,
        startDate: startDate
      },
      json: true
    }
    return options
  }
  // Ethfinex: (networkId = 1, baseToken, quoteToken) => {
  //   if (baseToken.length > 4) {
  //     throw new Error('baseToken has to be a shorter than 4 characters')
  //   }
  //   if (quoteToken.length > 4) {
  //     throw new Error('quoteToken has to be a shorter than 4 characters')
  //   }
  //   const options = {
  //     method: 'GET',
  //     url: `${SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]}/book/t${baseToken}${quoteToken}/P0`,
  //     qs: {},
  //     json: true
  //   }
  //   return options
  // }
}

// Get a list of tokens with price information
export const getTickers = {
  ERCdEX: (networkId = 1) => {
    const options = {
      method: 'GET',
      url: `${
        SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
      }/reports/ticker?networkId=${networkId}`,
      qs: {},
      json: true
    }
    return options
  },
  Ethfinex: (networkId = 1) => {
    const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
    const options = {
      method: 'GET',
      url: `${
        SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]
      }/tickers?symbols=${symbols}`,
      qs: {},
      json: true
    }
    return options
  }
}
