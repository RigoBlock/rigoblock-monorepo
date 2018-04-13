import persistentDecorator from '../../store/persistentDecorator'
import { actionTypes } from '../../constants/action-types'
import migrations from './counter.migrations'

const VERSION = 0

function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case actionTypes.COUNTER_ADD:
      return {
        ...state,
        count: state.count + action.amount
      }
    case actionTypes.COUNTER_SUBTRACT:
      return {
        ...state,
        count: state.count - action.amount
      }
    default:
      return state
  }
}

export default persistentDecorator(counter, 'counter', migrations, VERSION)
