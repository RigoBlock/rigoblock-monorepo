import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../constants/action-types'
import BlockChainService from '../blockChain/BlockChainService'

const fetchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(action => action.type === actionTypes.LOGGED_IN)
    .mergeMap(() => {
      const firstUnfetchedBlock = getFirstUnfetchedBlock(store)
      return blockchainService.fetchVaultEvents(firstUnfetchedBlock)
    })
}

const getFirstUnfetchedBlock = store => {
  const state = store.getState()
  const account = state.user.preferences.currentAccount
  return state.user.blockChain.accounts[account].lastBlock
    ? state.user.blockChain.accounts[account].lastBlock + 1
    : null
}

export default fetchVaultEventsEpic
