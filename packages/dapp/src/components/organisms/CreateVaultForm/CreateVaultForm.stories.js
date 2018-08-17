import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import CreateVaultForm from './CreateVaultForm'
import React from 'react'
import mockStore, { defaultState } from '../../../fixtures/store'

const getState = () => ({
  ...defaultState,
  ...{
    form: {
      createVault: {
        values: {
          accountNumber: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
          vaultName: 'New vault',
          vaultSymbol: 'VLT'
        }
      }
    }
  }
})

const store = mockStore({ getState })

storiesOf('Organisms/CreateVaultForm', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <CreateVaultForm />)
