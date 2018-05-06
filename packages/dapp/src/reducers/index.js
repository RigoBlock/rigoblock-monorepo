import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import globalReducer from './global'

export default combineReducers({
  counter,
  globalReducer,
  routing
})
