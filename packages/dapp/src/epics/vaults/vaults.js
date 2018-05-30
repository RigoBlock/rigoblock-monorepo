import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../constants/action-types'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

export const vaultsEpic = action$ => {
  return action$
    .filter(action => action.type === actionTypes.REGISTER_BLOCK)
    .mergeMap(async action => {
      const address = action.payload.args.vault
      const data = await api.contract.DragoRegistry.fromAddress(address)
      return { address, data }
    })
    .map(({ address, data }) => ({
      address,
      id: data[0].toNumber(),
      name: data[1],
      symbol: data[2],
      owner: data[4]
    }))
    .map(vault => vaultActions.addVault(vault))
}

export default [vaultsEpic]
