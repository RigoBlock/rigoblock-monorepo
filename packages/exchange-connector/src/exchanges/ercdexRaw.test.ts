import 'whatwg-fetch'
import * as nock from 'nock'
import { ERCdEXRaw } from './ercdexRaw'
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
