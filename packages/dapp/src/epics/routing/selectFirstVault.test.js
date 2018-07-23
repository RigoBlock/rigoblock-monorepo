import * as ROUTES from '../../constants/routes'
import { ActionsObservable } from 'redux-observable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import routerActions from '../../actions/router-actions'
import vaultActions from '../../actions/vault-actions'

describe('selectFirstVault Epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultId = 0
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }
  const getAvailableAddressesSpy = jest.fn()

  const apiMock = {
    web3: {
      getAvailableAddressesAsync: getAvailableAddressesSpy
    }
  }
  let fromPromiseSpy
  let selectFirstVaultEpic

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    selectFirstVaultEpic = require('./selectFirstVault').default
  })

  it('redirects to first vault overview if we navigate to /vaults and vaults are present in state', () => {
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
          pathname: ROUTES.VAULTS
        },
        meta: {
          currentAccount: owner
        }
      }
    }
    const expectedValues = {
      b: routerActions.navigateToVault(vaultId)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = selectFirstVaultEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it(`redirects to the first vault's overview url if the route is ${
    ROUTES.VAULTS
  } and vaults are present in the state`, () => {
    getStateMock
      .mockReturnValueOnce({
        routing: { location: { pathname: ROUTES.VAULTS } }
      })
      .mockReturnValue({
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
      a: accountMiddlewareMock(vaultActions.registerVault(), owner)
    }
    const expectedValues = {
      b: routerActions.navigateToVault(vaultId)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = selectFirstVaultEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
