import actions from '../../../actions/vault-actions'
import vaultReducer from './vaults'

const initialState = {
  accounts: {}
}
const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
const vault = {
  '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e': {
    id: 0,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    owner
  }
}
const otherVault = {
  '0xc1Eba7b55556E4491a499E653878464e406202r': {
    id: 1,
    name: 'Another Vault',
    symbol: 'ANT',
    owner
  }
}

describe('vaults reducer', () => {
  const vaultTest = reducerTester(vaultReducer)

  it('adds new vault to the state', () => {
    const expectedState = {
      accounts: {
        [owner]: {
          vaults: { ...vault }
        }
      }
    }
    vaultTest(initialState, actions.addVault(owner, vault), expectedState)
  })

  it('does not overwrite previous vaults if present', () => {
    const state = {
      accounts: {
        [owner]: {
          vaults: { ...vault }
        }
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaults: { ...vault, ...otherVault }
        }
      }
    }
    vaultTest(state, actions.addVault(owner, otherVault), expectedState)
  })
})
