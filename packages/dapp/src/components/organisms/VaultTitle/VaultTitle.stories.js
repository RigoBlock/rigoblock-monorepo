import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultTitle from './VaultTitle'
import mockStore from '../../../fixtures/store'

const store = mockStore()
const props = { vaultAddress: '0x86a1ba4d485ce346bded508e2426798f825558be' }

storiesOf('Organisms/VaultTitle', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: '478px', background: 'white', padding: '16px' }}>
      {story()}
    </div>
  ))
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultTitle {...props} />)
