export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''
export const COUCHDB_HOST = process.env.COUCHDB_HOST || 'http://127.0.0.1'
export const COUCHDB_PORT = parseInt(process.env.COUCHDB_PORT) || 5984
export const COUCHDB_USERNAME = process.env.COUCHDB_USERNAME || 'admin'
export const COUCHDB_PASSWORD = process.env.COUCHDB_PASSWORD || ''
export const INFO_DB = 'tokens_info'
export const NEWS_DB = 'tokens_news'

export const TOKEN_MARKET_URL =
  'https://tokenmarket.net/blockchain/ethereum/assets'

export const TOKENS_LIST_URL =
  'https://www.cryptocompare.com/api/data/coinlist/'

export const CRYPTO_PANIC_URL = symbol =>
  `https://cryptopanic.com/api/posts/?auth_token=5b3f861c261e7e6243a55dc7b7ca600832156886&public=true&filter=hot&currencies=${symbol}`

export const OVERVIEW_URL = symbol =>
  `https://www.cryptocompare.com/coins/${symbol}/overview`

export const SOCIAL_URL = tokenId =>
  `https://www.cryptocompare.com/api/data/socialstats/?id=${tokenId}`
