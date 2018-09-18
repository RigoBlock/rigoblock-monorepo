import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'
import EthfinexRaw from './ethfinexRaw'

export class Ethfinex {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  private raw: EthfinexRaw
  private wsTimeout = 10000

  constructor(
    public NETWORK_ID: NETWORKS | number,
    public HTTP_URL?: string,
    public WS_URL?: string
  ) {
    this.raw = new EthfinexRaw(NETWORK_ID, HTTP_URL, WS_URL)
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
      options: { symbols: string },
      callback: (err: Error, message?: any) => any
    ) => {
      return this.raw.ws.getTickers(
        options,
        this.websocketMessagesFilter(
          m => m['pair'] === options.symbols,
          callback
        )
      )
    },
    getCandles: async (
      options: {
        timeframe: string
        symbols: string
      },
      callback: (err: Error, message?: any) => any
    ) => {
      return this.raw.ws.getCandles(
        options,
        this.websocketMessagesFilter(
          m => m['key'] === `trade:${options.timeframe}:t${options.symbols}`,
          callback
        )
      )
    }
  }

  private websocketMessagesFilter = (filter, callback) => {
    let chanId
    let timer
    return (error: Error, msg: any, unsubscribe: Function) => {
      if (error) {
        return callback(error)
      }
      if (msg.event === 'subscribed' && filter(msg)) {
        chanId = msg.chanId
        timer = setTimeout(() => {
          unsubscribe()
          return callback(
            new Error(
              `No data received within ${this.wsTimeout / 1000} seconds.`
            )
          )
        }, this.wsTimeout)
      }
      if (Array.isArray(msg) && msg[0] === chanId) {
        timer ? clearTimeout(timer) : null
        return callback(null, msg.pop())
      }
    }
  }

  private formatOrders(orders: EthfinexRaw.RawOrder[]): OrdersList {
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
