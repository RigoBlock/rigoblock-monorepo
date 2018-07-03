import 'rxjs/add/operator/map'
import { BigNumber } from 'bignumber.js'
import blockChainActions from '../../actions/blockchain-actions'

export const getTotalAccountsBalanceEpic = (action$, store) =>
  action$
    .filter(
      action => action.type === blockChainActions.updateAccountBalance.getType()
    )
    .map(() => {
      const accounts = store.getState().blockChain.accounts
      const totalBalance = Object.keys(accounts)
        .map(acc => new BigNumber(accounts[acc].balance))
        .reduce((acc, curr) => acc.plus(curr), new BigNumber(0))
      return blockChainActions.updateTotalAccountBalance(totalBalance)
    })

export default getTotalAccountsBalanceEpic
