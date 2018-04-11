import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import '../../_settings/_base.scss'
import Link from './Link'

storiesOf('Atoms/Link', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('small', () => (
    <Link size={'small'} to={'/'}>
      Small Link
    </Link>
  ))
  .add('medium', () => (
    <Link size={'medium'} to={'/'}>
      Medium Link
    </Link>
  ))
  .add('large', () => (
    <Link size={'large'} to={'/'}>
      Large Link
    </Link>
  ))
