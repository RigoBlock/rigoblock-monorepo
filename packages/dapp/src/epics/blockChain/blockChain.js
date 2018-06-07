import 'rxjs/add/operator/do'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { Subject } from 'rxjs/Subject'
import { of } from 'rxjs/observable/of'
import BlockChainService from './BlockChainService'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'

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
    .filter(action => action.type === globalActions.init.getType())
    .mergeMap(() => {
      return window.web3
        ? blockchainService.init().merge(blockchainSubject)
        : of(blockChainActions.blockChainLogout())
    })
}

export default blockchainEpic
