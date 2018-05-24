import { ActionsObservable } from 'redux-observable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { TestScheduler } from 'rxjs'
import ROUTES from '../../constants/routes'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'
import routingEpic from './routing'

describe('routing epics', () => {
  const [logoutEpic, loginEpic] = routingEpic
  const testError = new Error('test error')
  const locationChangeAction = () => ({ type: LOCATION_CHANGE })
  const loggedOutState = {
    user: {
      wallets: {
        Metamask: { account: '' }
      }
    },
    routing: { location: ROUTES.DASHBOARD }
  }
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }

  describe('login Epic', () => {
    it('redirects the user from login to dashboard page upon metamask login', () => {
      getStateMock.mockReturnValue({
        user: {
          wallets: {
            Metamask: { account: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196' }
          }
        },
        routing: { location: { pathname: ROUTES.LOGIN } }
      })
      const inputValues = {
        a: blockChainActions.blockChainLogIn(
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        )
      }
      const expectedValues = {
        b: routerActions.login()
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = loginEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it("returns an empty observable if the user isn't on login page and changes account", () => {
      getStateMock.mockReturnValue({
        user: {
          wallets: {
            Metamask: { account: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196' }
          }
        },
        routing: { location: { pathname: ROUTES.DASHBOARD } }
      })
      const inputValues = {
        a: blockChainActions.blockChainLogIn(
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        )
      }

      const inputMarble = 'a'
      const expectedMarble = ''

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = loginEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, null)
      ts.flush()
    })
  })
  describe('logout Epic', () => {
    it('calls a redux router push action to login page in case of a blockchain error action', () => {
      getStateMock.mockReturnValue(loggedOutState)
      const inputValues = {
        a: blockChainActions.blockChainError(testError)
      }
      const expectedValues = {
        b: routerActions.logout()
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = logoutEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it('calls a redux router push action to login page in case of blockchain logout action', () => {
      getStateMock.mockReturnValue(loggedOutState)
      const inputValues = {
        a: blockChainActions.blockChainLogout()
      }
      const expectedValues = {
        b: routerActions.logout()
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = logoutEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it('redirects the user to login page if user is not logged and location change action is fired', () => {
      getStateMock.mockReturnValue(loggedOutState)
      const inputValues = {
        a: locationChangeAction()
      }
      const expectedValues = {
        b: routerActions.logout()
      }

      const inputMarble = 'a'
      const expectedMarble = 'b'

      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })

      const action$ = new ActionsObservable(
        ts.createHotObservable(inputMarble, inputValues)
      )
      const outputAction = logoutEpic(action$, mockStore)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
  })
})
