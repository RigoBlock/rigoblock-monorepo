import 'whatwg-fetch'
import * as nock from 'nock'
import { EventEmitter } from 'events'
import { NETWORKS } from '../constants'
import nockBackPromise from '../nockBackPromise'

describe('it allows us to perform API calls to exchanges following 0x Standard Relayer API', () => {
  describe('http', () => {
    let exchange
    beforeAll(() => {
      nock.disableNetConnect()
      const EthfinexRaw = require('./ethfinexRaw').EthfinexRaw
      exchange = new EthfinexRaw(NETWORKS.MAINNET)
    })
    afterAll(() => {
      nock.enableNetConnect()
    })
    describe('getTickers', () => {
      it('returns data representing a high level overview of the state of the market.', async () => {
        const options = { symbols: ['BTCUSD'] }
        const result: any = await nockBackPromise(
          'ethfinexRaw/http_getTickers.json',
          () => exchange.http.getTickers(options)
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getOrders', () => {
      it('returns orders on a price aggregated basis, with customizable precision.', async () => {
        const options = { symbols: 'BTCUSD' }
        const result: any = await nockBackPromise(
          'ethfinexRaw/http_getOrdersP0.json',
          () => exchange.http.getOrders(options)
        )
        expect(result).toMatchSnapshot()
      })
      it('accepts a precision parameter', async () => {
        const options = {
          symbols: 'BTCUSD',
          precision: 'P2'
        }
        const result: any = await nockBackPromise(
          'ethfinexRaw/http_getOrdersP2.json',
          () => exchange.http.getOrders(options)
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getCandles', () => {
      it('returns data that provides a way to access charting candle info.', async () => {
        const options = {
          timeframe: '15m',
          symbols: 'BTCUSD',
          section: 'last'
        }
        const result: any = await nockBackPromise(
          'ethfinexRaw/http_getCandles.json',
          () => exchange.http.getCandles(options)
        )
        expect(result).toMatchSnapshot()
      })
    })
  })
  describe('websocket', () => {
    let exchange
    let emitter
    let websocketInstance
    const sendSpy = jest.fn()
    const cbSpy = jest.fn()

    class WebsocketMock extends EventEmitter {
      public _listeners = {
        error: [],
        message: [],
        open: [],
        close: []
      }
      public send = sendSpy
      public close() {
        return this.emit('close')
      }
      public addEventListener() {
        this._listeners[arguments['0']].push(arguments['1'])
        return this.addListener.apply(this, arguments)
      }
      public removeEventListener() {
        const funcArgs = arguments
        this._listeners[funcArgs['0']] = this._listeners[funcArgs['0']].filter(
          listener => {
            return listener !== funcArgs['1']
          }
        )
        return this.removeListener.apply(this, arguments)
      }
    }
    beforeEach(async () => {
      jest.resetModules()
      jest.doMock('reconnecting-websocket', () => WebsocketMock)
      const EthfinexRaw = require('./ethfinexRaw').EthfinexRaw
      exchange = new EthfinexRaw(NETWORKS.MAINNET)
      jest.useFakeTimers()
      const exchangePromise = exchange.ws.open()
      emitter = await exchange.ws.getConnection()
      emitter.emit('open')
      websocketInstance = await exchangePromise
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    describe('open', () => {
      it('opens a websocket connection and assigns the websocket instance', async () => {
        expect(websocketInstance).toBeInstanceOf(WebsocketMock)
      })
      it('rejects with an error in case the are issues with the connection', async () => {
        const connectionError = new Error('Error during the connection')
        const exchangePromise = exchange.ws.open()
        const emitter = await exchange.ws.getConnection()
        emitter.emit('error', connectionError)
        await expect(exchangePromise).rejects.toThrow(connectionError)
      })
    })
    describe('close', () => {
      it('closes a websocket connection and assigns the websocket instance to null', async () => {
        await exchange.ws.close()
        expect(exchange.wsInstance).toBe(null)
      })
    })
    describe('getTickers', () => {
      const options = { symbols: 'BTCUSD' }
      const tickersResponse = [129, [6935.3]]
      const msg = {
        event: 'subscribe',
        channel: 'ticker',
        symbol: `t${options.symbols}`
      }
      const subscribeEvent = {
        event: 'subscribed',
        channel: 'ticker',
        chanId: 129,
        symbol: 'tBTCUSD',
        pair: 'BTCUSD'
      }
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getTickers(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(msg))
      })
      it('returns the messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getTickers(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(tickersResponse)
        })
        expect(cbSpy).toHaveBeenCalledWith(
          null,
          tickersResponse,
          expect.any(Function)
        )
      })
      it('returns an unsubscribe function to remove the listener', async () => {
        const unsub = await exchange.ws.getTickers(options, cbSpy)
        expect(emitter._listeners.message.length).toEqual(1)
        unsub()
        expect(emitter._listeners.message.length).toEqual(0)
      })
    })

    describe('getAggregatedOrders', () => {
      const options = {
        symbols: 'ETHUSD',
        precision: 'P2',
        frequency: 'F1',
        len: 25
      }
      const tickersResponseSnap = [
        129,
        [
          [205, 15, 354.90634331],
          [204, 139, 2398.86935314],
          [203, 144, 4025.09358459],
          [202, 118, 5188.22302028],
          [201, 90, 3721.25345521],
          [200, 98, 4107.22346567],
          [199, 50, 8258.23799491],
          [198, 59, 916.326922],
          [197, 65, 1414.88429641],
          [196, 83, 1573.46496345],
          [195, 90, 700.63856353],
          [194, 38, 659.72029935],
          [193, 37, 423.23965806],
          [192, 43, 1043.01630891],
          [191, 43, 314.92083385],
          [190, 88, 783.58758223],
          [189, 34, 1144.9840053],
          [188, 44, 256.21628455],
          [187, 42, 185.92898829],
          [186, 32, 738.46471078],
          [185, 74, 797.63761562],
          [184, 25, 164.77261576],
          [183, 31, 167.27293001],
          [182, 42, 247.30751445],
          [181, 40, 670.08218759],
          [206, 195, -3623.63370178],
          [207, 100, -2506.35586049],
          [208, 120, -1833.34336131],
          [209, 102, -4194.861206],
          [210, 86, -2612.67068061],
          [211, 69, -4780.53214094],
          [212, 65, -3428.50073052],
          [213, 62, -2399.19186737],
          [214, 66, -145.42705188],
          [215, 93, -1785.67639935],
          [216, 69, -1090.77113233],
          [217, 74, -1360.37685189],
          [218, 85, -1296.29979625],
          [219, 58, -840.46975103],
          [220, 87, -1538.38444008],
          [221, 46, -2154.7141614],
          [222, 49, -127.90203322],
          [223, 32, -673.04243097],
          [224, 41, -204.15814176],
          [225, 61, -729.56011563],
          [226, 33, -257.8090413],
          [227, 30, -228.30341468],
          [228, 38, -1051.76000306],
          [229, 36, -862.21556741],
          [230, 86, -1766.1524283]
        ],
        1
      ]
      const tickersResponseSingle = [120333, [204, 140, 2404.96985314], 2]
      const msg = {
        event: 'subscribe',
        channel: 'book',
        pair: `t${options.symbols}`,
        prec: `${options.precision}`,
        freq: `${options.frequency}`,
        len: options.len
      }

      const subscribeEvent = {
        event: 'subscribed',
        channel: 'book',
        chanId: 129,
        symbol: 'tETHUSD',
        prec: 'P2',
        freq: 'F1',
        len: '25',
        pair: 'ETHUSD'
      }
      // const subscribeEvent = {
      //   event: "subscribed",
      //   channel: "ticker",
      //   chanId: 129,
      //   symbol: "tBTCUSD",
      //   pair: "BTCUSD"
      // };
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getAggregatedOrders(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(msg))
      })
      it('returns the snapshot messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getAggregatedOrders(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(tickersResponseSnap)
        })
        expect(cbSpy).toHaveBeenCalledWith(
          null,
          tickersResponseSnap,
          expect.any(Function)
        )
      })
      it('returns the single messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getAggregatedOrders(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(tickersResponseSingle)
        })
        expect(cbSpy).toHaveBeenCalledWith(
          null,
          tickersResponseSingle,
          expect.any(Function)
        )
      })
      it('returns an unsubscribe function to remove the listener', async () => {
        const unsub = await exchange.ws.getAggregatedOrders(options, cbSpy)
        expect(emitter._listeners.message.length).toEqual(1)
        unsub()
        expect(emitter._listeners.message.length).toEqual(0)
      })
    })

    describe('getCandles', () => {
      const options = { timeframe: '15m', symbols: 'BTCUSD' }
      const candlesResponse = [
        9905,
        [[1536230280000, 6393.5, 6392.8, 6393.5, 6392.8, 1.45]]
      ]
      const msg = {
        event: 'subscribe',
        channel: 'candles',
        key: `trade:${options.timeframe}:t${options.symbols}`
      }
      const subscribeEvent = {
        event: 'subscribed',
        channel: 'candles',
        chanId: 9905,
        key: `trade:${options.timeframe}:t${options.symbols}`
      }
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getCandles(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(msg))
      })
      it('filters the messages for and returns data for the specified pair', async () => {
        await exchange.ws.getCandles(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(candlesResponse)
        })
        expect(cbSpy).toHaveBeenCalledWith(
          null,
          candlesResponse,
          expect.any(Function)
        )
      })
    })
  })
})
