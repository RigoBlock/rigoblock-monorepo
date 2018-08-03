export const ERCdEX = 'ERCdEX'
export const Ethfinex = 'Ethfinex'

export const TOKENS_DATA_ENDPOINT =
  'https://cdn.rawgit.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json'

export const SupportedExchanges = {
  ERCdEX: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: [],
    http: 'https://api.ercdex.com/api'
  },
  Ethfinex: {
    supportedNetworks: ['1', '42'],
    tickersTokenPairs: ['tZRXETH', 'tMKRETH', 'tGNTETH'],
    http: 'https://api.bitfinex.com/v2'
  }
}
