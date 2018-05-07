import { actionTypes } from '../../constants/action-types'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  error: '',
  account: ''
}

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.BLOCKCHAIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        account: action.payload
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        account: ''
      }
    default:
      return state
  }
}

export default persistentDecorator(globalReducer, 'global')
