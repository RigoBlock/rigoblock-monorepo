import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { ETHTOMICRO } from '../../constants/utils'
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
        new api.contract.Vault(api.web3._web3, address).totalSupply,
        ts
      ).map(supply => {
        const totalSupply = supply / ETHTOMICRO
        return vaultActions.saveVaultSupply({ address, totalSupply })
      })
    })

export default getVaultSupplyEpic
