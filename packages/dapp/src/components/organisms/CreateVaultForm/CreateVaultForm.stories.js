import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import CreateVaultForm from './CreateVaultForm'
import React from 'react'
import mockStore, { defaultState } from '../../../fixtures/store'

const accounts = {
  first: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
  second: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d',
  third: '0x8bb7481495d45ccd5cffae1c3a84155fea85a323'
}

const getState = () => ({
  ...defaultState,
  ...{
    form: {
      createVault: {
        values: {
          accountNumber: selectV2('account number', accounts, accounts.first),
          vaultName: text('vault name', 'RigoVault'),
          vaultSymbol: text('vault symbol', 'VLT')
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
