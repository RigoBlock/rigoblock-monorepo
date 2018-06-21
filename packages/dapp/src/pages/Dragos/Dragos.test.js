import { shallow } from 'enzyme'
import Dragos from './Dragos.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('Dragos page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Dragos />))).toMatchSnapshot()
  })
})
