import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/mapTo'
import { Observable } from 'rxjs/Observable'
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
    this.account = null
  }

  errorListener() {
    return Observable.create(observer => {
      const onError = err => {
        if (err) {
          observer.next(globalActions.blockChainError(err))
        }
      }
      this.api.engine.on('error', onError)

      return () => this.api.engine.removeListener('error', onError)
    })
  }

  connectListener() {
    return Observable.create(observer => {
      let accountInterval

      const onInterval = () => {
        this.api.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            this.account = null
            observer.next({ type: 'error' })
          }

          if (!accounts.length && this.account) {
            this.account = null
            observer.next({ type: 'not logged' })
          }

          if (accounts[0] != this.account) {
            this.account = accounts[0]
            observer.next({ type: 'logged in', payload: this.account })
          }
        })
      }

      accountInterval = setInterval(onInterval, 1000)

      onInterval()

      return () => accountInterval && window.clearInterval(accountInterval)
    })
  }

  init() {
    const return$ = fromPromise(this.api.init(), this.scheduler)
      // .do(() => console.log('returning stuff'))
      .mapTo(globalActions.blockchainInit())
      .merge(this.errorListener())
      .merge(this.connectListener())

    return this.wrapError(return$)
  }

  wrapError(action$) {
    return action$.catch(err => of(globalActions.blockChainError(err)))
  }
}

export default BlockChainService
