import { createStore } from 'redux'
import rootReducer from '../reducers/index'

export default (initialState = 0) => {
  const storeEnhancer =
    typeof window !== 'undefined' && window.devToolsExtension
      ? window.devToolsExtension()
      : undefined
  const store = createStore(rootReducer, initialState, storeEnhancer)
  return store
}
