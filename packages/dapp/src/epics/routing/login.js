import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import * as ROUTES from '../../constants/routes'
import { get } from 'lodash'
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
      const redirectUrl = get(
        state,
        'routing.location.pathname',
        ROUTES.DASHBOARD
      )
      return of(
        routerActions.login(
          redirectUrl !== ROUTES.LOGIN ? redirectUrl : undefined
        )
      )
    })
}

export default loginEpic
