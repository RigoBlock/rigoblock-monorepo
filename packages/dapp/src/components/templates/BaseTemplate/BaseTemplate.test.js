import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BaseTemplate from './BaseTemplate.jsx'

describe('BaseTemplate component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(<BaseTemplate>Test Content</BaseTemplate>))
    ).toMatchSnapshot()
  })
})
