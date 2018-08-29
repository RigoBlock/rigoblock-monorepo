import 'jest'
import 'whatwg-fetch'
import * as nock from 'nock'
import ZeroExRelayerRaw from './zeroExStandardRelayerRaw'
import nockBackPromise from '../nockBackPromise'

describe('it allows us to perform API calls to exchanges following 0x Standard Relayer API', () => {
  let exchange
  beforeAll(() => {
    nock.disableNetConnect()
    exchange = new ZeroExRelayerRaw('https://api.ercdex.com/api/standard/1')
  })

  afterAll(() => {
    nock.enableNetConnect()
  })
  describe('getTokenPairs', () => {
    it('Retrieves a list of available token pairs and the information required to trade them.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayerGetTokenPairs.json',
        () => exchange.getTokenPairs()
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getOrders', () => {
    it('Retrieves a list of orders given query parameters.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayerGetOrders.json',
        () => exchange.getOrders()
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getOrder', () => {
    it('retrieves a specific order by orderHash.', async () => {
      const orderHash =
        '0x7109947a8f4c595f2604445cc4cfc0927fcef5b84b9b33a34528ada629dbd846'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayerGetOrder.json',
        () => exchange.getOrder(orderHash)
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getOrderbook', () => {
    const baseTokenAddress = '0xe41d2489571d322189246dafa5ebde1f4699f498'
    const quoteTokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    it('retrieves the orderbook for a given token pair.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayerGetOrderbook.json',
        () => exchange.getOrderbook(baseTokenAddress, quoteTokenAddress)
      )
      expect(result).toMatchSnapshot()
    })
  })
})
