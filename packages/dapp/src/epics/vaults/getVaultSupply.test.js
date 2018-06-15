import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { ETHTOMICRO } from '../../constants/utils'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import vaultActions from '../../actions/vault-actions'

describe('getVaultSupply epics', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultAddress = '0x86a1ba4d485ce346bded508e2426798f825558be'
  const supply = '14000000'
  let fromPromiseSpy
  let getVaultSupply

  const vault = {
    [vaultAddress]: {
      id: new BigNumber(0),
      name: 'Rocksolid Vault',
      symbol: 'VLT',
      owner,
      group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
    }
  }

  class VaultMock {
    totalSupply
  }
  const apiMock = {
    web3: {
      _web3: {}
    },
    contract: {
      Vault: VaultMock
    }
  }

  beforeEach(() => {
    fromPromiseSpy = jest.fn()
    jest.resetModules()
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../api', () => apiMock)
    getVaultSupply = require('./getVaultSupply').default
  })

  it('dispatches a saveVaultSupply action whenever registerVault is fired', () => {
    const totalSupply = supply / ETHTOMICRO
    fromPromiseSpy.mockReturnValueOnce(of(supply))
    const inputValues = {
      a: vaultActions.registerVault(vault)
    }
    const expectedValues = {
      b: vaultActions.saveVaultSupply({
        address: vaultAddress,
        totalSupply
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
