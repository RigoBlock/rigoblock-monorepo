export const MAINNET: string = 'mainnet'
export const ROPSTEN: string = 'ropsten'
export const KOVAN: string = 'kovan'

export const PRICE_PRECISION: number = 7
export const AMOUNT_PRECISION: number = 5
export const TO_WEI: number = 1e18

export enum supportedExchanges {
  ETHFINEX = 'Ethfinex',
  ERCDEX = 'ERCdEX',
  ZEROEXRELAYER = '0xStandardRelayer'
}

export enum NETWORKS {
  MAINNET = 1,
  KOVAN = 42,
  ROPSTEN = 3
}

export enum TRANSPORTS {
  HTTP = 'http',
  WS = 'ws'
}