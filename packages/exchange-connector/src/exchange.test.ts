import { Ethfinex } from './Exchanges'
import { ExchangesMap, SupportedExchanges } from './constants'
import { NETWORKS } from './Exchanges/test'
import ExchangeFactory from './exchange'

describe('Exchange factory class', () => {
  it('returns a new instance of the selected Exchange class', () => {
    // const exchange = ExchangeFactory(SupportedExchanges.ETHFINEX)
    console.log(NETWORKS)
    // console.log('MAP', NetworksMap)
    // console.log(
    //   'HEREEE',
    //   ExchangesMap[SupportedExchanges.ETHFINEX].supportedNetworks
    // )
    // expect(exchange).toBeInstanceOf(Ethfinex)
  })
})
