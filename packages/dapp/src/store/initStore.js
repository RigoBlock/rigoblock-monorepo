import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import history from './history'
import rootEpic from '../epics'
import rootReducer from '../reducers'

export default () => {
  let middlewares = []
  let storeCreator = createStore

  middlewares.push(applyMiddleware(createEpicMiddleware(rootEpic)))
  middlewares.push(applyMiddleware(routerMiddleware(history)))

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

  return storeCreator(rootReducer, undefined, compose(...middlewares))
}
