import { combineEpics } from 'redux-observable'
import blockchain from './blockChain'
import routing from './routing'
import vaults from './vaults'

export default combineEpics(...[...blockchain], ...[...vaults], ...[...routing])
