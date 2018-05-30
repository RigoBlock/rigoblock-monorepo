import { actionTypes } from '../constants/action-types'

export default {
  addVault: vault => ({
    type: actionTypes.ADD_VAULT,
    payload: vault
  })
}
