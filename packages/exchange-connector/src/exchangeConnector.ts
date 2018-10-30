import { Ethfinex } from './exchanges/ethfinex'
import { EthfinexRaw } from './exchanges/ethfinexRaw'
import { NETWORKS, supportedExchanges } from './constants'
import { ZeroExStandardRelayerRaw } from './exchanges/zeroExStandardRelayerRaw'
import ExchangesMap from './exchanges'

class ExchangeConnector {
  private exchangesList = {}

  constructor() {}

  public getExchange(
    exchangeName: supportedExchanges.ZEROEXRELAYER,
    options: ExchangeOptions
  ): ZeroExStandardRelayerRaw
  public getExchange(
    exchangeName: supportedExchanges.ETHFINEX_RAW,
    options?: ExchangeOptions
  ): EthfinexRaw
  public getExchange(
    exchangeName: supportedExchanges.ETHFINEX,
    options?: ExchangeOptions
  ): Ethfinex
  public getExchange(
    exchangeName: supportedExchanges,
    options = {
      networkId: NETWORKS.MAINNET,
      httpUrl: '',
      wsUrl: ''
    }
  ): any {
    if (!this.exchangesList[exchangeName]) {
      this.exchangesList[exchangeName] = this.createInstance(
        exchangeName,
        options
      )
    }
    return this.exchangesList[exchangeName]
  }

  private createInstance(name, options): any {
    const selectedExchange = ExchangesMap[name]
    if (!selectedExchange) {
      throw new Error(`Exchange not supported: ${name}`)
    }
    if (!selectedExchange.SUPPORTED_NETWORKS.includes(options.networkId)) {
      throw new Error(
        `Network Id not supported for selected network: ${options.networkId}`
      )
    }
    return new selectedExchange(
      options.networkId,
      options.httpUrl,
      options.wsUrl
    )
  }
}

interface ExchangeOptions {
  networkId?: NETWORKS | number
  httpUrl?: string
  wsUrl?: string
}

export default ExchangeConnector
