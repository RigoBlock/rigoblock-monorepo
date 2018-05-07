import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import React from 'react'
import UserMenu from './'

storiesOf('Molecules/UserMenu', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <UserMenu />)
