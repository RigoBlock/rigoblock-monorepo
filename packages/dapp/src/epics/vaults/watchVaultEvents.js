import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/takeUntil'
import { actionTypes } from '../../constants/action-types'
import BlockChainService from '../blockChain/BlockChainService'

const watchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(action => action.type === actionTypes.VAULT_FETCH_COMPLETED)
    .mergeMap(() => {
      const firstUnfetchedBlock = getFirstUnfetchedBlock(store)
      return blockchainService
        .watchVaultEvents(firstUnfetchedBlock)
        .takeUntil(action$.ofType(actionTypes.LOGGED_IN))
    })
}

const getFirstUnfetchedBlock = store => {
  const state = store.getState()
  const account = state.user.preferences.currentAccount
  return state.user.blockChain.accounts[account].lastBlock
    ? state.user.blockChain.accounts[account].lastBlock + 1
    : null
}

export default watchVaultEventsEpic
