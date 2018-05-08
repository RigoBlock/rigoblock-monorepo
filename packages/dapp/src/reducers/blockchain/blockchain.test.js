import actions from '../../actions/blockchain-actions'
import blockChainReducer from './blockchain'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)

  it('returns the initial state', () => {
    blockChainTest(undefined, {}, { account: '' })
  })

  it('saves the default account number to the state', () => {
    const account = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    blockChainTest(undefined, actions.blockChainLogIn(account), {
      account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    })
  })

  it('clears account number on logout', () => {
    blockChainTest(undefined, actions.blockChainLogout(), {
      account: ''
    })
  })
})
