import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import { BUY_VAULT, SELL_VAULT } from '../../constants/blockchain'
import { BigNumber } from 'bignumber.js'
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
        vault: block.returnValues.vault,
        data: {
          date: block.timestamp,
          type: DEPOSIT,
          symbol: ETH,
          value: new BigNumber(block.returnValues.amount),
          units: block.returnValues.revenue,
          account: block.returnValues.from
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
        vault: block.returnValues.vault,
        data: {
          date: block.timestamp,
          type: WITHDRAW,
          symbol: ETH,
          value: new BigNumber(block.returnValues.revenue),
          units: block.returnValues.amount,
          account: block.returnValues.from
        }
      }
      return vaultActions.registerTransaction({ account, transaction })
    })

  return merge(action$1, action$2)
}

export default getVaultTransactions
