import { actionTypes } from '../../constants/action-types'
import moment from 'moment-timezone'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  timezone: moment.tz(moment.tz.guess()).format('Z'),
  wallets: {
    metamask: {
      account: ''
    }
  }
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        wallets: { metamask: { account: action.payload } }
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        wallets: {
          metamask: { account: initialState.wallets.metamask.account }
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
