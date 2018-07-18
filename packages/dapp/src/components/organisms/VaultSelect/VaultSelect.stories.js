import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import VaultSelect from './VaultSelect'
import mockStore, { defaultState } from '../../../fixtures/store'

const locations = {
  firstVault: `${ROUTES.VAULTS}0`,
  secondVault: `${ROUTES.VAULTS}1`
}
const getState = () => ({
  ...defaultState,
  ...{
    routing: {
      location: {
        pathname: selectV2('Location', locations, locations.firstVault)
      }
    }
  }
})

const store = mockStore({ getState })

storiesOf('Organisms/VaultSelect', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultSelect />)
