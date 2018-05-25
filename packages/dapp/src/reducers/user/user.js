import { actionTypes } from '../../constants/action-types'
import moment from 'moment-timezone'
import persistentDecorator from '../../store/persistentDecorator'

const initialState = {
  timezone: `GMT ${moment.tz(moment.tz.guess()).format('Z')}`
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

export default persistentDecorator(userReducer, 'user')
