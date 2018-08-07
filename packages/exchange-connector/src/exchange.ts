import { ERCDEX, ETHFINEX, NETWORKS, SupportedExchanges } from './constants'
import { Ethfinex } from './Exchanges/ethfinex'

const exchanges = [Ethfinex]

export default class Exchange {
  constructor(
    public exchangeName: string,
    public networkId: string = NETWORKS.MAINNET,
    public transport: string = 'http'
  ) {
    this.exchangeName = exchangeName
    if (!SupportedExchanges[exchangeName]) {
      throw new Error(`Exchange ${exchangeName} is not supported.`)
    }
    if (
      !SupportedExchanges[exchangeName].supportedNetworks.includes(networkId)
    ) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }
    const selectedExchange = exchanges
      .filter(exchange => exchange.exchangeName === exchangeName)
      .pop()
    return new selectedExchange(networkId, transport)
  }

  public network(networkId: string) {
    if (
      !SupportedExchanges[this.exchangeName].supportedNetworks.includes(
        networkId
      )
    ) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }
    switch (this.exchangeName) {
      case ETHFINEX:
        return new Ethfinex(networkId, this.transport)
      default:
        // what to return?
        return null
    }
  }
}
