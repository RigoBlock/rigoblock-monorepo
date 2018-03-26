import counter from './counter'
import actions from '../actions/counter-actions'
import deepFreeze from 'deep-freeze'

const reducerTester = function(reducer) {
  return function(currentState, action, expectedState) {
    if (currentState && typeof currentState === 'object') {
      deepFreeze(currentState)
    }
    const newState = reducer(currentState, action)
    return expect(newState).toEqual(expectedState)
  }
}

window.reducerTester = reducerTester

describe('counter reducer', () => {
  const counterReducer = reducerTester(counter)

  it('should return the initial state', () => {
    counterReducer(undefined, {}, 0)
  })

  it('should add 1 to the state when the add action is invoked', () => {
    counterReducer(0, actions.add(), 1)
    counterReducer(1, actions.add(), 2)
  })
})
