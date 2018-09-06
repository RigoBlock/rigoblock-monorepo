import { NETWORKS, TRANSPORTS } from '../constants'
import { fetchJSON, getQueryParameters } from '../utils'

export class ZeroExStandardRelayerRaw<T = ZeroExStandardRelayerRaw.RawOrder[]> {
  static SUPPORTED_NETWORKS: NETWORKS[] = [
    NETWORKS.MAINNET,
    NETWORKS.KOVAN,
    NETWORKS.ROPSTEN
  ]
  constructor(
    public networkId: NETWORKS | number,
    public transport: TRANSPORTS = TRANSPORTS.HTTP,
    public STANDARD_API_URL: string
  ) {
    if (!STANDARD_API_URL) {
      throw new Error('API url must be specified for 0x standard relayers.')
    }
  }
  /**
   * Accepts one or two optional token addresses.
   * Setting only tokenA or tokenB returns pairs filtered by that token only
   */
  public async getTokenPairs(options: {
    tokenA?: string
    tokenB?: string
  }): Promise<ZeroExStandardRelayerRaw.TokenPair[]> {
    const url = `${this.STANDARD_API_URL}/v0/token_pairs`
    const queryParams = getQueryParameters(options)
    return fetchJSON(url, queryParams)
  }

  public async getOrders(options: {
    exchangeContractAddress?: string
    tokenAddress?: string
    makerTokenAddress?: string
    takerTokenAddress?: string
    maker?: string
    taker?: string
    trader?: string
    feeRecipient?: string
  }): Promise<ZeroExStandardRelayerRaw.RawOrder[]> {
    const url = `${this.STANDARD_API_URL}/v0/orders`
    const queryParams = getQueryParameters(options)
    return fetchJSON(url, queryParams)
  }

  public async getOrder(options: {
    orderHash: string
  }): Promise<ZeroExStandardRelayerRaw.RawOrder> {
    const url = `${this.STANDARD_API_URL}/v0/order/${options.orderHash}`
    return fetchJSON(url)
  }

  public async getOrderbook(options: {
    baseTokenAddress: string
    quoteTokenAddress: string
  }): Promise<ZeroExStandardRelayerRaw.OrderBook> {
    const url = `${this.STANDARD_API_URL}/v0/orderbook`
    const queryParams = getQueryParameters(options)
    return fetchJSON(url, queryParams)
  }
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
