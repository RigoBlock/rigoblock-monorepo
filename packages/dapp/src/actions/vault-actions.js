import { actionTypes } from '../constants/action-types'

export default {
  registerVaultBlock: block => ({
    type: actionTypes.REGISTER_VAULT_BLOCK,
    payload: block
  }),
  registerVault: vault => ({
    type: actionTypes.REGISTER_VAULT,
    payload: vault
  })
}
