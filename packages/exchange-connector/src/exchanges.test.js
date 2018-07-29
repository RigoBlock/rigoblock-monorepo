// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { getTickers } from './exchanges'
import { SupportedExchanges } from './const'

describe("get tickers from exchange REST API", () => {
  var networks = new Array()
  networks[1] = 'Mainnet'
  networks[42] = 'Kovan'
  networks.map((network, key) => {
    it(`ERCdEX get tickers for ${network} success`, () => {
      const networkId = key.toString()
      const result = getTickers.ERCdEX(networkId)
      expect(result)
      .toEqual(
        {
          method: 'GET',
          url: `${SupportedExchanges.ERCdEX.http}/reports/ticker?networkId=${networkId}`,
          qs: {},
          json: true 
        }
      )
    })
    it(`Ethfinex get tickers for ${network} success`, () => {
      const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
      const networkId = key.toString()
      const result = getTickers.Ethfinex(networkId)
      expect(result)
      .toEqual(
        {
          method: 'GET',
          url: `${SupportedExchanges.Ethfinex.http}/tickers?symbols=${symbols}`,
          qs: {},
          json: true 
        }
      )
    })
  })
})