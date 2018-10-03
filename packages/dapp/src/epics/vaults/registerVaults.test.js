import { ActionsObservable } from 'redux-observable'
import { TestScheduler } from 'rxjs'
import { VAULT } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

describe('registerVaults epic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultEvent = {
    address: '0x001',
    returnValues: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: owner,
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    event: 'BuyVault'
  }
  const vaultData = {
    dragoId: '0',
    group: '0x7ce6e371085cb611fb46d5065397223ef2F952Ff',
    id: '0',
    name: 'Rocksolid Vault',
    owner,
    symbol: 'VLT'
  }

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
    }
  }
  let fromPromiseSpy
  let registerVaults
  const contractFactoryMock = {
    getInstance: jest.fn()
  }

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../contractFactory', () => contractFactoryMock)
    registerVaults = require('./registerVaults').default
  })

  it('emits REGISTER_VAULT containing a parsed vault object + REGISTER_VAULT_BLOCK containing a vault event block', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of(new RegistryMock()))
      .mockReturnValueOnce(of(vaultData))

    const inputValues = {
      a: blockChainActions.registerBlock({
        account: owner,
        label: VAULT,
        block: vaultEvent
      })
    }
    const expectedValues = {
      b: vaultActions.registerVaultBlock({
        account: owner,
        block: vaultEvent
      }),
      c: vaultActions.registerVault({
        account: owner,
        vaultData: {
          ['0xc1Eba7b6F9f06E4491a499E653878464e40AB70e']: {
            id: 0,
            group: '0x7ce6e371085cb611fb46d5065397223ef2F952Ff',
            name: 'Rocksolid Vault',
            symbol: 'VLT',
            owner
          }
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
