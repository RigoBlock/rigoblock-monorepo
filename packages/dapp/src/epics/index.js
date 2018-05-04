import { combineEpics } from 'redux-observable'
import blockchain from './blockchain'
import counter from './counter'

export default combineEpics(...[...counter, ...blockchain])
