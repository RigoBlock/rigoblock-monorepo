import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import blockChain from './blockchain'
import globalReducer from './global'

export default combineReducers({
  blockChain,
  globalReducer,
  routing
})
