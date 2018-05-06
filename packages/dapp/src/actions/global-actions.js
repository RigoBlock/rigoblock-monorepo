import { actionTypes } from '../constants/action-types'

export default {
  init: () => ({
    type: actionTypes.GLOBAL_INIT
  }),
  blockchainInit: () => ({
    type: actionTypes.BLOCKCHAIN_INIT
  }),
  blockChainError: err => ({
    type: actionTypes.BLOCKCHAIN_ERROR,
    payload: err.toString()
  })
}
