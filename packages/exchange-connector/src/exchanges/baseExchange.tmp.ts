import * as ExchangeTypes from './types'
import { NETWORKS, SupportedExchanges } from '../constants'

export default abstract class BaseExchange<T> {
  public switch(
    exchangeName: SupportedExchanges,
    networkId: NETWORKS = NETWORKS.MAINNET,
    transport: string = 'http',
    exchangesMap: ExchangeTypes.ExchangesMap<T>
  ): T {
    const selectedExchange = exchangesMap[exchangeName]
    if (!selectedExchange) {
      throw new Error(`Exchange ${exchangeName} is not supported.`)
    }
    if (!selectedExchange.supportedNetworks.includes(networkId)) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }

    return new selectedExchange(networkId, transport)
  }
}
