import { TestScheduler } from 'rxjs'
import { _throw } from 'rxjs/observable/throw'
import { blockLabels } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockChain-actions'

describe('epic for blockchain services', () => {
  const testError = new Error('test error')
  let BlockChainServiceEpic
  let fromPromiseSpy
  let apiMock

  const blocks = [
    {
      address: '0x001',
      args: {
        vault: '0x123',
        from: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        to: '0x005',
        amount: '1',
        revenue: '1'
      },
      event: 'BuyVault'
    },
    {
      address: '0x001',
      args: {
        vault: '0x123',
        from: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9192',
        to: '0x005',
        amount: '1',
        revenue: '1'
      },
      event: 'SellVault'
    }
  ]

  beforeEach(() => {
    fromPromiseSpy = jest
      .fn()
      .mockReturnValueOnce(of(['just something to trigger api.init()']))

    jest.resetModules()
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    apiMock = {
      init: () => Promise.resolve(),
      engine: {
        on: (x, cb) => cb(),
        removeListener: () => {}
      },
      web3: {
        getAvailableAddressesAsync: jest.fn(() => Promise.resolve([])),
        getNodeVersionAsync: jest.fn(() => Promise.resolve(''))
      },
      contract: {
        VaultEventful: {
          rawWeb3Contract: {
            allEvents: () => ({
              get: cb => cb(null, blocks),
              stopWatching: jest.fn()
            })
          }
        }
      }
    }

    BlockChainServiceEpic = require('./BlockChainService').default
  })

  it('returns a blockchain init action', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of('MetaMask/v4.6.1'))
      .mockReturnValueOnce(of([]))

    const expectedValues = {
      b: blockChainActions.blockChainInit()
    }

    const expectedMarble = 'b'
    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const blockChainServiceEpic = new BlockChainServiceEpic(
      apiMock,
      null,
      null,
      ts
    )
    const outputAction = blockChainServiceEpic.init()

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.flush()
  })
  describe('connection listener', () => {
    it('gets called every 1000 milliseconds', () => {
      const address1 = 'address1'
      const address2 = 'address2'

      fromPromiseSpy
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(of([address1]))
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(of([address2]))
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(of([address1]))

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogIn('metamask', address1),
        c: blockChainActions.blockChainLogIn('metamask', address2)
      }

      const expectedMarble =
        '(ab)' +
        '------------------------------------------------------------------------------------------------c' +
        '---------------------------------------------------------------------------------------------------b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        apiMock,
        null,
        null,
        ts
      )
      const outputAction = blockChainServiceEpic.init()

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

      ts.maxFrames = 2000

      ts.flush()
    })

    it('sends blockChainError action if web3 getAvailableAddressesAsync fails', () => {
      fromPromiseSpy
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(_throw(testError))

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainError(testError)
      }

      const expectedMarble = '(ab|)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        apiMock,
        null,
        null,
        ts
      )
      const outputAction = blockChainServiceEpic.init()

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

      ts.flush()
    })

    it('sends blockChainLogin action if web3 retrieves accounts list', () => {
      const address = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      fromPromiseSpy
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(of([address]))

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogIn('metamask', address)
      }

      const expectedMarble = '(ab)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        apiMock,
        null,
        null,
        ts
      )
      const outputAction = blockChainServiceEpic.init()

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

      ts.flush()
    })

    it("sends blockChainLogout action if web3 doesn't retrieve accounts list", () => {
      fromPromiseSpy
        .mockReturnValueOnce(of('MetaMask/v4.6.1'))
        .mockReturnValueOnce(of([]))

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogout()
      }

      const expectedMarble = '(ab)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        apiMock,
        null,
        null,
        ts
      )

      blockChainServiceEpic.account =
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'

      const outputAction = blockChainServiceEpic.init()

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

      ts.flush()
    })
  })
  describe('error listener', () => {
    it('listens for connectivity issues', () => {
      fromPromiseSpy.mockReturnValueOnce(of(''))
      fromPromiseSpy.mockReturnValueOnce(of([]))

      const mockApi = {
        ...apiMock,
        engine: {
          on: (_, cb) => cb(testError),
          removeListener: () => {}
        }
      }

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainError(testError)
      }

      const expectedMarble = '(ab)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        mockApi,
        null,
        null,
        ts
      )
      const outputAction = blockChainServiceEpic.init()
      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
  })
  describe('fetch vault events', () => {
    it('fetches blocks and filters them by account', () => {
      const expectedValues = {
        a: blockChainActions.registerBlock(blockLabels.VAULT, blocks[0]),
        b: blockChainActions.vaultFetchCompleted()
      }

      const expectedMarble = '(ab|)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        apiMock,
        null,
        null,
        ts
      )

      blockChainServiceEpic.account =
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      const outputAction = blockChainServiceEpic.fetchVaultEvents()

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
  })
})
