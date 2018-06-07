import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import BlockChainService from '../../blockChain/BlockChainService'
import blockChainActions from '../../../actions/blockchain-actions'

const fetchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(
      action => action.type === blockChainActions.blockChainLogIn.getType()
    )
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
