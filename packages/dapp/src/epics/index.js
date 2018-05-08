import { combineEpics } from 'redux-observable'
import blockchain from './blockchain'

export default combineEpics(...[...blockchain])
