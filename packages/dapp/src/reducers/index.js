import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import blockChain from './blockChain'
import globalReducer from './global'
import persistentDecorator from '../store/persistentDecorator'
import preferences from './preferences'

// const blockChain = combineReducers({ blockChainReducer, vaults })

const user = persistentDecorator(
  combineReducers({ preferences, blockChain }),
  'user'
)

export default combineReducers({
  globalReducer,
  user,
  form,
  routing
})
