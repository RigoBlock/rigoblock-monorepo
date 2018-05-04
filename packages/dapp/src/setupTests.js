import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import deepFreeze from 'deep-freeze'

configure({ adapter: new Adapter() })

global.createComponentWithProps = (Component, props) => <Component {...props} />
global.createComponentWithProps.displayName = 'testComponent'

global.reducerTester = reducer => (currentState, action, expectedState) => {
  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState)
  }
  const newState = reducer(currentState, action)
  return expect(newState).toEqual(expectedState)
}
