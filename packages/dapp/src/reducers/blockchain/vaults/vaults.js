import { actionTypes } from '../../../constants/action-types'
import u from 'updeep'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
function vaultReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_RAW_VAULT:
      const blockNumber = action.payload.block.blockNumber
      const lastBlock = state.accounts[action.payload.account].lastBlock
      const ret = u(state, {
        accounts: {
          [action.payload.account]: {
            vaultBlocks: {
              [action.payload.block.blockNumber]: action.payload.block
            }
          }
        }
      })
      return !lastBlock || lastBlock < blockNumber
        ? u(
            {
              accounts: {
                [action.payload.account]: {
                  lastBlock: blockNumber
                }
              }
            },
            ret
          )
        : ret
    case actionTypes.ADD_VAULT:
      return u(state, {
        accounts: {
          [action.payload.account]: { vaults: action.payload.vault }
        }
      })
    default:
      return state
  }
}

export default vaultReducer
