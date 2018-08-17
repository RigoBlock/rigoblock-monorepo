import { Ethfinex } from './exchanges/ethfinex'
import { NETWORKS, SupportedExchanges } from './constants'
import exchangeFactory from './exchangeFactory'

describe('Exchange factory class', () => {
  it('returns a new instance of the selected Exchange class', () => {
    const exchange = exchangeFactory(SupportedExchanges.ETHFINEX)
    expect(exchange).toBeInstanceOf(Ethfinex)
  })

  it('throws an error if we try to instance an unsupported exchange', () => {
    expect(() =>
      exchangeFactory('random' as any)
    ).toThrowErrorMatchingSnapshot()
  })

  it('throws an error if we try to instance an exchange with an unsupported network', () => {
    expect(() =>
      exchangeFactory(SupportedExchanges.ETHFINEX, NETWORKS.ROPSTEN)
    ).toThrowErrorMatchingSnapshot()
  })
})
