import { persistReducer } from 'redux-persist'
import localforage from 'localforage'

localforage.config({
  storeName: 'rigoblock'
})

export default (reducer, key) =>
  persistReducer(
    {
      key,
      storage: localforage
    },
    reducer
  )
