import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import { Observable } from 'rxjs/Observable'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import { timer } from 'rxjs/observable/timer'
import blockChainActions from '../../actions/blockchain-actions'

class BlockChainService {
  constructor(api, action$, subject$, ts = Scheduler.async) {
    this.api = api
    this.action$ = action$
    this.subject$ = subject$
    this.scheduler = ts
    this.account = null
  }

  errorListener() {
    return Observable.create(observer => {
      const onError = err => {
        if (err) {
          observer.next(blockChainActions.blockChainError(err))
        }
      }
      this.api.engine.on('error', onError)

      return () => this.api.engine.removeListener('error', onError)
    })
  }

  connectionListener() {
    return timer(0, 1000, this.scheduler)
      .exhaustMap(() =>
        fromPromise(this.api.web3.getAvailableAddressesAsync(), this.scheduler)
      )
      .map(accounts => {
        if (!accounts.length && this.account) {
          this.account = null
          return blockChainActions.blockChainLogout()
        }

        // Using != to check if this.account is '' or null
        if (accounts[0] != this.account) {
          this.account = accounts[0]
          return blockChainActions.blockChainLogIn(this.account)
        }
      })
      .filter(action => !!action)
  }

  init() {
    const return$ = fromPromise(this.api.init(), this.scheduler)
      .mapTo(blockChainActions.blockChainInit())
      .merge(this.errorListener())
      .merge(this.connectionListener())

    return this.wrapError(return$)
  }

  wrapError(action$) {
    return action$.catch(err => of(blockChainActions.blockChainError(err)))
  }
}

export default BlockChainService
