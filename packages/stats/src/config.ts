import { CONTRACT_ADDRESSES, NETWORKS, WEBSOCKET_URLS } from './constants'

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
  'kovan-fetch-dragos-list': {
    handlerName: 'fetchDragos',
    description: 'Fetches a list of all dragos',
    cronExpression: '*/5 * * * * ', // Every five minutes
    initialData: {
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '* * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].WETH,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].GRG,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-dragos-shareprice': {
    handlerName: 'getSharePrice',
    description: 'Gets the share price',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'ropsten-fetch-dragos-list': {
    handlerName: 'fetchDragos',
    description: 'Fetches a list of all dragos',
    cronExpression: '*/5 * * * *', // Every five minutes
    initialData: {
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '* * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].WETH,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GRG,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-dragos-shareprice': {
    handlerName: 'getSharePrice',
    description: 'Gets the share price',
    cronExpression: '* * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  }
}

export default conf
