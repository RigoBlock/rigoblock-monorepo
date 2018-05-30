import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import blockChain from './blockchain'
import globalReducer from './global'
import user from './user'
import vaults from './vault'

export default combineReducers({
  blockChain,
  globalReducer,
  user,
  form,
  routing,
  vaults
})
