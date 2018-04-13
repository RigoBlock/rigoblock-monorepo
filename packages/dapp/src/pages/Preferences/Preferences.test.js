import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Preferences from './Preferences.jsx'

describe('Preferences page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Preferences />))).toMatchSnapshot()
  })
})
