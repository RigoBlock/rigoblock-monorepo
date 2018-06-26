import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'

export const getAccountBalanceEpic = (action$, store, ts = Scheduler.async) => {
  const action$1 = action$
    .filter(
      action => action.type === blockChainActions.blockChainLogIn.getType()
    )
    .mergeMap(({ payload: { account } }) => {
      return fromPromise(api.web3.getBalanceInWeiAsync(account), ts).map(
        balance => blockChainActions.updateAccountBalance(balance)
      )
    })
  const action$2 = action$
    .filter(action => action.type === blockChainActions.registerBlock.getType())
    .filter(({ payload: { block }, meta: { currentAccount } }) =>
      Object.keys(block.args)
        .map(key => block.args[key])
        .includes(currentAccount)
    )
    // wait 500ms of silence between requests. If more blocks are being fired within this
    // time period, function will wait them to end to call request
    .debounceTime(500, ts)
    .mergeMap(({ meta: { currentAccount } }) => {
      return fromPromise(api.web3.getBalanceInWeiAsync(currentAccount), ts).map(
        balance => blockChainActions.updateAccountBalance(balance)
      )
    })
  return merge(action$1, action$2)
}

export default getAccountBalanceEpic
