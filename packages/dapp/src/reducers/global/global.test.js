import blockChainActions from '../../actions/blockchain-actions'
import globalActions from '../../actions/global-actions'
import globalReducer from './global'

describe('global reducer', () => {
  const globalTest = reducerTester(globalReducer)

  it('returns the initial state', () => {
    globalTest(undefined, {}, { error: '', modalComponent: null })
  })

  it('adds new errors to the state', () => {
    const err = new Error('test error')
    globalTest(undefined, blockChainActions.blockChainError(err.toString()), {
      error: err.toString(),
      modalComponent: null
    })
  })

  it('adds the modal component to the state', () => {
    globalTest(undefined, globalActions.openModal(() => 'mycomp'), {
      error: '',
      modalComponent: 'mycomp'
    })
  })

  it('removes the modal component from the state', () => {
    globalTest(
      { modalComponent: () => 'something' },
      globalActions.closeModal(),
      {
        modalComponent: null
      }
    )
  })
})
