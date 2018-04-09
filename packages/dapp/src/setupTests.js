import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import deepFreeze from 'deep-freeze'

configure({ adapter: new Adapter() })

global.reducerTester = reducer => (currentState, action, expectedState) => {
  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState)
  }
  const newState = reducer(currentState, action)
  return expect(newState).toEqual(expectedState)
}
