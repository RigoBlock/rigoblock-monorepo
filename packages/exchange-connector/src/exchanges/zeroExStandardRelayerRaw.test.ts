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
        () => exchange.http.getTokenPairs()
      )
      expect(result).toMatchSnapshot()
    })
    it('Accepts one token as a filter', async () => {
      const tokenA = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetTokenPairsWithTokenA.json',
        () => exchange.http.getTokenPairs({ tokenA })
      )
      expect(result).toMatchSnapshot()
    })
    it('Accepts two tokens as a filter', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetTokenPairsWithBothTokens.json',
        () =>
          exchange.http.getTokenPairs({
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
        () => exchange.http.getOrders()
      )
      expect(result).toMatchSnapshot()
    })
    it('Retrieves a list of orders given query parameters.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrdersWithParameters.json',
        () =>
          exchange.http.getOrders({
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
        () => exchange.http.getOrder({ orderHash })
      )
      expect(result).toMatchSnapshot()
    })
    it("throws an error if parameters aren't specified", async () => {
      expect(exchange.http.getOrder()).rejects.toThrowErrorMatchingSnapshot()
    })
  })
  describe('getOrderbook', () => {
    it('retrieves the orderbook for a given token pair.', async () => {
      const baseTokenAddress = '0xe41d2489571d322189246dafa5ebde1f4699f498'
      const quoteTokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrderbook.json',
        () =>
          exchange.http.getOrderbook({ baseTokenAddress, quoteTokenAddress })
      )
      expect(result).toMatchSnapshot()
    })
    it('Returns an error response if correct parameters are not specified', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetOrderbookError.json',
        () => exchange.http.getOrderbook()
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('getFees', () => {
    const options = {
      exchangeContractAddress: '0x12459c951127e0c374ff9105dda097662a027093',
      maker: '0x9e56625509c2f60af937f23b7b532600390e8c8b',
      taker: '0xa2b31dacf30a9c50ca473337c01d8a201ae33e32',
      makerTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
      takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
      feeRecipient: '0xb046140686d052fff581f63f8136cce132e857da',
      makerTokenAmount: '10000000000000000',
      takerTokenAmount: '20000000000000000',
      makerFee: '100000000000000',
      takerFee: '200000000000000',
      expirationUnixTimestampSec: '42',
      salt:
        '67006738228878699843088602623665307406148487219438534730168799356281242528500',
      ecSignature: {
        v: 27,
        r: '0x61a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33',
        s: '0x40349190569279751135161d22529dc25add4f6069af05be04cacbda2ace2254'
      }
    }
    it('retrieves the orderbook for a given token pair.', async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/GetFees.json',
        () => exchange.http.getFees(options)
      )
      expect(result).toMatchSnapshot()
    })
    it("returns an error response if we don't pass the parameters", async () => {
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/getFeesError.json',
        () => exchange.http.getFees()
      )
      expect(result).toMatchSnapshot()
    })
  })
  describe('createOrder', () => {
    it('creates an order on the exchange', async () => {
      const signature = {
        v: 28,
        r: '0xad41a20b4d7c1707c4a2005d7305999937908c2b1578b2746fbaf16e6b55186e',
        s: '0x40a35ca85b3021147b956ca1595bf51c20c4801f78d3e827a04724478959cb47'
      }
      const signerAddress = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
      const kovanExchange = new ZeroExRelayerRaw(
        NETWORKS.KOVAN,
        'https://api.ercdex.com/api/standard/42'
      )
      const order = {
        maker: signerAddress,
        taker: '0x0000000000000000000000000000000000000000',
        makerFee: '0',
        takerFee: '0',
        makerTokenAmount: '10000000000000000',
        takerTokenAmount: '20000000000000000',
        makerTokenAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
        takerTokenAddress: '0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570',
        salt:
          '35017268446572149185915261526600509134060290251624415234342848175136386955900',
        exchangeContractAddress: '0x12459c951127e0c374ff9105dda097662a027093',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        expirationUnixTimestampSec: '42',
        ecSignature: signature
      }
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/Create.json',
        () => kovanExchange.http.createOrder(order)
      )
      expect(result).toMatchSnapshot()
    })
    it("returns an error response if we don't pass the parameters", async () => {
      let kovanExchange
      kovanExchange = new ZeroExRelayerRaw(
        NETWORKS.KOVAN,
        'https://api.ercdex.com/api/standard/42'
      )
      const result: any = await nockBackPromise(
        'zeroExStandardRelayer/CreateError.json',
        () => kovanExchange.http.createOrder()
      )
      expect(result).toMatchSnapshot()
    })
  })
})
