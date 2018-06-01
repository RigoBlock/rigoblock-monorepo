import { actionTypes } from '../../constants/action-types'
import CONSTANTS from '../../constants/user'
import moment from 'moment-timezone'

const initialState = {
  timezone: `GMT ${moment.tz(moment.tz.guess()).format('Z')}`,
  type: CONSTANTS.INVESTOR,
  currentAccount: null,
  provider: null
}

function preferencesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        currentAccount: action.payload.account,
        provider: action.payload.origin
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        currentAccount: null,
        provider: null
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

export default preferencesReducer
