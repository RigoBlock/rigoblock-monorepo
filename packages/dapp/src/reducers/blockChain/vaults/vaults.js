import { createReducer } from 'redux-act'
import u from 'updeep'
import vaultActions from '../../../actions/vault-actions'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
const vaultReducer = createReducer({
  [vaultActions.registerVaultBlock]: (state, payload) =>
    u(
      {
        accounts: {
          [payload.currentAccount]: {
            vaultBlocks: {
              [payload.block.blockNumber]: payload.block
            }
          }
        }
      },
      state
    ),
  [vaultActions.registerVault]: (state, payload) =>
    u(
      {
        accounts: {
          [payload.currentAccount]: { vaults: payload.vault }
        }
      },
      state
    )
})

export default vaultReducer
