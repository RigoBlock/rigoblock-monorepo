import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import { BUY_VAULT, SELL_VAULT } from '../../constants/blockchain'
import { DEPOSIT, ETH, WITHDRAW } from '../../constants/blockchain'
import { merge } from 'rxjs/observable/merge'
import vaultActions from '../../actions/vault-actions'

const getVaultTransactions = action$ => {
  const action$1 = action$
    .filter(
      action =>
        action.type === vaultActions.registerVaultBlock.getType() &&
        action.payload.block.event === BUY_VAULT
    )
    .map(({ payload: { account, block } }) => {
      const transaction = {
        hash: block.transactionHash,
        vault: block.args.vault,
        data: {
          date: block.timestamp,
          type: DEPOSIT,
          symbol: ETH,
          value: block.args.amount,
          units: block.args.revenue,
          account: block.args.from
        }
      }
      return vaultActions.registerTransaction({ account, transaction })
    })

  const action$2 = action$
    .filter(
      action =>
        action.type === vaultActions.registerVaultBlock.getType() &&
        action.payload.block.event === SELL_VAULT
    )
    .map(({ payload: { account, block } }) => {
      const transaction = {
        hash: block.transactionHash,
        vault: block.args.vault,
        data: {
          date: block.timestamp,
          type: WITHDRAW,
          symbol: ETH,
          value: block.args.revenue,
          units: block.args.amount,
          account: block.args.from
        }
      }
      return vaultActions.registerTransaction({ account, transaction })
    })

  return merge(action$1, action$2)
}

export default getVaultTransactions
