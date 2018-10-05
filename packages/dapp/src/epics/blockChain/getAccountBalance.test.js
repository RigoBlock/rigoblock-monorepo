import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import { VAULT } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'

describe('getAccountBalanceEpic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const otherAccount = '0x8BB7481495D45CCD5CFFAE1C3A84155FEA85A323'
  const firstBalance = '10000000000000000000'
  const secondBalance = '20000000000000000000'
  const thirdBalance = '15000000000000000000'
  const fourthBalance = '25000000000000000000'
  const getBalanceSpy = jest.fn()
  const apiMock = {
    web3: {
      eth: {
        getBalance: getBalanceSpy
      }
    }
  }
  const vaultEvent = {
    address: '0x001',
    args: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: owner,
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    event: 'BuyVault'
  }

  let getAccountBalanceEpic
  let fromPromiseSpy

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    getAccountBalanceEpic = require('./getAccountBalance').getAccountBalanceEpic
  })

  it('dispatches an updateAccountBalance action upon user login', () => {
    fromPromiseSpy.mockReturnValueOnce(of(firstBalance))
    const inputValues = {
      a: blockChainActions.blockChainLogIn({
        provider: 'metamask',
        account: owner
      })
    }
    const expectedValues = {
      b: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(firstBalance)
      })
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('dispatches an updateAccountBalance action if we register a block which interests the current account', () => {
    fromPromiseSpy.mockReturnValueOnce(of(firstBalance))
    const inputAction = blockChainActions.registerBlock({
      account: owner,
      label: VAULT,
      block: vaultEvent
    })

    const inputValues = {
      a: inputAction
    }
    const expectedValues = {
      b: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(firstBalance)
      })
    }

    const inputMarble = 'a'
    const expectedMarble = addTimeFrames(50, 'b')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })

  it('dispatches the action after emissions stopped for 500ms, only taking last received value', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(firstBalance))
      .mockReturnValueOnce(of(secondBalance))

    const inputAction = blockChainActions.registerBlock({
      account: owner,
      label: VAULT,
      block: vaultEvent
    })
    const inputValues = {
      a: inputAction
    }
    const expectedValues = {
      a: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(firstBalance)
      }),
      b: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(secondBalance)
      })
    }

    const inputMarble = 'a' + addTimeFrames(50) + 'aaaaa'

    const expectedMarble = addTimeFrames(50, 'a') + addTimeFrames(54, 'b')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })

  it('dispatches multiple actions if we receive multiple registration for different accounts', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(firstBalance))
      .mockReturnValueOnce(of(thirdBalance))
      .mockReturnValueOnce(of(secondBalance))
      .mockReturnValueOnce(of(fourthBalance))

    const inputAction1 = blockChainActions.registerBlock({
      account: owner,
      label: VAULT,
      block: vaultEvent
    })
    const inputAction2 = blockChainActions.registerBlock({
      account: otherAccount,
      label: VAULT,
      block: vaultEvent
    })
    const inputValues = {
      a: inputAction1,
      b: inputAction2
    }
    const expectedValues = {
      a: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(firstBalance)
      }),
      b: blockChainActions.updateAccountBalance({
        account: owner,
        balance: new BigNumber(secondBalance)
      }),
      c: blockChainActions.updateAccountBalance({
        account: otherAccount,
        balance: new BigNumber(thirdBalance)
      }),
      d: blockChainActions.updateAccountBalance({
        account: otherAccount,
        balance: new BigNumber(fourthBalance)
      })
    }

    const inputMarble = '(ab)' + addTimeFrames(50) + 'aaaaabbbbb'

    const expectedMarble =
      addTimeFrames(50, '(ac)') + addTimeFrames(54, 'b----d')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })
})
