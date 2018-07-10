import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AccountsPanel from './AccountsPanel.jsx'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

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
