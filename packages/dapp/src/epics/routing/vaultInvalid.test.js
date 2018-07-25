import * as ROUTES from '../../constants/routes'
import { ActionsObservable } from 'redux-observable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import routerActions from '../../actions/router-actions'

describe('vaultInvalid Epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultId = 0
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }

  const apiMock = {
    web3: {
      getAvailableAddressesAsync: () => {}
    }
  }
  let fromPromiseSpy
  let vaultInvalidEpic

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    vaultInvalidEpic = require('./vaultInvalid').default
  })

  it("redirects to /vaults page if we try to access an invalid vault's url", () => {
    getStateMock.mockReturnValue({
      blockChain: {
        accounts: {
          [owner]: {
            vaults: {
              '0x123': {
                id: vaultId
              }
            }
          }
        }
      }
    })
    fromPromiseSpy.mockReturnValueOnce(of([owner]))
    const inputValues = {
      a: {
        type: LOCATION_CHANGE,
        payload: {
          pathname: `${ROUTES.VAULTS}/20`
        },
        meta: {
          currentAccount: owner
        }
      }
    }
    const expectedValues = {
      b: routerActions.navigateToVaults()
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = vaultInvalidEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('returns nothing if the vault exists', () => {
    getStateMock.mockReturnValue({
      blockChain: {
        accounts: {
          [owner]: {
            vaults: {
              '0x123': {
                id: vaultId
              }
            }
          }
        }
      }
    })
    fromPromiseSpy.mockReturnValueOnce(of([owner]))
    const inputValues = {
      a: {
        type: LOCATION_CHANGE,
        payload: {
          pathname: `${ROUTES.VAULTS}/${vaultId}`
        },
        meta: {
          currentAccount: owner
        }
      }
    }
    const expectedValues = {}

    const inputMarble = 'a'
    const expectedMarble = ''

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = vaultInvalidEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
