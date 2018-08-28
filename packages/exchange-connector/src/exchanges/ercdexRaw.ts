import { NETWORKS } from '../constants'
import { StandardRelayerRaw } from './0xStandardRelayerRaw'

export class ERCdEXRaw extends StandardRelayerRaw {
  public static API_URLS = {
    http: {
      [NETWORKS.MAINNET]: 'https://api.ercdex.com/api'
    }
  }
  public API_URL: string
  public STANDARD_API_URL: string

  constructor(public networkId, public transport = 'http') {
    super(ERCdEXRaw.API_URLS[transport][networkId])
    this.STANDARD_API_URL = `${this.API_URL}/standard/${networkId}`
  }

  public async getBestOrders(
    makerTokenAddress: string, // Address of maker token
    takerTokenAddress: string, // Address of taker token
    baseTokenAddress: string, // Address of base token
    quantity: string, // Quantity of pair requested
    takerAddress: string // Address of order taker
  ): Promise<ERCdEXRaw.BestOrders> {
    const url = `${
      this.API_URL
    }/orders/best?makerTokenAddress=${makerTokenAddress}&takerTokenAddress=${takerTokenAddress}
    &baseTokenAddress=${baseTokenAddress}&quantity=${quantity}&takerAddress=${takerAddress}`
    return fetch(url).then(r => r.json())
  }

  public async getTickers(): Promise<ERCdEXRaw.Ticker[]> {
    const url = `${this.API_URL}/reports/ticker`
    return fetch(url).then(r => r.json())
  }

  // TODO: check which parameters we want to implement
  public async getTradeHistoryLogs(): Promise<ERCdEXRaw.HistoryLogs> {
    const url = `${this.API_URL}/trade_history_logs`
    return fetch(url).then(r => r.json())
  }

  public async getHistoricalPrices(
    baseTokenAddress: string,
    quoteTokenAddress: string,
    startDate: string
  ): Promise<ERCdEXRaw.HistoricalPrice[]> {
    const url = `${this.API_URL}/reports/historical`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        networkId: this.networkId,
        baseTokenAddress,
        quoteTokenAddress,
        startDate
      })
    }).then(r => r.json())
  }

  public async getAggregatedOrders(
    baseTokenAddress: string,
    quoteTokenAddress: string
  ): Promise<ERCdEXRaw.AggregatedOrders> {
    const url = `${this.API_URL}/aggregated_orders?networkId=${
      this.networkId
    }&baseTokenAddress=${baseTokenAddress}&quoteTokenAddress=${quoteTokenAddress}`
    return fetch(url).then(r => r.json())
  }
}

export namespace ERCdEXRaw {
  export type Ticker = {
    symbol: string
    priceEth: string
    usdPrice: string
    dailyVolume: string
    dailyPercentageChange: string
  }

  export type HistoryLog = {
    id: number
    dateCreated: string
    dateUpdated: string
    orderHash: string
    txHash: string
    networkId: number
    maker: string
    taker: string
    feeRecipient: string
    makerTokenAddress: string
    makerTokenSymbol: string
    makerTokenName: string
    makerTokenDecimals: number
    makerTokenUsdPrice: string
    takerTokenAddress: string
    takerTokenSymbol: string
    takerTokenName: string
    takerTokenDecimals: number
    takerTokenUsdPrice: string
    filledMakerTokenAmount: string
    filledMakerTokenUnitAmount: string
    filledMakerTokenAmountUsd: string
    filledTakerTokenAmount: string
    filledTakerTokenUnitAmount: string
    filledTakerTokenAmountUsd: string
    paidMakerFeeAmount: string
    paidMakerFeeUnitAmount: string
    paidMakerFeeUsd: string
    paidTakerFeeAmount: string
    paidTakerFeeUnitAmount: string
    paidTakerFeeUsd: string
    relayer: string
  }

  export type HistoryLogs = {
    page: number
    perPage: number
    total: number
    pages: number
    records: HistoryLog[]
  }

  export type PriceLevel = {
    price: string
    volume: string
    volumeRatio: number
  }

  export type HistoricalPrice = {
    open: number
    close: number
    high: number
    low: number
    volume: number
    date: string
  }

  export type AggregatedOrders = {
    buys: {
      priceLevels: PriceLevel[]
    }
    sells: {
      priceLevels: PriceLevel[]
    }
  }

  export type RawOrder = {
    id: number
    dateCreated: string
    dateUpdated: string
    dateClosed: string
    networkId: number
    exchangeContractAddress: string
    expirationUnixTimestampSec: number
    feeRecipient: string
    maker: string
    makerFee: string
    makerTokenAddress: string
    makerTokenAmount: string
    salt: string
    serializedEcSignature: string
    taker: string
    takerFee: string
    takerTokenAddress: string
    takerTokenAmount: string
    remainingTakerTokenAmount: string
    orderHash: string
    accountId: number
    state: number
    source: string
    price: string
  }

  export type BestOrders = {
    totalQuantity: string
    orders: RawOrder[]
  }
}

export default ERCdEXRaw
