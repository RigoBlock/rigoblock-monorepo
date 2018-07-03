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
    .mergeMap(() => {
      const firstUnfetchedBlock = getFirstUnfetchedBlock(store)
      return blockchainService
        .watchVaultEvents(firstUnfetchedBlock)
        .takeUntil(action$.ofType(blockChainActions.blockChainLogIn.getType()))
    })
}

const getFirstUnfetchedBlock = store => {
  const state = store.getState()
  const account = state.preferences.currentAccount
  return state.blockChain.accounts[account].lastBlock
    ? state.blockChain.accounts[account].lastBlock + 1
    : null
}

export default watchVaultEventsEpic
