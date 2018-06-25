import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AccountView from './AccountView.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const mockStore = {
  getState: () => ({
    user: {
      blockChain: {
        accounts: {
          '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196': {
            provider: 'metamask'
          },
          '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d': {
            provider: 'metamask'
          },
          '0x8bb7481495d45ccd5cffae1c3a84155fea85a323': {
            provider: 'metamask'
          },
          '0xe198d98b76c529886affb5a74be8b435624bd310': {
            provider: 'metamask'
          },
          '0x927aa991a628aab6851a890fb790a4a7cd0ec446': {
            provider: 'metamask'
          }
        }
      },
      preferences: {
        currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      }
    }
  }),
  dispatch: jest.fn(),
  subscribe: () => null
}

const wrapper = mount(
  <Provider store={mockStore}>
    <AccountView />
  </Provider>
)

describe('PreferencesForm component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
