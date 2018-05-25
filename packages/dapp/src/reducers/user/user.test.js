import CONSTANTS from '../../constants/user'
import blockChainActions from '../../actions/blockchain-actions'
import userActions from '../../actions/user-actions'
import userReducer from './user'

const initialState = {
  timezone: '+02:00',
  type: CONSTANTS.INVESTOR,
  wallets: {}
}

describe('user reducer', () => {
  const userTest = reducerTester(userReducer)

  it('returns the initial state', () => {
    userTest(
      initialState,
      {},
      {
        timezone: '+02:00',
        type: CONSTANTS.INVESTOR,
        wallets: {}
      }
    )
  })

  it("updates user's timezone", () => {
    userTest(
      undefined,
      userActions.changePreferences({
        timezone: '+05:45'
      }),
      {
        timezone: '+05:45',
        type: CONSTANTS.INVESTOR,
        wallets: {}
      }
    )
  })
  it('saves the default account number to the state', () => {
    const exampleAccount = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    userTest(
      undefined,
      blockChainActions.blockChainLogIn('metamask', exampleAccount),
      {
        timezone: '+02:00',
        type: CONSTANTS.INVESTOR,
        wallets: {
          metamask: exampleAccount
        }
      }
    )
  })

  it('clears account number on logout', () => {
    userTest(undefined, blockChainActions.blockChainLogout(), {
      timezone: '+02:00',
      type: CONSTANTS.INVESTOR,
      wallets: {}
    })
  })
})
