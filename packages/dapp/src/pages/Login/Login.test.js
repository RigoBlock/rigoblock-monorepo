import { shallow } from 'enzyme'
import Login from './Login.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('Login page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Login />))).toMatchSnapshot()
  })
})
