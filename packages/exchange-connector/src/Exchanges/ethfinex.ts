import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { IExchange, OrderType, OrdersList, TickersList } from './types'
import BigNumber from 'bignumber.js'
import fetch from 'node-fetch'

export class Ethfinex
  implements IExchange<Ethfinex.RawOrder, Ethfinex.RawTicker> {
  static supportedNetworks: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public HTTP_API_URL: string = 'https://api.bitfinex.com/v2'
  private tickersTokenPairs: string[] = [
    Ethfinex.TokenPairs.ZRXETH,
    Ethfinex.TokenPairs.MKRETH,
    Ethfinex.TokenPairs.GNTETH
  ]

  constructor(public networkId, public transport = 'http') {}

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
      tokenPairs: this.tickersTokenPairs
    }
  ): Promise<TickersList> {
    return this.raw
      .getTickers(options)
      .then(result => this.formatTickers(result))
  }

  public raw = {
    getTickers: async (
      options = {
        tokenPairs: this.tickersTokenPairs
      }
    ): Promise<Ethfinex.RawTicker[]> => {
      const url = `${
        this.HTTP_API_URL
      }/tickers?symbols=${options.tokenPairs.toString()}`
      return fetch(url).then(r => r.json())
    },
    getOrders: async (
      baseToken: string,
      quoteToken: string,
      precision: Ethfinex.OrderPrecisions = Ethfinex.OrderPrecisions.P0
    ): Promise<Ethfinex.RawOrder[]> => {
      const url = `${
        this.HTTP_API_URL
      }/book/t${baseToken}${quoteToken}/${precision}`
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

  public network(id: string = NETWORKS.MAINNET): Ethfinex {
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

  export type SupportedNetworks = [NETWORKS.MAINNET, NETWORKS.KOVAN]

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

  export enum OrderPrecisions {
    P0 = 'P0',
    P1 = 'P1',
    P2 = 'P2',
    P3 = 'P3',
    P4 = 'P4',
    R0 = 'R0'
  }
}

export default Ethfinex
