import { blockLabels } from '../../../constants/blockchain'
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
const secondVault = {
  '0xc1Eba7b55556E4491a499E653878464e406202r': {
    id: 1,
    name: 'Another Vault',
    symbol: 'ANT',
    owner
  }
}

const firstBlock = {
  block: {
    logIndex: 0,
    transactionIndex: 0,
    transactionHash:
      '0x3cfb9957565d2b850397234e47642ae748e78234f8feeca862f21dd878d1046e',
    blockHash:
      '0xe5a7586f8456ecbad0f2c6f391c9559e0f2a988757d8fe19867057e9e571ea6f',
    blockNumber: 10,
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    type: 'mined',
    event: 'VaultCreated',
    args: {
      vault: '0x86a1ba4d485ce346bded508e2426798f825558be',
      group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
      owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
      vaultId: '0',
      name: 'First Vault',
      symbol: 'asd'
    }
  },
  label: blockLabels.VAULT
}

const secondBlock = {
  block: {
    logIndex: 0,
    transactionIndex: 0,
    transactionHash:
      '0x3cfb9957565d2b850397234e47642ae748e78234f8feeca862f21dd878d1046e',
    blockHash:
      '0xe5a7586f8456ecbad0f2c6f391c9559e0f2a988757d8fe19867057e9e571ea6f',
    blockNumber: 11,
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    type: 'mined',
    event: 'VaultCreated',
    args: {
      vault: '0x86a1ba4d485ce346bded508e2426798f825558be',
      group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
      owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
      vaultId: '0',
      name: 'Second Vault',
      symbol: 'asd'
    }
  },
  label: blockLabels.VAULT
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
    vaultTest(
      initialState,
      accountMiddlewareMock(actions.registerVault(vault), owner),
      expectedState
    )
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
          vaults: { ...vault, ...secondVault }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(actions.registerVault(secondVault), owner),
      expectedState
    )
  })

  it('adds a vault block to the state', () => {
    const state = {
      accounts: {
        [owner]: {}
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultBlocks: { [firstBlock.block.blockNumber]: firstBlock.block }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(actions.registerVaultBlock(firstBlock), owner),
      expectedState
    )
  })

  it('does not overwrite previous vaultBlocks', () => {
    const state = {
      accounts: {
        [owner]: {
          vaultBlocks: { [firstBlock.block.blockNumber]: firstBlock.block }
        }
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultBlocks: {
            [firstBlock.block.blockNumber]: firstBlock.block,
            [secondBlock.block.blockNumber]: secondBlock.block
          }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(actions.registerVaultBlock(secondBlock), owner),
      expectedState
    )
  })
})
