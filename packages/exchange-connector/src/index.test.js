import { ERCdEX, Ethfinex } from './constants'

describe('Exchange Connector', () => {
  const baseToken = {
    symbol: 'ZRX',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498'
  }
  const quoteToken = {
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  }
  const ercdexAggOrders = {
    sells: {
      priceLevels: [
        {
          price: '1',
          volume: '1000000000000000000',
          volumeRatio: 0.000010031496045699
        },
        {
          price: '0.5',
          volume: '2000000000000000000',
          volumeRatio: 0.00002006299209139801
        },
        {
          price: '0.4',
          volume: '3000000000000000000',
          volumeRatio: 0.00003009448813709701
        },
        {
          price: '0.28509999999999999981',
          volume: '2990000000000000023',
          volumeRatio: 0.00002999417317664002
        }
      ]
    },
    buys: {
      priceLevels: [
        {
          price: '0.00251262',
          volume: '552850807126482718039',
          volumeRatio: 0.005545920685550814
        },
        {
          price: '0.00246015',
          volume: '447819076252319170376',
          volumeRatio: 0.004492295292613721
        },
        {
          price: '0.0024470003455160324',
          volume: '400000000000000000000',
          volumeRatio: 0.004012598418279602
        },
        {
          price: '0.0023980603386057116',
          volume: '400000000000000000000',
          volumeRatio: 0.004012598418279602
        }
      ]
    }
  }

  const ethfinexOrderBook = [
    [1.068, 1, 50.56058955],
    [1.0679, 1, 114.78327376],
    [1.0676, 1, 982],
    [1.0644, 1, 940],
    [1.077, 1, -3358.22375461],
    [1.0771, 1, -952],
    [1.0777, 1, -134.789],
    [1.0778, 1, -1000]
  ]

  let requestPromiseSpy
  let Exchange
  beforeEach(() => {
    jest.resetModules()
    requestPromiseSpy = jest.fn()
    jest.doMock('request-promise', () => requestPromiseSpy)
    Exchange = require('./index').default
  })

  describe('get tickers from exchange', () => {
    let networks = new Array()
    networks[1] = 'Mainnet'
    networks[42] = 'Kovan'
    networks.map((network, key) => {
      it(`ERCdEX get tickers for ${network} success`, () => {
        const networkId = key
        const exchange = new Exchange('ERCdEX', networkId.toString())
        exchange.getTickers().then(results => {
          expect(results).toBeArray()
        })
      })
      it(`Ethfinex get tickers for ${network} success`, () => {
        const networkId = key
        const exchange = new Exchange('Ethfinex', networkId.toString())
        exchange.getTickers().then(results => {
          expect(results).toBeArray()
        })
      })
    })
  })

  describe('get aggregated orders', () => {
    it(`gets aggregated orders from ${ERCdEX} and formats them`, async () => {
      requestPromiseSpy.mockReturnValueOnce(Promise.resolve(ercdexAggOrders))
      const exchange = new Exchange(ERCdEX)
      const orders = await exchange.getAggregatedOrders(baseToken, quoteToken)
      console.log('Ercdex', orders)
      console.log('Ercdex', orders)
      console.log('Ercdex', orders)
    })
    it(`gets aggregated orders from ${Ethfinex} and formats them`, async () => {
      const ethfinexQuoteToken = {
        symbol: 'ETH'
      }
      requestPromiseSpy.mockReturnValueOnce(Promise.resolve(ethfinexOrderBook))
      const exchange = new Exchange(Ethfinex)
      const orders = await exchange.getAggregatedOrders(
        baseToken,
        ethfinexQuoteToken
      )
      console.log('Ethfinex', orders)
      console.log('Ethfinex', orders)
      console.log('Ethfinex', orders)
    })
  })
})
