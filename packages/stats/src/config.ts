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
  'calculate-balance-grg': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '* * * * * *', // Every second
    initialData: {}
  }
}

export default conf
