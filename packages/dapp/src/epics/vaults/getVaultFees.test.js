import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import { of } from 'rxjs/observable/of'
import vaultActions from '../../actions/vault-actions'

describe('getVaultFees epics', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const vaultAddress = '0x86a1ba4d485ce346bded508e2426798f825558be'
  const transactionFee = '1'
  const vaultData = {
    feeCollector: '0x7328eF1d7Ab7583Eb9968B2f4a9c900f8a2e2d6d',
    minPeriod: '0',
    ratio: '80',
    transactionFee,
    vaultDao: '0x7ce6e371085cb611fb46d5065397223ef2F952Ff'
  }
  let fromPromiseSpy
  let getVaultFees

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
    getAdminData = () => transactionFee
  }
  const apiMock = {
    web3: {
      _web3: {}
    },
    contract: {
      Vault: {
        createAndValidate: () => new VaultMock()
      }
    }
  }

  beforeEach(() => {
    fromPromiseSpy = jest.fn()
    jest.resetModules()
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    jest.doMock('../../api', () => apiMock)
    getVaultFees = require('./getVaultFees').default
  })

  it("dispatches a updateVaultData action to save the vault's transaction fee whenever registerVault is fired", () => {
    fromPromiseSpy.mockReturnValueOnce(of(new VaultMock()))
    fromPromiseSpy.mockReturnValueOnce(of(vaultData))

    const inputValues = {
      a: vaultActions.registerVault({ account: owner, vaultData: vault })
    }
    const expectedValues = {
      b: vaultActions.updateVaultData({
        account: owner,
        vaultData: {
          address: vaultAddress,
          data: { transactionFee: new BigNumber(transactionFee) }
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
    const outputAction = getVaultFees(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })
})
