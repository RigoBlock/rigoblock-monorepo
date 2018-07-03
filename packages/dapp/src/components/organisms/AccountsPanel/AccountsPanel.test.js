import { Provider } from 'react-redux'
import { mockStore } from '../../../constants/utils'
import { mount } from 'enzyme'
import AccountsPanel from './AccountsPanel.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const store = mockStore(jest.fn)

const wrapper = mount(
  <Provider store={store}>
    <AccountsPanel />
  </Provider>
)

describe('AccountsPanel component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
