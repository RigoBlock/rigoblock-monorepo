import { actionTypes } from '../../constants/action-types'

const initialState = {
  accounts: {}
}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return state.accounts[action.payload.account]
        ? state
        : {
            ...state,
            accounts: { ...state.accounts, [action.payload.account]: {} }
          }
    default:
      return state
  }
}

export default blockChainReducer
