import { createReducer } from 'redux-act'
import u from 'updeep'
import utils from '../../../constants/utils'
import vaultActions from '../../../actions/vault-actions'

// This is a sub-reducer of blockchain, so it shouldn't have initialState
const vaultReducer = createReducer({
  [vaultActions.registerVaultBlock]: (state, { currentAccount, block }) =>
    u(
      {
        accounts: {
          [currentAccount]: {
            vaultBlocks: {
              [block.blockNumber]: block
            }
          }
        }
      },
      state
    ),
  [vaultActions.registerVault]: (state, { currentAccount, vault }) =>
    u(
      {
        accounts: {
          [currentAccount]: { vaults: vault }
        }
      },
      state
    ),
  [vaultActions.saveVaultSupply]: (
    state,
    { currentAccount, supplyData: { address, supply } }
  ) => {
    const totalSupply = supply / utils.ethToMicro
    return u(
      {
        accounts: {
          [currentAccount]: {
            vaults: {
              [address]: {
                totalSupply
              }
            }
          }
        }
      },
      state
    )
  }
})

export default vaultReducer
