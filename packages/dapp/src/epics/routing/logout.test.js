import * as ROUTES from '../../constants/routes'
import { ActionsObservable } from 'redux-observable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { TestScheduler } from 'rxjs'
import blockChainActions from '../../actions/blockchain-actions'
import logoutEpic from './logout'
import routerActions from '../../actions/router-actions'

describe('logout Epic', () => {
  const testError = new Error('test error')
  const locationChangeAction = () => ({ type: LOCATION_CHANGE })
  const loggedOutState = {
    preferences: {
      currentAccount: null,
      provider: null
    },
    routing: { location: ROUTES.LOGIN }
  }
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }
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
