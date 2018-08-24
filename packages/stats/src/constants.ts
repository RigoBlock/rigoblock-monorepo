export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''

export enum NETWORKS {
  MAINNET = '1',
  KOVAN = '42',
  ROPSTEN = '3'
}

// Contracts addresses
export const WETH = {
  [NETWORKS.KOVAN]: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
}

export const GRG = {
  [NETWORKS.KOVAN]: '0x9F121AFBc98A7a133fbb31fE975205f39e8f08D2'
}
