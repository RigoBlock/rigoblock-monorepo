import { actionTypes } from '../constants/action-types'

export default {
  addRawVault: (account, block) => ({
    type: actionTypes.ADD_RAW_VAULT,
    payload: {
      account,
      block
    }
  }),
  addVault: (account, vault) => ({
    type: actionTypes.ADD_VAULT,
    payload: {
      account,
      vault
    }
  })
}
