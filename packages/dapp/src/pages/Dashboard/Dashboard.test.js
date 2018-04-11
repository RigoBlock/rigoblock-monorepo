import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Dashboard from './Dashboard.jsx'

describe('Dashboard component', () => {
  const createComponentWithTitle = (title = 'RigoBlock') => {
    return <Dashboard title={title} />
  }

  it('renders correctly', () => {
    expect(toJson(shallow(createComponentWithTitle()))).toMatchSnapshot()
  })
})
