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
    cronExpression: '5 * * * *',
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  },
  'fetch-info-OMG': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '10 * * * *',
    initialData: {
      symbol: tokensMap.OMG.symbol
    }
  },
  'fetch-info-SAN': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '15 * * * *',
    initialData: {
      symbol: tokensMap.SAN.symbol
    }
  },
  'fetch-info-EDO': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '20 * * * *',
    initialData: {
      symbol: tokensMap.EDO.symbol
    }
  },
  'fetch-info-GNT': {
    handlerName: 'fetchInfo',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '25 * * * *',
    initialData: {
      symbol: tokensMap.GNT.symbol
    }
  },
  'fetch-news-ZRX': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '30 * * * *',
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  },
  'fetch-news-OMG': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '35 * * * *',
    initialData: {
      symbol: tokensMap.OMG.symbol
    }
  },
  'fetch-news-GNT': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '40 * * * *',
    initialData: {
      symbol: tokensMap.GNT.symbol
    }
  },
  'fetch-news-SAN': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '45 * * * *',
    initialData: {
      symbol: tokensMap.SAN.symbol
    }
  },
  'fetch-news-EDO': {
    handlerName: 'fetchNews',
    description: 'Fetches token data and saves to the DB',
    cronExpression: '50 * * * *',
    initialData: {
      symbol: tokensMap.EDO.symbol
    }
  }
}

export default conf
