import { Ethfinex } from './Exchanges/ethfinex'
import { NETWORKS, SupportedExchanges } from './constants'
import Exchange from './exchange'
import ExchangesMap from './Exchanges'

describe('Exchange factory class', () => {
  fit('returns a new instance of the selected Exchange class', () => {
    console.log(Ethfinex)
    console.log(ExchangesMap)
    const exchange = Exchange(SupportedExchanges.ETHFINEX)
    expect(exchange).toBeInstanceOf(Ethfinex)
  })
  // it('switches exchange', () => {
  //   const exchange = Exchange(SupportedExchanges.ETHFINEX)
  //   expect(exchange).toBeInstanceOf(Ethfinex)
  //   const secondExchange = exchange.switch(SupportedExchanges.ETHFINEX)
  //   expect(secondExchange).not.toEqual(exchange)
  // })
})
