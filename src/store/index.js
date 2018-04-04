import { persistStore } from 'redux-persist'
import initStore from './initStore'

export const store = initStore()
export const persistor = persistStore(store)
