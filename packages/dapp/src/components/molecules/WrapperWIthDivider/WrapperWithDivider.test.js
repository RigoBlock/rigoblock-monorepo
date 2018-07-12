import { shallow } from 'enzyme'
import React from 'react'
import WrapperWithDivider from './WrapperWithDivider.jsx'
import toJson from 'enzyme-to-json'

const children = [
  <div className="first-children" key="asd" />,
  <div className="second-children" key="asd" />,
  <div className="third-children" key="asd" />,
  <div className="fourth-children" key="asd" />
]
const Divider = () => <div className="divider-div" />
const props = { children, Divider }

describe('WrapperWithDivider component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(WrapperWithDivider, props)))
    ).toMatchSnapshot()
  })
})
