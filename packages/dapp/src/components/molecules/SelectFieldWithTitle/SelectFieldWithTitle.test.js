import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { reduxForm } from 'redux-form'
import React from 'react'
import SelectFieldWithTitle from './SelectFieldWithTitle.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const props = {
  tooltip: 'this is a test tooltip',
  title: 'Pay [mining] fees with',
  fieldName: 'accountList',
  fieldProps: {
    id: '1',
    items: [
      'MetaMask **** 1604',
      'MetaMask **** 1605',
      'MetaMask **** 1606',
      'MetaMask **** 1607'
    ]
  }
}

const WrappedComponent = reduxForm({ form: 'storyForm' })(SelectFieldWithTitle)
const wrapper = mount(
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
)

describe('SelectFieldWithTitle component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
