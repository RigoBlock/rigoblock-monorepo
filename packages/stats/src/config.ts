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
    cronExpression: '*/15 * * * * * ', // Every five minutes
    initialData: {
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-ETH': {
    handlerName: 'calculateEthBalance',
    description: 'Calculates ETH balance',
    cronExpression: '*/5 * * * * *', // Every second
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-GNT': {
    handlerName: 'calculateBalance',
    description: 'Calculates GNT balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GNT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].GNT,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].GRG,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-MKR': {
    handlerName: 'calculateBalance',
    description: 'Calculates MKR balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'MKR',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].MKR,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '*/5 * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].WETH,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-USDT': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDT balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].USDT,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-balance-ZRX': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRX balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRX',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].ZRX,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'kovan-calculate-dragos-shareprice': {
    handlerName: 'getSharePrice',
    description: 'Gets the share price',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].RIGOBLOCK
    }
  },
  'ropsten-fetch-dragos-list': {
    handlerName: 'fetchDragos',
    description: 'Fetches a list of all dragos',
    cronExpression: '*/15 * * * * *', // Every five minutes
    initialData: {
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-ETH': {
    handlerName: 'calculateEthBalance',
    description: 'Calculates ETH balance',
    cronExpression: '*/5 * * * * *', // Every second
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-GNT': {
    handlerName: 'calculateBalance',
    description: 'Calculates GNT balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GNT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GNT,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GRG,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-MKR': {
    handlerName: 'calculateBalance',
    description: 'Calculates MKR balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'MKR',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].MKR,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-USDT': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDT balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].USDT,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '*/5 * * * * *', // Every second
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].WETH,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-balance-ZRX': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRX balance',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRX',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].ZRX,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  },
  'ropsten-calculate-dragos-shareprice': {
    handlerName: 'getSharePrice',
    description: 'Gets the share price',
    cronExpression: '*/5 * * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].RIGOBLOCK
    }
  }
}

export default conf
