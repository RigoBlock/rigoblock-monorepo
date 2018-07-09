import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AccountView from './AccountView.jsx'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore(jest.fn)

const wrapper = mount(
  <Provider store={store}>
    <AccountView />
  </Provider>
)

describe('AccountView component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
