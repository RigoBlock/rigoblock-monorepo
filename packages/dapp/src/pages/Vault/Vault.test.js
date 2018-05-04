import { shallow } from 'enzyme'
import React from 'react'
import Vault from './Vault.jsx'
import toJson from 'enzyme-to-json'

describe('Vault page', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Vault />))).toMatchSnapshot()
  })
})
