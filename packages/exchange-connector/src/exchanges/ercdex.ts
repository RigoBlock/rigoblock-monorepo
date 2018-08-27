import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { IExchange, OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'
import StandardRelayer from './0xStandardRelayer'

export class ERCdEX extends StandardRelayer
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

  // public async getOrders(
  //   baseToken: string,
  //   quoteToken: string
  // ): Promise<OrdersList> {
  //   super.getOrders
  //   return this.raw
  //     .getOrders(baseToken, quoteToken)
  //     .then(result => this.formatOrders(result))
  // }

  // public async getTickers(
  //   options = {
  //     tokenPairs: this.TICKERS_TOKEN_PAIRS
  //   }
  // ): Promise<TickersList> {
  //   return this.raw
  //     .getTickers(options)
  //     .then(result => this.formatTickers(result))
  // }

  public raw = {
    getTickers: async (): Promise<ERCdEX.RawTicker[]> => {
      const url = `${this.API_URL}/reports/ticker`
      return fetch(url).then(r => r.json())
    },
    getOrders: async (
      baseTokenAddress: string,
      quoteTokenAddress: string
    ): Promise<StandardRelayer.RawOrder[]> => {
      return super.getOrders(baseTokenAddress, quoteTokenAddress)
    }
  }

  private formatOrders(orders: ERCdEX.RawOrder[]): OrdersList {
    if (this.checkForError(orders as any)) {
      throw new Error(orders.pop() as any)
    }
    return orders.map((order: number[]) => {
      const type =
        order.slice(order.length - 1).pop() > 0 ? OrderType.BUY : OrderType.SELL

      const price = new BigNumber(order.shift()).toFixed(PRICE_PRECISION)
      const ordersCount: number = order.shift()
      const amount = new BigNumber(order.pop())
        .absoluteValue()
        .toFixed(AMOUNT_PRECISION)
      return {
        type,
        price,
        amount,
        ordersCount
      }
    })
  }

  // private formatTickers(tickers: ERCdEX.RawTicker[]) {
  //   if (this.checkForError(tickers as any)) {
  //     throw new Error(tickers.pop() as any)
  //   }
  //   if (!tickers.length) {
  //     throw new Error('Tokens Pair not recognised by exchange')
  //   }
  //   const tickersList = tickers.map(ticker => ({
  //     symbol: ticker[0].substring(1, 4),
  //     priceEth: ticker[7].toString(),
  //     priceUsd: ''
  //   }))
  //   tickersList.push({
  //     priceEth: '1',
  //     priceUsd: '',
  //     symbol: 'WETH'
  //   })
  //   tickersList.push({
  //     priceEth: '1',
  //     priceUsd: '',
  //     symbol: 'ETH'
  //   })
  //   return tickersList
  // }

  public network(id: string = NETWORKS.MAINNET): ERCdEX {
    return new ERCdEX(id, this.transport)
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

  export type RawOrder = [
    number, // PRICE,
    number, // COUNT,
    number // AMOUNT
  ]
}

export default ERCdEX
