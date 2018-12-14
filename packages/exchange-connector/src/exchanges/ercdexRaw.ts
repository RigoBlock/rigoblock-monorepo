import { NETWORKS, WS_STATUS } from '../constants'
import { ZeroExStandardRelayerRaw } from './zeroExStandardRelayerRaw'
import { fetchJSON, getQueryParameters, postJSON } from '../utils'
import ReconnectingWebSocket from 'reconnecting-websocket'
import WS from 'ws'

export class ERCdEXRaw extends ZeroExStandardRelayerRaw {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.ROPSTEN]
  public static API_HTTP_URL = 'https://api.ercdex.com/api'
  public static API_WS_URL = 'wss://api.ercdex.com'
  public API_URL: string
  public wsInstance
  public wsStatus: string = WS_STATUS.CLOSED

  constructor(
    public NETWORK_ID: NETWORKS | number,
    public HTTP_URL?: string,
    public WS_URL?: string
  ) {
    super(
      NETWORK_ID,
      HTTP_URL || `${ERCdEXRaw.API_HTTP_URL}/standard/${NETWORK_ID}`
    )
    this.HTTP_URL = HTTP_URL || ERCdEXRaw.API_HTTP_URL
    this.WS_URL = WS_URL || ERCdEXRaw.API_WS_URL
  }

  public http = {
    ...this.http,
    getBestOrders: (options: {
      makerTokenAddress: string // Address of maker token
      takerTokenAddress: string // Address of taker token
      baseTokenAddress: string // Address of base token
      quantity: string // Quantity of pair requested
      takerAddress: string // Address of order taker
    }): Promise<ERCdEXRaw.BestOrders> => {
      const url = `${this.HTTP_URL}/orders/best`
      const queryParams = getQueryParameters({
        ...options,
        networkId: this.NETWORK_ID
      })
      return fetchJSON(url, queryParams)
    },
    getTickers: (): Promise<ERCdEXRaw.Ticker[]> => {
      const url = `${this.HTTP_URL}/reports/ticker`
      return fetchJSON(url)
    },
    // TODO: check which parameters we want to implement
    getTradeHistoryLogs: (): Promise<ERCdEXRaw.HistoryLogs> => {
      const url = `${this.HTTP_URL}/trade_history_logs`
      return fetchJSON(url)
    },
    getHistoricalPrices: (options: {
      baseTokenAddress: string
      quoteTokenAddress: string
      startDate: string
    }): Promise<ERCdEXRaw.HistoricalPrice[]> => {
      const url = `${this.HTTP_URL}/reports/historical`
      return postJSON(url, {
        ...options,
        networkId: this.NETWORK_ID
      })
    },
    getAggregatedOrders: (options: {
      baseTokenAddress: string
      quoteTokenAddress: string
    }): Promise<ERCdEXRaw.AggregatedOrders> => {
      const url = `${this.HTTP_URL}/aggregated_orders`
      const queryParams = getQueryParameters({
        ...options,
        networkId: this.NETWORK_ID
      })
      return fetchJSON(url, queryParams)
    },
    // TODO: find out how to add a test
    softCancelOrder: (options: {
      orderHash: string
      signature?: {
        v: number
        r: string
        s: string
      }
    }): Promise<any> => {
      const url = `${this.HTTP_URL}/orders/soft-cancel`
      return postJSON(url, options)
    },
    getFeesERCdEX: (options: {
      makerTokenAddress: string
      takerTokenAddress: string
      makerTokenAmount: string
      takerTokenAmount: string
      maker: string
      taker: string
    }): Promise<ZeroExStandardRelayerRaw.RawFee> => {
      const url = `${this.HTTP_URL}/fees`
      const queryParams = getQueryParameters({
        ...options,
        networkId: this.NETWORK_ID
      })
      return postJSON([url, queryParams].join('?'))
    }
  }
  public ws = {
    ...this.ws,
    open: () => {
      this.wsStatus = WS_STATUS.CONNECTING
      this.wsInstance = new ReconnectingWebSocket(this.WS_URL, [], {
        WebSocket:
          typeof window !== 'undefined' && window['WebSocket']
            ? window['WebSocket']
            : WS,
        minReconnectionDelay: 1
      })
      return new Promise((resolve, reject) => {
        const rejectError = err => {
          return reject(err)
        }
        this.wsInstance.addEventListener('error', rejectError)
        this.wsInstance.addEventListener('open', () => {
          this.wsInstance.removeEventListener('error', rejectError)
          this.wsStatus = WS_STATUS.OPEN
          return resolve(this.wsInstance)
        })
      })
    },
    close: () => {
      this.wsStatus = WS_STATUS.CLOSING
      return new Promise(resolve => {
        this.wsInstance.addEventListener('close', () => {
          this.wsStatus = WS_STATUS.CLOSED
          this.wsInstance = null
          return resolve()
        })
        this.wsInstance.close(1000, 'Closed by client', { keepClosed: true })
      })
    },
    getConnection: () => {
      return this.wsInstance || this.ws.open()
    },
    getTickers: async (
      callback: (err: Error, message?: any, unsubscribe?: Function) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = `sub:ticker`
      const unsubscribe = this.messagesListener(ws, callback)
      ws.send(msg)
      return unsubscribe
    },
    getPairOrderChange: async (
      options: { baseTokenAddress: string; quoteTokenAddress: string },
      callback: (err: Error, message?: any, unsubscribe?: Function) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = `sub:pair-order-change/${options.baseTokenAddress}/${
        options.quoteTokenAddress
      }`
      const unsubscribe = this.messagesListener(ws, callback)
      ws.send(msg)
      return unsubscribe
    },
    getAggregatedOrderFeed: async (
      options: { baseTokenAddress: string; quoteTokenAddress: string },
      callback: (err: Error, message?: any, unsubscribe?: Function) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = `sub:aggregated-order-feed/${options.baseTokenAddress}/${
        options.quoteTokenAddress
      }`
      const unsubscribe = this.messagesListener(ws, callback)
      ws.send(msg)
      return unsubscribe
    }
  }

  private messagesListener = (
    websocketInstance,
    callback: (err: Error, message?: any, unsubscribe?: Function) => any
  ) => {
    let msgCallback
    const unsubscribe = () =>
      msgCallback
        ? websocketInstance.removeEventListener('message', msgCallback)
        : null

    msgCallback = message => {
      const msg = JSON.parse(message.data)
      return callback(null, msg, unsubscribe)
    }

    websocketInstance.addEventListener('message', msgCallback)

    return unsubscribe
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
