import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountPanel from './AccountPanel'
import React from 'react'

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
  dispatch: () => null,
  subscribe: () => null
}

storiesOf('Organisms/AccountPanel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add('default', () => <AccountPanel />)
