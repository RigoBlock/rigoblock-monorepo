import { ActionsObservable } from 'redux-observable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { TestScheduler } from 'rxjs'
import ROUTES from '../../constants/routes'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'
import routerActions from '../../actions/router-actions'
import routingEpic from './routing'

describe('routing epics', () => {
  const [logoutEpic, loginEpic] = routingEpic
  const testError = new Error('test error')
  const initValue = () => ({ type: LOCATION_CHANGE })
  const mockStore = {
    getState: () => ({
      blockChain: {
        account: ''
      }
    })
  }

  beforeEach(() => {
    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: ROUTES.DASHBOARD
    })
  })

  describe('login Epic', () => {
    it('redirects the user from login to dashboard page upon metamask login', () => {
      window.location.pathname = ROUTES.LOGIN
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
      const outputAction = loginEpic(action$, null)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it("returns an empty observable if the user isn't on login page and changes account", () => {
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
      const outputAction = loginEpic(action$, null)

      ts.expectObservable(outputAction).toBe(expectedMarble, null)
      ts.flush()
    })
  })
  describe('logout Epic', () => {
    it('redirects the user to login page in case of blockchain error action', () => {
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
      const outputAction = logoutEpic(action$, null)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it('redirects the user to login page in case of blockchain logout action', () => {
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
      const outputAction = logoutEpic(action$, null)

      ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
      ts.flush()
    })
    it('redirects the user to login page if user is not logged and location change action is fired', () => {
      const inputValues = {
        a: initValue()
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
    it('redirects the user to login page if user is not logged and global init action is fired', () => {
      const inputValues = {
        a: globalActions.init()
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
