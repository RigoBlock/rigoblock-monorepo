import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { actionTypes } from '../../constants/action-types'
import { blockLabels } from '../../constants/blockchain'
import api from '../../api'
import vaultActions from '../../actions/vault-actions'

export const vaultsEpic = action$ => {
  return action$
    .filter(
      action =>
        action.type === actionTypes.REGISTER_BLOCK &&
        action.payload.label === blockLabels.VAULT
    )
    .mergeMap(async action => {
      const address = action.payload.block.args.vault
      const data = await api.contract.DragoRegistry.fromAddress(address)
      const account = action.payload.account
      return { account, address, data }
    })
    .map(({ account, address, data }) => ({
      account,
      vault: {
        [address]: {
          id: data[0].toNumber(),
          name: data[1],
          symbol: data[2],
          owner: data[4]
        }
      }
    }))
    .map(({ account, vault }) => vaultActions.addVault(account, vault))
}

export default [vaultsEpic]
