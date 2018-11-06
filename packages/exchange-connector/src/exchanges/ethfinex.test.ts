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
      const Ethfinex = require('./ethfinex').Ethfinex
      exchange = new Ethfinex(NETWORKS.MAINNET)
    })

    afterAll(() => {
      nock.enableNetConnect()
    })
    describe('getTickers', () => {
      it('returns data representing a high level overview of the state of the market.', async () => {
        const options = { symbols: ['BTCUSD'] }
        const result: any = await nockBackPromise(
          'ethfinex/http_getTickers.json',
          () => exchange.http.getTickers(options)
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getOrders', () => {
      it('returns orders provided on a price aggregated basis', async () => {
        const options = { symbols: 'BTCUSD' }
        const result: any = await nockBackPromise(
          'ethfinex/http_getOrders.json',
          () => exchange.http.getOrders(options)
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getCandles', () => {
      it('returns data which provides a way to access charting candle info', async () => {
        const options = {
          timeframe: exchange.options.candlesTimeFrame.FIFTEEN_MINS,
          symbols: 'BTCUSD',
          section: 'hist'
        }
        const result: any = await nockBackPromise(
          'ethfinex/http_getCandles.json',
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
      const Ethfinex = require('./ethfinex').Ethfinex
      exchange = new Ethfinex(NETWORKS.MAINNET)
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
        expect(exchange.raw.wsInstance).toBe(null)
      })
    })
    describe('getTickers', () => {
      const options = { symbols: ['BTCUSD', 'ZRXETH'] }
      const cbSpy = jest.fn()
      const tickersResponse = [129, [6935.3]]
      const msg = {
        event: 'subscribe',
        channel: 'ticker',
        symbol: `t${options.symbols[0]}`
      }
      const subscribeEvent = {
        event: 'subscribed',
        channel: 'ticker',
        chanId: 129,
        symbol: 'tBTCUSD',
        pair: 'BTCUSD'
      }
      const subscribeEvent2 = {
        event: 'subscribed',
        channel: 'ticker',
        chanId: 129,
        symbol: 'tZRXETH',
        pair: 'ZRXETH'
      }
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getTickers(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(msg))
      })
      it('filters the messages for and returns data for the specified pair', async () => {
        await exchange.ws.getTickers(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(tickersResponse)
        })
        expect(cbSpy).toHaveBeenCalledWith(null, tickersResponse)
      })
      it('returns an unsubscribe function to remove the listener', async () => {
        const unsub = await exchange.ws.getTickers(options, cbSpy)
        expect(emitter._listeners.message.length).toEqual(2)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent2)
        })
        unsub()
        expect(emitter._listeners.message.length).toEqual(0)
      })
    })
    describe('getCandles', () => {
      const options = { timeframe: '15m', symbols: 'BTCUSD' }
      const cbSpy = jest.fn()
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
        expect(cbSpy).toHaveBeenCalledWith(null, candlesResponse)
      })
      it('returns an unsubscribe function to remove the listener', async () => {
        const unsub = await exchange.ws.getCandles(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(subscribeEvent)
        })
        expect(emitter._listeners.message.length).toEqual(1)
        unsub()
        expect(emitter._listeners.message.length).toEqual(0)
      })
    })
  })
})
