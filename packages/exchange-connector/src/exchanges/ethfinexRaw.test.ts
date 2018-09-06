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
        const options = { timeframe: '15m', symbols: 'BTCUSD', section: 'last' }
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
    const sendSpy = jest.fn()
    class WebsocketMock extends EventEmitter {
      public _listeners = {
        error: [],
        message: [],
        open: [],
        close: []
      }
      public send = sendSpy
      public addEventListener() {
        this._listeners[arguments['0']].push(arguments['1'])
        return this.addListener.apply(this, arguments)
      }
      public removeEventListener() {
        this._listeners[arguments['0']] = this._listeners[
          arguments['0']
        ].filter(listener => {
          return listener !== arguments['1']
        })
        return this.removeListener.apply(this, arguments)
      }
    }
    beforeEach(() => {
      jest.resetModules()
      jest.doMock('reconnecting-websocket', () => WebsocketMock)
      const EthfinexRaw = require('./ethfinexRaw').EthfinexRaw
      exchange = new EthfinexRaw(NETWORKS.MAINNET)
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    describe('open', () => {
      it('opens a websocket connection and assigns the websocket instance', done => {
        const exchangePromise = exchange.ws.open()
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(ws => {
            expect(ws).toBeInstanceOf(WebsocketMock)
            done()
          })
          .catch(e => done(e))
      })
    })
    describe('getTickers', () => {
      const options = { symbols: 'BTCUSD' }
      const cbSpy = jest.fn()
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
      it('sends a websocket message with the specified options', done => {
        const exchangePromise = exchange.ws.getTickers(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() => {
            expect(exchange.wsInstance.send).toHaveBeenCalledWith(
              JSON.stringify(msg)
            )
            done()
          })
          .catch(e => done(e))
      })
      it('filters the messages for and returns data for the specified pair', done => {
        const exchangePromise = exchange.ws.getTickers(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() =>
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(subscribeEvent)
            })
          )
          .then(() => {
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(tickersResponse)
            })
            expect(cbSpy).toHaveBeenCalledWith(null, tickersResponse.pop())
            return done()
          })
          .catch(e => done(e))
      })
      it('calls the callback with an error if no data is returned within 10 seconds', done => {
        const exchangePromise = exchange.ws.getTickers(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() => {
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(subscribeEvent)
            })
          })
          .then(() => {
            jest.advanceTimersByTime(10000)
            expect(cbSpy).toHaveBeenCalledWith(
              new Error(`No data received within 10 seconds.`)
            )
            return done()
          })
          .catch(e => done(e))
      })
      it('returns an unsubscribe function to remove the listener', done => {
        const exchangePromise = exchange.ws.getTickers(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(unsub => {
            unsub()
            expect(exchange.ws.connection()._listeners.message).toEqual([])
            return done()
          })
          .catch(e => done(e))
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
      it('sends a websocket message with the specified options', done => {
        const exchangePromise = exchange.ws.getCandles(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() => {
            expect(exchange.wsInstance.send).toHaveBeenCalledWith(
              JSON.stringify(msg)
            )
            done()
          })
          .catch(e => done(e))
      })
      it('filters the messages for and returns data for the specified pair', done => {
        const exchangePromise = exchange.ws.getCandles(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() =>
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(subscribeEvent)
            })
          )
          .then(() => {
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(candlesResponse)
            })
            expect(cbSpy).toHaveBeenCalledWith(null, candlesResponse.pop())
            return done()
          })
          .catch(e => done(e))
      })
      it('calls the callback with an error if no data is returned within 10 seconds', done => {
        const exchangePromise = exchange.ws.getCandles(options, cbSpy)
        exchange.ws.connection().emit('open')
        exchangePromise
          .then(() => {
            exchange.ws.connection().emit('message', {
              data: JSON.stringify(subscribeEvent)
            })
          })
          .then(() => {
            jest.advanceTimersByTime(10000)
            expect(cbSpy).toHaveBeenCalledWith(
              new Error(`No data received within 10 seconds.`)
            )
            return done()
          })
          .catch(e => done(e))
      })
    })
  })
})