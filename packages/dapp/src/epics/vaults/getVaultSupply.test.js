import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { MICRO_TO_WEI } from '../../constants/utils'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import vaultActions from '../../actions/vault-actions'

describe('getVaultSupply epics', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultAddress = '0x86a1ba4d485ce346bded508e2426798f825558be'
  const supply = '14000000'
  let fromPromiseSpy
  let getVaultSupply
  let contractFactoryMock

  const vault = {
    [vaultAddress]: {
      id: new BigNumber('0'),
      name: 'Rocksolid Vault',
      symbol: 'VLT',
      owner,
      group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
    }
  }

  class VaultMock {
    totalSupply() {
      return supply
    }
  }
  const apiMock = {
    web3: {
      _web3: {}
    }
  }

  beforeEach(() => {
    contractFactoryMock = {
      getInstance: jest.fn()
    }
    fromPromiseSpy = jest.fn()
    jest.resetModules()
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../contractFactory', () => contractFactoryMock)
    jest.doMock('../../api', () => apiMock)
    getVaultSupply = require('./getVaultSupply').default
  })

  it("dispatches a updateVaultData action to save the vault's totalsupply whenever registerVault is fired", () => {
    fromPromiseSpy.mockReturnValueOnce(of(new VaultMock()))
    fromPromiseSpy.mockReturnValueOnce(of(supply))
    const inputValues = {
      a: vaultActions.registerVault({ account: owner, vaultData: vault })
    }
    const expectedValues = {
      b: vaultActions.updateVaultData({
        account: owner,
        vaultData: {
          address: vaultAddress,
          data: { totalSupply: new BigNumber(supply).times(MICRO_TO_WEI) }
        }
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
    const outputAction = getVaultSupply(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
