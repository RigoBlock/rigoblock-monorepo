import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

const getVaultSupplyEpic = (action$, store, ts = Scheduler.async) =>
  action$
    .filter(action => action.type === vaultActions.registerVault.getType())
    .mergeMap(({ payload }) => {
      const address = Object.keys(payload).pop()
      return fromPromise(
        api.contract.Vault.createAndValidate(api.web3._web3, address),
        ts
      )
        .mergeMap(vault => fromPromise(vault.totalSupply, ts))
        .map(totalSupply =>
          vaultActions.updateVaultData({ address, data: { totalSupply } })
        )
    })

export default getVaultSupplyEpic
