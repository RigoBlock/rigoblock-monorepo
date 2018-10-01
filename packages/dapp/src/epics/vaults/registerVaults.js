import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { VAULT } from '../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import blockChainActions from '../../actions/blockchain-actions'
import contractFactory from '../../contractFactory'
import vaultActions from '../../actions/vault-actions'

const registerVaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === blockChainActions.registerBlock.getType() &&
      action.payload.label === VAULT
  )
  const action$1 = vaultBlock$.map(action =>
    vaultActions.registerVaultBlock({
      account: action.payload.account,
      block: action.payload.block
    })
  )

  const action$2 = vaultBlock$
    .mergeMap(action => {
      return fromPromise(contractFactory.getInstance('DragoRegistry')).mergeMap(
        registry => {
          const address = action.payload.block.returnValues.vault
          const account = action.payload.account
          return fromPromise(registry.fromAddress(address), ts).map(
            vaultData => {
              return { account, address, vaultData }
            }
          )
        }
      )
    })
    .map(
      ({ account, address, vaultData: { id, name, symbol, owner, group } }) => {
        return vaultActions.registerVault({
          account,
          vaultData: {
            [address]: {
              id: parseInt(id),
              name,
              symbol,
              owner,
              group
            }
          }
        })
      }
    )
  return merge(action$1, action$2)
}

export default registerVaultsEpic
