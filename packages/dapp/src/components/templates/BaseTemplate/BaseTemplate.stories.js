import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import BaseTemplate from './BaseTemplate'
import React from 'react'

storiesOf('Templates/BaseTemplate', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <BaseTemplate />)
