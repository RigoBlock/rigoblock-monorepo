import { bigNumberTransform } from './transforms'
import { createMigrate, persistReducer } from 'redux-persist'
import localforage from 'localforage'

localforage.config({
  storeName: 'rigoblock'
})

export default (
  reducer,
  key,
  blacklist = [],
  migrations = null,
  version = -1
) => {
  const newReducer = persistReducer(
    {
      key,
      version: version,
      storage: localforage,
      transforms: [bigNumberTransform],
      blacklist,
      migrate: createMigrate(migrations, {
        debug: process.env.NODE_ENV === 'development'
      })
    },
    reducer
  )
  return newReducer
}
