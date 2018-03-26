import counter from './counter'
import actions from '../actions/counter-actions'

describe('counter reducer', () => {
  it('should return the initial state', () => {
    expect(counter(undefined, {})).toEqual(0)
  })

  it('should add 1 to the state when the add action is invoked', () => {
    expect(counter(undefined, actions.add())).toEqual(1)
    expect(counter(1, actions.add())).toEqual(2)
  })
})
