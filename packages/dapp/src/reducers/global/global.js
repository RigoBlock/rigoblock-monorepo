import { actionTypes } from '../../constants/action-types'

const initialState = {
  error: ''
}

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.BLOCKCHAIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default globalReducer
