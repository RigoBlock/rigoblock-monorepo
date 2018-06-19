import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import * as ROUTES from '../../constants/routes'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'

const loginEpic = (action$, store) => {
  return action$
    .filter(
      action => action.type === blockChainActions.blockChainLogIn.getType()
    )
    .mergeMap(() => {
      const state = store.getState()
      return !state.routing.location ||
        state.routing.location.pathname === ROUTES.LOGIN
        ? of(routerActions.login())
        : empty()
    })
}

export default loginEpic
