import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockChain-actions'
import u from 'updeep'

const initialState = {
  error: ''
}

const globalReducer = createReducer(
  {
    [blockChainActions.blockChainError]: (state, payload) =>
      u(
        {
          error: payload
        },
        state
      )
  },
  initialState
)

export default globalReducer
