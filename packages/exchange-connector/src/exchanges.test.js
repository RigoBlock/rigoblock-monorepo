// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { ERCdEX, Ethfinex } from './constants'
import { SupportedExchanges } from './constants'
import { getAggregatedOrders, getTickers } from './exchanges'

describe('get tickers from exchange REST API', () => {
  let networks = new Array()
  networks[1] = 'Mainnet'
  networks[42] = 'Kovan'
  networks.map((network, key) => {
    it(`ERCdEX get tickers for ${network} success`, () => {
      const networkId = key.toString()
      const result = getTickers.ERCdEX(networkId)
      expect(result).toEqual({
        method: 'GET',
        url: `${
          SupportedExchanges.ERCdEX.http
        }/reports/ticker?networkId=${networkId}`,
        qs: {},
        json: true
      })
    })
    it(`Ethfinex get tickers for ${network} success`, () => {
      const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
      const networkId = key.toString()
      const result = getTickers.Ethfinex(networkId)
      expect(result).toEqual({
        method: 'GET',
        url: `${SupportedExchanges.Ethfinex.http}/tickers?symbols=${symbols}`,
        qs: {},
        json: true
      })
    })
  })
})

describe('get aggregate orders from exchange REST API', () => {
  let networks = new Array()
  networks[1] = 'Mainnet'
  networks[42] = 'Kovan'
  const baseTokenAddress = 'x01'
  const quoteTokenAddress = 'x02'
  networks.map((network, key) => {
    it(`${ERCdEX} get aggregate orders for ${network} success`, () => {
      const networkId = key.toString()
      const result = getAggregatedOrders[ERCdEX](
        networkId,
        baseTokenAddress,
        quoteTokenAddress
      )
      expect(result).toEqual({
        method: 'GET',
        uri: `${SupportedExchanges.ERCdEX.http}/aggregated_orders`,
        qs: {
          networkId: networkId,
          baseTokenAddress: baseTokenAddress,
          quoteTokenAddress: quoteTokenAddress
        },
        json: true
      })
    })
    it(`${Ethfinex} get aggregate orders for ${network} success`, () => {
      const networkId = key.toString()
      const baseToken = 'ZRX'
      const quoteToken = 'ETH'
      const result = getAggregatedOrders[Ethfinex](
        networkId,
        baseToken,
        quoteToken
      )
      expect(result).toEqual({
        method: 'GET',
        url: `${
          SupportedExchanges.Ethfinex.http
        }/book/t${baseToken}${quoteToken}/P0`,
        qs: {},
        json: true
      })
    })
  })
})
