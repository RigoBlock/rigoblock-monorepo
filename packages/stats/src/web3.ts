import * as Web3 from 'web3'

// this is needed since Web3 typings refer to 0.20 version
const anyWeb3: any = Web3

export default new anyWeb3(
  new anyWeb3.providers.WebsocketProvider(
    'wss://kovan.infura.io/ws/d48872aa1c00471c825e9d856c3c3138'
  )
)
