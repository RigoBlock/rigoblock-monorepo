import React from 'react'
import Tab from './Tab.jsx'
import toJson from 'enzyme-to-json'

const formCreatorFunction = () => (
  <div key="test component">Header Component</div>
)
const Header = () => <div>Header Component</div>
const props = {
  Header,
  forms: [formCreatorFunction]
}

describe('Tab component', () => {
  it('renders correctly', () => {
    expect(toJson(createComponentWithProps(Tab, props))).toMatchSnapshot()
  })
})
