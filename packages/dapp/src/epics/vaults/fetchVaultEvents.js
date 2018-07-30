import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import BlockChainService from '../blockChain/BlockChainService'
import blockChainActions from '../../actions/blockchain-actions'

const fetchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(
      action => action.type === blockChainActions.blockChainLogIn.getType()
    )
    .mergeMap(({ payload: { account } }) =>
      blockchainService.fetchVaultEvents(account, getFirstUnfetchedBlock(store))
    )
}

const getFirstUnfetchedBlock = store => {
  const state = store.getState()
  const account = state.preferences.currentAccount
  return state.blockChain.accounts[account].lastBlock
    ? state.blockChain.accounts[account].lastBlock + 1
    : null
}

export default fetchVaultEventsEpic
