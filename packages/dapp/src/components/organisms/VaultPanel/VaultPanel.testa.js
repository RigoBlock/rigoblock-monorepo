import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultPanel from './VaultPanel.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
      <VaultPanel />
    </MemoryRouter>
  </Provider>
)

describe('VaultPanel component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
