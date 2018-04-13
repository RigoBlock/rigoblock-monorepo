import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import '../../_settings/_base.scss'
import Link, { LINK_SIZES } from './Link'

storiesOf('Atoms/Link', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(LINK_SIZES.SMALL, () => (
    <Link size={LINK_SIZES.SMALL} to={'/'}>
      Small Link
    </Link>
  ))
  .add(LINK_SIZES.MEDIUM, () => (
    <Link size={LINK_SIZES.MEDIUM} to={'/'}>
      Medium Link
    </Link>
  ))
  .add(LINK_SIZES.LARGE, () => (
    <Link size={LINK_SIZES.LARGE} to={'/'}>
      Large Link
    </Link>
  ))
