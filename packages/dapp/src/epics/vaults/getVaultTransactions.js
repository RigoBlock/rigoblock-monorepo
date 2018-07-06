import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import { BUY_VAULT, SELL_VAULT } from '../../constants/blockchain'
import { DEPOSIT, ETH, WITHDRAW } from '../../constants/blockchain'
import { merge } from 'rxjs/observable/merge'
import vaultActions from '../../actions/vault-actions'

const getVaultTransactions = action$ => {
  const action$1 = action$
    .filter(action => action.type === vaultActions.registerVaultBlock.getType())
    .filter(({ payload }) => payload.event === BUY_VAULT)
    .map(({ payload }) => ({
      hash: payload.transactionHash,
      vault: payload.args.vault,
      data: {
        date: payload.timestamp,
        type: DEPOSIT,
        symbol: ETH,
        value: payload.args.amount,
        units: payload.args.revenue,
        account: payload.args.from
      }
    }))
    .map(transaction => vaultActions.registerTransaction(transaction))

  const action$2 = action$
    .filter(action => action.type === vaultActions.registerVaultBlock.getType())
    .filter(({ payload }) => payload.event === SELL_VAULT)
    .map(({ payload }) => ({
      hash: payload.transactionHash,
      vault: payload.args.vault,
      data: {
        date: payload.timestamp,
        type: WITHDRAW,
        symbol: ETH,
        value: payload.args.revenue,
        units: payload.args.amount,
        account: payload.args.from
      }
    }))
    .map(transaction => vaultActions.registerTransaction(transaction))

  return merge(action$1, action$2)
}

export default getVaultTransactions
