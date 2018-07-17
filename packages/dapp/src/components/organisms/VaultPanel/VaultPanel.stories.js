import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultList from './VaultList'
import mockStore from '../../../fixtures/store'

const store = mockStore()

storiesOf('Organisms/VaultList', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultList />)
