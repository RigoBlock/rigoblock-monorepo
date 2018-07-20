import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'

const logoutEpic = action$ =>
  action$
    .filter(
      action =>
        action.type === blockChainActions.blockChainLogout.getType() ||
        action.type === blockChainActions.blockChainError.getType()
    )
    .mergeMap(() => of(routerActions.logout()))

export default logoutEpic
