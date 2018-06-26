import { ActionsObservable } from 'redux-observable'
import { ETHTOWEI } from '../../constants/utils'
import { TestScheduler } from 'rxjs'
import { VAULT } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'

describe('blockchain epics', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const getBalanceSpy = jest.fn()
  const apiMock = {
    web3: {
      _web3: {
        fromWei: val => val / ETHTOWEI
      },
      getBalanceInWeiAsync: getBalanceSpy
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

  describe('getAccountBalanceEpic', () => {
    it('dispatches an updateAccountBalance action upon user login', () => {
      fromPromiseSpy.mockReturnValueOnce(of('25999999999952600000'))
      const inputValues = {
        a: blockChainActions.blockChainLogIn()
      }
      const expectedValues = {
        b: blockChainActions.updateAccountBalance('25999999999952600000')
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
      fromPromiseSpy.mockReturnValueOnce(of('25999999999952600000'))
      const inputAction = blockChainActions.registerBlock(VAULT, vaultEvent)
      inputAction.meta = { currentAccount: owner }

      const inputValues = {
        a: inputAction
      }
      const expectedValues = {
        b: blockChainActions.updateAccountBalance('25999999999952600000')
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
  })
})
