import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import { of } from 'rxjs/observable/of'
import { push } from 'react-router-redux'
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
  return action$.ofType(actionTypes.GLOBAL_INIT).mergeMap(() => {
    return window.web3
      ? blockchainService.init().merge(blockchainSubject)
      : of(push('/login'))
  })
}

export default [blockchainEpic]
