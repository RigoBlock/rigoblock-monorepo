import { IExchange } from './exchanges/types'
import { NETWORKS, supportedExchanges } from './constants'
import ExchangesMap from './exchanges'

export default function ExchangeFactory(
  exchangeName: supportedExchanges | string,
  networkId: NETWORKS | string = NETWORKS.MAINNET,
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
