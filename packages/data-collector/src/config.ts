import tokensMap from './tokensMap'

export type ConfigEntry = {
  handlerName: string
  description: string
  cronExpression: string
  delay: number
  initialData?: object
}

export type Config = {
  [key: string]: ConfigEntry
}

const conf: Config = {
  'fetch-info-ZRX': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 0,
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  },
  'fetch-info-OMG': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 300000,
    initialData: {
      symbol: tokensMap.OMG.symbol
    }
  },
  'fetch-info-SAN': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 600000,
    initialData: {
      symbol: tokensMap.SAN.symbol
    }
  },
  'fetch-info-EDO': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 900000,
    initialData: {
      symbol: tokensMap.EDO.symbol
    }
  },
  'fetch-info-GNT': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 1200000,
    initialData: {
      symbol: tokensMap.GNT.symbol
    }
  },
  'fetch-news-ZRX': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 1500000,
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  },
  'fetch-news-OMG': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 1800000,
    initialData: {
      symbol: tokensMap.OMG.symbol
    }
  },
  'fetch-news-GNT': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 2100000,
    initialData: {
      symbol: tokensMap.GNT.symbol
    }
  },
  'fetch-news-SAN': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 2400000,
    initialData: {
      symbol: tokensMap.SAN.symbol
    }
  },
  'fetch-news-EDO': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '*/5 * * * *',
    delay: 2700000,
    initialData: {
      symbol: tokensMap.EDO.symbol
    }
  }
}

export default conf
