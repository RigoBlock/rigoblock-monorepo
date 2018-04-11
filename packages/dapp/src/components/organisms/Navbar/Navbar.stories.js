import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import '../../_settings/_base.scss'

storiesOf('Organisms/Navbar', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <Navbar />)
