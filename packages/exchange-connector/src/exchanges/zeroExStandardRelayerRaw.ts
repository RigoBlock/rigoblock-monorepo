import { NETWORKS } from '../constants'
import { fetchJSON, getQueryParameters, postJSON } from '../utils'

export class ZeroExStandardRelayerRaw<T = ZeroExStandardRelayerRaw.RawOrder[]> {
  static SUPPORTED_NETWORKS: NETWORKS[] = [
    NETWORKS.MAINNET,
    NETWORKS.KOVAN,
    NETWORKS.ROPSTEN
  ]
  constructor(
    public networkId: NETWORKS | number,
    public STANDARD_HTTP_URL: string,
    public STANDARD_WS_URL?: string
  ) {
    if (!STANDARD_HTTP_URL) {
      throw new Error('API url must be specified for 0x standard relayers.')
    }
  }
  public http = {
    /**
     * Accepts one or two optional token addresses.
     * Setting only tokenA or tokenB returns pairs filtered by that token only
     */
    getTokenPairs: async (options: {
      tokenA?: string
      tokenB?: string
    }): Promise<ZeroExStandardRelayerRaw.TokenPair[]> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/token_pairs`
      const queryParams = getQueryParameters(options)
      return fetchJSON(url, queryParams)
    },
    getOrders: async (options: {
      exchangeContractAddress?: string
      tokenAddress?: string
      makerTokenAddress?: string
      takerTokenAddress?: string
      maker?: string
      taker?: string
      trader?: string
      feeRecipient?: string
    }): Promise<ZeroExStandardRelayerRaw.RawOrder[]> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/orders`
      const queryParams = getQueryParameters(options)
      return fetchJSON(url, queryParams)
    },
    getOrder: async (options: {
      orderHash: string
    }): Promise<ZeroExStandardRelayerRaw.RawOrder> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/order/${options.orderHash}`
      return fetchJSON(url)
    },
    getOrderbook: async (options: {
      baseTokenAddress: string
      quoteTokenAddress: string
    }): Promise<ZeroExStandardRelayerRaw.OrderBook> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/orderbook`
      const queryParams = getQueryParameters(options)
      return fetchJSON(url, queryParams)
    },
    getFees: async (options: {
      exchangeContractAddress: string
      maker: string
      taker: string
      makerTokenAddress: string
      takerTokenAddress: string
      makerTokenAmount: string
      takerTokenAmount: string
      expirationUnixTimestampSec: string
      salt: string
    }): Promise<ZeroExStandardRelayerRaw.RawFee> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/fees`
      return postJSON(url, options)
    },
    createOrder: async (options: {
      exchangeContractAddress: string
      maker: string
      taker: string
      makerTokenAddress: string
      takerTokenAddress: string
      feeRecipient: string
      makerTokenAmount: string
      takerTokenAmount: string
      makerFee: string
      takerFee: string
      expirationUnixTimestampSec: string
      salt: string
      ecSignature: {
        v: number
        r: string
        s: string
      }
    }): Promise<ZeroExStandardRelayerRaw.OrderReceipt> => {
      const url = `${this.STANDARD_HTTP_URL}/v0/order`
      return postJSON(url, options)
    }
  }
  public ws = {}
}

export namespace ZeroExStandardRelayerRaw {
  export type TokenPair = {
    tokenA: {
      address: string
      minAmount: string
      maxAmount: string
      precision: number
    }
    tokenB: {
      address: string
      minAmount: string
      maxAmount: string
      precision: number
    }
  }

  export type RawFee = {
    feeRecipient: string
    makerFee: string
    takerFee: string
  }

  export type OrderReceipt = {
    price: string
    exchangeContractAddress: string
    expirationUnixTimestampSec: number
    feeRecipient: string
    maker: string
    makerFee: string
    makerTokenAddress: string
    makerTokenAmount: string
    networkId: number
    orderHash: string
    remainingTakerTokenAmount: string
    salt: string
    serializedEcSignature: string
    state: string
    taker: string
    takerFee: string
    takerTokenAddress: string
    takerTokenAmount: string
    accountId: number
    source: string
    dateUpdated: string
    dateCreated: string
    dateClosed: null
    id: number
  }

  export type RawOrder = {
    exchangeContractAddress: string
    maker: string
    taker: string
    makerTokenAddress: string
    takerTokenAddress: string
    feeRecipient: string
    makerTokenAmount: string
    takerTokenAmount: string
    makerFee: string
    takerFee: string
    expirationUnixTimestampSec: string
    salt: string
    ecSignature: {
      v: number
      r: string
      s: string
    }
    remainingTakerTokenAmount: string
    orderHash: string
    source: string
    price: string
  }

  export type OrderBook = {
    bids: RawOrder[]
    asks: RawOrder[]
  }
}

export default ZeroExStandardRelayerRaw
