import '../../_settings/_base.scss'
import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { select, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import BaseTemplate from './BaseTemplate'
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

storiesOf('Templates/BaseTemplate', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <Provider store={store}>
      <MemoryRouter>{story()}</MemoryRouter>
    </Provider>
  ))
  .add('default', () => <BaseTemplate>Base template children</BaseTemplate>)
