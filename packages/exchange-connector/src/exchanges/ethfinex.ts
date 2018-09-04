import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { IExchange, OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'

export class Ethfinex
  implements IExchange<Ethfinex.RawOrder, Ethfinex.RawTicker> {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static HTTP_API_URLS = {
    [NETWORKS.MAINNET]: 'https://api.ethfinex.com/v2',
    [NETWORKS.KOVAN]: 'https://test.ethfinex.com/v2',
    [NETWORKS.ROPSTEN]: 'https://test.ethfinex.com/v2'
  }
  public API_URL: string
  private TICKERS_TOKEN_PAIRS: string[] = [
    Ethfinex.TokenPairs.ZRXETH,
    Ethfinex.TokenPairs.MKRETH,
    Ethfinex.TokenPairs.GNTETH
  ]

  constructor(public networkId, public transport = 'http') {
    this.API_URL = Ethfinex.HTTP_API_URLS[networkId]
  }

  public async getOrders(
    baseToken: string,
    quoteToken: string,
    precision: Ethfinex.OrderPrecisions = Ethfinex.OrderPrecisions.P0
  ): Promise<OrdersList> {
    return this.raw
      .getOrders(baseToken, quoteToken, precision)
      .then(result => this.formatOrders(result))
  }

  public async getTickers(
    options = {
      tokenPairs: this.TICKERS_TOKEN_PAIRS
    }
  ): Promise<TickersList> {
    return this.raw
      .getTickers(options)
      .then(result => this.formatTickers(result))
  }

  public raw = {
    getTickers: async (
      options = {
        tokenPairs: this.TICKERS_TOKEN_PAIRS
      }
    ): Promise<Ethfinex.RawTicker[]> => {
      const url = `${
        this.API_URL
      }/tickers?symbols=${options.tokenPairs.toString()}`
      return fetch(url).then(r => r.json())
    },
    getOrders: async (
      baseToken: string,
      quoteToken: string,
      precision: Ethfinex.OrderPrecisions = Ethfinex.OrderPrecisions.P0
    ): Promise<Ethfinex.RawOrder[]> => {
      const url = `${this.API_URL}/book/t${baseToken}${quoteToken}/${precision}`
      return fetch(url).then(r => r.json())
    },
    getCandles: async (
      timeFrame: Ethfinex.CandlesTimeFrame,
      tokenPair: string,
      section: Ethfinex.CandlesSection,
      limit?: string, // max number of candles we want to receive
      sort?: Ethfinex.CandlesSort,
      start?: string, // filter start (ms)
      end?: string // filter end (ms)
    ): Promise<Ethfinex.RawCandle[]> => {
      const url = `${
        this.API_URL
      }/candles/trade:${timeFrame}:${tokenPair}/${section}?limit=${limit}&sort=${sort}&start=${start}&end=${end}`
      return fetch(url).then(r => r.json())
    }
  }

  private formatOrders(orders: Ethfinex.RawOrder[]): OrdersList {
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

  private formatTickers(tickers: Ethfinex.RawTicker[]) {
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
    return new Ethfinex(id, this.transport)
  }

  private checkForError(array: any[]) {
    return array[0] === ('error' as any)
  }
}

export namespace Ethfinex {
  export enum TokenPairs {
    ZRXETH = 'tZRXETH',
    MKRETH = 'tMKRETH',
    GNTETH = 'tGNTETH'
  }

  export type RawTicker = [
    string, // SYMBOL
    number, // BID,
    number, // BID_SIZE,
    number, // ASK,
    number, // ASK_SIZE,
    number, // DAILY_CHANGE,
    number, // DAILY_CHANGE_PERC,
    number, // LAST_PRICE,
    number, // VOLUME,
    number, // HIGH,
    number // LOW
  ]
  export type RawOrder = [
    number, // PRICE,
    number, // COUNT,
    number // AMOUNT
  ]

  export type RawCandle = [
    number, //MTS,
    number, //OPEN,
    number, //CLOSE,
    number, //HIGH,
    number, //LOW,
    number //VOLUME
  ]

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
