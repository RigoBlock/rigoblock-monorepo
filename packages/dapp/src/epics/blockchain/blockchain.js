import 'rxjs/add/operator/do'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import BlockChainService from './BlockchainService'
import api from '../../api'

export const blockchainEpic = (action$, store, ts = Scheduler.async) => {
  const blockchainSubject = new Subject()
  const blockchainService = new BlockChainService(
    api,
    action$,
    blockchainSubject,
    ts
  )

  return action$
    .ofType(actionTypes.GLOBAL_INIT)
    .mergeMap(() => blockchainService.init())
    .merge(blockchainSubject)
}

export default [blockchainEpic]
