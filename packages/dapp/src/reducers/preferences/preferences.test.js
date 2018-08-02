import { MANAGER } from '../../constants/user'
import blockChainActions from '../../actions/blockchain-actions'
import preferencesReducer from './preferences'
import userActions from '../../actions/user-actions'

const initialState = {
  timezone: 'GMT +02:00',
  type: MANAGER,
  currentAccount: null,
  provider: null
}
const account = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
const provider = 'metamask'

describe('preferences reducer', () => {
  const preferencesTest = reducerTester(preferencesReducer)

  it('returns the initial state', () => {
    preferencesTest(initialState, {}, initialState)
  })

  it("updates user's timezone", () => {
    preferencesTest(
      initialState,
      userActions.changePreferences({
        timezone: 'GMT +05:45'
      }),
      {
        timezone: 'GMT +05:45',
        type: MANAGER,
        currentAccount: null,
        provider: null
      }
    )
  })
  it('saves the default account number to the state', () => {
    preferencesTest(
      initialState,
      blockChainActions.blockChainLogIn({ provider, account }),
      {
        timezone: 'GMT +02:00',
        type: MANAGER,
        currentAccount: account,
        provider
      }
    )
  })

  it('clears account number on logout', () => {
    preferencesTest(
      {
        timezone: 'GMT +02:00',
        type: MANAGER,
        currentAccount: account,
        provider
      },
      blockChainActions.blockChainLogout(),
      initialState
    )
  })
})
