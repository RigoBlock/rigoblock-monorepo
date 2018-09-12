export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''
export const TELEGRAF_HOST = process.env.TELEGRAF_HOST || '127.0.0.1'
export const TELEGRAF_PORT = process.env.TELEGRAF_PORT || 8125

export enum NETWORKS {
  MAINNET = '1',
  KOVAN = '42',
  ROPSTEN = '3'
}

export const CONTRACT_ADDRESSES = {
  [NETWORKS.KOVAN]: {
    DragoEventful: '0x35d3ab6b7917d03050423f7e43d4d9cff155a685',
    GNT: '0xef7fff64389b814a946f3e92105513705ca6b990',
    GRG: '0x9F121AFBc98A7a133fbb31fE975205f39e8f08D2',
    MKR: '0x1dad4783cf3fe3085c1426157ab175a6119a04ba',
    USDT: '0x3487A04103859A6d95ba0bAFdCf1Ca521490176E',
    WETH: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    ZRX: '0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570'
  },
  [NETWORKS.ROPSTEN]: {
    DragoEventful: '0xe62db1d634fa0ba7e154254b222419bd67904aef',
    GNT: '0x534a1efe19dbe8908edec3cd98d3abef28689245', // needs doublecheck
    GRG: '0x6FA8590920c5966713b1a86916f7b0419411e474',
    MKR: '0x9b2dbfcf742a14e00ca684fe891c36046ebb0c13', // needs doublecheck
    USDT: '0x0736d0c130b2eAD47476cC262dbed90D7C4eeABD',
    WETH: '0xA8E9Fa8f91e5Ae138C74648c9C304F1C75003A8D',
    ZRX: '0xFF32E76EAdc11Fc816A727980E92805D237CDB28'
  },
  [NETWORKS.MAINNET]: {
    DragoEventful: '',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    GRG: '0xD34cf65739954EB99D284fD20aB4f88c64e4d67D'
  }
}

export const WEBSOCKET_URLS = {
  [NETWORKS.KOVAN]: {
    INFURA: 'wss://kovan.infura.io/ws/d48872aa1c00471c825e9d856c3c3138',
    RIGOBLOCK: 'wss://kovan.dev.endpoint.network/ws'
  },
  [NETWORKS.ROPSTEN]: {
    INFURA: 'wss://ropsten.infura.io/ws/d48872aa1c00471c825e9d856c3c3138',
    RIGOBLOCK: 'wss://ropsten.dev.endpoint.network/ws'
  }
}
