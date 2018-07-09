import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import blockChain from './blockChain'
import globalReducer from './global'
import preferences from './preferences'

export default combineReducers({
  globalReducer,
  blockChain,
  preferences,
  form,
  routing
})
