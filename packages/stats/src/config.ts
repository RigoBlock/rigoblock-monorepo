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
    cronExpression: '*/5 * * * *', // Every five minutes
    initialData: {
      network: NETWORKS.KOVAN
    }
  },
  'calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '* * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      address: WETH[NETWORKS.KOVAN],
      network: NETWORKS.KOVAN
    }
  },
  'calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      address: GRG[NETWORKS.KOVAN],
      network: NETWORKS.KOVAN
    }
  }
}

export default conf
