import { createStore } from 'redux'
import rootReducer from '../reducers/index'

export default (initialState = {}) => {
  const storeEnhancer =
    typeof window !== 'undefined' && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f
  const store = createStore(rootReducer, initialState, storeEnhancer)
  return store
}
