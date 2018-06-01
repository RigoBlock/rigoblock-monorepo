import { actionTypes } from '../../../constants/action-types'
import u from 'updeep'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
function vaultReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_VAULT:
      const ret = u(state, {
        accounts: {
          [action.payload.account]: { vaults: action.payload.vault }
        }
      })
      return ret
    default:
      return state
  }
}

export default vaultReducer
