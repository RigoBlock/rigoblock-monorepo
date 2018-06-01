import actions from '../../actions/blockchain-actions'
import blockChainReducer from './blockChain'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)

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
      actions.blockChainLogIn(
        'Metamask/4.6.1',
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      ),
      { accounts: { '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {} } }
    )
  })

  it("doesn't overwrite an account if we log in again with it", () => {
    blockChainTest(
      {
        accounts: {
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
            dummyProp: 'dummyValue'
          }
        }
      },
      actions.blockChainLogIn(
        'Metamask/4.6.1',
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      ),
      {
        accounts: {
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
            dummyProp: 'dummyValue'
          }
        }
      }
    )
  })
})
