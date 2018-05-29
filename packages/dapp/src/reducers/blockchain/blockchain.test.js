import blockChainReducer from './blockchain'

describe('blockchain reducer', () => {
  const blockChainTest = reducerTester(blockChainReducer)

  it('returns the initial state', () => {
    blockChainTest(undefined, {}, {})
  })
})
