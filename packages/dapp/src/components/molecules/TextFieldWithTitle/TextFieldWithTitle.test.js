import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { reduxForm } from 'redux-form'
import React from 'react'
import TextFieldWithTitle from './TextFieldWithTitle.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const props = {
  tooltip: "Write here the vault's name",
  title: 'Vault name',
  fieldName: 'vaultName',
  fieldProps: {
    id: 'testTextField',
    fullWidth: false,
    size: 10
  }
}

const WrappedComponent = reduxForm({ form: 'storyForm' })(TextFieldWithTitle)
const wrapper = mount(
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
)

describe('TextFieldWithTitle component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
