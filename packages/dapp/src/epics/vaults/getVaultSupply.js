import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { BigNumber } from 'bignumber.js'
import { MICRO_TO_WEI } from '../../constants/utils'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

const getVaultSupplyEpic = (action$, store, ts = Scheduler.async) =>
  action$
    .filter(action => action.type === vaultActions.registerVault.getType())
    .mergeMap(({ payload: { account, vaultData } }) => {
      const address = Object.keys(vaultData).pop()
      return fromPromise(
        api.contract.Vault.createAndValidate(api.web3, address),
        ts
      )
        .mergeMap(vault => fromPromise(vault.totalSupply(), ts))
        .map(totalSupply => {
          return vaultActions.updateVaultData({
            account,
            vaultData: {
              address,
              data: {
                totalSupply: new BigNumber(totalSupply).times(MICRO_TO_WEI)
              }
            }
          })
        })
    })

export default getVaultSupplyEpic
