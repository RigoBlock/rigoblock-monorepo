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
    .mergeMap(({ payload: { vault } }) => {
      const address = Object.keys(vault).pop()
      return fromPromise(
        new api.contract.Vault(api.web3._web3, address).totalSupply,
        ts
      ).map(supply => vaultActions.saveVaultSupply({ address, supply }))
    })

export default getVaultSupplyEpic
