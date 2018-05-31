import { actionTypes } from '../../constants/action-types'
import persistentDecorator from '../../store/persistentDecorator'

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

export default persistentDecorator(blockChainReducer, 'blockChain')
