import 'whatwg-fetch'
import * as nock from 'nock'
import { ERCdEXRaw } from './ercdexRaw'
import { EventEmitter } from 'events'
import { NETWORKS } from '../constants'
import nockBackPromise from '../nockBackPromise'

describe('it allows us to perform API calls to exchanges following 0x Standard Relayer API', () => {
  let exchange
  beforeAll(() => {
    nock.disableNetConnect()
    exchange = new ERCdEXRaw(NETWORKS.MAINNET)
  })

  afterAll(() => {
    nock.enableNetConnect()
  })
  describe('http', () => {
    describe('getBestOrders', () => {
      it('Gets the order(s) representing the best market price', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getBestOrders.json',
          () =>
            exchange.http.getBestOrders({
              makerTokenAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
              takerTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              baseTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              quantity: '1',
              takerAddress: '0x0000000000000000000000000000000000000000'
            })
        )
        expect(result).toMatchSnapshot()
      })
      it('Returns an error response if correct parameters are not specified', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getBestOrdersError.json',
          () => exchange.http.getBestOrders()
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getTickers', () => {
      it('Retrieves tickers data.', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getTickers.json',
          () => exchange.http.getTickers()
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getTradeHistoryLogs', () => {
      it('Retrieves trade history logs.', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getTradeHistoryLogs.json',
          () => exchange.http.getTradeHistoryLogs()
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getHistoricalPrices', () => {
      it('Gets historical data for order book', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getHistoricalPrices.json',
          () =>
            exchange.http.getHistoricalPrices({
              baseTokenAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
              quoteTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              startDate: '2018-08-28T10:06:02Z'
            })
        )
        expect(result).toMatchSnapshot()
      })
      it('Returns an error response if correct parameters are not specified', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getHistoricalPricesError.json',
          () => exchange.http.getBestOrders()
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getAggregatedOrders', () => {
      it('Gets historical data for order book', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getAggregatedOrders.json',
          () =>
            exchange.http.getAggregatedOrders({
              baseTokenAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
              quoteTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
            })
        )
        expect(result).toMatchSnapshot()
      })
      it('Returns an error response if correct parameters are not specified', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getAggregatedOrdersError.json',
          () => exchange.http.getBestOrders()
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('getFeesERCdEX', () => {
      it('Get fees for an order of described parameters', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/getFeesERCdEX.json',
          () =>
            exchange.http.getFeesERCdEX({
              makerTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
              takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
              makerTokenAmount: '10000000000000000',
              takerTokenAmount: '20000000000000000',
              maker: '0x9e56625509c2f60af937f23b7b532600390e8c8b',
              taker: '0x0000000000000000000000000000000000000000'
            })
        )
        expect(result).toMatchSnapshot()
      })
    })
    describe('Standard Relayer calls', () => {
      it('Works with inherited standard relayer calls', async () => {
        const result: any = await nockBackPromise(
          'ercdexRaw/standard-getTokenPairs.json',
          () => exchange.http.getTokenPairs()
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
      const ERCdEXRaw = require('./ercdexRaw').ERCdEXRaw
      exchange = new ERCdEXRaw(NETWORKS.MAINNET)
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
      const msg = `sub:ticker`
      const response = {
        channel: 'ticker',
        data: {
          tickers: [
            {
              symbol: 'ZRX',
              priceEth: '0.00293',
              usdPrice: '0.566',
              dailyVolume: '25830913.59439751',
              dailyPercentageChange: '-0.48'
            },
            {
              symbol: 'WETH',
              priceEth: '1',
              usdPrice: '193.49',
              dailyVolume: '0',
              dailyPercentageChange: '-1.53'
            }
          ]
        }
      }

      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getTickers(cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(msg)
      })
      it('returns the messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getTickers(cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(response)
        })
        expect(cbSpy).toHaveBeenCalledWith(null, response, expect.any(Function))
      })
      it('returns an unsubscribe function to remove the listener', async () => {
        const unsub = await exchange.ws.getTickers(cbSpy)
        expect(emitter._listeners.message.length).toEqual(1)
        unsub()
        expect(emitter._listeners.message.length).toEqual(0)
      })
    })
    describe('getAggregatedOrderFeed', () => {
      const options = {
        baseTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        quoteTokenAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
      }
      const msg = `sub:aggregated-order-feed/${options.baseTokenAddress}/${
        options.quoteTokenAddress
      }`
      const response = {
        channel:
          'aggregated-order-feed/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
        data: {
          baseTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          quoteTokenAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
          sells: {
            priceLevels: [
              {
                price: '193.72647',
                volume: '30000000000000000000',
                volumeRatio: 0.13021512903225807
              }
            ]
          },
          buys: {
            priceLevels: [
              {
                price: '183.24010500000000000106',
                volume: '147183936616932193964',
                volumeRatio: 0.638852509934984
              }
            ]
          }
        }
      }
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getAggregatedOrderFeed(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(msg)
      })
      it('returns the messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getAggregatedOrderFeed(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(response)
        })
        expect(cbSpy).toHaveBeenCalledWith(null, response, expect.any(Function))
      })
    })
    describe('getPairOrderChange', () => {
      const options = {
        baseTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        quoteTokenAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
      }
      const msg = `sub:aggregated-order-feed/${options.baseTokenAddress}/${
        options.quoteTokenAddress
      }`
      const response = {
        channel:
          'pair-order-change/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
        data: {
          order: {
            id: 1307151,
            dateCreated: '2018-09-10T16:59:19.084Z',
            dateUpdated: '2018-09-10T17:06:23.711Z',
            dateClosed: '2018-09-10T17:06:23.711Z',
            networkId: '1',
            exchangeContractAddress:
              '0x12459c951127e0c374ff9105dda097662a027093',
            expirationUnixTimestampSec: '1536599148',
            feeRecipient: '0xa258b39954cef5cb142fd567a46cddb31a670124',
            maker: '0x0004e79c978b95974dca16f56b516be0c50cc652',
            makerFee: '0',
            makerTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            makerTokenAmount: '30000000000000000000',
            salt:
              '6798787265129721829301177037057765745045015186953185285326066337755256492303',
            serializedEcSignature:
              '{"r":"0x8e1c482fe256fd2bb1c682f1961d9a95683b4233310142eab7b68bd39637dd62","s":"0x763f76c3062696b46416076f2d95881bcfe96938259c3b4a6fa52d1f69d5e36d","v":27}',
            taker: '0x0000000000000000000000000000000000000000',
            takerFee: '0',
            takerTokenAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
            takerTokenAmount: '5811794100000000000000',
            remainingTakerTokenAmount: '5811794100000000000000',
            orderHash:
              '0xdcb434f478bf152305de51af4a6819fb76b48534691d15f4c250e3c06f6037fd',
            accountId: 55,
            state: 3,
            source: 'bamboo-relay',
            price: '193.72647'
          },
          eventType: 'expired'
        }
      }
      it('sends a websocket message with the specified options', async () => {
        await exchange.ws.getAggregatedOrderFeed(options, cbSpy)
        expect(sendSpy).toHaveBeenCalledWith(msg)
      })
      it('returns the messages unfiltered to the callback + an unsubscribe function', async () => {
        await exchange.ws.getAggregatedOrderFeed(options, cbSpy)
        emitter.emit('message', {
          data: JSON.stringify(response)
        })
        expect(cbSpy).toHaveBeenCalledWith(null, response, expect.any(Function))
      })
    })
  })
})
