import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import { of } from 'rxjs/observable/of'
import BlockChainService from './BlockChainService'
import api from '../../api'
import routerActions from '../../actions/router-actions'

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
      : of(routerActions.logOut())
  })
}

export default [blockchainEpic]
