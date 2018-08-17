import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import * as ROUTES from '../../constants/routes'
import { LOCATION_CHANGE } from 'react-router-redux'
import { empty } from 'rxjs/observable/empty'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'

const logoutEpic = (action$, store) => {
  const action$1 = action$
    .filter(
      action =>
        action.type === blockChainActions.blockChainLogout.getType() ||
        action.type === blockChainActions.blockChainError.getType()
    )
    .mergeMap(() => of(routerActions.logout()))

  const action$2 = action$
    .filter(action => action.type === LOCATION_CHANGE)
    .mergeMap(() => {
      const state = store.getState()
      return (!state.preferences.currentAccount || state.globalReducer.error) &&
        state.routing.location.pathname !== ROUTES.LOGIN
        ? of(routerActions.logout())
        : empty()
    })

  return merge(action$1, action$2)
}

export default logoutEpic
