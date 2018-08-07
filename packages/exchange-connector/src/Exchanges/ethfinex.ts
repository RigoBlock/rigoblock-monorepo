import * as Exchange from './exchange'
import {
  AMOUNT_PRECISION,
  ETHFINEX,
  NETWORKS,
  PRICE_PRECISION
} from '../constants'
import { getRequestOptions } from '../utils'
import BigNumber from 'bignumber.js'
import fetch from 'node-fetch'

export class Ethfinex
  implements Exchange.Interface<Ethfinex, RawOrder, RawTicker> {
  // Why doesn't public static exchangeName work?
  static exchangeName: string = ETHFINEX
  public exchangeName: string = ETHFINEX
  HTTP_API_URL: string = 'https://api.bitfinex.com/v2/'
  private tickersTokenPairs: string[] = ['tZRXETH', 'tMKRETH', 'tGNTETH']

  constructor(public networkId, public transport) {}

  public network(id: string = NETWORKS.MAINNET): Ethfinex {
    this.networkId = id
    return this
  }

  public async getOrders(
    baseSymbol: string,
    quoteSymbol: string
  ): Promise<Exchange.OrdersList> {
    return this.raw
      .getOrders(baseSymbol, quoteSymbol)
      .then(result => this.formatOrders(result))
  }

  public async getTickers(
    options = {
      tokenPairs: this.tickersTokenPairs
    }
  ): Promise<Exchange.TickersList> {
    return this.raw
      .getTickers(options)
      .then(result => this.formatTickers(result))
  }

  public raw = {
    getTickers: async (
      options = {
        tokenPairs: this.tickersTokenPairs
      }
    ): Promise<RawTicker[]> => {
      const url = `${this.HTTP_API_URL}/tickers`
      const qs = {
        symbols: options.tokenPairs.toString()
      }
      return fetch(getRequestOptions(url, qs)).then(r => r.json())
    },
    getOrders: async (
      baseTokenAddress: string,
      quoteTokenAddress: string,
      precision: string = 'P0'
    ): Promise<RawOrder[]> => {
      const ordersUrl = `${
        this.HTTP_API_URL
      }/book/t${baseTokenAddress}${quoteTokenAddress}/${precision}`
      return fetch(getRequestOptions(ordersUrl)).then(r => r.json())
    }
  }

  private formatOrders(orders: RawOrder[]): Exchange.OrdersList {
    return orders.map((order: number[]) => {
      const type =
        order.slice(order.length - 1).pop() > 0
          ? Exchange.OrderType.BUY
          : Exchange.OrderType.SELL

      const price = new BigNumber(order.shift()).toFormat(
        PRICE_PRECISION,
        BigNumber.ROUND_FLOOR
      )

      const ordersCount: number = order.shift()

      const amount = new BigNumber(order.pop())
        .absoluteValue()
        .toFormat(AMOUNT_PRECISION, BigNumber.ROUND_FLOOR)
      return {
        type,
        price,
        amount,
        ordersCount
      }
    })
  }

  private formatTickers(tickers: RawTicker[]) {
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
}

type RawTicker = [
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

type RawOrder = [
  number, // PRICE,
  number, // COUNT,
  number // AMOUNT
]
