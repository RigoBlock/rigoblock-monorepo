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
  const transaction = {
    transactionHash:
      '0x5d5d3dd42388e0f7fffb8f526117a01202015ced105caf216ede7f560b0e1082'
  }
  const txError = new Error(
    'MetaMask Tx Signature: User denied transaction signature.'
  )
  const gasPrice = '20000000000'
  const gasEstimate = '2455473'
  const getStateMock = jest.fn()
  const mockStore = {
    getState: getStateMock
  }
  const contractFactoryMock = {
    getInstance: jest.fn()
  }
  class VaultFactoryMock {
    createVault() {
      return Promise.resolve({ send: () => {} })
    }
  }
  const apiMock = {
    web3: {
      eth: {
        getGasPrice: jest.fn()
      }
    },
    contract: {
      VaultFactory: {
        address: '0x0'
      }
    }
  }
  const txObject = {
    estimateGas: jest.fn(() => Promise.resolve(gasEstimate)),
    send: jest.fn()
  }
  let createVaultEpic
  let fromPromiseSpy

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
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
      .mockReturnValueOnce(of(gasPrice))
      .mockReturnValueOnce(of(txObject))
      .mockReturnValueOnce(of(transaction))

    const inputValues = {
      a: vaultActions.createVault({
        accountNum: owner,
        vaultSymbol: 'VLT',
        vaultName: 'New Vault'
      })
    }
    const expectedValues = {
      b: blockChainActions.transactionInProgress('Create Vault'),
      c: blockchainActions.transactionCompleted({
        type: CREATE_VAULT,
        txHash: transaction.transactionHash
      })
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
      .mockReturnValueOnce(of(gasPrice))
      .mockReturnValueOnce(of(txObject))
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
