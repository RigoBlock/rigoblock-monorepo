import 'rxjs/add/operator/do'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import BlockChainService from './BlockChainService'
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
    .do(() => console.log('returning stuff'))
    .merge(blockchainSubject)
}

export default [blockchainEpic]
