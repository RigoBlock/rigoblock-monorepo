import { NETWORKS, TRANSPORTS } from '../constants'
import { fetchJSON, getQueryParameters } from '../utils'
import ReconnectingWebSocket from 'reconnecting-websocket'
import WS from 'ws'

export class EthfinexRaw {
  static SUPPORTED_NETWORKS: NETWORKS[] = [NETWORKS.MAINNET, NETWORKS.KOVAN]
  public static API_HTTP_URLS = {
    [NETWORKS.MAINNET]: 'https://api.EthfinexRaw.com/v2',
    [NETWORKS.KOVAN]: 'https://test.EthfinexRaw.com/v2',
    [NETWORKS.ROPSTEN]: 'https://test.EthfinexRaw.com/v2'
  }
  public static API_WS_URLS = {
    [NETWORKS.MAINNET]: 'wss://api.ethfinex.com/ws/2',
    [NETWORKS.KOVAN]: 'wss://test.ethfinex.com/ws/2',
    [NETWORKS.ROPSTEN]: 'wss://test.ethfinex.com/ws/2'
  }
  public HTTP_URL: string
  public WS_URL: string
  public wsIstance
  private wsTimeout = 10000

  constructor(
    public networkId: NETWORKS | number,
    public httpUrl?: string,
    public wsUrl?: string
  ) {
    this.HTTP_URL = httpUrl ? httpUrl : EthfinexRaw.API_HTTP_URLS[networkId]
    this.WS_URL = wsUrl ? wsUrl : EthfinexRaw.API_WS_URLS[networkId]
  }

  public http = {
    getTickers: async (options: {
      tokenPairs: string[]
    }): Promise<EthfinexRaw.RawTicker[]> => {
      const url = `${this.HTTP_URL}/tickers`
      const symbols = options.tokenPairs.map(pair => `t${pair}`).toString()
      const queryParams = getQueryParameters({ symbols })
      return fetchJSON(url, queryParams)
    },
    getOrders: async (options: {
      baseToken: string
      quoteToken: string
      precision: EthfinexRaw.OrderPrecisions
    }): Promise<EthfinexRaw.RawOrder[]> => {
      const precision = options.precision || EthfinexRaw.OrderPrecisions.P0
      const url = `${this.HTTP_URL}/book/t${options.baseToken}${
        options.quoteToken
      }/${precision}`
      return fetchJSON(url)
    },
    getCandles: async (options: {
      timeFrame: EthfinexRaw.CandlesTimeFrame
      tokenPair: string
      section: EthfinexRaw.CandlesSection
      limit?: string // max number of candles we want to receive
      sort?: EthfinexRaw.CandlesSort
      start?: string // filter start (ms)
      end?: string // filter end (ms)
    }): Promise<EthfinexRaw.RawCandle[]> => {
      const url = `${this.HTTP_URL}/candles/trade:${options.timeFrame}:${
        options.tokenPair
      }/${options.section}`
      const { limit, start, sort, end } = options
      const queryParams = getQueryParameters({ limit, sort, start, end })
      return fetchJSON(url, queryParams)
    }
  }

  public ws = {
    open: () =>
      new Promise((resolve, reject) => {
        const ws = new ReconnectingWebSocket(this.WS_URL, [], { WebSocket: WS })
        ws.addEventListener('open', () => {
          this.wsIstance = ws
          return resolve(this.wsIstance)
        })
      }),
    close: () =>
      new Promise((resolve, reject) => {
        this.wsIstance.addEventListener('close', () => {
          this.wsIstance = null
          resolve()
        })
      }),
    getConnection: () => {
      return this.wsIstance || this.ws.open()
    },
    getTickers: async (
      options: { symbols: string },
      callback: (err: Error, message?: any) => any
    ) => {
      const ws = await this.ws.getConnection()
      let chanId
      let msgTimestamp
      let timerId
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: `t${options.symbols}`
      })
      ws.addEventListener('message', message => {
        let msg = JSON.parse(message.data)
        if (msg.event === 'subscribed' && msg.pair === options.symbols) {
          chanId = msg.chanId
          msgTimestamp = new Date().valueOf()

          timerId = setTimeout(() => {
            const timestamp = new Date().valueOf()
            if (timestamp >= msgTimestamp + this.wsTimeout) {
              clearTimeout(timerId)
              return callback(
                new Error(
                  `No tickers informations received within ${
                    this.wsTimeout
                  } seconds`
                )
              )
            }
          }, this.wsTimeout)
        }
        if (Array.isArray(msg) && msg[0] === chanId) {
          clearTimeout(timerId)
          return callback(null, msg.pop())
        }
      })
      ws.send(msg)

      return () => clearInterval(timerId)
    }
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
