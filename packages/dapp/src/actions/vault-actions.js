import { actionTypes } from '../constants/action-types'

export default {
  addRawVault: block => ({
    type: actionTypes.ADD_RAW_VAULT,
    payload: block
  }),
  addVault: vault => ({
    type: actionTypes.ADD_VAULT,
    payload: vault
  })
}
