import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Usermenu from './Usermenu.jsx'

describe('Usermenu component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<Usermenu />))).toMatchSnapshot()
  })
})
