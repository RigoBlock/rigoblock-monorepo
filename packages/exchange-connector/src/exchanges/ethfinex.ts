import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { EthfinexRaw } from './ethfinexRaw'
import { IExchange, OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'

export class Ethfinex {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static API_HTTP_URLS = {
    [NETWORKS.MAINNET]: 'https://api.ethfinex.com/v2',
    [NETWORKS.KOVAN]: 'https://test.ethfinex.com/v2',
    [NETWORKS.ROPSTEN]: 'https://test.ethfinex.com/v2'
  }
  public API_URL: string
  private raw: EthfinexRaw

  constructor(public networkId: NETWORKS | number, public apiUrl?: string) {
    this.API_URL = apiUrl ? apiUrl : Ethfinex.API_HTTP_URLS[networkId]
    this.raw = new EthfinexRaw(networkId, apiUrl)
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
      // TODO: fix return type
    }): Promise<any> => {
      return this.raw.http.getCandles(options).then(result => result)
    }
  }
  public ws = {
    open: () => this.raw.ws.open(),
    close: () => this.raw.ws.close(),
    getTickers: async (
      options: { symbols: string },
      callback: (err: Error, message?: any) => any
    ) => this.raw.ws.getTickers(options, callback),
    getCandles: async (
      options: {
        timeframe: string
        symbols: string
      },
      callback: (err: Error, message?: any) => any
    ) => this.raw.ws.getCandles(options, callback)
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

  private formatTickers(tickers: EthfinexRaw.RawTicker[]) {
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

export namespace Ethfinex {
  export enum OrderPrecisions {
    P0 = 'P0',
    P1 = 'P1',
    P2 = 'P2',
    P3 = 'P3',
    P4 = 'P4',
    R0 = 'R0'
  }

  export enum CandlesTimeFrame {
    ONE_MIN = '1m',
    FIVE_MINS = '5m',
    FIFTEEN_MINS = '15m',
    THIRTY_MINS = '30m',
    ONE_HOUR = '1h',
    THREE_HRS = '3h',
    SIX_HRS = '6h',
    TWELVE_HRS = '12h',
    ONE_DAY = '1D',
    SEVEN_DAYS = '7D',
    TWO_WEEKS = '14D',
    ONE_MONTH = '1M'
  }

  export enum CandlesSection {
    HIST = 'hist',
    LAST = 'last'
  }

  export enum CandlesSort {
    NEW_FIRST = '-1',
    OLD_FIRST = '1'
  }
}

export default Ethfinex
