import { Ethfinex } from './exchanges/ethfinex'
import { NETWORKS, supportedExchanges } from './constants'
import exchangeConnector from './exchangeConnector'

describe('Exchange factory class', () => {
  it('returns a new instance of the selected Exchange class', () => {
    const exchange = exchangeConnector(supportedExchanges.ETHFINEX)
    expect(exchange).toBeInstanceOf(Ethfinex)
  })

  it('throws an error if we try to instance an unsupported exchange', () => {
    expect(() =>
      exchangeConnector('random' as any)
    ).toThrowErrorMatchingSnapshot()
  })

  it('throws an error if we try to instance an exchange with an unsupported network', () => {
    expect(() =>
      exchangeConnector(supportedExchanges.ETHFINEX, NETWORKS.ROPSTEN)
    ).toThrowErrorMatchingSnapshot()
  })
})
