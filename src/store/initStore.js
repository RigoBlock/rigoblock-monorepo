import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import history from './history'

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

  return storeCreator(rootReducer, undefined, compose(...middlewares))
}
