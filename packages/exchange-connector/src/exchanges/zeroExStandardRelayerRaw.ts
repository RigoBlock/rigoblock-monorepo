export class ZeroExStandardRelayerRaw<T = ZeroExStandardRelayerRaw.RawOrder[]> {
  constructor(public STANDARD_API_URL, public transport = 'http') {}
  /**
   * Accepts one or two optional token addresses.
   * Setting only tokenA or tokenB returns pairs filtered by that token only
   */
  public async getTokenPairs(
    tokenA?: string,
    tokenB?: string
  ): Promise<ZeroExStandardRelayerRaw.TokenPair[]> {
    const url = `${
      this.STANDARD_API_URL
    }/v0/token_pairs?tokenA=${tokenA}&tokenB=${tokenB}`
    return fetch(url).then(r => r.json())
  }

  // !! TODO: Add parameters to query
  public async getOrders(
    exchangeContractAddress?: string, // returns orders created for this exchange address
    tokenAddress?: string, // returns orders where makerTokenAddress or takerTokenAddress is token address,
    makerTokenAddress?: string, // returns orders with specified makerTokenAddress,
    takerTokenAddress?: string, // returns orders with specified makerTokenAddress,
    maker?: string, // returns orders where maker is maker address,
    taker?: string, // returns orders where taker is taker address,
    trader?: string, // returns orders where maker or taker is trader address,
    feeRecipient?: string // returns orders where feeRecipient is feeRecipient address
  ): Promise<ZeroExStandardRelayerRaw.RawOrder[]> {
    const url = `${this.STANDARD_API_URL}/v0/orders`
    console.log(url)
    return fetch(url).then(r => r.json())
  }

  public async getOrder(
    orderHash: string
  ): Promise<ZeroExStandardRelayerRaw.RawOrder> {
    const url = `${this.STANDARD_API_URL}/v0/order/${orderHash}`
    return fetch(url).then(r => r.json())
  }

  public async getOrderbook(
    baseTokenAddress: string, // address of token designated as the baseToken in the currency pair calculation of price
    quoteTokenAddress: string // address of token designated as the quoteToken in the currency pair calculation of price
  ): Promise<ZeroExStandardRelayerRaw.OrderBook> {
    const url = `${
      this.STANDARD_API_URL
    }/v0/orderbook?baseTokenAddress=${baseTokenAddress}&quoteTokenAddress=${quoteTokenAddress}`
    return fetch(url).then(r => r.json())
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
