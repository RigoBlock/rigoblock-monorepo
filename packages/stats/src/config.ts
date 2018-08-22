import { GRG, WETH } from './constants'

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
    initialData: {}
  },
  'calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '* * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      address: WETH.KOVAN
    }
  }
  // 'calculate-balance-GRG': {
  //   handlerName: 'calculateBalance',
  //   description: 'Calculates GRG balance',
  //   cronExpression: '* * * * * *', // Every second
  //   initialData: {
  //     key: 'dragos',
  //     symbol: 'GRG',
  //     address: GRG.KOVAN
  //   }
  // }
}

export default conf
