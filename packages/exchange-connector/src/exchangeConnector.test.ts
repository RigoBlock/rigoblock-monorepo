import { Ethfinex } from './exchanges/ethfinex'
import { NETWORKS, supportedExchanges } from './constants'
import { ZeroExStandardRelayerRaw } from './exchanges/zeroExStandardRelayerRaw'
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
      exchangeConnector(supportedExchanges.ETHFINEX, {
        networkId: NETWORKS.RINKEBY
      })
    ).toThrowErrorMatchingSnapshot()
  })

  it('instantiates the ZeroExStandardRelayerRaw if we pass "0xStandardRelayer" as exchangeName and an api url', () => {
    const exchange = exchangeConnector(supportedExchanges.ZEROEXRELAYER, {
      httpUrl: 'https://api.radarrelay.com/0x',
      networkId: NETWORKS.MAINNET
    })
    expect(exchange).toBeInstanceOf(ZeroExStandardRelayerRaw)
  })

  it('throws an error if we try to instantiate a 0x relayer without passing the API url', () => {
    expect(() =>
      exchangeConnector(supportedExchanges.ZEROEXRELAYER as any)
    ).toThrowErrorMatchingSnapshot()
  })
})
