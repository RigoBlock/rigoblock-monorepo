import actions from '../../actions/global-actions'
import globalReducer from './global'

describe('global reducer', () => {
  const globalTest = reducerTester(globalReducer)

  it('returns the initial state', () => {
    globalTest(undefined, {}, { error: '', account: '' })
  })

  it('adds new errors to the state', () => {
    const err = new Error('test error')
    globalTest(undefined, actions.blockChainError(err), {
      error: err.toString(),
      account: ''
    })
  })
  it('saves the default account number to the state', () => {
    const account = '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    globalTest(undefined, actions.blockChainLogIn(account), {
      error: '',
      account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    })
  })
  it('clears account number on logout', () => {
    globalTest(undefined, actions.blockChainLogout(), {
      error: '',
      account: ''
    })
  })
})
