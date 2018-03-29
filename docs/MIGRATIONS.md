# Creating a database migration


We are using [redux-persist](https://github.com/rt2zz/redux-persist) and [localforage](https://github.com/localForage/localForage) to manage store persistence on IndexedDB.

This is the folder structure of a sample counter reducer.

```
 reducers
 └──  counter
      ├── counter.js
      ├── counter.migrations.js
      ├── counter.test.js
      └── index.js
```
Each reducer will have its migrations exported as a JavaScript object, with each key being a different version returning the new state.

```js
// counter.migrations.js
const migrations = {
  0: state => {
    const newState = {
      ...state,
      test: 150
    }
    return newState
  }
}

export default migrations
```
When we export the reducer, we pass it through the persistentDecorator function together with its migrations and the version we want to use.


```js
// persistentDecorator.js

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


// counter.js
import persistentDecorator from '../../store/persistentDecorator'
import migrations from './counter.migrations'

const VERSION = 0

function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case actionTypes.COUNTER_ADD:
      return {
        ...state,
        count: state.count + action.amount
      }
    default:
      return state
  }
}

export default persistentDecorator(counter, 'counter', migrations, VERSION)
```

