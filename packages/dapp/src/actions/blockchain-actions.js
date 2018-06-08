import { actionTypes } from '../constants/action-types'

export default {
  blockChainInit: () => ({
    type: actionTypes.BLOCKCHAIN_INIT
  }),
  blockChainError: err => ({
    type: actionTypes.BLOCKCHAIN_ERROR,
    payload: err.toString()
  }),
  blockChainLogIn: (origin, account) => ({
    type: actionTypes.LOGGED_IN,
    payload: { origin, account }
  }),
  blockChainLogout: () => ({
    type: actionTypes.LOGGED_OUT
  }),
  registerBlock: (label, block) => ({
    type: actionTypes.REGISTER_BLOCK,
    payload: {
      label,
      block
    }
  }),
  vaultFetchCompleted: () => ({
    type: actionTypes.VAULT_FETCH_COMPLETED
  })
}
