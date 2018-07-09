import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { BigNumber } from 'bignumber.js'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import LeftNavbar from './LeftNavbar'
import React from 'react'

const mockStore = {
  getState: () => ({
    blockChain: {
      accounts: {
        '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196': {
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
    },
    preferences: {
      currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
    },
    routing: {
      location: {
        pathname: selectV2('url', ROUTES, ROUTES.DASHBOARD)
      }
    }
  }),
  dispatch: () => null,
  subscribe: () => null
}

storiesOf('Organisms/LeftNavbar', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add('default', () => <LeftNavbar />)
