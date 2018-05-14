import { TestScheduler } from 'rxjs'
import { _throw } from 'rxjs/observable/throw'
import { of } from 'rxjs/observable/of'
import actions from '../../actions/blockchain-actions'

describe('epic for blockchain services', () => {
  const testError = new Error('test error')
  let BlockChainServiceEpic
  let fromPromiseSpy
  let apiMock

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
        getAvailableAddressesAsync: jest.fn(() => Promise.resolve([]))
      }
    }

    BlockChainServiceEpic = require('../blockchain/BlockChainService').default
  })

  it('returns a blockchain init action', () => {
    fromPromiseSpy.mockReturnValueOnce(of([]))

    const expectedValues = {
      b: actions.blockChainInit()
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
        .mockReturnValueOnce(of([address1]))
        .mockReturnValueOnce(of([address2]))
        .mockReturnValueOnce(of([address1]))

      const expectedValues = {
        a: actions.blockChainInit(),
        b: actions.blockChainLogIn(address1),
        c: actions.blockChainLogIn(address2)
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
      fromPromiseSpy.mockReturnValueOnce(_throw(testError))

      const expectedValues = {
        a: actions.blockChainInit(),
        b: actions.blockChainError(testError)
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
      fromPromiseSpy.mockReturnValueOnce(of([address]))

      const expectedValues = {
        a: actions.blockChainInit(),
        b: actions.blockChainLogIn(address)
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
      fromPromiseSpy.mockReturnValueOnce(of([]))

      const expectedValues = {
        a: actions.blockChainInit(),
        b: actions.blockChainLogout()
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
      fromPromiseSpy.mockReturnValueOnce(of([]))

      const mockApi = {
        ...apiMock,
        engine: {
          on: (_, cb) => cb(testError),
          removeListener: () => {}
        }
      }

      const expectedValues = {
        a: actions.blockChainInit(),
        b: actions.blockChainError(testError)
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
})
