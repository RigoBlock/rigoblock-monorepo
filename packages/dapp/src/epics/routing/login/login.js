import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../../constants/action-types'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import ROUTES from '../../../constants/routes'
import routerActions from '../../../actions/router-actions'

const loginEpic = (action$, store) => {
  return action$
    .filter(action => action.type === actionTypes.LOGGED_IN)
    .mergeMap(() => {
      const state = store.getState()
      return state.routing.location.pathname === ROUTES.LOGIN
        ? of(routerActions.login())
        : empty()
    })
}

export default loginEpic
