import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import * as ROUTES from '../../constants/routes'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import api from '../../api'
import get from 'lodash/get'
import routerActions from '../../actions/router-actions'
import vaultActions from '../../actions/vault-actions'

const selectFirstVaultEpic = (action$, store, ts = Scheduler.async) => {
  const getVaultsInState = (store, account) =>
    get(store.getState(), `blockChain.accounts[${account}].vaults`, {})
  const getPathnameInState = store =>
    get(store.getState(), `routing.location.pathname`, '')
  return action$
    .filter(({ type, payload }) => {
      // if we navigate to the /vaults page, proceed
      if (type === LOCATION_CHANGE && payload.pathname === ROUTES.VAULTS) {
        return true
      }
      // if we are on the /vaults page and vaults have been
      // registered to state, proceed
      if (
        getPathnameInState(store) === ROUTES.VAULTS &&
        type === vaultActions.registerVault.getType()
      ) {
        return true
      }

      return false
    })
    .filter(
      ({ meta: { currentAccount } }) =>
        Object.keys(getVaultsInState(store, currentAccount)).length
    )
    .mergeMap(() => {
      return fromPromise(api.web3.getAvailableAddressesAsync(), ts).map(
        ([account]) => {
          const vaults = getVaultsInState(store, account)
          const firstVaultId = Object.values(vaults)
            .map(vault => vault.id)
            .shift()
          return routerActions.navigateToVault(firstVaultId)
        }
      )
    })
}

export default selectFirstVaultEpic
