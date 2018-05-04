import { shallow } from 'enzyme'
import BaseTemplate from './BaseTemplate.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('BaseTemplate component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(<BaseTemplate>Test Content</BaseTemplate>))
    ).toMatchSnapshot()
  })
})
