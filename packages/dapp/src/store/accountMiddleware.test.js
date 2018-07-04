import { PERSIST } from 'redux-persist'
import { actionTypes } from 'redux-form'
import accountMiddleware from './accountMiddleware'
import vaultActions from '../actions/vault-actions'

describe('account middleware', () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => ({
        preferences: {
          currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
        }
      })),
      dispatch: jest.fn()
    }
    const next = jest.fn()
    const invoke = action => accountMiddleware(store)(next)(action)
    return { store, next, invoke }
  }
  it('takes an action and adds the current account to the action meta object', () => {
    const { next, invoke } = create()
    const action = vaultActions.updateVaultData({
      address: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      supply: 14000000
    })
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
    expect(action.meta.currentAccount).toEqual(
      '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
    )
  })
  it("doesn't add meta to redux form and redux persist actions", () => {
    const { invoke } = create()
    const persistAction = { type: PERSIST }
    // redux form actions have custom meta in them
    const reduxFormAction = {
      type: actionTypes.REGISTER_FIELD,
      payload: {},
      meta: {}
    }
    invoke(persistAction)
    expect(persistAction.meta).toEqual(undefined)
    invoke(reduxFormAction)
    expect(reduxFormAction.meta.currentAccount).toEqual(undefined)
  })
})
