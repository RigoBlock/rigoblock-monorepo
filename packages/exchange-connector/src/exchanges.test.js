// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { ERCdEX, Ethfinex, NETWORKS_ID } from './const'
import { SupportedExchanges } from './const'
import { getAggregatedOrders, getTickers } from './exchanges'

describe('get tickers from exchange REST API', () => {
  let networks = new Array()
  networks[1] = 'Mainnet'
  networks[42] = 'Kovan'
  networks[3] = 'Ropsten'
  networks.map((network, key) => {
    it(`ERCdEX get tickers for ${network} success`, () => {
      const networkId = key.toString()
      const result = getTickers.ERCdEX(networkId)
      expect(result).toEqual({
        method: 'GET',
        url: `${
          SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
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
        url: `${
          SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]
        }/tickers?symbols=${symbols}`,
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
  networks[3] = 'Ropsten'
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
        uri: `${
          SupportedExchanges.ERCdEX.http[NETWORKS_ID[networkId]]
        }/aggregated_orders`,
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
          SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]
        }/book/t${baseToken}${quoteToken}/P0`,
        qs: {},
        json: true
      })
    })
  })
})
