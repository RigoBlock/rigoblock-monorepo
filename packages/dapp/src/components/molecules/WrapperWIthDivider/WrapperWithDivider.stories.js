import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountView from '../../organisms/AccountView'
import React from 'react'
import WrapperWithDivider from './WrapperWithDivider'
import mockStore from '../../../fixtures/store'

const store = mockStore()

const Divider = () => (
  <div
    style={{
      width: '32px',
      height: '1px',
      margin: '40px 0',
      backgroundColor: '#dadada'
    }}
  />
)

storiesOf('Molecules/WrapperWithDivider', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <WrapperWithDivider Divider={Divider}>
      <AccountView />
      <AccountView />
      <AccountView />
    </WrapperWithDivider>
  ))
