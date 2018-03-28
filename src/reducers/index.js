import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import secondCounter from './secondCounter'

export default combineReducers({
  counter,
  secondCounter,
  routing
})
