import Ethfinex from './Exchanges/ethfinex'

export const MAINNET: string = 'mainnet'
export const ROPSTEN: string = 'ropsten'
export const KOVAN: string = 'kovan'

export const PRICE_PRECISION: number = 7
export const AMOUNT_PRECISION: number = 5

export const TOKENS_DATA_ENDPOINT =
  'https://cdn.rawgit.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json'

export enum NETWORKS {
  MAINNET = '1',
  KOVAN = '42',
  ROPSTEN = '3'
}

export enum SupportedExchanges {
  ETHFINEX
}

export const ExchangesMap = {
  [SupportedExchanges.ETHFINEX]: Ethfinex
}

// export const SupportedExchanges = {
//   [ERCDEX]: {
//     supportedNetworks: [NETWORKS.MAINNET, NETWORKS.KOVAN],
//     tickersTokenPairs: [],
//     http: 'https://api.ercdex.com/api'
//   },
//   [ETHFINEX]: {
//     supportedNetworks: [NETWORKS.MAINNET, NETWORKS.KOVAN],
//     tickersTokenPairs: ['tZRXETH', 'tMKRETH', 'tGNTETH'],
//     http: 'https://api.bitfinex.com/v2'
//   }
// }
