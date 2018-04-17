import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ItemValue from './ItemValue.jsx'

describe('ItemValue component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<ItemValue />))).toMatchSnapshot()
  })
})
