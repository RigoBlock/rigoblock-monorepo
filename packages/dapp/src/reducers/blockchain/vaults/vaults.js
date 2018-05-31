import { actionTypes } from '../../../constants/action-types'
import updeep from 'updeep'

const initialState = {}

function vaultReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_VAULT:
      return updeep(state, action.payload.vault)
    default:
      return state
  }
}

export default vaultReducer
