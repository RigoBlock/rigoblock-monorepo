import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'
import u from 'updeep'

const initialState = {
  error: '',
  modalComponent: null
}

const globalReducer = createReducer(
  {
    [blockChainActions.blockChainError]: (state, payload) =>
      u(
        {
          error: payload
        },
        state
      ),
    [globalActions.openModal]: (state, component) =>
      u(
        {
          modalComponent: component
        },
        state
      ),
    [globalActions.closeModal]: state =>
      u(
        {
          modalComponent: null
        },
        state
      )
  },
  initialState
)

export default globalReducer
