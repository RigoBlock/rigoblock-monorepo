import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultList from './VaultList.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const noVaultsStore = {
  ...store,
  getState: () => ({
    preferences: {
      currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
    },
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {}
      }
    }
  })
}

const wrapper = mount(
  <Provider store={store}>
    <VaultList />
  </Provider>
)

const noVaultWrapper = mount(
  <Provider store={noVaultsStore}>
    <VaultList />
  </Provider>
)

describe('VaultList component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders correctly if there are no vaults on state', () => {
    expect(toJson(noVaultWrapper)).toMatchSnapshot()
  })
})
