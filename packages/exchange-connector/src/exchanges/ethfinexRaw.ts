import { NETWORKS, WS_STATUS } from '../constants'
import { fetchJSON, getQueryParameters, postJSON } from '../utils'
import ReconnectingWebSocket from 'reconnecting-websocket'
import WS from 'ws'

export class EthfinexRaw {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.ROPSTEN, NETWORKS.KOVAN]
  public static API_HTTP_URLS = {
    [NETWORKS.MAINNET]: 'https://api.ethfinex.com/v2',
    [NETWORKS.ROPSTEN]: 'https://test.ethfinex.com/v2',
    [NETWORKS.KOVAN]: 'https://test.ethfinex.com/v2'
  }
  public static API_WS_URLS = {
    [NETWORKS.MAINNET]: 'wss://api.ethfinex.com/ws/2',
    [NETWORKS.ROPSTEN]: 'wss://test.ethfinex.com/ws/2',
    [NETWORKS.KOVAN]: 'wss://test.ethfinex.com/ws/2'
  }
  public static TRUSTLESS_URLS = {
    [NETWORKS.MAINNET]: 'https://api.ethfinex.com/trustless/v1'
  }
  public HTTP_URL: string
  public WS_URL: string
  public TRUSTLESS_URL: string
  public wsStatus: string = WS_STATUS.CLOSED
  public wsInstance: any

  constructor(
    public networkId: NETWORKS | number,
    public httpUrl?: string,
    public wsUrl?: string
  ) {
    this.HTTP_URL = httpUrl || EthfinexRaw.API_HTTP_URLS[networkId]
    this.WS_URL = wsUrl || EthfinexRaw.API_WS_URLS[networkId]
    this.TRUSTLESS_URL = EthfinexRaw.TRUSTLESS_URLS[networkId]
  }

  public http = {
    getTickers: (options: {
      symbols: string[]
    }): Promise<EthfinexRaw.RawTicker[]> => {
      const url = `${this.HTTP_URL}/tickers`
      const symbols = options.symbols.map(pair => `t${pair}`).toString()
      const queryParams = getQueryParameters({ symbols })
      return fetchJSON(url, queryParams)
    },
    getOrders: (options: {
      symbols: string
      precision?: EthfinexRaw.OrderPrecisions
    }): Promise<EthfinexRaw.RawOrder[]> => {
      const precision = options.precision || EthfinexRaw.OrderPrecisions.P0
      const url = `${this.HTTP_URL}/book/t${options.symbols}/${precision}`
      return fetchJSON(url)
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
      const url = `${this.HTTP_URL}/candles/trade:${options.timeframe}:t${
        options.symbols
      }/${options.section}`
      const { limit, start, sort, end } = options
      const queryParams = getQueryParameters({ limit, sort, start, end })
      return fetchJSON(url, queryParams)
    },
    trustless: {
      getConfig: () => {
        const url = `${this.TRUSTLESS_URL}/r/get/conf`
        return postJSON(url)
      },
      submitOrder: (
        type: string, // eg 'EXCHANGE LIMIT'
        symbol: string,
        amount: number,
        price: number,
        meta: any, // signed order
        protocol: string // '0x'
      ) => {
        const url = `${this.TRUSTLESS_URL}/w/on`
        const body = {
          type,
          symbol,
          amount,
          price,
          meta,
          protocol
        }
        return postJSON(url, body)
      },
      cancelOrder: (orderId: string, protocol: string, signature: string) => {
        const url = `${this.TRUSTLESS_URL}/w/oc`
        const body = {
          orderId,
          protocol,
          signature
        }
        return postJSON(url, body)
      },
      getOpenOrders: (
        symbol: string,
        protocol: string,
        nonce: string,
        signature: string
      ) => {
        const url = `${this.TRUSTLESS_URL}/r/orders/${symbol}`
        const body = {
          protocol,
          nonce,
          signature
        }
        return postJSON(url, body)
      },
      getOrderHistory: (protocol: string, nonce: string, signature: string) => {
        const url = `${this.TRUSTLESS_URL}/r/orders/hist`
        const body = {
          protocol,
          nonce,
          signature
        }
        return postJSON(url, body)
      }
    }
  }

  public ws = {
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
      options: { symbols: string[] },
      callback: (err: Error, message?: any) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const unsubscribeFuncs = options.symbols.map(symbols => {
        const unsubscribe = this.messagesListener(
          ws,
          m => m['pair'] === symbols,
          callback
        )
        const msg = {
          event: 'subscribe',
          channel: 'ticker',
          symbol: `t${symbols}`
        }
        ws.send(JSON.stringify(msg))

        return unsubscribe
      })
      return () => unsubscribeFuncs.map(fn => fn())
    },
    getAggregatedOrders: async (
      options: {
        symbols: string
        precision?: EthfinexRaw.OrderPrecisions
        frequency?: EthfinexRaw.BookFrequency
        len: number
        configFlags?: EthfinexRaw.ConfigurationFlags[]
      },
      callback: (err: Error, message?: any) => any
    ): Promise<Function> => {
      const defOptions = {
        symbols: 'ETHUSD',
        precision: EthfinexRaw.OrderPrecisions.P2,
        frequency: EthfinexRaw.BookFrequency.F1,
        len: 25,
        configFlags: [
          EthfinexRaw.ConfigurationFlags.SEQ_ALL,
          EthfinexRaw.ConfigurationFlags.CHECKSUM
        ]
      }
      options = { ...defOptions, ...options }
      const ws = await this.ws.getConnection()
      const msg = {
        event: 'subscribe',
        channel: 'book',
        pair: `t${options.symbols}`,
        prec: `${options.precision}`,
        freq: `${options.frequency}`,
        len: options.len
      }
      const unsubscribe = this.messagesListener(
        ws,
        m => m['symbol'] === `t${options.symbols}`,
        callback
      )
      let flags = options.configFlags.reduce((acc, flag) => {
        return acc + flag
      })
      ws.send(
        JSON.stringify({
          event: 'conf',
          flags
        })
      )
      ws.send(JSON.stringify(msg))
      return unsubscribe
    },
    getCandles: async (
      options: {
        timeframe: string
        symbols: string
      },
      callback: (err: Error, message?: any) => any
    ): Promise<Function> => {
      const ws = await this.ws.getConnection()
      const msg = {
        event: 'subscribe',
        channel: 'candles',
        key: `trade:${options.timeframe}:t${options.symbols}`
      }
      const unsubscribe = this.messagesListener(
        ws,
        m => m['key'] === `trade:${options.timeframe}:t${options.symbols}`,
        callback
      )
      ws.send(JSON.stringify(msg))
      return unsubscribe
    }
  }

  private messagesListener = (
    websocketInstance,
    filter,
    callback: (err: Error, message?: any) => any
  ) => {
    let msgCallback
    let chanId
    const unsubscribe = () => {
      if (msgCallback && chanId) {
        websocketInstance.send(
          JSON.stringify({
            event: 'unsubscribe',
            chanId
          })
        )
        return websocketInstance.removeEventListener('message', msgCallback)
      }
    }

    msgCallback = message => {
      const msg = JSON.parse(message.data)
      if (msg.event === 'subscribed' && filter(msg)) {
        chanId = msg.chanId
        return callback(null, msg)
      }
      if (Array.isArray(msg) && msg[0] === chanId) {
        return callback(null, msg)
      }
    }

    websocketInstance.addEventListener('message', msgCallback)
    return unsubscribe
  }

  public network(id: number = NETWORKS.MAINNET): EthfinexRaw {
    return new EthfinexRaw(id)
  }
  public options = {
    orderPrecisions: EthfinexRaw.OrderPrecisions,
    configurationFlags: EthfinexRaw.ConfigurationFlags,
    bookFrequency: EthfinexRaw.BookFrequency,
    candlesTimeFrame: EthfinexRaw.CandlesTimeFrame,
    candlesSection: EthfinexRaw.CandlesSection,
    candlesSort: EthfinexRaw.CandlesSort
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

  export enum ConfigurationFlags {
    DEC_S = 8, //Enable all decimal as strings.
    TIME_S = 32, // Enable all times as date strings.
    TIMESTAMP = 32768, // Timestamp in milliseconds.
    SEQ_ALL = 65536, // Enable sequencing BETA FEATURE
    CHECKSUM = 131072 //Enable checksum for every book iteration. Checks the top 25 entries for each side of book. Checksum is a signed int.
  }

  export enum BookFrequency {
    F0 = 'F0',
    F1 = 'F1'
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
