import FormModal from './FormModal.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const header = () => <div>Header Component</div>
const form = () => <div>Header Component</div>
const props = {
  Header: header,
  Form: form
}

describe('FormModal component', () => {
  it('renders correctly', () => {
    expect(toJson(createComponentWithProps(FormModal, props))).toMatchSnapshot()
  })
})
