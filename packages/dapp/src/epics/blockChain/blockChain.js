import 'rxjs/add/operator/do'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { actionTypes } from '../../constants/action-types'
import { of } from 'rxjs/observable/of'
import BlockChainService from './BlockChainService'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'

const blockchainSubject = new Subject()
let blockchainService

export const blockchainEpic = (action$, _, ts = Scheduler.async) => {
  blockchainService = BlockChainService.createInstance(
    api,
    action$,
    blockchainSubject,
    ts
  )
  return action$
    .filter(action => action.type === actionTypes.GLOBAL_INIT)
    .mergeMap(() => {
      return window.web3
        ? blockchainService.init().merge(blockchainSubject)
        : of(blockChainActions.blockChainLogout())
    })
}

export default [blockchainEpic]
