import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Help from './Help.jsx'

describe('Help page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Help />))).toMatchSnapshot()
  })
})
