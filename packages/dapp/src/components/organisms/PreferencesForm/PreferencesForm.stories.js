import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import PreferencesForm from './PreferencesForm'
import React from 'react'
import mockStore, { defaultState } from '../../../fixtures/store'

const getState = () => ({
  ...defaultState,
  ...{
    form: {
      preferences: {
        values: {
          timezone: 'GMT +02:00'
        }
      }
    }
  }
})

const store = mockStore({ getState })
storiesOf('Organisms/PreferencesForm', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <PreferencesForm />)
