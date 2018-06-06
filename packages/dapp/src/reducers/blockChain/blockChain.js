import { actionTypes } from '../../constants/action-types'
import { composeReducers } from '../utils'
import u from 'updeep'
import vaultsReducer from './vaults'

const initialState = {
  accounts: {}
}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return state.accounts[action.payload.account]
        ? state
        : u(
            {
              accounts: { [action.payload.account]: {} }
            },
            state
          )
    case actionTypes.ADD_RAW_VAULT:
      const blockNumber = action.payload.block.blockNumber
      let lastBlock = state.accounts[action.account].lastBlock
      lastBlock =
        !lastBlock || lastBlock < blockNumber ? blockNumber : lastBlock
      return u(
        {
          accounts: {
            [action.account]: {
              lastBlock: lastBlock
            }
          }
        },
        state
      )
    default:
      return state
  }
}

export default composeReducers(vaultsReducer, blockChainReducer)
