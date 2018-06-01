import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import { blockLabels } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('vaults epics', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
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
  const vaultData = [
    new BigNumber(0),
    'Rocksolid Vault',
    'VLT',
    owner,
    owner,
    null
  ]
  const apiMock = {
    contract: {
      DragoRegistry: {
        fromAddress: jest.fn()
      }
    }
  }
  let fromPromiseSpy
  let vaultsEpic

  beforeEach(() => {
    fromPromiseSpy = jest.fn().mockReturnValueOnce(of(vaultData))

    jest.resetModules()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    vaultsEpic = require('./vaults').vaultsEpic
  })

  it('emits a addVault action with a vault object on REGISTER_BLOCK', () => {
    const inputValues = {
      a: blockChainActions.registerBlock(owner, blockLabels.VAULT, vaultEvent)
    }
    const expectedValues = {
      b: vaultActions.addRawVault(owner, vaultEvent),
      c: vaultActions.addVault(owner, {
        ['0xc1Eba7b6F9f06E4491a499E653878464e40AB70e']: {
          id: 0,
          group: null,
          name: 'Rocksolid Vault',
          symbol: 'VLT',
          owner
        }
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
    const outputAction = vaultsEpic(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.flush()
  })
})
