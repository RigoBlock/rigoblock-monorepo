import blockChainActions from '../../actions/blockchain-actions'
import blockChainReducer from './blockChain'
import vaultActions from '../../actions/vault-actions'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const provider = 'metamask'
  const eventBlock = {
    address: '0x001',
    args: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: owner,
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    blockNumber: '10'
  }

  it('returns the initial state', () => {
    blockChainTest(
      undefined,
      {},
      {
        accounts: {},
        totalBalance: ''
      }
    )
  })

  it('adds an account to state on login action', () => {
    blockChainTest(
      undefined,
      blockChainActions.blockChainLogIn(provider, owner),
      {
        accounts: {
          [owner]: {
            provider
          }
        },
        totalBalance: ''
      }
    )
  })

  it('updates lastBlock on REGISTER_VAULT_BLOCK action', () => {
    blockChainTest(
      {
        accounts: {
          [owner]: {
            lastBlock: '1'
          }
        },
        totalBalance: ''
      },
      accountMiddlewareMock(vaultActions.registerVaultBlock(eventBlock), owner),
      {
        accounts: {
          [owner]: {
            lastBlock: eventBlock.blockNumber,
            vaultBlocks: {
              [eventBlock.blockNumber]: eventBlock
            }
          }
        },
        totalBalance: ''
      }
    )
  })

  it("doesn't overwrite an account if we log in again with it", () => {
    blockChainTest(
      {
        accounts: {
          [owner]: {
            dummyProp: 'dummyValue'
          }
        },
        totalBalance: ''
      },
      blockChainActions.blockChainLogIn('metamask', owner),
      {
        accounts: {
          [owner]: {
            dummyProp: 'dummyValue'
          }
        },
        totalBalance: ''
      }
    )
  })

  it(`updates total accounts balance whe updateTotalAccountBalance is fired `, () => {
    blockChainTest(
      {
        accounts: {
          [owner]: {
            dummyProp: 'dummyValue'
          }
        },
        totalBalance: ''
      },
      blockChainActions.updateTotalAccountBalance('256.999999999952600881'),
      {
        accounts: {
          [owner]: {
            dummyProp: 'dummyValue'
          }
        },
        totalBalance: '256.999999999952600881'
      }
    )
  })
})
