import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import { CREATE_VAULT } from '../../constants/transaction-types'
import { Scheduler } from 'rxjs/Scheduler'
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
    blockChainActions.transactionInProgress(CREATE_VAULT)
  )

  const action$2 = source.mergeMap(
    ({ payload: { accountNumber, vaultName, vaultSymbol } }) =>
      fromPromise(
        api.contract.VaultFactory.createAndValidate(
          api.web3,
          api.contract.VaultFactory.address
        ),
        ts
      ).switchMap(vaultFactory =>
        of(vaultFactory)
          .mergeMap(() =>
            fromPromise(
              vaultFactory
                .createVault(vaultName.toLowerCase(), vaultSymbol)
                .then(obj =>
                  obj.send({ from: accountNumber, gasPrice: 1, gas: 6654755 })
                ),
              ts
            ).map(txHash =>
              blockChainActions.transactionCompleted({
                type: CREATE_VAULT,
                txHash
              })
            )
          )
          .catch(e => of(blockChainActions.transactionFailed(e.toString())))
      )
  )

  return merge(action$1, action$2)
}

export default createVaultEpic
