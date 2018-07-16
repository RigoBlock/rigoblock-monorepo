import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import VaultTransactions from './VaultTransactions.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const wrapper = shallow(
  <Provider store={store}>
    <VaultTransactions />
  </Provider>
)

describe('VaultTransactions component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
