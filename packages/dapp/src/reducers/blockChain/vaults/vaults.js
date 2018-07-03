import { createReducer } from 'redux-act'
import u from 'updeep'
import vaultActions from '../../../actions/vault-actions'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
const vaultReducer = createReducer({
  [vaultActions.registerVaultBlock]: (state, payload, { currentAccount }) =>
    u(
      {
        accounts: {
          [currentAccount]: {
            vaultBlocks: {
              [payload.blockNumber]: payload
            }
          }
        }
      },
      state
    ),
  [vaultActions.registerVault]: (state, payload, { currentAccount }) =>
    u(
      {
        accounts: {
          [currentAccount]: { vaults: payload }
        }
      },
      state
    ),
  [vaultActions.updateVaultData]: (
    state,
    { address, totalSupply },
    { currentAccount }
  ) =>
    u(
      {
        accounts: {
          [currentAccount]: {
            vaults: {
              [address]: { totalSupply }
            }
          }
        }
      },
      state
    )
})

export default vaultReducer
