import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { actionTypes } from '../../constants/action-types'
import { blockLabels } from '../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

export const vaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === actionTypes.REGISTER_BLOCK &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action =>
    vaultActions.addRawVault(action.payload.account, action.payload.block)
  )
  const action$2 = vaultBlock$
    .mergeMap(action => {
      const address = action.payload.block.args.vault
      const account = action.payload.account
      return fromPromise(api.contract.DragoRegistry.fromAddress(address)).map(
        vaultData => ({ account, address, vaultData })
      )
    })
    .map(
      ({
        account,
        address,
        vaultData: [id, name, symbol, , owner, group]
      }) => ({
        account,
        vault: {
          [address]: {
            id: id.toNumber(),
            name,
            symbol,
            owner,
            group
          }
        }
      })
    )
    .map(({ account, vault }) => vaultActions.addVault(account, vault))
  return merge(action$1, action$2)
}

export default [vaultsEpic]
