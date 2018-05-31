import { actionTypes } from '../../constants/action-types'

const initialState = {
  vaults: new Set()
}

function vaultReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_VAULT:
      return {
        ...state,
        vaults: state.vaults.add(action.payload)
      }
    default:
      return state
  }
}

export default vaultReducer
