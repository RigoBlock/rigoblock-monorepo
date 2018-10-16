import tokensMap from './tokensMap'

export type ConfigEntry = {
  handlerName: string
  description: string
  cronExpression: string
  initialData?: object
}

export type Config = {
  [key: string]: ConfigEntry
}

const conf: Config = {
  'fetch-info-ZRX': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/30 * * * * *', // Every thirty seconds
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  },
  'fetch-news-ZRX': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/30 * * * * *', // Every thirty seconds
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  }
}

export default conf
