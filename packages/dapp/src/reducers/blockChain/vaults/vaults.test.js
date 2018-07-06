import { ETH } from '../../../constants/blockchain'
import BigNumber from 'bignumber.js'
import actions from '../../../actions/vault-actions'
import vaultReducer from './vaults'

const initialState = {
  accounts: {}
}
const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
const totalSupply = new BigNumber('14')

const vault = {
  '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e': {
    id: 0,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    owner
  }
}
const vaultWithSupply = {
  '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e': {
    id: 0,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    owner,
    totalSupply
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
}

const secondBlock = {
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
}

const vaultTransaction = {
  hash: '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69',
  vault: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
  data: {
    date: 1530698497000,
    type: 'Deposit',
    symbol: ETH,
    value: '3000000000000000000',
    units: '3000000',
    account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
  }
}

const secondVaultTransaction = {
  hash: '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda1111111c26e68',
  vault: '0x03910164aa522fb1a68bebea515e54610e4a9b94',
  data: {
    date: 1530698497123,
    type: 'Withdraw',
    symbol: ETH,
    value: '1000000000000000000',
    units: '1000000',
    account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
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
          vaultBlocks: { [firstBlock.blockNumber]: firstBlock }
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
          vaultBlocks: { [firstBlock.blockNumber]: firstBlock }
        }
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultBlocks: {
            [firstBlock.blockNumber]: firstBlock,
            [secondBlock.blockNumber]: secondBlock
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

  it('updates vault data', () => {
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
          vaults: { ...vaultWithSupply }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(
        actions.updateVaultData({
          address: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
          totalSupply
        }),
        owner
      ),
      expectedState
    )
  })

  it('saves a vault transaction', () => {
    const state = {
      accounts: {
        [owner]: {}
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultTransactions: {
            '0x03910164aa522fb1a68bebea515e54610e4a9b94': {
              '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69': {
                date: 1530698497000,
                type: 'Deposit',
                symbol: ETH,
                value: '3000000000000000000',
                units: '3000000',
                account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
              }
            }
          }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(
        actions.registerTransaction(vaultTransaction),
        owner
      ),
      expectedState
    )
  })

  it('does not overwrite previous transactions', () => {
    const state = {
      accounts: {
        [owner]: {
          vaultTransactions: {
            '0x03910164aa522fb1a68bebea515e54610e4a9b94': {
              '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69': {
                date: 1530698497000,
                type: 'Deposit',
                symbol: ETH,
                value: '3000000000000000000',
                units: '3000000',
                account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
              }
            }
          }
        }
      }
    }
    const expectedState = {
      accounts: {
        [owner]: {
          vaultTransactions: {
            '0x03910164aa522fb1a68bebea515e54610e4a9b94': {
              '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda8541b37c26e69': {
                date: 1530698497000,
                type: 'Deposit',
                symbol: ETH,
                value: '3000000000000000000',
                units: '3000000',
                account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
              },
              '0x9b0fa2f07100ccb96a75d975252553d27d3aef14c0dc9b5fbda1111111c26e68': {
                date: 1530698497123,
                type: 'Withdraw',
                symbol: ETH,
                value: '1000000000000000000',
                units: '1000000',
                account: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
              }
            }
          }
        }
      }
    }
    vaultTest(
      state,
      accountMiddlewareMock(
        actions.registerTransaction(secondVaultTransaction),
        owner
      ),
      expectedState
    )
  })
})
