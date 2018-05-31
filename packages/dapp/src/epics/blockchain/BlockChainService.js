import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/Observable'
import { Scheduler } from 'rxjs/Scheduler'
import { blockLabels } from '../../constants/blockchain'
import { from } from 'rxjs/observable/from'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import { timer } from 'rxjs/observable/timer'
import { zip } from 'rxjs/observable/zip'
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
        zip(
          fromPromise(this.api.web3.getNodeVersionAsync(), this.scheduler),
          fromPromise(
            this.api.web3.getAvailableAddressesAsync(),
            this.scheduler
          )
        )
      )
      .map(([nodeVersion, accounts]) => {
        nodeVersion = nodeVersion
          .split('/')
          .shift()
          .toLowerCase()
        if (!accounts.length && this.account) {
          this.account = null
          return blockChainActions.blockChainLogout()
        }

        // Using != to check if this.account is '' or null
        if (accounts[0] != this.account) {
          this.account = accounts[0]
          return blockChainActions.blockChainLogIn(nodeVersion, this.account)
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

  fetchVaultEvents(fromBlock = 0, toBlock = 'latest') {
    return Observable.create(observer => {
      const events = this.api.contract.VaultEventful.rawWeb3Contract.allEvents({
        fromBlock,
        toBlock
      })
      events.get(
        (err, events) =>
          err ? observer.error(new Error(err)) : observer.next(events)
      )

      return () => events.stopWatching()
    })
      .mergeMap(events => from(events))
      .filter(events =>
        Object.keys(events.args)
          .map(key => events.args[key])
          .includes(this.account)
      )
      .map(e =>
        blockChainActions.registerBlock(this.account, blockLabels.VAULT, e)
      )
  }
}

export default BlockChainService
