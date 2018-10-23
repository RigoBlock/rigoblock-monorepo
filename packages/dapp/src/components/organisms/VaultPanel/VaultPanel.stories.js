import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { INVESTOR, MANAGER } from '../../../constants/user'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { select, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import VaultPanel from './VaultPanel'
import mockStore, { defaultState } from '../../../fixtures/store'

const userTypes = {
  Manager: MANAGER,
  Investor: INVESTOR
}

const vaultUrls = {
  firstVault: `${ROUTES.VAULTS}/0`,
  secondVault: `${ROUTES.VAULTS}/1`
}

const getState = () => ({
  ...defaultState,
  ...{
    routing: {
      location: {
        pathname: select('url', vaultUrls, vaultUrls.firstVault)
      }
    },
    preferences: {
      currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
      timezone: '+02:00',
      type: select('userType', userTypes, userTypes.Investor)
    }
  }
})

const store = mockStore({ getState })

storiesOf('Organisms/VaultPanel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultPanel />)
