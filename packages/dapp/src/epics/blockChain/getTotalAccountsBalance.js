import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { BigNumber } from 'bignumber.js'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'

export const getTotalAccountsBalanceEpic = (action$, store) =>
  action$
    .filter(
      action => action.type === blockChainActions.updateAccountBalance.getType()
    )
    .mergeMap(() => {
      const accounts = store.getState().user.blockChain.accounts
      const totalBalance = Object.keys(accounts)
        .map(acc => new BigNumber(accounts[acc].balance))
        .reduce((acc, curr) => acc.plus(curr), new BigNumber(0))
      return of(blockChainActions.updateTotalAccountBalance(totalBalance))
    })

export default getTotalAccountsBalanceEpic
