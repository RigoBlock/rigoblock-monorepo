import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { blockLabels } from '../../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import api from '../../../api'
import blockChainActions from '../../../actions/blockChain-actions'
import vaultActions from '../../../actions/vault-actions'

const registerVaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === blockChainActions.registerBlock.getType() &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action => {
    const account = getAccount(store)
    return vaultActions.registerVaultBlock(action.payload.block, account)
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
    .map(({ vault }) => {
      const account = getAccount(store)
      return vaultActions.registerVault(vault, account)
    })
  return merge(action$1, action$2)
}

const getAccount = store => store.getState().user.preferences.currentAccount

export default registerVaultsEpic
