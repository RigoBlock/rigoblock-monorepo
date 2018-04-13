import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import BaseTemplate from './BaseTemplate'
import '../../_settings/_base.scss'

storiesOf('Templates/BaseTemplate', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <BaseTemplate />)
