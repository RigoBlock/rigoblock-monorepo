import actions from '../../../actions/vault-actions'
import vaultReducer from './vaults'

const initialState = {}
const vault = {
  '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e': {
    id: 0,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    owner: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  }
}

describe('global reducer', () => {
  const vaultTest = reducerTester(vaultReducer)

  it('returns the initial state', () => {
    vaultTest(undefined, {}, initialState)
  })

  it('adds new vault to the state', () => {
    vaultTest(
      undefined,
      actions.addVault('0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196', vault),
      vault
    )
  })
})
