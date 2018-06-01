import { ActionsObservable } from 'redux-observable'
import { BigNumber } from 'bignumber.js'
import { TestScheduler } from 'rxjs'
import blockChainActions from '../../actions/blockchain-actions'
import vaultActions from '../../actions/vault-actions'

const apiMock = {
  contract: {
    DragoRegistry: {
      fromAddress: () => [
        new BigNumber(0),
        'Rocksolid Vault',
        'VLT',
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        null
      ]
    }
  }
}

jest.doMock('../../api', () => apiMock)
const vaultsEpic = require('./vaults').vaultsEpic

describe('vaults epics', () => {
  const vaultEvent = {
    address: '0x001',
    args: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    event: 'BuyVault'
  }

  it('emits a addVault action with a vault object on REGISTER_BLOCK', () => {
    const inputValues = {
      a: blockChainActions.registerBlock(vaultEvent)
    }
    const expectedValues = {
      b: vaultActions.addVault({
        address: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
        id: 0,
        name: 'Rocksolid Vault',
        symbol: 'VLT',
        owner: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
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
    const outputAction = vaultsEpic(action$)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })
})
