import { actionTypes } from '../constants/action-types'

export default {
  addVault: (account, vault) => ({
    type: actionTypes.ADD_VAULT,
    payload: {
      account,
      vault
    }
  })
}
