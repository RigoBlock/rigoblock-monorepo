import blockChainReducer from './blockchain'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)
  const initialState = {
    lastBlock: null
  }

  it('returns the initial state', () => {
    blockChainTest(undefined, {}, initialState)
  })
})
