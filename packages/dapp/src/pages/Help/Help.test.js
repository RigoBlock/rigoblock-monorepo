import { shallow } from 'enzyme'
import Help from './Help.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('Help page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Help />))).toMatchSnapshot()
  })
})
