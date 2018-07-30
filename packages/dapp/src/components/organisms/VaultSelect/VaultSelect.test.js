import * as ROUTES from '../../../constants/routes'
import { MANAGER } from '../../../constants/user'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

describe('VaultSelect component', () => {
  const store = mockStore({ mockFn: jest.fn })

  const apiMock = {
    contract: {
      DragoRegistry: {
        address: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52la4',
        createAndValidate: jest.fn()
      }
    },
    web3: {
      '._web3': {}
    }
  }

  let VaultSelect

  const noVaultsStore = {
    ...store,
    getState: () => ({
      preferences: {
        currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        type: MANAGER
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
        currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
        type: MANAGER
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

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../api', () => apiMock)

    VaultSelect = require('./VaultSelect').default
  })

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VaultSelect />
      </Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders correctly if there are no vaults on state', () => {
    const noVaultWrapper = mount(
      <Provider store={noVaultsStore}>
        <VaultSelect />
      </Provider>
    )
    expect(toJson(noVaultWrapper)).toMatchSnapshot()
  })

  it("redirects if no vaults are present but we try to access a vault's address", () => {
    const wrongUrlWrapper = mount(
      <Provider store={wrongUrlStore}>
        <MemoryRouter keyLength={0}>
          <VaultSelect />
        </MemoryRouter>
      </Provider>
    )
    expect(toJson(wrongUrlWrapper)).toMatchSnapshot()
  })
})
