import { actionTypes } from '../../constants/action-types'
import moment from 'moment-timezone'

const initialState = {
  timezone: moment.tz(moment.tz.guess()).format('Z')
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PREFERENCE_CHANGE:
      return {
        ...state,
        timezone: action.payload.timezone
      }
    default:
      return state
  }
}

export default userReducer
