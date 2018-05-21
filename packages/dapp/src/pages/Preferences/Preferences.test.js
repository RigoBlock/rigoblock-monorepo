import { shallow } from 'enzyme'
import Preferences from './Preferences.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe.skip('Preferences page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Preferences />))).toMatchSnapshot()
  })
})
