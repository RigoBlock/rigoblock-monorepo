import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'
import history from './history'

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let middlewares = []
  let storeCreator = createStore

  if (window !== null && window.devToolsExtension) {
    middlewares.push(window.devToolsExtension())
  }

  middlewares.push(applyMiddleware(routerMiddleware(history)))

  if (process.env.NODE_ENV !== 'production') {
    const Reactotron = require('reactotron-react-js').default
    const { reactotronRedux } = require('reactotron-redux')
    Reactotron.configure()
      .use(reactotronRedux())
      .connect()
    storeCreator = Reactotron.createStore
  }

  return storeCreator(persistedReducer, undefined, compose(...middlewares))
}
