import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'

export default (initialState = {}) => {
  let middlewares = []
  let storeCreator = createStore

  if (window !== null && window.devToolsExtension) {
    middlewares.push(window.devToolsExtension())
  }

  if (process.env.NODE_ENV !== 'production') {
    const Reactotron = require('reactotron-react-js').default
    const { reactotronRedux } = require('reactotron-redux')
    Reactotron.configure()
      .use(reactotronRedux())
      .connect()
    storeCreator = Reactotron.createStore
  }

  return storeCreator(rootReducer, initialState, compose(...middlewares))
}
