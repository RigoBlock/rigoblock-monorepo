import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import '../../_settings/_base.scss'
import UserMenu from './'

storiesOf('Molecules/UserMenu', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <UserMenu />)
