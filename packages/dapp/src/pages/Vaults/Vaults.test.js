import { shallow } from 'enzyme'
import React from 'react'
import Vaults from './Vaults.jsx'
import toJson from 'enzyme-to-json'

describe('Vaults page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Vaults />))).toMatchSnapshot()
  })
})
