import persistentDecorator from '../store/persistentDecorator'
import { actionTypes } from '../constants/action-types'

function counter(state = 0, action) {
  switch (action.type) {
    case actionTypes.COUNTER_ADD:
      return (state += action.amount)
    default:
      return state
  }
}

export default persistentDecorator(counter, 'counter')
