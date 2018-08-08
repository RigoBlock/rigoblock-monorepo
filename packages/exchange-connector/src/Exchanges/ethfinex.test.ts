import 'jest'
import * as ExchangeTypes from './exchangeTypes'
import { NetworksMap } from '../constants'

describe('Ethfinex exchange', () => {
  let fetchSpy
  let Ethfinex
  const baseToken = 'ZRX'
  const quoteToken = 'ETH'

  const rawTickers = [
    [
      'tZRXETH',
      0.0023431,
      24512.28039151,
      0.0023666,
      64147.80807233,
      -0.0001033,
      -0.0421,
      0.0023502,
      47296.58474659,
      0.0025569,
      0.0022708
    ]
  ]

  const rawOrders = [[0.0023421, 1, 1000], [0.0023692, 4, -1184]]

  const formattedTickers = [
    {
      symbol: 'ZRX',
      priceEth: '0.0023502',
      priceUsd: ''
    },
    {
      priceEth: '1',
      priceUsd: '',
      symbol: 'WETH'
    },
    {
      priceEth: '1',
      priceUsd: '',
      symbol: 'ETH'
    }
  ]

  const formattedOrders = [
    {
      type: ExchangeTypes.OrderType.BUY,
      price: '0.0023421',
      amount: '1000.00000',
      ordersCount: 1
    },
    {
      type: ExchangeTypes.OrderType.SELL,
      price: '0.0023692',
      amount: '1184.00000',
      ordersCount: 4
    }
  ]

  beforeEach(() => {
    jest.resetModules()
    fetchSpy = jest.fn()
    jest.doMock('node-fetch', () => ({ default: fetchSpy }))
    Ethfinex = require('./ethfinex').default
  })
  describe('network()', () => {
    it('sets the network Id and returns the instance with the network set', () => {
      const ethfinex = new Ethfinex('1')
      expect(ethfinex.networkId).toEqual('1')
      ethfinex.network('42')
      expect(ethfinex.networkId).toEqual('42')
    })
  })
  describe('raw functions', () => {
    describe('getTickers', () => {
      it('returns the raw tickers data from the exchange', async () => {
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => rawTickers
          })
        )
        const ethfinex = new Ethfinex('1')
        const tickers = await ethfinex.raw.getTickers({
          tokenPairs: ['tZRXETH']
        })
        expect(tickers).toEqual(rawTickers)
      })
      it('returns an empty array if the tockenPair is invalid', async () => {
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => []
          })
        )
        const ethfinex = new Ethfinex('1')
        const tickers = await ethfinex.raw.getTickers({
          tokenPairs: ['tZRXETH']
        })
        expect(tickers).toEqual([])
      })
    })

    describe('getOrders', () => {
      it('returns the raw orders from the exchange', async () => {
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => rawOrders
          })
        )
        const ethfinex = new Ethfinex('1')
        const orders = await ethfinex.raw.getOrders(baseToken, quoteToken)
        expect(orders).toEqual(rawOrders)
      })

      it('returns an error if the parameters are invalid', async () => {
        const responseError = ['error', 10020, 'symbol: invalid']
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => responseError
          })
        )
        const ethfinex = new Ethfinex('1')
        const orders = await ethfinex.raw.getOrders(baseToken, quoteToken)
        expect(orders).toEqual(responseError)
      })
    })
  })

  describe('getTickers', () => {
    it('returns the tickers formatted', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => rawTickers
        })
      )
      const ethfinex = new Ethfinex('1')
      const tickers = await ethfinex.getTickers({ tokenPairs: ['tZRXETH'] })
      expect(tickers).toEqual(formattedTickers)
    })

    it('returns an error if the parameters are incorrect', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => []
        })
      )
      const ethfinex = new Ethfinex('1')
      await expect(
        ethfinex.getTickers({ tokenPairs: ['tZRXETH'] })
      ).rejects.toThrowError('Tokens Pair not recognised by exchange')
    })
  })

  describe('getOrders', () => {
    it('returns the orders formatted', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => rawOrders
        })
      )
      const ethfinex = new Ethfinex('1')
      const orders = await ethfinex.getOrders(baseToken, quoteToken)
      expect(orders).toEqual(formattedOrders)
    })

    fit('returns an error if the parameters are incorrect', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => ['error', 10020, 'symbol: invalid']
        })
      )
      const ethfinex = new Ethfinex('1')
      await expect(
        ethfinex.getOrders({ tokenPairs: ['tZRXETH'] })
      ).rejects.toThrowError('symbol: invalid')
    })
  })
})
