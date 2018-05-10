import 'rxjs/add/operator/catch'
// import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/mapTo'
import { Observable } from 'rxjs/Observable'
import { Scheduler } from 'rxjs/Scheduler'
import { concat } from 'rxjs/observable/concat'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import routerActions from '../../actions/router-actions'

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
    return Observable.create(observer => {
      let accountInterval

      const onInterval = () => {
        this.api.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            this.account = null
            observer.next(blockChainActions.blockChainError(err))
            observer.next(routerActions.logOut())
            return
          }

          if (!accounts.length) {
            this.account = null
            observer.next(blockChainActions.blockChainLogout())
            observer.next(routerActions.logOut())
          }

          if (accounts[0] != this.account) {
            this.account = accounts[0]
            observer.next(blockChainActions.blockChainLogIn(this.account))
            observer.next(routerActions.logIn())
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
      .mapTo(blockChainActions.blockChainInit())
      .merge(this.errorListener())
      .merge(this.connectionListener())

    return this.wrapError(return$)
  }

  wrapError(action$) {
    return action$.catch(err => {
      return concat(
        of(blockChainActions.blockChainError(err)),
        of(routerActions.logOut())
      )
    })
  }
}

export default BlockChainService
