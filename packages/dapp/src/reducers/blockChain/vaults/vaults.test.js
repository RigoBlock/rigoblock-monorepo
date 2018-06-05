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
const otherVault = {
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
      '0xc77b7d1123ffaada1a18b79112be8fcf7f65e6c9a5e5e93ad81c68be351c45b9',
    blockHash:
      '0x412a477a40ff05d6f9ef2d9db185918d45f950576df55c726f46ced4da2e0bb5',
    blockNumber: 1,
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    type: 'mined',
    event: 'BuyVault'
  },
  label: blockLabels.VAULT
}

const secondBlock = {
  block: {
    logIndex: 0,
    transactionIndex: 0,
    transactionHash:
      '0xc77b7d1123ffaada1a18b79112be8fcf7f65e6c9a5e5e93ad81c68be351c45b9',
    blockHash:
      '0x412a477a40ff05d6f9ef2d9db185918d45f950576df55c726f46ced4da2e0bb5',
    blockNumber: 2,
    address: '0x6dddcaede2071883c85c6e5781524985608d2460',
    type: 'mined',
    event: 'SellVault'
  },
  label: blockLabels.VAULT
}

const middlewareMock = (account, action) => {
  action.account = account
  return action
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
      middlewareMock(owner, actions.addVault(vault)),
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
          vaults: { ...vault, ...otherVault }
        }
      }
    }
    vaultTest(
      state,
      middlewareMock(owner, actions.addVault(otherVault)),
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
          lastBlock: firstBlock.block.blockNumber,
          vaultBlocks: { [firstBlock.block.blockNumber]: firstBlock.block }
        }
      }
    }
    vaultTest(
      state,
      middlewareMock(owner, actions.addRawVault(firstBlock)),
      expectedState
    )
  })

  it('does not overwrite previous vaultBlocks if present but updates lastBlock key', () => {
    const state = {
      accounts: {
        [owner]: {
          vaultBlocks: { [firstBlock.block.blockNumber]: firstBlock.block },
          lastBlock: firstBlock.blockNumber
        }
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultBlocks: {
            [firstBlock.block.blockNumber]: firstBlock.block,
            [secondBlock.block.blockNumber]: secondBlock.block
          },
          lastBlock: secondBlock.block.blockNumber
        }
      }
    }
    vaultTest(
      state,
      middlewareMock(owner, actions.addRawVault(secondBlock)),
      expectedState
    )
  })
})
