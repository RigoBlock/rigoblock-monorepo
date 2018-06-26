import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AccountPanel from './AccountPanel.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const mockStore = {
  getState: () => ({
    user: {
      blockChain: {
        accounts: {
          '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196': {
            provider: 'metamask',
            balance: '57999999999960203063'
          },
          '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d': {
            provider: 'metamask',
            balance: '67999999999977505798'
          },
          '0x8bb7481495d45ccd5cffae1c3a84155fea85a323': {
            provider: 'metamask',
            balance: '87999999999999410580'
          }
        }
      }
    }
  }),
  dispatch: jest.fn(),
  subscribe: () => null
}

const wrapper = mount(
  <Provider store={mockStore}>
    <AccountPanel />
  </Provider>
)

describe('AccountPanel component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
