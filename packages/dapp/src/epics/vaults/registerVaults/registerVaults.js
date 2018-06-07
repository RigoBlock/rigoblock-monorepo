import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { actionTypes } from '../../../constants/action-types'
import { blockLabels } from '../../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import api from '../../../api'
import vaultActions from '../../../actions/vault-actions'

const registerVaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === actionTypes.REGISTER_BLOCK &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action => {
    return vaultActions.registerVaultBlock(action.payload)
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
    .map(({ vault }) => vaultActions.registerVault(vault))
  return merge(action$1, action$2)
}

export default registerVaultsEpic
