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
  'fetch-data-ZRX': {
    handlerName: 'fetchData',
    description: 'Logs',
    cronExpression: '*/30 * * * * *', // Every twenty five seconds
    initialData: {
      symbol: tokensMap.ZRX.symbol
    }
  }
}

export default conf
