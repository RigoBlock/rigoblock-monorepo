import { BigNumber } from 'bignumber.js'
import { composeReducers } from '../utils'
import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockchain-actions'
import persistentDecorator from '../../store/persistentDecorator'
import u from 'updeep'
import vaultActions from '../../actions/vault-actions'
import vaultsReducer from './vaults'

const initialState = {
  accounts: {},
  totalBalance: new BigNumber('0')
}

const blockChainReducer = createReducer(
  {
    [blockChainActions.blockChainLogIn]: (state, { provider, account }) =>
      state.accounts[account]
        ? state
        : u(
            {
              accounts: {
                [account]: {
                  provider
                }
              }
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
    },
    [blockChainActions.updateAccountBalance]: (
      state,
      payload,
      { currentAccount }
    ) =>
      u(
        {
          accounts: {
            [currentAccount]: {
              balance: payload
            }
          }
        },
        state
      ),
    [blockChainActions.updateTotalAccountBalance]: (state, payload) =>
      u(
        {
          totalBalance: payload
        },
        state
      )
  },
  initialState
)

export default persistentDecorator(
  composeReducers(vaultsReducer, blockChainReducer),
  'blockChain'
)
