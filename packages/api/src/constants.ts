export enum NETWORKS {
  MAINNET = '1',
  ROPSTEN = '3',
  KOVAN = '42',
  LOCALHOST = '5777'
}

export const RPC_URLS = {
  [NETWORKS.MAINNET]: 'wss://mainnet.infura.io/ws/',
  [NETWORKS.ROPSTEN]: 'wss://ropsten.infura.io/ws/',
  [NETWORKS.KOVAN]: 'wss://kovan.infura.io/ws/',
  [NETWORKS.LOCALHOST]: 'ws://localhost:8545'
}
