import { actionTypes } from '../constants/action-types'
import 'rxjs/add/operator/map'

const counterEpic = action$ =>
  action$
    .ofType(actionTypes.COUNTER_ADD)
    .map(action => ({ ...action, type: actionTypes.COUNTER_SUBTRACT }))

export default [counterEpic]
