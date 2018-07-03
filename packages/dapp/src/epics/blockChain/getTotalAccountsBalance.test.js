import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import blockChainActions from '../../actions/blockchain-actions'

describe('getTotalAccountsBalanceEpic', () => {
  const firstBalance = '83999999999988700303'
  const secondBalance = '78999999999964195288'
  const thirdBalance = '256999999999952600881'
  const storeMock = {
    getState: () => ({
      blockChain: {
        accounts: {
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
            balance: firstBalance
          },
          '0x7328eF1d7Ab7583Eb9968B2f4a9c900f8a2e2d6d': {
            balance: secondBalance
          },
          '0x8bB7481495D45cCd5cfFAE1C3A84155fEA85A323': {
            balance: thirdBalance
          }
        }
      }
    })
  }
  const totalBalance = new BigNumber(firstBalance)
    .plus(new BigNumber(secondBalance))
    .plus(new BigNumber(thirdBalance))

  let getTotalAccountsBalanceEpic

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    getTotalAccountsBalanceEpic = require('./getTotalAccountsBalance')
      .getTotalAccountsBalanceEpic
  })

  it('dispatches an updateTotalAccountBalance action whenever updateAccountBalance is fired', () => {
    const inputValues = {
      a: blockChainActions.updateAccountBalance('83999999999988700303')
    }
    const expectedValues = {
      b: blockChainActions.updateTotalAccountBalance(totalBalance)
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getTotalAccountsBalanceEpic(action$, storeMock)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
