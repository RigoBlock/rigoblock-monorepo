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
    cronExpression: '0 */5 * * * *', // Every five minutes
    initialData: {
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-ETH': {
    handlerName: 'calculateEthBalance',
    description: 'Calculates ETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-GNT': {
    handlerName: 'calculateBalance',
    description: 'Calculates GNT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GNT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].GNT,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].GRG,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-MKR': {
    handlerName: 'calculateBalance',
    description: 'Calculates MKR balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'MKR',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].MKR,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].WETH,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-USDT': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].USDT,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-balance-ZRX': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRX balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRX',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.KOVAN].ZRX,
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '0 */5 * * * *',
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
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.KOVAN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.KOVAN].INFURA
    }
  },
  'kovan-calculate-dragos-nav': {
    handlerName: 'calculateNav',
    description: 'Calculates the nav price',
    cronExpression: '0 */5 * * * *',
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
    cronExpression: '0 */5 * * * *', // Every minute
    initialData: {
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-ETH': {
    handlerName: 'calculateEthBalance',
    description: 'Calculates ETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-GNT': {
    handlerName: 'calculateBalance',
    description: 'Calculates GNT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GNT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GNT,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GRG,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-MKR': {
    handlerName: 'calculateBalance',
    description: 'Calculates MKR balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'MKR',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].MKR,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-USDT': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].USDT,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].WETH,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-ZRX': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRX balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRX',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].ZRX,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-ZRXW': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRXW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRXW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].ZRXW,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-ETHW': {
    handlerName: 'calculateBalance',
    description: 'Calculates ETHW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ETHW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].ETHW,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-USDTW': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDTW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDTW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].USDTW,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-balance-GRGW': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRGW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRGW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.ROPSTEN].GRGW,
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '0 */5 * * * *',
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
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'ropsten-calculate-dragos-nav': {
    handlerName: 'calculateNav',
    description: 'Calculates the nav price',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.ROPSTEN,
      web3Provider: WEBSOCKET_URLS[NETWORKS.ROPSTEN].INFURA
    }
  },
  'mainnet-fetch-dragos-list': {
    handlerName: 'fetchDragos',
    description: 'Fetches a list of all dragos',
    cronExpression: '0 */5 * * * *', // Every minute
    initialData: {
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-ETH': {
    handlerName: 'calculateEthBalance',
    description: 'Calculates ETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-GNT': {
    handlerName: 'calculateBalance',
    description: 'Calculates GNT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GNT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].GNT,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-GRG': {
    handlerName: 'calculateBalance',
    description: 'Calculates GRG balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'GRG',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].GRG,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-MKR': {
    handlerName: 'calculateBalance',
    description: 'Calculates MKR balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'MKR',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].MKR,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-USDT': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDT balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDT',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].USDT,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-WETH': {
    handlerName: 'calculateBalance',
    description: 'Calculates WETH balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'WETH',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].WETH,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-ZRX': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRX balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRX',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].ZRX,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-ZRXW': {
    handlerName: 'calculateBalance',
    description: 'Calculates ZRXW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ZRXW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].ZRXW,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-ETHW': {
    handlerName: 'calculateBalance',
    description: 'Calculates ETHW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'ETHW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].ETHW,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-balance-USDTW': {
    handlerName: 'calculateBalance',
    description: 'Calculates USDTW balance',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      symbol: 'USDTW',
      poolType: 'Drago',
      address: CONTRACT_ADDRESSES[NETWORKS.MAINNET].USDTW,
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-dragos-totalsupply': {
    handlerName: 'getTotalSupply',
    description: 'Gets the total supply',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-dragos-shareprice': {
    handlerName: 'getSharePrice',
    description: 'Gets the share price',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  },
  'mainnet-calculate-dragos-nav': {
    handlerName: 'calculateNav',
    description: 'Calculates the nav price',
    cronExpression: '0 */5 * * * *',
    initialData: {
      key: 'dragos',
      poolType: 'Drago',
      network: NETWORKS.MAINNET,
      web3Provider: WEBSOCKET_URLS[NETWORKS.MAINNET].INFURA
    }
  }
}

export default conf
