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
      migrate: createMigrate(migrations, { debug: true })
    },
    reducer
  )
