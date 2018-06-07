import { actionTypes } from '../../../constants/action-types'
import u from 'updeep'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
function vaultReducer(state, action) {
  switch (action.type) {
    case actionTypes.REGISTER_VAULT_BLOCK:
      return u(
        {
          accounts: {
            [action.account]: {
              vaultBlocks: {
                [action.payload.block.blockNumber]: action.payload.block
              }
            }
          }
        },
        state
      )
    case actionTypes.REGISTER_VAULT:
      return u(
        {
          accounts: {
            [action.account]: { vaults: action.payload }
          }
        },
        state
      )
    default:
      return state
  }
}

export default vaultReducer
