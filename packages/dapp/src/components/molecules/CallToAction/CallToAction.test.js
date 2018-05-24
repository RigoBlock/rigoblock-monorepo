import { shallow } from 'enzyme'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from './CallToAction.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const testFunction = () => null

const buttons = [
  <Button key={1} appearance={BUTTON_TYPES.PRIMARY} onClick={testFunction}>
    Cancel
  </Button>,
  <Button key={2} appearance={BUTTON_TYPES.INVERTED} onClick={testFunction}>
    Save
  </Button>
]
const props = {
  children: buttons
}

describe('CallToAction component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(CallToAction, props)))
    ).toMatchSnapshot()
  })
})
