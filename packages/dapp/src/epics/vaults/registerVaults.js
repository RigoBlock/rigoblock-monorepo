import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { blockLabels } from '../../constants/blockchain'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

const registerVaultsEpic = (action$, store, ts = Scheduler.async) => {
  const vaultBlock$ = action$.filter(
    action =>
      action.type === blockChainActions.registerBlock.getType() &&
      action.payload.label === blockLabels.VAULT
  )
  const action$1 = vaultBlock$.map(action =>
    vaultActions.registerVaultBlock(action.payload.block)
  )
  const action$2 = vaultBlock$
    .mergeMap(action => {
      const registry = api.contract.DragoRegistry
      return fromPromise(
        registry.createAndValidate(api.web3._web3, registry.address)
      ).mergeMap(registry => {
        const address = action.payload.block.args.vault
        return fromPromise(registry.fromAddress(address), ts).map(
          vaultData => ({ address, vaultData })
        )
      })
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
