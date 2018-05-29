import persistentDecorator from '../../store/persistentDecorator'

const initialState = {}

function blockChainReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default persistentDecorator(blockChainReducer, 'blockChain')
