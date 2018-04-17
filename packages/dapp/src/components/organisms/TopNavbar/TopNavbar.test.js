import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TopNavbar from './TopNavbar.jsx'

describe('TopNavbar component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<TopNavbar />))).toMatchSnapshot()
  })
})
