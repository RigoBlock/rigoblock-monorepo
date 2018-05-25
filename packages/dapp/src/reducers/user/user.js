import { actionTypes } from '../../constants/action-types'
import CONSTANTS from '../../constants/user'
import moment from 'moment-timezone'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  timezone: moment.tz(moment.tz.guess()).format('Z'),
  type: CONSTANTS.INVESTOR,
  wallets: {}
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        wallets: {
          [action.payload.origin]: action.payload.account
        }
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        wallets: {}
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
