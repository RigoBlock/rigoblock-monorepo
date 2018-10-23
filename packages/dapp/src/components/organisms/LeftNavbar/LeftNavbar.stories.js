import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { select, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import LeftNavbar from './LeftNavbar'
import React from 'react'
import mockStore, { defaultState } from '../../../fixtures/store'

const getState = () => ({
  ...defaultState,
  ...{
    routing: {
      location: {
        pathname: select('url', ROUTES, ROUTES.DASHBOARD)
      }
    }
  }
})

const store = mockStore({ getState })

storiesOf('Organisms/LeftNavbar', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <LeftNavbar />)
