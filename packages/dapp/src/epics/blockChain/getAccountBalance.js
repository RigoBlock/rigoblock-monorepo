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
        balance => {
          const ethBalance = api.web3._web3.fromWei(balance)
          return blockChainActions.updateAccountBalance(ethBalance)
        }
      )
    })
  const action$2 = action$
    .filter(action => action.type === blockChainActions.registerBlock.getType())
    .filter(({ payload: { block }, meta: { currentAccount } }) =>
      Object.keys(block.args)
        .map(key => block.args[key])
        .includes(currentAccount)
    )
    .mergeMap(({ meta: { currentAccount } }) => {
      return fromPromise(api.web3.getBalanceInWeiAsync(currentAccount), ts).map(
        balance => {
          const ethBalance = api.web3._web3.fromWei(balance)
          return blockChainActions.updateAccountBalance(ethBalance)
        }
      )
    })
  return merge(action$1, action$2)
}

export default getAccountBalanceEpic
