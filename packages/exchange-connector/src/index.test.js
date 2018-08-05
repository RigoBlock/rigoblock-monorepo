// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import Exchange from './index'


describe("get tickers from exchange", () => {
  var networks = new Array()
  networks[1] = 'Mainnet'
  networks[42] = 'Kovan'
  networks.map((network, key) => {
    it(`ERCdEX get tickers for ${network} success`, () => {
      const networkId = key
      const exchange = new Exchange('ERCdEX', networkId.toString())
      exchange.getTickers().then(results => {
        expect(results)
          .toBeArray()
      })
    })
    it(`Ethfinex get tickers for ${network} success`, () => {
      const networkId = key
      const exchange = new Exchange('Ethfinex', networkId.toString())
      exchange.getTickers().then(results => {
        expect(results)
          .toBeArray()
      })
    })
  })
})