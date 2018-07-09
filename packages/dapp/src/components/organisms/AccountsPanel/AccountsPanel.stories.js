import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountsPanel from './AccountsPanel'
import React from 'react'

const mockStore = {
  getState: () => ({
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
          provider: 'metamask',
          balance: new BigNumber('57999999999960203063')
        },
        '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d': {
          provider: 'metamask',
          balance: new BigNumber('67999999999977505798')
        },
        '0x8bb7481495d45ccd5cffae1c3a84155fea85a323': {
          provider: 'metamask',
          balance: new BigNumber('87999999999999410580')
        }
      }
    }
  }),
  dispatch: () => null,
  subscribe: () => null
}

storiesOf('Organisms/AccountsPanel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add('default', () => <AccountsPanel />)
