import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/mapTo'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import globalActions from '../../actions/global-actions'

class BlockChainService {
  constructor(api, action$, subject$, ts = Scheduler.async) {
    this.api = api
    this.action$ = action$
    this.subject$ = subject$
    this.scheduler = ts
  }

  init() {
    const return$ = fromPromise(this.api.init(), this.scheduler)
      .do(() => console.log('returning stuff'))
      .mapTo(globalActions.blockchainInit())

    // this.api...on('online')

    return this.wrapError(return$)
  }

  wrapError(action$) {
    return action$.catch(err => of(globalActions.blockChainError(err)))
  }
}

export default BlockChainService
