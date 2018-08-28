import {
  AMOUNT_PRECISION,
  NETWORKS,
  PRICE_PRECISION,
  TO_WEI
} from '../constants'
import { ERCdEXRaw } from './ercdexRaw'
import { OrdersList, TickersList } from './types'
import { StandardRelayer } from './0xStandardRelayerRaw'
import { ZeroEx } from '0x.js'
import BigNumber from 'bignumber.js'

export class ERCdEX {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static API_URLS = {
    http: {
      [NETWORKS.MAINNET]: 'https://api.ercdex.com/api'
    }
  }
  public API_URL: string
  public raw: ERCdEXRaw
  public STANDARD_API_URL: string

  constructor(public networkId, public transport = 'http') {
    this.STANDARD_API_URL = `${this.API_URL}/standard/${networkId}`
    this.raw = new ERCdEXRaw(networkId, transport)
  }

  public network(id: string = NETWORKS.MAINNET): ERCdEX {
    return new ERCdEX(id, this.transport)
  }

  public getTickers() {
    return this.raw.getTickers().then(result => this.formatTickers(result))
  }

  public async getAggregatedOrders(baseTokenAddress, quoteTokenAddress) {
    return this.raw
      .getAggregatedOrders(baseTokenAddress, quoteTokenAddress)
      .then(orders => {
        const bids = orders.buys.priceLevels
        const asks = orders.sells.priceLevels
        const bidOrders = this.formatAggregatedOrders(bids)
        const askOrders = this.formatAggregatedOrders(asks)

        return {
          bids: bidOrders,
          asks: askOrders,
          spread: this.calculateSpread(bidOrders, askOrders)
        }
      })
  }

  public async getOrderbook(baseTokenAddress, quoteTokenAddress) {
    return this.raw
      .getOrderbook(baseTokenAddress, quoteTokenAddress)
      .then(result => this.formatOrderbook(result))
  }

  private formatAggregatedOrders(orders: ERCdEXRaw.PriceLevel[]) {
    return orders.map(order => {
      const orderPrice = new BigNumber(order.price).toFixed(PRICE_PRECISION)
      const orderAmount = new BigNumber(order.volume)
        .div(TO_WEI)
        .toFixed(AMOUNT_PRECISION)

      return {
        orderAmount,
        orderPrice
      }
    })
  }

  private formatOrderbook(orderbook) {
    if (orderbook.name && orderbook.name === 'error') {
      throw new Error(orderbook.message)
    }
    const { bids, asks } = orderbook
    if (!bids.length || !asks.length) {
      return true
    }
    const askOrders = asks.map(order => {
      const orderHash = ZeroEx.getOrderHashHex(order)
      const orderPrice = new BigNumber(order.takerTokenAmount)
        .div(new BigNumber(order.makerTokenAmount))
        .toFixed(PRICE_PRECISION)

      const orderAmount = new BigNumber(order.makerTokenAmount)
        .div(TO_WEI)
        .toFixed(AMOUNT_PRECISION)

      return {
        order,
        orderAmount,
        orderType: 'ASK',
        orderPrice,
        orderHash
      }
    })
    const bidOrders = bids.map(order => {
      const orderHash = ZeroEx.getOrderHashHex(order)
      const orderPrice = new BigNumber(order.takerTokenAmount)
        .div(new BigNumber(order.makerTokenAmount))
        .toFixed(PRICE_PRECISION)

      const orderAmount = new BigNumber(order.takerTokenAmount)
        .div(TO_WEI)
        .toFixed(AMOUNT_PRECISION)

      return {
        order,
        orderAmount,
        orderType: 'BID',
        orderPrice,
        orderHash
      }
    })

    return {
      bids: bidOrders,
      asks: askOrders,
      spread: this.calculateSpread(bidOrders, askOrders)
    }
  }

  private formatTickers(tickers: ERCdEXRaw.Ticker[]): TickersList {
    return tickers.map(ticker => ({
      priceEth: new BigNumber(ticker.priceEth).toFixed(PRICE_PRECISION),
      priceUsd: new BigNumber(ticker.usdPrice).toFixed(PRICE_PRECISION),
      symbol: ticker.symbol
    }))
  }

  private calculateSpread(
    bidOrders: ERCdEX.FormattedOrder[],
    askOrders: ERCdEX.FormattedOrder[]
  ): string {
    let spread
    if (bidOrders.length !== 0 && askOrders.length !== 0) {
      spread = new BigNumber(askOrders[askOrders.length - 1].orderPrice)
        .minus(new BigNumber(bidOrders[0].orderPrice))
        .toFixed(5)
    }
    spread = new BigNumber(0).toFixed(5)

    return spread
  }

  private formatOrders(orders): OrdersList {
    return orders.toString()
  }
}

export namespace ERCdEX {
  export type FormattedOrder = {
    orderAmount: string
    orderPrice: string
    order?: StandardRelayer.RawOrder
    orderType?: string
    orderHash?: string
  }

  export type RawTicker = {
    symbol: string
    priceEth: string
    usdPrice: string
    dailyVolume: string
    dailyPercentageChange: string
  }
}

export default ERCdEX
