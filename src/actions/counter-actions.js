import { actionTypes } from '../core/action-types'

export default {
  add: () => ({
    type: actionTypes.COUNTER_ADD,
    amount: 1
  })
}
