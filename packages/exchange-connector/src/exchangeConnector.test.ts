import { Ethfinex } from './exchanges/ethfinex'
import { NETWORKS, supportedExchanges } from './constants'
import { ZeroExStandardRelayerRaw } from './exchanges/zeroExStandardRelayerRaw'
import ExchangeConnector from './exchangeConnector'

describe('Exchange factory class', () => {
  it('returns a new instance of the selected Exchange class', () => {
    const connector = new ExchangeConnector()
    const exchange = connector.getExchange(supportedExchanges.ETHFINEX)
    expect(exchange).toBeInstanceOf(Ethfinex)
  })

  it('works as a singleton', () => {
    const connector = new ExchangeConnector()
    const exchange = connector.getExchange(supportedExchanges.ETHFINEX)
    const secondExchange = connector.getExchange(supportedExchanges.ETHFINEX)
    expect(secondExchange).toBe(exchange)
  })

  it('throws an error if we try to instance an unsupported exchange', () => {
    const connector = new ExchangeConnector()
    expect(() =>
      connector.getExchange('random' as any)
    ).toThrowErrorMatchingSnapshot()
  })

  it('throws an error if we try to instance an exchange with an unsupported network', () => {
    const connector = new ExchangeConnector()
    expect(() =>
      connector.getExchange(supportedExchanges.ETHFINEX, {
        networkId: NETWORKS.RINKEBY
      })
    ).toThrowErrorMatchingSnapshot()
  })

  it('instantiates the ZeroExStandardRelayerRaw if we pass "0xStandardRelayer" as exchangeName and an api url', () => {
    const connector = new ExchangeConnector()
    const exchange = connector.getExchange(supportedExchanges.ZEROEXRELAYER, {
      httpUrl: 'https://api.radarrelay.com/0x',
      networkId: NETWORKS.MAINNET
    })
    expect(exchange).toBeInstanceOf(ZeroExStandardRelayerRaw)
  })

  it('throws an error if we try to instantiate a 0x relayer without passing the API url', () => {
    const connector = new ExchangeConnector()
    expect(() =>
      connector.getExchange(supportedExchanges.ZEROEXRELAYER as any)
    ).toThrowErrorMatchingSnapshot()
  })
})
