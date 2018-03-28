import counter from './counter'
import actions from '../actions/counter-actions'

describe('counter reducer', () => {
  const counterReducer = reducerTester(counter)

  it('should return the initial state', () => {
    counterReducer(undefined, {}, { count: 0 })
  })

  it('should add 1 to the state when the add action is invoked', () => {
    counterReducer({ count: 0 }, actions.add(), { count: 1 })
    counterReducer({ count: 1 }, actions.add(), { count: 2 })
  })
})
