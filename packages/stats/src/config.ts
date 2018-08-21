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
  'fetch-vaults-list': {
    handlerName: 'fetchVaults',
    description: 'Fetches a list of all vaults',
    cronExpression: '* * * * * *', // Every five minutes
    initialData: {}
  },
  'calculate-balance-grg': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '*/5 * * * * *', // Every second
    initialData: {}
  }
}

export default conf
