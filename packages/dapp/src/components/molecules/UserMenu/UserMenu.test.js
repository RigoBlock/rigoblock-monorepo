import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserMenu from './UserMenu.jsx'

describe('UserMenu component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<UserMenu />))).toMatchSnapshot()
  })
})
