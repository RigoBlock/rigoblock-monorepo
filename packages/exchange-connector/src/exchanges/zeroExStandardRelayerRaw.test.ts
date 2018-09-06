import 'whatwg-fetch'
import * as nock from 'nock'
import { NETWORKS } from '../constants'
import ZeroExRelayerRaw from './zeroExStandardRelayerRaw'
import nockBackPromise from '../nockBackPromise'

describe('it allows us to perform API calls to exchanges following 0x Standard Relayer API', () => {
  let exchange
  beforeAll(() => {
    nock.disableNetConnect()
    exchange = new ZeroExRelayerRaw(
      NETWORKS.MAINNET,
      'https://api.ercdex.com/api/standard/1'
    )
  })

  afterAll(() => {
    nock.enableNetConnect()
  })
  describe('getTokenPairs', () => {
    it('Retrieves a list of available token pairs and the information required to trade them.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetTokenPairs.json',
        () => exchange.getTokenPairs()
      )
      expect(result).toMatchSnapshot()
    })
    it('Accepts one token as a filter', async () => {
      const tokenA = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetTokenPairsWithTokenA.json',
        () => exchange.getTokenPairs({ tokenA })
      )
      expect(result).toMatchSnapshot()
    })
    it('Accepts two tokens as a filter', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetTokenPairsWithBothTokens.json',
        () =>
          exchange.getTokenPairs({
            tokenA: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            tokenB: '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
          })
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getOrders', () => {
    it('Works without parameters', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrders.json',
        () => exchange.getOrders()
      )
      expect(result).toMatchSnapshot()
    })
    it('Retrieves a list of orders given query parameters.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrdersWithParameters.json',
        () =>
          exchange.getOrders({
            maker: '0x2f0d03fb9a8a6cc4b04128c29b9861adbb818015',
            makerTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            takerTokenAddres: '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
          })
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getOrder', () => {
    it('retrieves a specific order by orderHash.', async () => {
      const orderHash =
        '0x7109947a8f4c595f2604445cc4cfc0927fcef5b84b9b33a34528ada629dbd846'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrder.json',
        () => exchange.getOrder({ orderHash })
      )
      expect(result).toMatchSnapshot()
    })
    it("throws an error if parameters aren't specified", async () => {
      expect(exchange.getOrder()).rejects.toThrowErrorMatchingSnapshot()
    })
  })
  describe('getOrderbook', () => {
    it('retrieves the orderbook for a given token pair.', async () => {
      const baseTokenAddress = '0xe41d2489571d322189246dafa5ebde1f4699f498'
      const quoteTokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrderbook.json',
        () => exchange.getOrderbook({ baseTokenAddress, quoteTokenAddress })
      )
      expect(result).toMatchSnapshot()
    })
    it('Returns an error response if correct parameters are not specified', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrderbookError.json',
        () => exchange.getOrderbook()
      )
      expect(result).toMatchSnapshot()
    })
  })
})
