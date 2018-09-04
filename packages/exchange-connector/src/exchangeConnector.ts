import { Ethfinex } from './exchanges/ethfinex'
import { NETWORKS, TRANSPORTS, supportedExchanges } from './constants'
import ExchangesMap from './exchanges'
import Web3 from 'web3'
import ZeroExStandardRelayerRaw from './exchanges/zeroExStandardRelayerRaw'

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
    apiUrl: '',
    web3: null
  }
): any {
  const selectedExchange = ExchangesMap[exchangeName]
  if (!selectedExchange) {
    throw new Error(`Exchange not supported: ${exchangeName}`)
  }
  if (!selectedExchange.SUPPORTED_NETWORKS.includes(options.networkId)) {
    throw new Error(
      `Network Id not supported for selected network: ${options.networkId}`
    )
  }
  return new selectedExchange(
    options.networkId,
    options.transport,
    options.web3,
    options.apiUrl
  )
}

export default exchangeConnector

interface ExchangeOptions {
  networkId?: NETWORKS
  transport?: TRANSPORTS
  apiUrl?: string
  web3?: Web3
}
