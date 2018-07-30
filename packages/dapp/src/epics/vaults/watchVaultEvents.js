import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/takeUntil'
import BlockChainService from '../blockChain/BlockChainService'
import blockChainActions from '../../actions/blockchain-actions'

const watchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(
      action => action.type === blockChainActions.vaultFetchCompleted.getType()
    )
    .mergeMap(() =>
      blockchainService
        .watchVaultEvents(getFirstUnfetchedBlock(store))
        .takeUntil(action$.ofType(blockChainActions.blockChainLogIn.getType()))
    )
}

const getFirstUnfetchedBlock = store =>
  store.getState().blockChain.latestFetchedBlock + 1

export default watchVaultEventsEpic
