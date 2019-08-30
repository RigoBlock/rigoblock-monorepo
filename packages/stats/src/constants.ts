import { NETWORKS } from '@rgbk/exchange-connector'

export { NETWORKS } from '@rgbk/exchange-connector'
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''
export const TELEGRAF_HOST = process.env.TELEGRAF_HOST || '127.0.0.1'
export const TELEGRAF_PORT = process.env.TELEGRAF_PORT || 8125

export const DECIMAL_PLACES = 5
export const POOL_DECIMALS = 6

export const EFX_TOKENS_LIST = {
  [NETWORKS.MAINNET]: 'https://api.ethfinex.com/trustless/v1/r/get/conf',
  [NETWORKS.ROPSTEN]: 'https://test.ethfinex.com/trustless/v1/r/get/conf'
}

export const CONTRACT_ADDRESSES = {
  [NETWORKS.KOVAN]: {
    GET_ALL_BALANCES: '0x5c25ac8f1c5168cc0bd194414d13e761a72cdb9e',
    GNT: '0xef7fff64389b814a946f3e92105513705ca6b990',
    GRG: '0x9F121AFBc98A7a133fbb31fE975205f39e8f08D2',
    MKR: '0x1dad4783cf3fe3085c1426157ab175a6119a04ba',
    USDT: '0x3487A04103859A6d95ba0bAFdCf1Ca521490176E',
    WETH: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    ZRX: '0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570'
  },
  [NETWORKS.ROPSTEN]: {
    GET_ALL_BALANCES: '0xd53bebaa2e65753453cb53efcc65ad23268d4dec',
    GNT: '0x534a1efe19dbe8908edec3cd98d3abef28689245', // needs doublecheck
    GRG: '0x6FA8590920c5966713b1a86916f7b0419411e474',
    MKR: '0x9b2dbfcf742a14e00ca684fe891c36046ebb0c13', // needs doublecheck
    USDT: '0x0736d0c130b2eAD47476cC262dbed90D7C4eeABD',
    WETH: '0xA8E9Fa8f91e5Ae138C74648c9C304F1C75003A8D',
    ZRX: '0xA8E9Fa8f91e5Ae138C74648c9C304F1C75003A8D',
    ZRXW: '0xFF32E76EAdc11Fc816A727980E92805D237CDB28',
    ETHW: '0x965808e7F815CfffD4c018ef2Ba4C5A65EBa087e',
    USDTW: '0x83E42e6d1ac009285376340ef64BaC1C7d106C89',
    GRGW: '0x5959f2036608d693B4d085020ACAdBBf664C793E'
  },
  [NETWORKS.MAINNET]: {
    GET_ALL_BALANCES: '0x768e09703318e8514aaaabcf16d62b6ff6e9d706',
    GNT: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
    GRG: '0xD34cf65739954EB99D284fD20aB4f88c64e4d67D',
    MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    ZRX: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    ZRXW: '0xCf67d7A481CEEca0a77f658991A00366FED558F7',
    ETHW: '0xaa7427d8f17d87a28f5e1ba3adbb270badbe1011',
    USDTW: '0x1a9B2d827F26B7d7C18fEC4c1B27c1E8dEeBa26e',
    GRGW: ''
  }
}

export const WEBSOCKET_URLS = {
  [NETWORKS.MAINNET]: {
    INFURA: 'wss://mainnet.infura.io/ws/'
  },
  [NETWORKS.ROPSTEN]: {
    INFURA: 'wss://ropsten.infura.io/ws/',
    RIGOBLOCK: 'wss://ropsten.dev.endpoint.network/ws'
  },
  [NETWORKS.KOVAN]: {
    INFURA: 'wss://kovan.infura.io/ws/',
    RIGOBLOCK: 'wss://kovan.dev.endpoint.network/ws'
  }
}
