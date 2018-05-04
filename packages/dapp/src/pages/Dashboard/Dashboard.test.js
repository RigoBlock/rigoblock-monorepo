import { shallow } from 'enzyme'
import Dashboard from './Dashboard.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('Dashboard component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Dashboard />))).toMatchSnapshot()
  })
})
