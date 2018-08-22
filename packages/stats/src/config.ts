import { GRG, NETWORKS, WETH } from './constants'

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
  'fetch-dragos-list': {
    handlerName: 'fetchDragos',
    description: 'Fetches a list of all dragos',
    cronExpression: '*/5 * * * * *', // Every five minutes
    initialData: {
      network: NETWORKS.KOVAN
    }
  }
}

export default conf
