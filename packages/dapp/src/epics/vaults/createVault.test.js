import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import blockchainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('createVault Epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const txHash =
    '0x5d5d3dd42388e0f7fffb8f526117a01202015ced105caf216ede7f560b0e1082'
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }

  class VaultFactoryMock {
    createVaultTx() {
      return null
    }
  }

  const apiMock = {
    web3: {
      _web3: {}
    },
    contract: {
      VaultFactory: {
        createAndValidate: () => {}
      }
    }
  }

  let createVaultEpic
  let fromPromiseSpy

  beforeEach(() => {
    fromPromiseSpy = jest.fn()
    jest.resetModules()
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../api', () => apiMock)
    createVaultEpic = require('./createVault').default
  })

  it('emits transactionInProgress action when createVault is fired', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(VaultFactoryMock))
      .mockReturnValueOnce(of(txHash))

    const inputValues = {
      a: vaultActions.createVault({
        accountNum: owner,
        vaultSymbol: 'VLT',
        vaultName: 'New Vault'
      })
    }
    const expectedValues = {
      b: blockChainActions.transactionInProgress('Create Vault'),
      c: blockchainActions.transactionCompleted(txHash)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = createVaultEpic(action$, mockStore)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
