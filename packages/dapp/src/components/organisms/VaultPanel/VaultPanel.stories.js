import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import VaultPanel from './VaultPanel'
import mockStore, { defaultState } from '../../../fixtures/store'

const vaultUrls = {
  firstVault: `${ROUTES.VAULTS}/0`,
  secondVault: `${ROUTES.VAULTS}/1`
}

const getState = () => ({
  ...defaultState,
  ...{
    routing: {
      location: {
        pathname: selectV2('url', vaultUrls, vaultUrls.firstVault)
      }
    }
  }
})

const store = mockStore({ getState })

storiesOf('Organisms/VaultPanel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultPanel />)
