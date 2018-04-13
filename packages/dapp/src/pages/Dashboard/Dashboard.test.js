import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Dashboard from './Dashboard.jsx'

describe('Dashboard component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Dashboard />))).toMatchSnapshot()
  })
})
