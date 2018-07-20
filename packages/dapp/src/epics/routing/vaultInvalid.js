import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import api from '../../api'
import get from 'lodash/get'
import routerActions from '../../actions/router-actions'

const re = /vaults\/(.+)/i

const vaultInvalid = (action$, store, ts = Scheduler.async) => {
  return action$
    .filter(
      ({ payload, type }) =>
        type === LOCATION_CHANGE && re.test(payload.pathname)
    )
    .mergeMap(({ payload }) => {
      return fromPromise(api.web3.getAvailableAddressesAsync(), ts)
        .map(([account]) => {
          const vaultId = payload.pathname.match(re).pop()
          const vaults = get(
            store.getState(),
            `blockChain.accounts[${account}].vaults`,
            {}
          )
          const vaultExists = !!Object.values(vaults).some(
            vault => vault.id === parseInt(vaultId, 10)
          )
          if (vaultExists) {
            return
          }
          return routerActions.navigateToVaults()
        })
        .filter(v => !!v)
    })
}

export default vaultInvalid
