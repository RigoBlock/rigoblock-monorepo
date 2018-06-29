import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import BaseTemplate from './BaseTemplate'
import React from 'react'

const mockStore = {
  getState: () => ({
    user: {
      blockChain: {
        accounts: {
          '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196': {
            provider: 'metamask'
          }
        }
      },
      preferences: {
        currentAccount: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
      }
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

storiesOf('Templates/BaseTemplate', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <Provider store={mockStore}>
      <MemoryRouter>{story()}</MemoryRouter>
    </Provider>
  ))
  .add('default', () => <BaseTemplate>Base template children</BaseTemplate>)
