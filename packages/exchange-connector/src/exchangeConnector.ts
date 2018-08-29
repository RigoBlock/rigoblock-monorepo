import { Ethfinex } from './exchanges/ethfinex'
import { IExchange } from './exchanges/types'
import { NETWORKS, TRANSPORTS, supportedExchanges } from './constants'
import ExchangesMap from './exchanges'
import ZeroExStandardRelayerRaw from './exchanges/ZeroExStandardRelayerRaw'

function exchangeConnector(
  exchangeName: supportedExchanges.ZEROEXRELAYER,
  options: ExchangeOptions
): ZeroExStandardRelayerRaw
function exchangeConnector(
  exchangeName: supportedExchanges.ETHFINEX,
  options?: ExchangeOptions
): Ethfinex
function exchangeConnector(
  exchangeName: supportedExchanges,
  options = {
    networkId: NETWORKS.MAINNET,
    transport: TRANSPORTS.HTTP,
    apiUrl: ''
  }
): any {
  if (exchangeName === supportedExchanges.ZEROEXRELAYER) {
    if (!options.apiUrl) {
      throw new Error('API url must be specified for 0x standard relayers')
    }
    return new ZeroExStandardRelayerRaw(options.apiUrl, options.transport)
  }
  if (ExchangesMap[exchangeName]) {
    const selectedExchange = ExchangesMap[exchangeName]
    if (!selectedExchange.SUPPORTED_NETWORKS.includes(options.networkId)) {
      throw new Error(
        `Network not supported on this exchange: ${options.networkId}`
      )
    }
    return new selectedExchange(options.networkId, options.transport)
  }

  throw new Error(`Exchange not supported: ${exchangeName}`)
}

export default exchangeConnector

interface ExchangeOptions {
  networkId?: NETWORKS
  transport?: TRANSPORTS
  apiUrl?: string
}
