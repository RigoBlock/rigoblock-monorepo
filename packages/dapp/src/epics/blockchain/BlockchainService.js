import 'rxjs/add/operator/mapTo'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import globalActions from '../../actions/global-actions'

class BlockChainService {
  constructor(api, action$, subject$, ts = Scheduler.async) {
    this.api = api
    this.action$ = action$
    this.subject$ = subject$
    this.timeScheduler = ts
  }

  init() {
    const return$ = fromPromise(this.api.init()).mapTo(
      globalActions.providerEngineInit()
    )

    // this.api...on('online')

    return return$
  }
}

export default BlockChainService
