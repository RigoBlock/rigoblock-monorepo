import { actionTypes } from '../../constants/action-types'
import moment from 'moment-timezone'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  timezone: moment.tz(moment.tz.guess()).format('Z'),
  wallets: {
    Metamask: {
      account: ''
    }
  }
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        wallets: { Metamask: { account: action.payload } }
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        wallets: {
          Metamask: { account: initialState.wallets.Metamask.account }
        }
      }
    case actionTypes.PREFERENCE_CHANGE:
      return {
        ...state,
        timezone: action.payload.timezone
      }
    default:
      return state
  }
}

export default persistentDecorator(userReducer, 'user')
