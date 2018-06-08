import blockChainActions from '../../actions/blockchain-actions'
import blockChainReducer from './blockChain'
import vaultActions from '../../actions/vault-actions'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
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
        accounts: {}
      }
    )
  })

  it('adds an account to state on login action', () => {
    blockChainTest(
      undefined,
      blockChainActions.blockChainLogIn('Metamask/4.6.1', owner),
      { accounts: { [owner]: {} } }
    )
  })

  it('updates lastBlock on REGISTER_VAULT_BLOCK action', () => {
    blockChainTest(
      {
        accounts: {
          [owner]: {
            lastBlock: '1'
          }
        }
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
        }
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
        }
      },
      blockChainActions.blockChainLogIn('Metamask/4.6.1', owner),
      {
        accounts: {
          [owner]: {
            dummyProp: 'dummyValue'
          }
        }
      }
    )
  })
})
