import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import { BigNumber } from 'bignumber.js'
import { CREATE_VAULT } from '../../constants/transaction-types'
import { Scheduler } from 'rxjs/Scheduler'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import { zip } from 'rxjs/observable/zip'
import api from '../../api'
import blockChainActions from '../../actions/blockchain-actions'
import contractFactory from '../../contractFactory'
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
        contractFactory.getInstance(
          'VaultFactory',
          api.contract.VaultFactory.address
        ),
        ts
      )
        .switchMap(vaultFactory => {
          return zip(
            fromPromise(api.web3.eth.getGasPrice(), ts),
            fromPromise(
              vaultFactory.createVault(vaultName.toLowerCase(), vaultSymbol),
              ts
            )
          )
        })
        .mergeMap(([gasPrice, txObj]) => {
          const txOptions = { from: accountNumber }
          return fromPromise(
            txObj.estimateGas(txOptions).then(gas => {
              return txObj.send({
                ...txOptions,
                gasPrice,
                // adding 20% to the gas limit as the estimate isn't
                // always accurate
                gas: new BigNumber(gas).times(1.2).toFixed(0)
              })
            }),
            ts
          )
        })
        .map(({ transactionHash }) =>
          blockChainActions.transactionCompleted({
            type: CREATE_VAULT,
            txHash: transactionHash
          })
        )
        .catch(e => of(blockChainActions.transactionFailed(e.toString())))
  )

  return merge(action$1, action$2)
}

export default createVaultEpic
