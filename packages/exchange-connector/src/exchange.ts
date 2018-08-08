import * as ExchangeTypes from './Exchanges/exchangeTypes'
import { Ethfinex } from './Exchanges'
import { ExchangesMap, NETWORKS, SupportedExchanges } from './constants'

export default class Exchange {
  public selectedExchange: typeof Ethfinex
  public networkId: string
  public transport: string
  // eslint-disable-next-line
  "constructor"(
    exchangeName: SupportedExchanges,
    networkId: NETWORKS = NETWORKS.MAINNET,
    transport: string = 'http'
  ): ExchangeTypes.IExchange {
    this.selectedExchange = ExchangesMap[exchangeName]
    if (!this.selectedExchange) {
      throw new Error(`Exchange ${exchangeName} is not supported.`)
    }
    if (!(networkId in this.selectedExchange.supportedNetworks)) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }
    return new this.selectedExchange(networkId, transport)
  }

  public network(networkId: string): ExchangeTypes.IExchange {
    if (!(networkId in this.selectedExchange.supportedNetworks)) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }
    return new this.selectedExchange(networkId, this.transport)
  }

  public switch(
    exchangeName,
    networkId = this.networkId,
    transport = this.transport
  ): ExchangeTypes.IExchange {
    if (!ExchangesMap[exchangeName]) {
      throw new Error(`Exchange ${exchangeName} is not supported.`)
    }
    this.selectedExchange = ExchangesMap[exchangeName]
    return new this.selectedExchange(networkId, transport)
  }
}
