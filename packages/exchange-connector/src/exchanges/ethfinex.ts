import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'
import EthfinexRaw from './ethfinexRaw'

export class Ethfinex {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.ROPSTEN, NETWORKS.KOVAN]
  private raw: EthfinexRaw
  public options

  constructor(
    public NETWORK_ID: NETWORKS | number,
    public HTTP_URL?: string,
    public WS_URL?: string
  ) {
    this.raw = new EthfinexRaw(NETWORK_ID, HTTP_URL, WS_URL)
    this.options = this.raw.options
  }

  public http = {
    getOrders: async (options: {
      symbols: string
      precision?: EthfinexRaw.OrderPrecisions
    }): Promise<OrdersList> => {
      return this.raw.http
        .getOrders(options)
        .then(result => this.formatOrders(result))
    },
    getTickers: (options: { symbols: string[] }): Promise<TickersList> => {
      return this.raw.http
        .getTickers(options)
        .then(result => this.formatTickers(result))
    },
    getCandles: (options: {
      timeframe: EthfinexRaw.CandlesTimeFrame
      symbols: string
      section: EthfinexRaw.CandlesSection
      limit?: string // max number of candles we want to receive
      sort?: EthfinexRaw.CandlesSort
      start?: string // filter start (ms)
      end?: string // filter end (ms)
    }): Promise<EthfinexRaw.RawCandle[]> => {
      return this.raw.http.getCandles(options)
    }
  }
  public ws = {
    open: () => {
      return this.raw.ws.open()
    },
    close: () => {
      return this.raw.ws.close()
    },
    getConnection: () => {
      return this.raw.ws.getConnection()
    },
    getTickers: async (
      options: { symbols: string[] },
      callback: (err: Error, message?: any) => any
    ) => {
      return this.raw.ws.getTickers(options, callback)
    },
    getCandles: async (
      options: {
        timeframe: string
        symbols: string
      },
      callback: (err: Error, message?: any) => any
    ) => {
      return this.raw.ws.getCandles(options, callback)
    }
  }

  private formatOrders(orders: EthfinexRaw.RawOrder[]): any {
    if (this.checkForError(orders as any)) {
      throw new Error(orders.pop() as any)
    }
    const bids = []
    const asks = []
    let spread
    // format orders and divide between asks and bids
    orders.map((order: number[]) => {
      const type =
        order.slice(order.length - 1).pop() > 0 ? OrderType.BUY : OrderType.SELL
      const orderPrice = new BigNumber(order.shift()).toFixed(PRICE_PRECISION)
      const ordersCount: number = order.shift()
      const orderAmount = new BigNumber(order.pop())
        .absoluteValue()
        .toFixed(AMOUNT_PRECISION)
      const formattedOrder = {
        orderPrice,
        orderAmount,
        ordersCount
      }
      return type === OrderType.BUY
        ? bids.push(formattedOrder)
        : asks.push(formattedOrder)
    })
    // calculate spread
    if (bids.length && asks.length) {
      spread = new BigNumber(asks[0].orderPrice)
        .minus(new BigNumber(bids[0].orderPrice))
        .toFixed(6)
    } else {
      spread = new BigNumber(0).toFixed(6)
    }
    return {
      aggregated: true,
      asks: asks.reverse(),
      bids,
      spread
    }
  }

  private formatTickers(tickers: EthfinexRaw.RawTicker[]): TickersList {
    if (this.checkForError(tickers as any)) {
      throw new Error(tickers.pop() as any)
    }
    if (!tickers.length) {
      throw new Error('Tokens Pair not recognised by exchange')
    }
    const tickersList = tickers.map(ticker => ({
      symbol: ticker[0].substring(1, 4),
      priceEth: ticker[7].toString(),
      priceUsd: ''
    }))
    tickersList.push({
      priceEth: '1',
      priceUsd: '',
      symbol: 'WETH'
    })
    tickersList.push({
      priceEth: '1',
      priceUsd: '',
      symbol: 'ETH'
    })
    return tickersList
  }

  public network(id: number = NETWORKS.MAINNET): Ethfinex {
    return new Ethfinex(id)
  }

  private checkForError(array: any[]) {
    return array[0] === ('error' as any)
  }
}

export default Ethfinex
