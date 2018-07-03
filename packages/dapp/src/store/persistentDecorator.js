import { bigNumberTransform } from './transforms'
import { createMigrate, persistReducer } from 'redux-persist'
import localforage from 'localforage'

localforage.config({
  storeName: 'rigoblock'
})

export default (reducer, key, migrations = null, version = -1) =>
  persistReducer(
    {
      key,
      version: version,
      storage: localforage,
      transforms: [bigNumberTransform],
      migrate: createMigrate(migrations, {
        debug: process.env.NODE_ENV === 'development'
      })
    },
    reducer
  )
