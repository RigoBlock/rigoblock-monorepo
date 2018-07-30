import { mount, shallow } from 'enzyme'
import Modal from './Modal.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const dummyComp = <div> hello</div>
const props = { Component: dummyComp, onClickOutside: jest.fn() }

describe('Modal component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Modal, props)))
    ).toMatchSnapshot()
  })

  it('calls onClickOutside when we click on the wrapper area', () => {
    const modal = mount(createComponentWithProps(Modal, props))
    const wrapper = modal.find('.modal-wrapper')
    wrapper.simulate('click')
    expect(props.onClickOutside).toHaveBeenCalledTimes(1)
  })

  it('does not call onClickOutside when we click on the content area', () => {
    const modal = mount(createComponentWithProps(Modal, props))
    const content = modal.find('.modal-content')
    content.simulate('click')
    expect(props.onClickOutside).toHaveBeenCalledTimes(0)
  })
})
