import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
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
