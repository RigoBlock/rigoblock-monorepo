import { BigNumber } from 'bignumber.js'
import { composeReducers } from '../utils'
import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockchain-actions'
import persistentDecorator from '../../store/persistentDecorator'
import u from 'updeep'
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
    [blockChainActions.registerBlock]: (state, { account, block }) => {
      const latestFetchedBlock = Object.values(state.accounts).reduce(
        (acc, curr) => (acc > curr.lastBlock ? acc : curr.lastBlock),
        0
      )
      const blockNumber = block.blockNumber
      let lastBlock = state.accounts[account].lastBlock
      lastBlock =
        !lastBlock || lastBlock < blockNumber ? blockNumber : lastBlock
      return u(
        {
          accounts: {
            [account]: {
              lastBlock: lastBlock
            }
          },
          latestFetchedBlock
        },
        state
      )
    },
    [blockChainActions.updateAccountBalance]: (state, { account, balance }) =>
      u(
        {
          accounts: {
            [account]: {
              balance
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
