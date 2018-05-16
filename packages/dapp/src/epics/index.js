import { combineEpics } from 'redux-observable'
import blockchain from './blockchain'
import routing from './routing'

export default combineEpics(...[...blockchain], ...[...routing])
