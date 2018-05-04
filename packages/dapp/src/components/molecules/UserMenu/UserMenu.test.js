import { shallow } from 'enzyme'
import React from 'react'
import UserMenu from './UserMenu.jsx'
import toJson from 'enzyme-to-json'

describe('UserMenu component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<UserMenu />))).toMatchSnapshot()
  })
})
