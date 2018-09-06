import 'jest'
import 'whatwg-fetch'
import * as nock from 'nock'
import { EventEmitter } from 'events'
import { NETWORKS } from '../constants'
import nockBackPromise from '../nockBackPromise'

describe('it allows us to perform API calls to exchanges following 0x Standard Relayer API', () => {
  fdescribe('http', () => {
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
        const options = { timeframe: '15m', symbols: 'BTCUSD', section: 'hist' }
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
      const Ethfinex = require('./ethfinexRaw').Ethfinex
      exchange = new Ethfinex(NETWORKS.MAINNET)
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
  })
})
