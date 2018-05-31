import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import blockChain from './blockchain'
import globalReducer from './global'
import preferences from './preferences'

export default combineReducers({
  globalReducer,
  user: combineReducers({
    preferences,
    blockChain
  }),
  form,
  routing
})
