import { actionTypes } from '../../constants/action-types'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  lastBlock: null
}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_BLOCK:
      return {
        ...state,
        lastBlock: action.payload
      }
    default:
      return state
  }
}

export default persistentDecorator(blockChainReducer, 'blockChain')
