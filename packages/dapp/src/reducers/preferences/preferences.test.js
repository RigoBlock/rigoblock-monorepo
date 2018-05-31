import CONSTANTS from '../../constants/user'
import blockChainActions from '../../actions/blockchain-actions'
import preferencesReducer from './preferences'
import userActions from '../../actions/user-actions'

const initialState = {
  timezone: 'GMT +02:00',
  type: CONSTANTS.INVESTOR,
  currentAccount: {}
}

describe('user reducer', () => {
  const preferencesTest = reducerTester(preferencesReducer)

  it('returns the initial state', () => {
    preferencesTest(
      initialState,
      {},
      {
        timezone: 'GMT +02:00',
        type: CONSTANTS.INVESTOR,
        currentAccount: initialState.currentAccount
      }
    )
  })

  it("updates user's timezone", () => {
    preferencesTest(
      undefined,
      userActions.changePreferences({
        timezone: 'GMT +05:45'
      }),
      {
        timezone: 'GMT +05:45',
        type: CONSTANTS.INVESTOR,
        currentAccount: null
      }
    )
  })
  it('saves the default account number to the state', () => {
    const exampleAccount = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    preferencesTest(
      undefined,
      blockChainActions.blockChainLogIn('metamask', exampleAccount),
      {
        timezone: 'GMT +02:00',
        type: CONSTANTS.INVESTOR,
        currentAccount: {
          metamask: exampleAccount
        }
      }
    )
  })

  it('clears account number on logout', () => {
    preferencesTest(undefined, blockChainActions.blockChainLogout(), {
      timezone: 'GMT +02:00',
      type: CONSTANTS.INVESTOR,
      currentAccount: null
    })
  })
})
