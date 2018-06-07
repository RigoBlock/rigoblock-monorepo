import actions from '../../actions/blockchain-actions'
import globalReducer from './global'

describe('global reducer', () => {
  const globalTest = reducerTester(globalReducer)

  it('returns the initial state', () => {
    globalTest(undefined, {}, { error: '' })
  })

  it('adds new errors to the state', () => {
    const err = new Error('test error')
    globalTest(undefined, actions.blockChainError(err), {
      error: err.toString()
    })
  })
})
