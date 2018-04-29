import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LeftNavbar from './LeftNavbar.jsx'

describe('LeftNavbar component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<LeftNavbar />))).toMatchSnapshot()
  })
})
