import { shallow } from 'enzyme'
import React from 'react'
import TopNavbar from './TopNavbar.jsx'
import toJson from 'enzyme-to-json'

describe('TopNavbar component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<TopNavbar />))).toMatchSnapshot()
  })
})
