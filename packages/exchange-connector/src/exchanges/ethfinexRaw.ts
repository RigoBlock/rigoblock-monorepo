import { NETWORKS } from '../constants'
import { fetchJSON, getQueryParameters } from '../utils'
import ReconnectingWebSocket from 'reconnecting-websocket'
import WS from 'ws'

export class EthfinexRaw {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static API_HTTP_URLS = {
    [NETWORKS.MAINNET]: 'https://api.ethfinex.com/v2',
    [NETWORKS.KOVAN]: 'https://test.ethfinex.com/v2',
    [NETWORKS.ROPSTEN]: 'https://test.ethfinex.com/v2'
  }
  public static API_WS_URLS = {
    [NETWORKS.MAINNET]: 'wss://api.ethfinex.com/ws/2',
    [NETWORKS.KOVAN]: 'wss://test.ethfinex.com/ws/2',
    [NETWORKS.ROPSTEN]: 'wss://test.ethfinex.com/ws/2'
  }
  public HTTP_URL: string
  public WS_URL: string
  private wsInstance

  constructor(
    public networkId: NETWORKS | number,
    public httpUrl?: string,
    public wsUrl?: string
  ) {
    this.HTTP_URL = httpUrl || EthfinexRaw.API_HTTP_URLS[networkId]
    this.WS_URL = wsUrl || EthfinexRaw.API_WS_URLS[networkId]
  }

  public http = {
    getTickers: async (options: {
      symbols: string[]
    }): Promise<EthfinexRaw.RawTicker[]> => {
      const url = `${this.HTTP_URL}/tickers`
      const symbols = options.symbols.map(pair => `t${pair}`).toString()
      const queryParams = getQueryParameters({ symbols })
      return fetchJSON(url, queryParams)
    },
    getOrders: async (options: {
      symbols: string
      precision?: EthfinexRaw.OrderPrecisions
    }): Promise<EthfinexRaw.RawOrder[]> => {
      const precision = options.precision || EthfinexRaw.OrderPrecisions.P0
      const url = `${this.HTTP_URL}/book/t${options.symbols}/${precision}`
      return fetchJSON(url)
    },
    getCandles: async (options: {
      timeframe: EthfinexRaw.CandlesTimeFrame
      symbols: string
      section: EthfinexRaw.CandlesSection
      limit?: string // max number of candles we want to receive
      sort?: EthfinexRaw.CandlesSort
      start?: string // filter start (ms)
      end?: string // filter end (ms)
    }): Promise<EthfinexRaw.RawCandle[]> => {
      const url = `${this.HTTP_URL}/candles/trade:${options.timeframe}:t${
        options.symbols
      }/${options.section}`
      const { limit, start, sort, end } = options
      const queryParams = getQueryParameters({ limit, sort, start, end })
      return fetchJSON(url, queryParams)
    }
  }

  public ws = {
    open: () => {
      this.wsInstance = new ReconnectingWebSocket(this.WS_URL, [], {
        WebSocket: window['WebSocket'] ? window['WebSocket'] : WS
      })
      return new Promise((resolve, reject) => {
        const rejectError = err => {
          return reject(err)
        }
        this.wsInstance.addEventListener('error', rejectError)
        this.wsInstance.addEventListener('open', () => {
          this.wsInstance.removeEventListener('error', rejectError)
          return resolve(this.wsInstance)
        })
      })
    },
    close: () => {
      return new Promise(resolve => {
        this.wsInstance.addEventListener('close', () => {
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
      options: { symbols: string },
      callback: (err: Error, message?: any, unsubscribe?: Function) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = {
        event: 'subscribe',
        channel: 'ticker',
        symbol: `t${options.symbols}`
      }
      const unsubscribe = this.messagesListener(ws, callback)
      ws.send(JSON.stringify(msg))
      return unsubscribe
    },
    getCandles: async (
      options: {
        timeframe: string
        symbols: string
      },
      callback: (err: Error, message?: any, unsubscribe?: Function) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = {
        event: 'subscribe',
        channel: 'candles',
        key: `trade:${options.timeframe}:t${options.symbols}`
      }
      const unsubscribe = this.messagesListener(ws, callback)
      ws.send(JSON.stringify(msg))
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

  public network(id: number = NETWORKS.MAINNET): EthfinexRaw {
    return new EthfinexRaw(id)
  }
}

export namespace EthfinexRaw {
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

export default EthfinexRaw
