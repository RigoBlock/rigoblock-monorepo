import { IExchange, Order, OrdersList } from './types'
import { NETWORKS } from '../constants'
import StandardRelayer from './0xStandardRelayerRaw'

export class ERCdEX extends StandardRelayer<OrdersList>
  implements IExchange<StandardRelayer.RawOrder, ERCdEX.RawTicker> {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static API_URLS = {
    http: {
      [NETWORKS.MAINNET]: 'https://api.ercdex.com/api'
    }
  }
  public API_URL: string
  public STANDARD_API_URL: string

  constructor(public networkId, public transport = 'http') {
    super(ERCdEX.API_URLS[transport][networkId])
    this.STANDARD_API_URL = `${this.API_URL}/standard/${networkId}`
  }

  public async getOrders(
    baseToken: string,
    quoteToken: string
  ): Promise<OrdersList> {
    return this.raw
      .getOrders(baseToken, quoteToken)
      .then(result => this.formatOrders(result))
  }

  public async getTickers(): Promise<any> {
    return this.raw.getTickers().then(result => result)
  }

  public raw = {
    getOrders: async (
      baseToken: string,
      quoteToken: string
    ): Promise<StandardRelayer.RawOrder[]> => {
      return this.raw.getOrders(baseToken, quoteToken)
    },
    getTickers: async (): Promise<ERCdEX.RawTicker[]> => {
      const url = `${this.API_URL}/reports/ticker`
      return fetch(url).then(r => r.json())
    },
    getBestOrders: async (
      makerTokenAddress: string, // Address of maker token
      takerTokenAddress: string, // Address of taker token
      baseTokenAddress: string, // Address of base token
      quantity: string, // Quantity of pair requested
      takerAddress: string // Address of order taker
    ) => {
      const url = `${
        this.API_URL
      }/orders/best?makerTokenAddress=${makerTokenAddress}&takerTokenAddress=${takerTokenAddress}
      &baseTokenAddress=${baseTokenAddress}&quantity=${quantity}&takerAddress=${takerAddress}`
      return fetch(url).then(r => r.json())
    }
  }
  // getOrders: async (
  //   baseTokenAddress: string,
  //   quoteTokenAddress: string
  // ): Promise<StandardRelayer.RawOrder[]> => {
  //   return super.raw.getOrders(baseTokenAddress, quoteTokenAddress)
  // },
  // getOrderbook: async (
  //   baseTokenAddress: string,
  //   quoteTokenAddress: string
  // ): Promise<StandardRelayer.OrderBook> => {
  //   return super.raw.getOrderbook(baseTokenAddress, quoteTokenAddress)
  // },
  // getAggregatedOrders: async (baseTokenAddress, quoteTokenAddress) => {
  //   const url = `${this.API_URL}/aggregated_orders?networkId=${
  //     this.networkId
  //   }&baseTokenAddress=${baseTokenAddress}&quoteTokenAddress=${quoteTokenAddress}`
  //   return fetch(url).then(r => r.json())
  /**
   * gets the orders representing the best market price
   */

  public network(id: string = NETWORKS.MAINNET): ERCdEX {
    return new ERCdEX(id, this.transport)
  }

  private formatOrders(orders): OrdersList {
    return orders.toString()
  }
}

export namespace ERCdEX {
  export type RawTicker = {
    symbol: string
    priceEth: string
    usdPrice: string
    dailyVolume: string
    dailyPercentageChange: string
  }
}

export default ERCdEX

const asd = new ERCdEX('1')

asd.standard.getOrders(
  '0xe41d2489571d322189246dafa5ebde1f4699f498',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
)

asd.raw.getOrders(
  '0xe41d2489571d322189246dafa5ebde1f4699f498',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
)

asd.raw.
