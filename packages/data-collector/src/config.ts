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
    cronExpression: '*/5 * * * * *', // Every five seconds
    initialData: {}
  }
}

export default conf
