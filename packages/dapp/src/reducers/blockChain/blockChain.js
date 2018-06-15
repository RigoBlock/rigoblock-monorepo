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
    [blockChainActions.blockChainLogIn]: (state, { account }) =>
      state.accounts[account]
        ? state
        : u(
            {
              accounts: { [account]: {} }
            },
            state
          ),
    [vaultActions.registerVaultBlock]: (state, payload, { currentAccount }) => {
      const blockNumber = payload.blockNumber
      let lastBlock = state.accounts[currentAccount].lastBlock
      lastBlock =
        !lastBlock || lastBlock < blockNumber ? blockNumber : lastBlock
      return u(
        {
          accounts: {
            [currentAccount]: {
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
