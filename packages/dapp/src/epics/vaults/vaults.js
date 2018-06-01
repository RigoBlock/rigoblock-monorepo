import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../constants/action-types'
import { blockLabels } from '../../constants/blockchain'
import { merge } from 'rxjs/observable/merge'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

export const vaultsEpic = action$ => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === actionTypes.REGISTER_BLOCK &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action => {
    return vaultActions.addRawVault(
      action.payload.account,
      action.payload.block
    )
  })
  const action$2 = vaultBlock$
    .mergeMap(async action => {
      const address = action.payload.block.args.vault
      const data = await api.contract.DragoRegistry.fromAddress(address)
      const account = action.payload.account
      return { account, address, data }
    })
    .map(
      // eslint-disable-next-line no-unused-vars
      ({ account, address, data: [id, name, symbol, _, owner, group] }) => ({
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
