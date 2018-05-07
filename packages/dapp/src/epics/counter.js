import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'
import { Scheduler } from 'rxjs/Scheduler'
import { actionTypes } from '../constants/action-types'

export const counterEpic = (action$, store, ts = Scheduler.async) => {
  return action$
    .ofType(actionTypes.COUNTER_ADD)
    .delay(100, ts)
    .map(action => ({ ...action, type: actionTypes.COUNTER_SUBTRACT }))
}

export default [counterEpic]
