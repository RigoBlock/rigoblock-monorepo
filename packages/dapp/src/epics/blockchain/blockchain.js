import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import { of } from 'rxjs/observable/of'
import BlockChainService from './BlockChainService'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'

export const blockchainEpic = (action$, store, ts = Scheduler.async) => {
  const blockchainSubject = new Subject()
  const blockchainService = new BlockChainService(
    api,
    action$,
    blockchainSubject,
    ts
  )

  return action$.ofType(actionTypes.GLOBAL_INIT).mergeMap(() => {
    return window.web3
      ? blockchainService.init().merge(blockchainSubject)
      : of(blockChainActions.blockChainLogout())
  })
}

export default [blockchainEpic]
