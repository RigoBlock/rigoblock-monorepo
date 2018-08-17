import * as ExchangeTypes from './types'
import { NETWORKS } from '../constants'

describe('Ethfinex exchange', () => {
  let fetchSpy
  let Ethfinex
  const baseToken = 'ZRX'
  const quoteToken = 'ETH'
  const globalAny: any = global

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

  const rawCandles = [
    [
      1533081600000,
      0.0016661,
      0.0025585,
      0.0026716,
      0.0016296,
      1842676.23491335
    ],
    [1530403200000, 0.0022332, 0.0016628, 0.0022478, 0.0013885, 772607.43012305]
  ]

  const formattedTickers = [
    {
      symbol: 'ZRX',
      priceEth: '0.0023502',
      priceUsd: ''
    },
    {
      priceEth: NETWORKS.MAINNET,
      priceUsd: '',
      symbol: 'WETH'
    },
    {
      priceEth: NETWORKS.MAINNET,
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
    globalAny.fetch = fetchSpy
    Ethfinex = require('./ethfinex').default
  })
  describe('network()', () => {
    it('sets the network Id and returns a new instance with the network set', () => {
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      expect(ethfinex.networkId).toEqual(NETWORKS.MAINNET)
      expect(ethfinex.network(NETWORKS.KOVAN).networkId).toEqual(NETWORKS.KOVAN)
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
        const ethfinex = new Ethfinex(NETWORKS.MAINNET)
        const tickers = await ethfinex.raw.getTickers({
          tokenPairs: ['tZRXETH']
        })
        expect(tickers).toEqual(rawTickers)
      })

      it('returns an empty array if the tokenPair is invalid', async () => {
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => []
          })
        )
        const ethfinex = new Ethfinex(NETWORKS.MAINNET)
        const tickers = await ethfinex.raw.getTickers({
          tokenPairs: ['tZRXWETH']
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
        const ethfinex = new Ethfinex(NETWORKS.MAINNET)
        const orders = await ethfinex.raw.getOrders(baseToken, quoteToken)
        expect(orders).toEqual(rawOrders)
      })

      it('returns the error response from the Exchange if the parameters are invalid', async () => {
        const responseError = ['error', 10020, 'symbol: invalid']
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => responseError
          })
        )
        const ethfinex = new Ethfinex(NETWORKS.MAINNET)
        const orders = await ethfinex.raw.getOrders(baseToken, 'WETH')
        expect(orders).toEqual(responseError)
      })
    })

    describe('getCandles', () => {
      it('returns the raw candles data from the exchange', async () => {
        fetchSpy.mockReturnValueOnce(
          Promise.resolve({
            json: () => rawCandles
          })
        )
        const ethfinex = new Ethfinex('1')
        const candles = await ethfinex.raw.getCandles(
          Ethfinex.CandlesTimeFrame.ONE_MONTH,
          'tZRXETH',
          Ethfinex.CandlesSection.HIST,
          '2'
        )
        expect(candles).toEqual(rawCandles)
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
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      const tickers = await ethfinex.getTickers({ tokenPairs: ['tZRXETH'] })
      expect(tickers).toEqual(formattedTickers)
    })

    it('returns an error if the parameters are incorrect', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => []
        })
      )
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      await expect(
        ethfinex.getTickers({ tokenPairs: ['tZRXWETH'] })
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
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      const orders = await ethfinex.getOrders(baseToken, quoteToken)
      expect(orders).toEqual(formattedOrders)
    })

    it('returns an error if the parameters are incorrect', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => ['error', 10020, 'symbol: invalid']
        })
      )
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      await expect(ethfinex.getOrders(baseToken, 'WETH')).rejects.toThrowError(
        'symbol: invalid'
      )
    })

    it('returns an error if the "precision" parameter is incorrect', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          json: () => ['error', 10020, 'prec: invalid']
        })
      )
      const ethfinex = new Ethfinex(NETWORKS.MAINNET)
      await expect(
        ethfinex.getOrders(baseToken, 'WETH', 'P9' as any)
      ).rejects.toThrowError('prec: invalid')
    })
  })
})
