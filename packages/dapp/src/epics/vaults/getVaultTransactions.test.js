import { ActionsObservable } from 'redux-observable'
import { ETH } from '../../constants/blockchain'
import { TestScheduler } from 'rxjs'
import getVaultTransactions from './getVaultTransactions'
import vaultActions from '../../actions/vault-actions'

describe('getVaultTransactions epic', () => {
  const buyVaultEvent = {
    logIndex: 0,
    transactionIndex: 0,
    transactionHash:
      '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69',
    blockHash:
      '0x5abdfe4dce930f040b930056ba3cebf0035f5ad9dc9ebd33d89d2c030deaf193',
    blockNumber: 24,
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    type: 'mined',
    event: 'BuyVault',
    args: {
      vault: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
      from: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323',
      to: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
      amount: '3000000000000000000',
      revenue: '3000000',
      name: '0x5365636f6e64205661756c74',
      symbol: '0x736164'
    },
    timestamp: 1530698497000
  }

  const sellVaultEvent = {
    ...buyVaultEvent,
    event: 'SellVault',
    args: {
      vault: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
      from: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323',
      to: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
      amount: '3000000',
      revenue: '3000000000000000000',
      name: '0x5365636f6e64205661756c74',
      symbol: '0x736164'
    }
  }

  const parsedBuyVault = {
    hash: '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69',
    vault: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
    data: {
      date: 1530698497000,
      type: 'Deposit',
      symbol: ETH,
      value: '3000000000000000000',
      units: '3000000',
      account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
    }
  }

  const parsedSellVault = {
    ...parsedBuyVault,
    data: {
      date: 1530698497000,
      type: 'Withdraw',
      symbol: ETH,
      value: '3000000000000000000',
      units: '3000000',
      account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
    }
  }

  it('dispatches a registerVaultTransaction action when registerVaultBlock contains an BuyVault block', () => {
    const inputValues = {
      a: vaultActions.registerVaultBlock(buyVaultEvent)
    }
    const expectedValues = {
      b: vaultActions.registerTransaction(parsedBuyVault)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getVaultTransactions(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('dispatches a registerVaultTransaction action when registerVaultBlock contains an SellVault block', () => {
    const inputValues = {
      a: vaultActions.registerVaultBlock(sellVaultEvent)
    }
    const expectedValues = {
      b: vaultActions.registerTransaction(parsedSellVault)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getVaultTransactions(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
