import { shallow } from 'enzyme'
import LeftNavbar from './LeftNavbar.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('LeftNavbar component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<LeftNavbar />))).toMatchSnapshot()
  })
})
