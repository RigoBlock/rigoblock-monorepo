import * as ROUTES from '../../../constants/routes'
import { BigNumber } from 'bignumber.js'
import { MANAGER } from '../../../constants/user'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultPanel from './VaultPanel.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

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

const noTransactionsStore = {
  ...store,
  getState: () => ({
    preferences: {
      currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
      type: MANAGER
    },
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
          vaults: {
            '0x86a1ba4d485ce346bded508e2426798f825558be': {
              id: new BigNumber('0'),
              name: 'First Vault',
              symbol: 'asd',
              owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
              group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
              totalSupply: new BigNumber('28640000000000000000'),
              transactionFee: new BigNumber('2.50')
            }
          }
        }
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
    <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
      <VaultPanel />
    </MemoryRouter>
  </Provider>
)

const noVaultsWrapper = mount(
  <Provider store={noVaultsStore}>
    <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
      <VaultPanel />
    </MemoryRouter>
  </Provider>
)

const noTransactionsWrapper = mount(
  <Provider store={noTransactionsStore}>
    <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
      <VaultPanel />
    </MemoryRouter>
  </Provider>
)

describe('VaultPanel component', () => {
  it('renders correctly if vaults and transactions are present', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders nothing if no vaults are present', () => {
    expect(toJson(noVaultsWrapper)).toMatchSnapshot()
  })

  it('renders correctly if vaults are present but no transactions', () => {
    expect(toJson(noTransactionsWrapper)).toMatchSnapshot()
  })
})
