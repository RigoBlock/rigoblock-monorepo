import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import api from '../../api'
import get from 'lodash/get'
import routerActions from '../../actions/router-actions'

const VAULT_ID_REGEXP = /vaults\/(.+)/i

const vaultInvalidEpic = (action$, store, ts = Scheduler.async) =>
  action$
    .filter(
      ({ payload, type }) =>
        type === LOCATION_CHANGE && VAULT_ID_REGEXP.test(payload.pathname)
    )
    .mergeMap(({ payload }) =>
      fromPromise(api.web3.getAvailableAddressesAsync(), ts)
        .map(([account]) => {
          const vaultId = payload.pathname.match(VAULT_ID_REGEXP).pop()
          const vaults = get(
            store.getState(),
            `blockChain.accounts[${account}].vaults`,
            {}
          )
          const vaultExists = !!Object.values(vaults).some(
            vault => vault.id === parseInt(vaultId, 10)
          )
          return vaultExists ? null : routerActions.navigateToVaults()
        })
        .filter(v => !!v)
    )

export default vaultInvalidEpic
