import { Ethfinex } from './Exchanges/ethfinex'
import { NETWORKS, SupportedExchanges } from './constants'
import ExchangeFactory from './exchange'
import ExchangesMap from './Exchanges'

describe('Exchange factory class', () => {
  it('returns a new instance of the selected Exchange class', () => {
    const exchange = ExchangeFactory(SupportedExchanges.ETHFINEX)
    expect(exchange).toBeInstanceOf(Ethfinex)
  })
})
