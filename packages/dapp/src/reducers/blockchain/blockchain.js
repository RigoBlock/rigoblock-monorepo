import { actionTypes } from '../../constants/action-types'

const initialState = {
  account: null
}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        account: action.payload.account
      }
    default:
      return state
  }
}

export default blockChainReducer
