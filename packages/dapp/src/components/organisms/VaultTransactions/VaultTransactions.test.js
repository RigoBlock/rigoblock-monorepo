import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultTransactions from './VaultTransactions.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
      <VaultTransactions vaultAddress="0x86a1ba4d485ce346bded508e2426798f825558be" />
    </MemoryRouter>
  </Provider>
)

describe('VaultTransactions component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
