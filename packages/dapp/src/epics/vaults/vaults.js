import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/takeUntil'
import { Scheduler } from 'rxjs/Scheduler'
import { actionTypes } from '../../constants/action-types'
import { blockLabels } from '../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import BlockChainService from '../blockChain/BlockChainService'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

export const vaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === actionTypes.REGISTER_BLOCK &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action => {
    return vaultActions.addRawVault(action.payload)
  })
  const action$2 = vaultBlock$
    .mergeMap(action => {
      const address = action.payload.block.args.vault
      return fromPromise(
        api.contract.DragoRegistry.fromAddress(address),
        ts
      ).map(vaultData => ({ address, vaultData }))
    })
    .map(({ address, vaultData: [id, name, symbol, , owner, group] }) => ({
      vault: {
        [address]: {
          id: id.toNumber(),
          name,
          symbol,
          owner,
          group
        }
      }
    }))
    .map(({ vault }) => vaultActions.addVault(vault))
  return merge(action$1, action$2)
}

export const fetchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(action => action.type === actionTypes.LOGGED_IN)
    .mergeMap(() => {
      const firstUnfetchedBlock = getFirstUnfetchedBlock(store)
      return blockchainService.fetchVaultEvents(firstUnfetchedBlock)
    })
}

export const watchVaultEventsEpic = (action$, store) => {
  const blockchainService = BlockChainService.getInstance()
  return action$
    .filter(action => action.type === actionTypes.VAULT_FETCH_COMPLETE)
    .mergeMap(() => {
      const firstUnfetchedBlock = getFirstUnfetchedBlock(store)
      return blockchainService.watchVaultEvents(firstUnfetchedBlock)
    })
}

const getFirstUnfetchedBlock = store => {
  const state = store.getState()
  const account = state.user.preferences.currentAccount
  return state.user.blockChain.accounts[account].lastBlock
    ? state.user.blockChain.accounts[account].lastBlock + 1
    : null
}

export default [vaultsEpic, fetchVaultEventsEpic, watchVaultEventsEpic]
