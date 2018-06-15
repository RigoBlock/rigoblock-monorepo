import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import { blockLabels } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('registerVaults epic', () => {
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

  class RegistryMock {
    fromAddress() {
      return {}
    }
  }
  const apiMock = {
    contract: {
      DragoRegistry: {
        address: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52la4',
        createAndValidate: jest.fn()
      }
    },
    web3: {
      '._web3': {}
    }
  }
  let fromPromiseSpy
  let registerVaults

  beforeEach(() => {
    fromPromiseSpy = jest.fn()
    jest.resetModules()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))

    registerVaults = require('./registerVaults').default
  })

  it('emits REGISTER_VAULT containing a parsed vault object + REGISTER_VAULT_BLOCK containing a vault event block', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(new RegistryMock()))
      .mockReturnValueOnce(of(vaultData))

    const inputValues = {
      a: blockChainActions.registerBlock(blockLabels.VAULT, vaultEvent)
    }
    const expectedValues = {
      b: vaultActions.registerVaultBlock(vaultEvent),
      c: vaultActions.registerVault({
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
    const outputAction = registerVaults(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.flush()
  })
})
