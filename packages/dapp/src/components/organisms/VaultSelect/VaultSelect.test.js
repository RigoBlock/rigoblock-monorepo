import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultSelect from './VaultSelect.jsx'
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
    },
    routing: {
      location: {
        pathname: ROUTES.VAULTS
      }
    }
  })
}

const wrongUrlStore = {
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
        pathname: `${ROUTES.VAULTS}/0`
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

const wrongUrlWrapper = mount(
  <Provider store={wrongUrlStore}>
    <MemoryRouter keyLength={0}>
      <VaultSelect />
    </MemoryRouter>
  </Provider>
)

describe('VaultSelect component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders correctly if there are no vaults on state', () => {
    expect(toJson(noVaultWrapper)).toMatchSnapshot()
  })

  it("redirects if no vaults are present but we try to access a vault's address", () => {
    expect(toJson(wrongUrlWrapper)).toMatchSnapshot()
  })
})
