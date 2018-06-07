import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import ROUTES from '../../../constants/routes'
import blockChainActions from '../../../actions/blockChain-actions'
import loginEpic from '.'
import routerActions from '../../../actions/router-actions'

describe('login Epic', () => {
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }

  it('redirects the user from login to dashboard page upon metamask login', () => {
    getStateMock.mockReturnValue({
      user: {
        preferences: {
          currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
          provider: 'metamask'
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
        preferences: {
          currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
          provider: 'metamask'
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
