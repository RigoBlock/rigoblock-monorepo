import { actionTypes } from '../core/action-types'

export default function counter(state = 0, action) {
  switch (action.type) {
    case actionTypes.COUNTER_ADD:
      return (state += action.amount)
    default:
      return state
  }
}
