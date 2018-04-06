import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App.jsx'

describe('App component', () => {
  const createComponentWithTitle = (title = 'RigoBlock') => {
    return <App title={title} />
  }

  it('renders correctly', () => {
    expect(toJson(shallow(createComponentWithTitle()))).toMatchSnapshot()
  })
})
