import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'

export const closeModalEpic = action$ =>
  action$
    .filter(
      action =>
        action.type === blockChainActions.transactionCompleted.getType() ||
        action.type === blockChainActions.transactionFailed.getType()
    )
    .mapTo(globalActions.closeModal())

export default closeModalEpic
