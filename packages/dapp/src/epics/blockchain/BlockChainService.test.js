import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import BlockChainServiceEpic from '../blockchain/BlockChainService'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'

describe('epic for blockchain services', () => {
  const promiseModule = require('rxjs/observable/fromPromise')

  const testError = new Error('test error')
  const fromPromiseMock = jest.fn(promise => of(promise))
  promiseModule.fromPromise = fromPromiseMock
  const apiMock = {
    init: () => Promise.resolve(),
    engine: {
      on: (x, cb) => cb()
    },
    web3: {
      eth: {
        getAccounts: () => {}
      }
    }
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('returns a blockchain init action', () => {
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
      const mockApi = {
        ...apiMock,
        web3: {
          eth: {
            getAccounts: jest.fn(callback => callback(null, []))
          }
        }
      }

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogout(),
        c: routerActions.logOut()
      }

      const expectedMarble = '(abc)'
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

      jest.runTimersToTime(2000)

      expect(
        blockChainServiceEpic.api.web3.eth.getAccounts
      ).toHaveBeenCalledTimes(3)
    })

    it('sends blockChainError action if web3 getAccounts fails', () => {
      const mockApi = {
        ...apiMock,
        web3: {
          eth: {
            getAccounts: callback => callback(testError, [])
          }
        }
      }

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainError(testError),
        c: routerActions.logOut()
      }

      const expectedMarble = '(abc)'

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

    it('sends blockChainLogin action if web3 retrieves accounts list', () => {
      const mockApi = {
        ...apiMock,
        web3: {
          eth: {
            getAccounts: callback =>
              callback(null, ['0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'])
          }
        }
      }

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogIn(
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        ),
        c: routerActions.logIn()
      }

      const expectedMarble = '(abc)'

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

    it("sends blockChainLogout action if web3 doesn't retrieve accounts list", () => {
      const mockApi = {
        ...apiMock,
        web3: {
          eth: {
            getAccounts: callback => callback(null, [])
          }
        }
      }

      const expectedValues = {
        a: blockChainActions.blockChainInit(),
        b: blockChainActions.blockChainLogout(),
        c: routerActions.logOut()
      }

      const expectedMarble = '(abc)'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const blockChainServiceEpic = new BlockChainServiceEpic(
        mockApi,
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
      const mockApi = {
        ...apiMock,
        engine: {
          on: (_, cb) => cb(testError)
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
})
