import * as ExchangeTypes from './Exchanges/types'
import { ExchangesMap, NETWORKS, SupportedExchanges } from './constants'

// export class Exchange {
//   private selectedExchange: typeof Ethfinex
//   public networkId: string
//   public transport: string
//   // eslint-disable-next-line
//   constructor(
//     exchangeName: SupportedExchanges,
//     networkId: NETWORKS = NETWORKS.MAINNET,
//     transport: string = 'http'
//   ) {
//     this.selectedExchange = ExchangesMap[exchangeName]
//     if (!this.selectedExchange) {
//       throw new Error(`Exchange ${exchangeName} is not supported.`)
//     }
//     if (!(networkId in this.selectedExchange.supportedNetworks)) {
//       throw new Error(`Network not supported on this exchange: ${networkId}`)
//     }
//     return new this.selectedExchange(networkId, transport)
//   }

//   public network(networkId: string): ExchangeTypes.IExchange {
//     if (!(networkId in this.selectedExchange.supportedNetworks)) {
//       throw new Error(`Network not supported on this exchange: ${networkId}`)
//     }
//     return new this.selectedExchange(networkId, this.transport)
//   }

//   public switch(
//     exchangeName,
//     networkId = this.networkId,
//     transport = this.transport
//   ): ExchangeTypes.IExchange {
//     if (!ExchangesMap[exchangeName]) {
//       throw new Error(`Exchange ${exchangeName} is not supported.`)
//     }
//     this.selectedExchange = ExchangesMap[exchangeName]
//     return new this.selectedExchange(networkId, transport)
//   }
// }

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
