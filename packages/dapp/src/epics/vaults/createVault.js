import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Scheduler } from 'rxjs/Scheduler'
import { empty } from 'rxjs/observable/empty'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

const createVaultEpic = (action$, store, ts = Scheduler.async) => {
  const source = action$.filter(
    ({ type }) => type === vaultActions.createVault.getType()
  )
  const action$1 = source.mapTo(
    blockChainActions.transactionInProgress('Create Vault')
  )

  const action$2 = source.mergeMap(
    ({ payload: { accountNumber, vaultName, vaultSymbol } }) =>
      fromPromise(
        api.contract.VaultFactory.createAndValidate(
          api.web3._web3,
          api.contract.VaultFactory.address
        ),
        ts
      ).mergeMap(vaultFactory => {
        return of(vaultFactory)
          .mergeMap(() =>
            fromPromise(
              vaultFactory
                .createVaultTx(vaultName, vaultSymbol)
                .send({ from: accountNumber, gasPrice: 1, gas: 6654755 }),
              ts
            ).map(txHash => {
              console.log('hereeee')
              return blockChainActions.transactionCompleted(txHash)
            })
          )
          .catch(() => empty())
      })
  )

  return merge(action$1, action$2)
}

export default createVaultEpic
