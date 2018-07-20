import { createReducer } from 'redux-act'
import u from 'updeep'
import vaultActions from '../../../actions/vault-actions'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
const vaultReducer = createReducer({
  [vaultActions.registerVaultBlock]: (state, { account, block }) =>
    u(
      {
        accounts: {
          [account]: {
            vaultBlocks: {
              [block.blockNumber]: block
            }
          }
        }
      },
      state
    ),
  [vaultActions.registerVault]: (state, { account, vaultData }) =>
    u(
      {
        accounts: {
          [account]: { vaults: vaultData }
        }
      },
      state
    ),
  [vaultActions.updateVaultData]: (
    state,
    { account, vaultData: { address, data } }
  ) =>
    u(
      {
        accounts: {
          [account]: {
            vaults: {
              [address]: data
            }
          }
        }
      },
      state
    ),
  [vaultActions.registerTransaction]: (state, { account, transaction }) =>
    u(
      {
        accounts: {
          [account]: {
            vaultTransactions: {
              [transaction.vault]: {
                [transaction.hash]: transaction.data
              }
            }
          }
        }
      },
      state
    )
})

export default vaultReducer
