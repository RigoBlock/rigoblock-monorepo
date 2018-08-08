import * as ExchangeTypes from './exchangeTypes'
import { AMOUNT_PRECISION, NETWORKS, PRICE_PRECISION } from '../constants'
import { getRequestOptions } from '../utils'
import BigNumber from 'bignumber.js'
import fetch from 'node-fetch'

export enum TokenPairs {
  ZRXETH = 'tZRXETH',
  MKRETH = 'tMKRETH',
  GNTETH = 'tGNTETH'
}

export namespace Ethfinex {
  export type SupportedNetworks = {
    0: NETWORKS.MAINNET
    1: NETWORKS.KOVAN
  }
  export type TickersTokenPairs = {
    0: TokenPairs.ZRXETH
    1: TokenPairs.MKRETH
    2: TokenPairs.GNTETH
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
}

export default class Ethfinex
  implements
    ExchangeTypes.IExchange<
      Ethfinex.RawOrder,
      Ethfinex.RawTicker,
      Ethfinex.TickersTokenPairs
    > {
  static supportedNetworks: Ethfinex.SupportedNetworks = [
    NETWORKS.MAINNET,
    NETWORKS.KOVAN
  ]
  public HTTP_API_URL: string = 'https://api.bitfinex.com/v2/'
  private tickersTokenPairs: Ethfinex.TickersTokenPairs = [
    TokenPairs.ZRXETH,
    TokenPairs.MKRETH,
    TokenPairs.GNTETH
  ]

  constructor(public networkId, public transport = 'http') {}

  public network(id: string = NETWORKS.MAINNET): Ethfinex {
    this.networkId = id
    return this
  }

  public async getOrders(
    baseSymbol: string,
    quoteSymbol: string
  ): Promise<ExchangeTypes.OrdersList> {
    return this.raw
      .getOrders(baseSymbol, quoteSymbol)
      .then(result => this.formatOrders(result))
  }

  public async getTickers(
    options = {
      tokenPairs: this.tickersTokenPairs
    }
  ): Promise<ExchangeTypes.TickersList> {
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
      const url = `${this.HTTP_API_URL}/tickers`
      const qs = {
        symbols: options.tokenPairs.toString()
      }
      return fetch(getRequestOptions(url, qs)).then(r => r.json())
    },
    getOrders: async (
      baseToken: string,
      quoteToken: string,
      precision: string = 'P0'
    ): Promise<Ethfinex.RawOrder[]> => {
      const ordersUrl = `${
        this.HTTP_API_URL
      }/book/t${baseToken}${quoteToken}/${precision}`
      return fetch(getRequestOptions(ordersUrl)).then(r => r.json())
    }
  }

  private formatOrders(orders: Ethfinex.RawOrder[]): ExchangeTypes.OrdersList {
    if (orders.shift() === ('error' as any)) {
      throw new Error(orders.pop())
    }
    return orders.map((order: number[]) => {
      const type =
        order.slice(order.length - 1).pop() > 0
          ? ExchangeTypes.OrderType.BUY
          : ExchangeTypes.OrderType.SELL

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
}
