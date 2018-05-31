import { actionTypes } from '../../constants/action-types'
import updeep from 'updeep'
import vaultsReducer from './vaults'

const initialState = {
  accounts: {}
}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return state.accounts[action.payload.account]
        ? state
        : updeep(state, {
            accounts: { [action.payload.account]: {} }
          })
    case actionTypes.ADD_VAULT:
      return updeep(state, {
        accounts: {
          [action.payload.account]: { vaults: vaultsReducer(undefined, action) }
        }
      })
    default:
      return state
  }
}

export default blockChainReducer
