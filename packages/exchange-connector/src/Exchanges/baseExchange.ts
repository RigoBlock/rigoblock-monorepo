import { IExchange } from './types'
import { NETWORKS, SupportedExchanges } from '../constants'
import ExchangesMap from './index'

export default abstract class BaseExchange {
  public switch(
    exchangeName: SupportedExchanges,
    networkId: NETWORKS = NETWORKS.MAINNET,
    transport: string = 'http'
  ): IExchange {
    const selectedExchange = ExchangesMap[exchangeName]
    if (!selectedExchange) {
      throw new Error(`Exchange ${exchangeName} is not supported.`)
    }
    if (!selectedExchange.supportedNetworks.includes(networkId)) {
      throw new Error(`Network not supported on this exchange: ${networkId}`)
    }

    return new selectedExchange(networkId, transport)
  }
}
