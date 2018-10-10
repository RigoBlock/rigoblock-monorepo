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
  'dummy-task': {
    handlerName: 'dummyTask',
    description: 'Logs',
    cronExpression: '*/25 * * * * *', // Every twenty five seconds
    initialData: {}
  }
}

export default conf
