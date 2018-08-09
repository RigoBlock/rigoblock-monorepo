import * as ExchangeTypes from './Exchanges/types'
import { NETWORKS, SupportedExchanges } from './constants'
import ExchangesMap from './Exchanges'

export default function ExchangeFactory(
  exchangeName: SupportedExchanges,
  networkId: NETWORKS = NETWORKS.MAINNET,
  transport: string = 'http'
): ExchangeTypes.IExchange {
  const selectedExchange = ExchangesMap[exchangeName]
  if (!selectedExchange) {
    throw new Error(`Exchange ${exchangeName} is not supported.`)
  }
  if (!selectedExchange.supportedNetworks.includes(networkId)) {
    throw new Error(`Network not supported on this exchange: ${networkId}`)
  }

  return new selectedExchange(networkId, transport)
}
