import * as ROUTES from '../../../constants/routes'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultSelect from './VaultSelect.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore(jest.fn)

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
    },
    routing: {
      location: {
        pathname: ROUTES.VAULTS
      }
    }
  })
}

const wrapper = mount(
  <Provider store={store}>
    <VaultSelect />
  </Provider>
)

const noVaultWrapper = mount(
  <Provider store={noVaultsStore}>
    <VaultSelect />
  </Provider>
)

describe('VaultSelect component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders correctly if there are no vaults on state', () => {
    expect(toJson(noVaultWrapper)).toMatchSnapshot()
  })
})
