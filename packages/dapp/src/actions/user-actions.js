import { actionTypes } from '../constants/action-types'

export default {
  changePreferences: preferences => ({
    type: actionTypes.PREFERENCE_CHANGE,
    payload: preferences
  })
}
