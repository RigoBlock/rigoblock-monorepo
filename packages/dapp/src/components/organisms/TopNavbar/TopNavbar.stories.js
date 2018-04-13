import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavbar from './TopNavbar'
import '../../_settings/_base.scss'

storiesOf('Organisms/TopNavbar', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <TopNavbar />)
