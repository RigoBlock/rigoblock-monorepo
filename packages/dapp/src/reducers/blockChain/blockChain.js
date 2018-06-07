import { composeReducers } from '../utils'
import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockchain-actions'
import u from 'updeep'
import vaultActions from '../../actions/vault-actions'
import vaultsReducer from './vaults'

const initialState = {
  accounts: {}
}

const blockChainReducer = createReducer(
  {
    [blockChainActions.blockChainLogIn]: (state, payload) =>
      state.accounts[payload.account]
        ? state
        : u(
            {
              accounts: { [payload.account]: {} }
            },
            state
          ),
    [vaultActions.registerVaultBlock]: (state, payload) => {
      const blockNumber = payload.block.blockNumber
      let lastBlock = state.accounts[payload.account].lastBlock
      lastBlock =
        !lastBlock || lastBlock < blockNumber ? blockNumber : lastBlock
      return u(
        {
          accounts: {
            [payload.account]: {
              lastBlock: lastBlock
            }
          }
        },
        state
      )
    }
  },
  initialState
)

export default composeReducers(vaultsReducer, blockChainReducer)
