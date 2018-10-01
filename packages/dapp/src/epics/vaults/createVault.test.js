import { ActionsObservable } from 'redux-observable'
import { CREATE_VAULT } from '../../constants/transaction-types'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import blockchainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('createVault Epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const txHash =
    '0x5d5d3dd42388e0f7fffb8f526117a01202015ced105caf216ede7f560b0e1082'
  const txError = new Error(
    'MetaMask Tx Signature: User denied transaction signature.'
  )
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }
  let contractFactoryMock

  class VaultFactoryMock {
    createVault() {
      return Promise.resolve({ send: () => {} })
    }
  }

  const apiMock = {
    web3: {
      _web3: {}
    }
  }

  let createVaultEpic
  let fromPromiseSpy

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    contractFactoryMock = {
      getInstance: jest.fn()
    }
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../contractFactory', () => contractFactoryMock)
    jest.doMock('../../api', () => apiMock)
    createVaultEpic = require('./createVault').default
  })

  it('emits transactionInProgress action when createVault is fired, and a transactionCompleted when the transaction resolves', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(new VaultFactoryMock()))
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
      c: blockchainActions.transactionCompleted({ type: CREATE_VAULT, txHash })
    }

    const inputMarble = 'a'
    const expectedMarble = '(bc)'

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

  it('emits a transactionFailed action if there was an error during the transaction', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(new VaultFactoryMock()))
      .mockReturnValueOnce(ErrorObservable.create(txError))

    const inputValues = {
      a: vaultActions.createVault({
        accountNum: owner,
        vaultSymbol: 'VLT',
        vaultName: 'New Vault'
      })
    }
    const expectedValues = {
      b: blockChainActions.transactionInProgress('Create Vault'),
      c: blockchainActions.transactionFailed(txError.toString())
    }

    const inputMarble = 'a'
    const expectedMarble = '(bc)'

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
