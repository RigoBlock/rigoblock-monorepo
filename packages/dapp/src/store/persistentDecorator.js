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
    // we are converting the state object that is returned from the root reducer
    // from immutable to regular object. This is so that redux persist can work correctly
    // with updeep, otherwise it tries to add a property onto the state object and fails.
    (state, action) => ({
      ...reducer.apply(this, [state, action])
    })
  )
  return newReducer
}
