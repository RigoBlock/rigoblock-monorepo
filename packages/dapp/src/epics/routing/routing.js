import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../constants/action-types'
import { empty } from 'rxjs/observable/empty'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import ROUTES from '../../constants/routes'
import routerActions from '../../actions/router-actions'

export const logOutEpic = (action$, store) => {
  const action$1 = action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .mergeMap(() => {
      const state = store.getState()
      return !state.blockChain.account &&
        window.location.pathname !== ROUTES.LOGIN
        ? of(routerActions.logOut())
        : empty()
    })

  const action$2 = action$
    .filter(
      action =>
        action.type === actionTypes.LOGGED_OUT ||
        action.type === actionTypes.BLOCKCHAIN_ERROR
    )
    .mergeMap(() => of(routerActions.logOut()))

  return merge(action$1, action$2)
}

export default [logOutEpic]
