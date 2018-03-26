import { actionTypes } from '../core/action-types'

export default {
  add() {
    return {
      type: actionTypes.COUNTER_ADD,
      amount: 1
    }
  }
}
